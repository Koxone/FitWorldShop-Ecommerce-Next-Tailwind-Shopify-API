import { NextResponse } from 'next/server';
import {
  SHOPIFY_ADMIN_API_ACCESS_TOKEN,
  SHOPIFY_STORE_URL,
} from '@/lib/config';

export async function GET(req) {
  try {
    return NextResponse.json({ orders: [] });
  } catch (err) {
    console.error('API Error:', err);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
