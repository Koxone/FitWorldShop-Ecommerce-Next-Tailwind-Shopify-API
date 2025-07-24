import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required.' },
        { status: 400 }
      );
    }

    const query = `
      mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
        customerAccessTokenCreate(input: $input) {
          customerAccessToken {
            accessToken
            expiresAt
          }
          customerUserErrors {
            field
            message
          }
        }
      }
    `;

    const variables = {
      input: { email, password },
    };

    const response = await fetch(
      `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/2023-10/graphql.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token':
            process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
        },
        body: JSON.stringify({ query, variables }),
      }
    );

    const json = await response.json();

    const data = json.data?.customerAccessTokenCreate;

    if (!data) {
      return NextResponse.json(
        { error: 'Unexpected response from Shopify.' },
        { status: 500 }
      );
    }

    const { customerAccessToken, customerUserErrors } = data;

    if (customerUserErrors && customerUserErrors.length > 0) {
      return NextResponse.json(
        { error: customerUserErrors[0].message },
        { status: 400 }
      );
    }

    if (!customerAccessToken) {
      return NextResponse.json(
        { error: 'Failed to generate access token.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      accessToken: customerAccessToken.accessToken,
      expiresAt: customerAccessToken.expiresAt,
    });
  } catch (error) {
    console.error('❌ Error logging in customer:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
