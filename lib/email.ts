import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

interface OrderItem {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  selectedSize?: string;
  selectedColor?: string;
}

interface OrderData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  total: number;
  items: OrderItem[];
}

export async function sendOrderEmails(orderData: OrderData) {
  const {
    firstName,
    lastName,
    email,
    address,
    city,
    postalCode,
    country,
    total,
    items,
  } = orderData;

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const logoUrl = "https://scontent.fkhi17-2.fna.fbcdn.net/v/t39.30808-6/465844923_572145461955105_9120906240304561937_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=2a1932&_nc_ohc=dKRqtgNSQtIQ7kNvwGCnEue&_nc_oc=AdmzFpDiKx9Ucy1lLUkGxvAS28MlyJlzQ3GKoDItOIlmHOqGq2XP0E-B2tjC8UmpUis&_nc_zt=23&_nc_ht=scontent.fkhi17-2.fna&_nc_gid=bv9eo4MocjBpUy-JJkdt6Q&oh=00_AfsrcOo8kWRJ5_hzSILe9z_me852fcWrScjm0Wd9RqHnsQ&oe=69A66AEB";
  const orderId = Math.floor(100000000 + Math.random() * 900000000); 
  const orderDate = new Date().toLocaleString();

  const itemsHtml = items.map((item: any) => {
    let imageUrl = item.image || item.imageUrl || item.url || '';
    if (imageUrl && !imageUrl.startsWith('data:') && !imageUrl.startsWith('http')) {
      imageUrl = `${appUrl.replace(/\/$/, '')}/${imageUrl.replace(/^\//, '')}`;
    }
    if (!imageUrl) imageUrl = "https://via.placeholder.com/150"; 

    const price = parseFloat(item.price?.toString() || "0");
    const quantity = parseInt(item.quantity?.toString() || "1");
    const itemTotal = price * quantity;

    return `<tr>
<td style="padding:15px 0;border-bottom:1px solid #f0f0f0;">
<table width="100%" cellpadding="0" cellspacing="0">
<tr>
<td width="60" valign="top"><img src="${imageUrl}" width="50" height="50" style="border-radius:6px;object-fit:cover;display:block;border:1px solid #eee;"></td>
<td style="padding-left:12px;" valign="top">
<div style="font-size:14px;font-weight:700;color:#111;">${item.name}</div>
<div style="font-size:12px;color:#666;">Size: ${item.selectedSize || '-'} | Color: ${item.selectedColor || '-'}</div>
<div style="font-size:12px;color:#666;">Qty: ${quantity} x $${price.toFixed(2)}</div>
</td>
<td align="right" valign="top" style="font-size:14px;font-weight:700;color:#111;">$${itemTotal.toFixed(2)}</td>
</tr>
</table>
</td>
</tr>`;
  }).join('');

  const shippingCost = parseFloat(total.toString()) > 100 ? 0 : 15;
  const subtotal = parseFloat(total.toString()) - shippingCost;

  // Optimized HTML to avoid clipping
  const emailHtml = `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>
body{font-family:Helvetica,Arial,sans-serif;margin:0;padding:20px;background-color:#f8f9fa;color:#1a1a1b}
.card{max-width:600px;margin:0 auto;background:#fff;border-radius:12px;border:1px solid #e0e0e0;overflow:hidden}
.box{background:#f9f9f9;border-radius:8px;padding:15px;border:1px solid #eee;margin-bottom:15px}
.label{font-size:10px;font-weight:800;color:#999;text-transform:uppercase;letter-spacing:1px;margin-bottom:5px}
.val{font-size:13px;font-weight:600;color:#333}
.total-box{background:#000;color:#fff;padding:25px}
</style></head>
<body [ignoring loop detection]>
<div class="card">
<div style="padding:30px;text-align:center;border-bottom:1px solid #f0f0f0">
<img src="${logoUrl}" width="80" height="80" style="border-radius:50%;margin-bottom:15px;box-shadow:0 4px 10px rgba(0,0,0,0.1)">
<h1 style="font-size:22px;margin:0;color:#000">Order Confirmed</h1>
<div style="font-size:12px;color:#888;margin-top:5px">Purchase #${orderId} &bull; ${orderDate}</div>
</div>
<div style="padding:20px 30px">
<table width="100%" cellpadding="0" cellspacing="0"><tr>
<td width="48%" valign="top"><div class="box"><div class="label">Customer</div><div class="val">${firstName} ${lastName}</div><div style="font-size:11px;color:#666">${email}</div></div></td>
<td width="4%"></td>
<td width="48%" valign="top"><div class="box"><div class="label">Shipping To</div><div class="val">${address}</div><div style="font-size:11px;color:#666">${city}, ${postalCode}, ${country}</div></div></td>
</tr></table>
<div class="label" style="margin:10px 0">Your Items</div>
<table width="100%" cellpadding="0" cellspacing="0">${itemsHtml}</table>
</div>
<div class="total-box">
<table width="100%" style="font-size:14px">
<tr><td style="color:#888">Subtotal</td><td align="right">$${subtotal.toFixed(2)}</td></tr>
<tr><td style="color:#888;padding-top:5px">Shipping</td><td align="right" style="padding-top:5px">$${shippingCost.toFixed(2)}</td></tr>
<tr><td colspan="2" style="border-top:1px solid #333;margin:15px 0;padding-top:15px;font-size:18px;font-weight:800">Total Payment <span style="float:right">$${parseFloat(total.toString()).toFixed(2)}</span></td></tr>
</table>
</div>
<div style="padding:30px;text-align:center;font-size:12px;color:#666;background:#fafafa">
<div style="font-weight:700;color:#000;margin-bottom:5px">STAY STYLISH WITH POTHOS INDUSTRY</div>
<div>Visit us: <a href="https://pothosindustry.com" style="color:#000">pothosindustry.com</a></div>
<div>Support: info@pothosindustry.com</div>
<div>Call: +92 345 6732994</div>
<div style="margin-top:20px;color:#ccc">&copy; ${new Date().getFullYear()} Pothos Industry. All Rights Reserved.</div>
</div>
</div></body></html>`;

  const userMailOptions = {
    from: `"Pothos Industry" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `Success! Order #${orderId} Confirmed`,
    html: emailHtml,
  };

  const adminMailOptions = {
    from: `"Pothos Industry System" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: `🚀 SALE ALERT: Order #${orderId}`,
    html: emailHtml,
  };

  try {
    await transporter.sendMail(userMailOptions);
    await transporter.sendMail(adminMailOptions);
    console.log('Emails sent successfully for order:', orderId);
    return { success: true };
  } catch (error) {
    console.error('Nodemailer Error:', error);
    return { success: false, error };
  }
}
