import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendOrderEmails } from '@/lib/email';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      postalCode,
      country,
      total,
      items,
    } = data;

    // Basic validation
    if (!firstName || !lastName || !email || !address || !city || !postalCode || !country) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const order = await prisma.order.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        address,
        city,
        postalCode,
        country,
        total,
        items,
        status: 'Pending',
      },
    });

    // Send emails asynchronously
    sendOrderEmails({
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      postalCode,
      country,
      total,
      items: items as any, // Cast to any to match the detailed interface in email.ts
    }).catch(err => console.error('Background email sending failed:', err));

    return NextResponse.json(
      { message: 'Order created successfully', orderId: order.id },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(orders, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
