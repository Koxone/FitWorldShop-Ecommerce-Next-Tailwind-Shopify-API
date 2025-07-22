// Test utility to add some products to wishlist for demo purposes
export const addTestProductsToWishlist = () => {
  if (typeof window !== 'undefined') {
    const testWishlist = {
      'gid://shopify/Product/1': true,
      'gid://shopify/Product/2': true,
      'gid://shopify/Product/3': true,
    };
    localStorage.setItem('wishlist', JSON.stringify(testWishlist));
    console.log('Test products added to wishlist for demo');
  }
};

export const addTestOrdersForDemo = () => {
  if (typeof window !== 'undefined') {
    const testOrders = [
      {
        id: 'gid://shopify/Order/1',
        orderNumber: 1001,
        processedAt: '2024-01-15T10:30:00Z',
        financialStatus: 'paid',
        fulfillmentStatus: 'fulfilled',
        totalPrice: {
          amount: '89.99',
          currencyCode: 'USD'
        },
        lineItems: {
          edges: [
            {
              node: {
                title: 'Camiseta Deportiva Premium',
                quantity: 2,
                originalTotalPrice: {
                  amount: '59.98',
                  currencyCode: 'USD'
                }
              }
            },
            {
              node: {
                title: 'Shorts de Entrenamiento',
                quantity: 1,
                originalTotalPrice: {
                  amount: '29.99',
                  currencyCode: 'USD'
                }
              }
            }
          ]
        }
      },
      {
        id: 'gid://shopify/Order/2',
        orderNumber: 1002,
        processedAt: '2024-01-20T14:15:00Z',
        financialStatus: 'pending',
        fulfillmentStatus: 'unfulfilled',
        totalPrice: {
          amount: '129.99',
          currencyCode: 'USD'
        },
        lineItems: {
          edges: [
            {
              node: {
                title: 'Zapatillas Running Pro',
                quantity: 1,
                originalTotalPrice: {
                  amount: '129.99',
                  currencyCode: 'USD'
                }
              }
            }
          ]
        }
      }
    ];
    localStorage.setItem('userOrders', JSON.stringify(testOrders));
    console.log('Test orders added for demo');
  }
};