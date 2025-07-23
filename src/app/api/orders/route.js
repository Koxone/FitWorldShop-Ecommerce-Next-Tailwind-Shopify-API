// app/api/orders/route.js
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function GET(req) {
  const { userId } = auth();
  if (!userId) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  // Obtener email del usuario desde Clerk
  const user = await fetch(`https://api.clerk.com/v1/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
    },
  }).then((res) => res.json());

  const email = user.email_addresses?.[0]?.email_address;
  if (!email) {
    return NextResponse.json({ error: 'Email not found' }, { status: 404 });
  }

  // Shopify Admin API: buscar órdenes por email
  const response = await fetch(
    `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/admin/api/2023-10/orders.json?email=${email}`,
    {
      headers: {
        'X-Shopify-Access-Token': process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN,
        'Content-Type': 'application/json',
      },
    }
  );

  const data = await response.json();
  return NextResponse.json({ orders: data.orders || [] });
}
