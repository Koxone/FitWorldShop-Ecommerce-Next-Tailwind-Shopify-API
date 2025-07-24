import { NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import { createClerkClient } from '@clerk/backend';

import {
  SHOPIFY_ADMIN_API_ACCESS_TOKEN,
  SHOPIFY_STORE_URL,
} from '@/lib/config';

const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

export async function GET(req) {
  try {
    // const { userId } = await getAuth(req);
    const { userId } = getAuth(req);

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await clerk.users.getUser(userId);
    const email = user?.emailAddresses?.[0]?.emailAddress;

    if (!email) {
      return NextResponse.json({ error: 'Email not found' }, { status: 400 });
    }

    const shopifyRes = await fetch(
      `${SHOPIFY_STORE_URL}/admin/api/2023-10/orders.json?email=${email}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': SHOPIFY_ADMIN_API_ACCESS_TOKEN,
        },
      }
    );

    if (!shopifyRes.ok) {
      throw new Error(`Shopify Error: ${shopifyRes.statusText}`);
    }

    const data = await shopifyRes.json();
    return NextResponse.json({ orders: data.orders || [] });
  } catch (err) {
    console.error('API Error:', err);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
