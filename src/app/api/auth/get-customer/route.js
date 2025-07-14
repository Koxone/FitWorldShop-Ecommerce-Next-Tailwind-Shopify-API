import { NextResponse } from 'next/server';

export async function POST(req) {
  const { accessToken } = await req.json();

  const query = `
    {
      customer(customerAccessToken: "${accessToken}") {
        firstName
        lastName
        email
        phone
      }
    }
  `;

  try {
    const response = await fetch(
      `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/2023-10/graphql.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token':
            process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
        },
        body: JSON.stringify({ query }),
      }
    );

    const json = await response.json();
    if (json.errors) {
      console.error(json.errors);
      return NextResponse.json(
        { error: json.errors[0].message },
        { status: 400 }
      );
    }

    return NextResponse.json({ customer: json.data.customer });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
