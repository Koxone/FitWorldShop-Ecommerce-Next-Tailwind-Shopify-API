import { NextResponse } from 'next/server';

export async function POST(req) {
  const { accessToken } = await req.json();

  const query = `
    {
      customer(customerAccessToken: "${accessToken}") {
        orders(first: 10, reverse: true) {
          edges {
            node {
              id
              orderNumber
              processedAt
              financialStatus
              fulfillmentStatus
              totalPrice {
                amount
                currencyCode
              }
              lineItems(first: 10) {
                edges {
                  node {
                    title
                    quantity
                    originalTotalPrice {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
        }
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
            process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
        },
        body: JSON.stringify({ query }),
      }
    );

    const json = await response.json();
    console.log(JSON.stringify(json, null, 2));

    if (json.errors) {
      console.error(json.errors);
      return NextResponse.json(
        { error: json.errors[0].message },
        { status: 400 }
      );
    }

    const orders = json.data.customer.orders.edges.map((edge) => edge.node);
    return NextResponse.json({ orders });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
