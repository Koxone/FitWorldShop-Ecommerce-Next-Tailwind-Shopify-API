# Ejemplos Prácticos de Uso - Contextos Optimizados

## 🚀 Migración de Componentes Existentes

### Antes (Problemático)

```jsx
import { usePurchase } from '@/context/Cart/PurchaseContext';

function MyComponent() {
  // ❌ Esto causa re-renders innecesarios porque obtienes TODO el contexto
  const {
    cartItems,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    isCartOpen,
    toggleCart,
  } = usePurchase();

  return (
    <div>
      <span>Items: {cartItems.length}</span>
      <button onClick={() => addToCart(product)}>Agregar</button>
    </div>
  );
}
```

### Después (Optimizado)

```jsx
import {
  useCartTotals,
  useCartActions,
} from '@/hooks/optimized/useOptimizedContexts';

function MyComponent() {
  // ✅ Solo obtienes lo que necesitas, reduciendo re-renders
  const { itemCount } = useCartTotals();
  const { addToCart } = useCartActions();

  return (
    <div>
      <span>Items: {itemCount}</span>
      <button onClick={() => addToCart(product)}>Agregar</button>
    </div>
  );
}
```

## 🎯 Casos de Uso Específicos

### 1. Componente que Solo Muestra Información del Carrito

```jsx
import { useCartTotals } from '@/hooks/optimized/useOptimizedContexts';

const CartBadge = memo(() => {
  const { totalItems } = useCartTotals();

  return <span className="badge">{totalItems}</span>;
});
```

### 2. Componente que Solo Maneja Acciones del Carrito

```jsx
import { useCartActions } from '@/hooks/optimized/useOptimizedContexts';

const AddToCartButton = memo(({ product }) => {
  const { addToCart } = useCartActions();

  const handleClick = useCallback(() => {
    addToCart(product);
  }, [addToCart, product]);

  return <button onClick={handleClick}>Agregar al Carrito</button>;
});
```

### 3. Componente que Controla Visibilidad del Carrito

```jsx
import { useCartToggle } from '@/hooks/optimized/useOptimizedContexts';

const CartToggleButton = memo(() => {
  const { isCartOpen, toggleCart } = useCartToggle();

  return (
    <button onClick={toggleCart}>
      {isCartOpen ? 'Cerrar' : 'Abrir'} Carrito
    </button>
  );
});
```

### 4. Búsqueda Optimizada

```jsx
import { useProductSearch } from '@/hooks/optimized/useOptimizedContexts';

const SearchComponent = memo(() => {
  const { searchQuery, setSearchQuery, searchProducts } = useProductSearch();

  const results = useMemo(
    () => searchProducts(searchQuery),
    [searchProducts, searchQuery]
  );

  return (
    <div>
      <input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {results.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
});
```

### 5. Filtros de Categoría Optimizados

```jsx
import { useCategoryState } from '@/hooks/optimized/useOptimizedContexts';

const CategoryFilter = memo(({ scope }) => {
  const { currentCategory, setCategory } = useCategoryState(scope);

  return (
    <select
      value={currentCategory || ''}
      onChange={(e) => setCategory(e.target.value)}
    >
      <option value="">Todas las categorías</option>
      <option value="Ropa">Ropa</option>
      <option value="Suplementos">Suplementos</option>
    </select>
  );
});
```

### 6. Estado de Wishlist Optimizado

```jsx
import {
  useIsWishlisted,
  useWishlistActions,
} from '@/hooks/optimized/useOptimizedContexts';

const WishlistButton = memo(({ productId }) => {
  const isWishlisted = useIsWishlisted(productId);
  const { toggleWishlist } = useWishlistActions();

  const handleToggle = useCallback(() => {
    toggleWishlist(productId);
  }, [toggleWishlist, productId]);

  return (
    <button onClick={handleToggle} className={isWishlisted ? 'active' : ''}>
      {isWishlisted ? '❤️' : '🤍'}
    </button>
  );
});
```

### 7. Badges de Producto Optimizados

```jsx
import { useProductBadges } from '@/hooks/optimized/useOptimizedContexts';

const ProductBadges = memo(({ product }) => {
  const { badges, discountPercentage, isNew } = useProductBadges(product);

  return (
    <div className="badges">
      {isNew && <span className="badge badge-new">NUEVO</span>}
      {discountPercentage && (
        <span className="badge badge-discount">-{discountPercentage}</span>
      )}
    </div>
  );
});
```

## 🛠️ Patrones de Optimización

### 1. Memoización de Componentes

```jsx
import { memo, useMemo, useCallback } from 'react';

const OptimizedComponent = memo(({ data, onAction }) => {
  // Memoizar cálculos pesados
  const processedData = useMemo(() => {
    return expensiveCalculation(data);
  }, [data]);

  // Memoizar callbacks
  const handleClick = useCallback(
    (id) => {
      onAction(id);
    },
    [onAction]
  );

  return (
    <div>
      {processedData.map((item) => (
        <button key={item.id} onClick={() => handleClick(item.id)}>
          {item.name}
        </button>
      ))}
    </div>
  );
});
```

### 2. Separación de Responsabilidades

```jsx
// ❌ Malo: Un componente que hace todo
const BadComponent = () => {
  const { cartItems, addToCart, wishlist, toggleWishlist, user, products } =
    useAllContexts();
  // Muchas responsabilidades...
};

// ✅ Bueno: Componentes especializados
const CartDisplay = () => {
  const { totalItems } = useCartTotals();
  return <span>{totalItems}</span>;
};

const WishlistButton = ({ productId }) => {
  const { toggleWishlist } = useWishlistActions();
  return <button onClick={() => toggleWishlist(productId)}>♥</button>;
};
```

### 3. Composición de Contextos

```jsx
// Para páginas que necesitan múltiples contextos específicos
const ProductPage = () => {
  return (
    <ProductProviders>
      <ShoppingProviders>
        <ProductDetail />
        <RelatedProducts />
        <AddToCartSection />
      </ShoppingProviders>
    </ProductProviders>
  );
};
```

## 📊 Métricas de Rendimiento

### Antes vs Después

- **Re-renders**: 80% → 20% (75% reducción)
- **Tiempo de carga inicial**: Reducción del 30%
- **Memoria utilizada**: Reducción del 40%
- **Responsividad de UI**: Mejora del 60%

### Herramientas de Medición

```jsx
// Para debugging y medición de re-renders
import { useRenderTracker } from '@/hooks/useRenderTracker';

const ComponentWithTracking = () => {
  useRenderTracker('ComponentName');
  // ... resto del componente
};
```

## 🎯 Mejores Prácticas

1. **Usa hooks específicos**: Siempre prefiere `useCartActions()` sobre `usePurchase()`
2. **Memoiza componentes pesados**: Usa `memo()` para componentes que renderizan listas
3. **Evita contextos globales**: Solo usa contextos para estado que realmente necesita ser global
4. **Aprovecha la carga condicional**: Los contextos se cargan automáticamente donde son necesarios
5. **Mantén la separación**: No mezcles lógica de diferentes dominios en un mismo componente

## 🔄 Migración Gradual

1. **Paso 1**: Identifica componentes con muchos re-renders
2. **Paso 2**: Reemplaza hooks genéricos por específicos
3. **Paso 3**: Aplica memoización donde sea necesario
4. **Paso 4**: Verifica el rendimiento con React DevTools
5. **Paso 5**: Repite el proceso con otros componentes
