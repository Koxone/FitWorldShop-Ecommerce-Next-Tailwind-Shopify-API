# 🧠 Category Filter Cheatsheet – Shopify Tags + React Context

## ✅ ¿Cómo agregar un nuevo botón de filtro?

1. **Agrega el label legible al array de botones**  
   Ejemplo (`FilterButtons...x`):

   ```
   {
     ['Todos', 'Vitaminas', 'Suplementos', 'Proteínas'].map((label) => (
       <button key={label} onClick={() => setCategory(label)}>
         ...
       </button>
     ));
   }
   ```

2. **Agrega el mapeo en `labelToTagMap` del context**
   Archivo: `CategoryFilterContext.x`
   ```
   const labelToTagMap = {
     Proteínas: 'protein', // ← el tag exacto de Shopify
     ...
   };
   ```

---

## 🧩 ¿Qué es `viewScope`?

`viewScope` define el _universo de productos_ visibles en una vista.

Ejemplo de uso:

```
<ShopifyProductCard viewScope="vitamins" />
```

### Casos comunes:

| viewScope     | Qué muestra automáticamente         |
| ------------- | ----------------------------------- |
| `home`        | Solo productos con tag `ropa`       |
| `supplements` | `vitaminas` o `suplementos`         |
| `vitamins`    | Solo productos con tag `vitaminas`  |
| `ropa`        | Solo productos con tag `ropa`       |
| `offers`      | Solo productos con tag `sale`       |
| `new`         | Solo productos con tag `new`        |
| `accesories`  | Solo productos con tag `accesories` |
| `salud`       | Solo productos con tag `Salud`      |
| _(default)_   | Muestra **todo** el catálogo        |

---

## 🧠 ¿Cómo funciona el filtro?

### Si hay categoría seleccionada:

Filtra productos por el tag asociado.

```
tags.includes(tag.toLowerCase());
```

### Si NO hay categoría seleccionada:

Usa `viewScope` para mostrar solo los productos relevantes.

---

## 🛠 Tips útiles

- Los tags deben estar **en minúsculas** en Shopify (aunque el label sea capitalizado).
- Usa siempre `categoryLabels` para generar botones dinámicamente si lo deseas.
- Si un botón no filtra nada, revisa si el `label` tiene su entrada en `labelToTagMap`.

---

## 🧪 Ejemplo rápido

Agregar filtro para `"Proteínas"` con tag `protein`:

- Botón:
  ```
  ['Todos', 'Vitaminas', 'Suplementos', 'Proteínas'];
  ```
- Context:
  ```
  Proteínas: 'protein',
  ```

✅ ¡Listo! El botón funcionará con el sistema actual sin modificar nada más.
