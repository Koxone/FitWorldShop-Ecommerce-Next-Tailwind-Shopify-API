// Mock products data for testing search functionality
export const mockProducts = [
  {
    id: "1",
    title: "Camiseta Deportiva Nike",
    handle: "camiseta-deportiva-nike",
    description: "Camiseta deportiva de alta calidad para entrenamientos",
    featuredImage: {
      url: "https://via.placeholder.com/300x300/333/fff?text=Nike+Shirt",
      altText: "Camiseta Deportiva Nike"
    },
    tags: ["ropa", "deportiva", "nike", "camiseta"],
    variants: {
      edges: [
        {
          node: {
            price: {
              amount: "29.99",
              currencyCode: "USD"
            }
          }
        }
      ]
    },
    priceRange: {
      minVariantPrice: {
        amount: "29.99"
      }
    }
  },
  {
    id: "2", 
    title: "Leggings Adidas Mujer",
    handle: "leggings-adidas-mujer",
    description: "Leggings cómodos y flexibles para mujeres",
    featuredImage: {
      url: "https://via.placeholder.com/300x300/666/fff?text=Adidas+Leggings",
      altText: "Leggings Adidas"
    },
    tags: ["ropa", "leggings", "adidas", "mujer"],
    variants: {
      edges: [
        {
          node: {
            price: {
              amount: "39.99",
              currencyCode: "USD"
            }
          }
        }
      ]
    },
    priceRange: {
      minVariantPrice: {
        amount: "39.99"
      }
    }
  },
  {
    id: "3",
    title: "Proteína Whey Gold",
    handle: "proteina-whey-gold", 
    description: "Proteína de suero de alta calidad para desarrollo muscular",
    featuredImage: {
      url: "https://via.placeholder.com/300x300/999/fff?text=Whey+Protein",
      altText: "Proteína Whey"
    },
    tags: ["suplementos", "proteina", "whey", "salud"],
    variants: {
      edges: [
        {
          node: {
            price: {
              amount: "49.99",
              currencyCode: "USD"
            }
          }
        }
      ]
    },
    priceRange: {
      minVariantPrice: {
        amount: "49.99"
      }
    }
  },
  {
    id: "4",
    title: "Vitaminas Multivitamínico",
    handle: "vitaminas-multivitaminico",
    description: "Complejo vitamínico completo para salud general",
    featuredImage: {
      url: "https://via.placeholder.com/300x300/f39c12/fff?text=Vitamins",
      altText: "Vitaminas"
    },
    tags: ["vitaminas", "salud", "suplementos"],
    variants: {
      edges: [
        {
          node: {
            price: {
              amount: "19.99",
              currencyCode: "USD"
            }
          }
        }
      ]
    },
    priceRange: {
      minVariantPrice: {
        amount: "19.99"
      }
    }
  },
  {
    id: "5",
    title: "Shorts de Entrenamiento",
    handle: "shorts-entrenamiento",
    description: "Shorts ligeros y cómodos para entrenamientos intensos",
    featuredImage: {
      url: "https://via.placeholder.com/300x300/e74c3c/fff?text=Shorts",
      altText: "Shorts de Entrenamiento"
    },
    tags: ["ropa", "shorts", "entrenamiento", "deportiva"],
    variants: {
      edges: [
        {
          node: {
            price: {
              amount: "24.99",
              currencyCode: "USD"
            }
          }
        }
      ]
    },
    priceRange: {
      minVariantPrice: {
        amount: "24.99"
      }
    }
  }
];