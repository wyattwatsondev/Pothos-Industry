import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        
        if (body.password === 'admin@123') {
            const cookieStore = await cookies();
            cookieStore.set('adminToken', 'authenticated', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 60 * 60 * 24 * 7, // 1 week
                path: '/'
            });
            return NextResponse.json({ success: true });
        }
        
        return NextResponse.json({ success: false, message: 'Invalid Admin Password' }, { status: 401 });
    } catch (e) {
        return NextResponse.json({ success: false, message: 'Server error occurred' }, { status: 500 });
    }
}
