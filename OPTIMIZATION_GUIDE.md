# Optimización de Contextos - Documentación

## Problema Original

La aplicación tenía todos los contextos envueltos en el layout raíz, lo que causaba:

- Re-renderizado de toda la aplicación cuando cualquier contexto cambiaba
- Carga innecesaria de contextos en páginas que no los necesitaban
- Performance degradada por la propagación excesiva de cambios de estado

## Solución Implementada

### 1. Separación por Dominio

Los contextos se han agrupado por funcionalidad:

- **GlobalProviders**: Contextos que raramente cambian (Auth, ImageSource, CategoryFilter, I18n)
- **ShoppingProviders**: Contextos relacionados con compras (Cart, Wishlist)
- **ProductProviders**: Contextos específicos de productos (ProductView, Badge)

### 2. Carga Condicional por Ruta

`RouteSpecificProviders` determina qué contextos cargar basado en la ruta actual:

```javascript
- /product-open/* → ShoppingProviders + ProductProviders
- /, /all-products, /menu → ShoppingProviders únicamente
- /auth/*, /user-profile → Sin contextos adicionales
```

### 3. Hooks Específicos

Cada contexto optimizado incluye hooks específicos para evitar re-renders:

```javascript
// En lugar de usar todo el contexto
const { cartItems, addToCart, totalItems, isCartOpen } = usePurchase();

// Usar hooks específicos
const cartItems = useCartItems();
const { addToCart } = useCartActions();
const { totalItems } = useCartTotals();
const { isCartOpen } = useCartToggle();
```

### 4. Memoización Estratégica

- Todos los providers usan `React.memo`
- Los valores de contexto están memoizados con `useMemo`
- Las funciones de contexto usan `useCallback`
- Componentes de UI críticos están memoizados

## Archivos Creados

### Providers Optimizados

- `src/providers/optimized/AppProviders.jsx` - Contextos globales
- `src/providers/optimized/ShoppingProviders.jsx` - Contextos de compras
- `src/providers/optimized/ProductProviders.jsx` - Contextos de productos
- `src/providers/optimized/RouteSpecificProviders.jsx` - Carga condicional
- `src/providers/optimized/OptimizedProviders.jsx` - Provider principal

### Contextos Optimizados

- `src/context/Auth/AuthContextOptimized.jsx`
- `src/context/Cart/PurchaseContextOptimized.jsx`
- `src/context/filters/CategoryFilterContextOptimized.jsx`
- `src/context/productView/ProductViewContextOptimized.jsx`
- `src/context/product-card/WishlistContextOptimized.js`
- `src/context/product-card/BadgeContextOptimized.jsx`

### Componentes Optimizados

- `src/components/optimized/MemoizedComponents.jsx` - Componentes memoizados
- `src/components/optimized/OptimizedPageTransition.jsx` - Transiciones optimizadas
- `src/components/headers/home/MainHeaderOptimized.jsx` - Header optimizado

### Hooks de Compatibilidad

- `src/hooks/optimized/useOptimizedContexts.js` - Re-exports para compatibilidad

## Beneficios Implementados

1. **Reducción de Re-renders**: Solo los componentes que realmente necesitan actualizarse se re-renderizan
2. **Carga Condicional**: Los contextos solo se cargan donde son necesarios
3. **Mejor Performance**: Menos computación y actualizaciones innecesarias
4. **Mantenibilidad**: Separación clara de responsabilidades
5. **Compatibilidad**: Los hooks existentes siguen funcionando

## Uso Recomendado

### Para nuevos componentes:

```javascript
import {
  useCartActions,
  useCartTotals,
} from '@/hooks/optimized/useOptimizedContexts';

function MyComponent() {
  const { addToCart } = useCartActions(); // Solo se re-renderiza cuando las acciones cambian
  const { totalItems } = useCartTotals(); // Solo se re-renderiza cuando los totales cambian
}
```

### Para componentes existentes:

Los imports existentes siguen funcionando sin cambios, pero ahora usan las versiones optimizadas.

## Próximos Pasos

1. Migrar gradualmente componentes existentes a usar hooks específicos
2. Aplicar memoización a componentes que aún no la tienen
3. Considerar división de código (code splitting) para rutas específicas
4. Implementar lazy loading para componentes pesados
