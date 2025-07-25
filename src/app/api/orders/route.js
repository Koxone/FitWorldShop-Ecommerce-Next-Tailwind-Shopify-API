import { NextResponse } from 'next/server';

import {
  SHOPIFY_ADMIN_API_ACCESS_TOKEN,
  SHOPIFY_STORE_URL,
} from '@/lib/config';

export async function GET(req) {
  try {
    // For now, return empty orders since we removed auth
    // In the future, this could be connected to a different auth system
    return NextResponse.json({ orders: [] });
    
    // Original Shopify integration commented out since it depended on Clerk auth
    /*
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
    */
  } catch (err) {
    console.error('API Error:', err);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
