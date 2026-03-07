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

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status');
    const skip = parseInt(searchParams.get('skip') || '0');
    const limit = parseInt(searchParams.get('limit') || '50');

    const where: any = {};
    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ];
    }
    if (status && status !== 'all') {
      where.status = status;
    }

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.order.count({ where }),
    ]);

    // Fetch global stats for admin dashboard
    const statsResult = await prisma.order.groupBy({
      by: ['status'],
      _count: { id: true },
    });

    const stats = statsResult.reduce((acc: any, curr) => {
      acc[curr.status.toLowerCase()] = curr._count.id;
      return acc;
    }, {});
    
    const totalGlobal = await prisma.order.count();
    const revenueResult = await prisma.order.aggregate({
      _sum: {
        total: true,
      },
    });

    return NextResponse.json({ 
      orders, 
      total, 
      stats: {
        total: totalGlobal,
        pending: stats['pending'] || 0,
        approved: stats['approved'] || 0,
        delivered: stats['delivered'] || 0,
        totalRevenue: revenueResult._sum.total || 0,
      }
    });
  } catch (error: any) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
