# FitWorldShop - Manual de Sistema de Temas y Tokens de Diseño

## 🎯 Introducción

Este proyecto implementa un sistema completo de design tokens usando variables CSS que permite personalización visual completa sin modificar componentes individuales. El sistema transforma esta aplicación Next.js de e-commerce en una plantilla completamente personalizable.

## 📁 Estructura de Archivos

```
├── src/
│   ├── styles/
│   │   └── themes/                  # Directorio de temas
│   │       ├── default.css          # Tema por defecto (verde oscuro)
│   │       ├── client1.css          # Tema corporativo azul
│   │       ├── client2.css          # Tema moderno claro
│   │       ├── ocean-sunset.css     # Tema océano con atardecer
│   │       └── nordic-minimal.css   # Tema nórdico minimalista
│   ├── components/
│   │   └── theming/
│   │       └── ThemeSwitcher.jsx    # Selector de temas (desarrollo)
│   └── app/
│       ├── globals.css              # Estilos base y utilidades
│       └── layout.jsx               # Layout principal
├── public/
│   └── styles/
│       └── themes/                  # Temas públicos para carga dinámica
├── tailwind.config.js               # Configuración de Tailwind
└── THEMING.md                       # Documentación técnica detallada
```

## 🎨 Temas Disponibles

### 1. Default (Tema por Defecto)
- **Colores**: Verde oscuro fitness con acentos brillantes
- **Tipografía**: Inter (moderna y legible)
- **Estilo**: Profesional deportivo

### 2. Corporate Blue (Azul Corporativo)
- **Colores**: Azul profesional con acentos naranjas
- **Tipografía**: Roboto y Playfair Display
- **Estilo**: Empresarial elegante

### 3. Light Modern (Moderno Claro)
- **Colores**: Tonos claros y frescos
- **Tipografía**: Inter clean
- **Estilo**: Minimalista moderno

### 4. Ocean Sunset (Océano Atardecer)
- **Colores**: Azules vibrantes con naranjas del atardecer
- **Tipografía**: Poppins dinámico
- **Estilo**: Energético y vibrante

### 5. Nordic Minimal (Nórdico Minimalista)
- **Colores**: Grises suaves con acentos violetas
- **Tipografía**: Inter y Lora
- **Estilo**: Elegante y minimalista

## 🛠 Cómo Usar el Sistema

### Cambio de Tema Rápido

1. **Durante Desarrollo**:
   - Usa el selector de temas en la esquina inferior derecha
   - Los cambios se aplican instantáneamente
   - El tema se guarda automáticamente en localStorage

2. **Para Producción**:
   ```css
   /* Edita src/styles/themes/default.css */
   :root {
     --color-primary: #tu-color-marca;
     --color-background: #tu-color-fondo;
     --font-sans: 'Tu-Fuente', sans-serif;
   }
   ```

### Creación de Nuevo Tema

1. **Copia un tema existente**:
   ```bash
   cp src/styles/themes/default.css src/styles/themes/mi-tema.css
   ```

2. **Modifica las variables CSS**:
   ```css
   :root {
     /* Colores de Marca */
     --color-primary: #ff6b35;
     --color-secondary: #004e89;
     --color-accent: #ffc857;
     
     /* Fondos y Superficies */
     --color-background: #f5f5f5;
     --color-surface: #ffffff;
     
     /* Tipografía */
     --font-sans: 'Montserrat', sans-serif;
     /* ... más variables */
   }
   ```

3. **Copia al directorio público**:
   ```bash
   cp src/styles/themes/mi-tema.css public/styles/themes/
   ```

4. **Actualiza el ThemeSwitcher**:
   ```javascript
   const themes = [
     // ... temas existentes
     { name: 'Mi Tema', value: 'mi-tema', description: 'Mi tema personalizado' },
   ];
   ```

## 🎨 Design Tokens Disponibles

### Colores de Marca
```css
--color-primary           /* Color principal de la marca */
--color-primary-hover     /* Estado hover del color principal */
--color-primary-light     /* Variante clara del color principal */
--color-secondary         /* Color secundario */
--color-secondary-hover   /* Estado hover del color secundario */
--color-accent            /* Color de acento */
--color-accent-hover      /* Estado hover del color de acento */
```

### Colores Neutros
```css
--color-background        /* Fondo principal de la aplicación */
--color-surface          /* Fondo de tarjetas y superficies */
--color-surface-hover    /* Estado hover de superficies */
--color-surface-elevated /* Superficies elevadas (headers) */
--color-border           /* Color de bordes */
--color-border-light     /* Variante clara de bordes */
```

### Colores de Texto
```css
--color-text             /* Texto principal */
--color-text-secondary   /* Texto secundario */
--color-text-muted       /* Texto atenuado */
--color-text-inverse     /* Texto inverso (sobre fondos oscuros) */
```

### Tipografía
```css
--font-sans              /* Fuente sans-serif principal */
--font-serif             /* Fuente serif para títulos */
--font-mono              /* Fuente monoespaciada para código */

/* Tamaños de fuente */
--text-xs                /* 0.75rem */
--text-sm                /* 0.875rem */
--text-base              /* 1rem */
--text-lg                /* 1.125rem */
--text-xl                /* 1.25rem */
--text-2xl               /* 1.5rem */
--text-3xl               /* 1.875rem */
--text-4xl               /* 2.25rem */

/* Pesos de fuente */
--font-normal            /* 400 */
--font-medium            /* 500 */
--font-semibold          /* 600 */
--font-bold              /* 700 */
```

### Espaciado
```css
--spacing-xs             /* 0.25rem */
--spacing-sm             /* 0.5rem */
--spacing-md             /* 1rem */
--spacing-lg             /* 1.5rem */
--spacing-xl             /* 2rem */
--spacing-2xl            /* 3rem */
```

### Bordes y Sombras
```css
/* Border radius */
--radius-sm              /* 0.25rem */
--radius-md              /* 0.375rem */
--radius-lg              /* 0.5rem */
--radius-xl              /* 0.75rem */
--radius-2xl             /* 1rem */
--radius-full            /* 9999px */

/* Sombras */
--shadow-sm              /* Sombra sutil */
--shadow-md              /* Sombra media */
--shadow-lg              /* Sombra grande */
--shadow-xl              /* Sombra extra grande */
```

### Transiciones
```css
--transition-fast        /* 150ms ease-in-out */
--transition-normal      /* 250ms ease-in-out */
--transition-slow        /* 350ms ease-in-out */
```

## 🚀 Uso en Componentes

### Clases de Tailwind Mapeadas
```jsx
// Colores
<button className="bg-primary text-inverse hover:bg-primary-hover">
  Botón Principal
</button>

<div className="bg-surface border border-border">
  Tarjeta con diseño tokens
</div>

// Tipografía
<h1 className="font-sans text-2xl font-bold text-text">
  Título Principal
</h1>

<p className="font-sans text-base text-secondary">
  Texto secundario
</p>

// Espaciado y efectos
<div className="p-md rounded-lg shadow-md">
  Contenido con espaciado y sombra
</div>
```

### Utilities CSS Personalizadas
```jsx
// Efectos de hover mejorados
<button className="hover-lift bg-primary">
  Botón con elevación
</button>

// Gradientes
<div className="bg-gradient-primary">
  Fondo con gradiente principal
</div>

// Animaciones
<div className="animate-fade-in">
  Elemento con fade in
</div>

<div className="animate-slide-up">
  Elemento que se desliza hacia arriba
</div>
```

## 📱 Desarrollo de Temas

### Consideraciones de Diseño

1. **Contraste**: Asegúrate de que los colores cumplan con las pautas de accesibilidad WCAG
2. **Coherencia**: Mantén una paleta de colores coherente en todo el tema
3. **Legibilidad**: Las fuentes deben ser legibles en todos los tamaños
4. **Responsive**: Los temas deben funcionar en todos los dispositivos

### Herramientas de Desarrollo

1. **Theme Switcher**: Componente en desarrollo para probar temas
2. **Hot Reloading**: Los cambios en CSS se reflejan instantáneamente
3. **Local Storage**: Los temas seleccionados se guardan automáticamente

### Flujo de Trabajo Recomendado

1. **Planificación**:
   - Define la paleta de colores
   - Selecciona las tipografías
   - Establece el estilo general

2. **Implementación**:
   - Copia un tema existente como base
   - Modifica las variables CSS
   - Prueba en diferentes componentes

3. **Validación**:
   - Verifica el contraste de colores
   - Prueba en dispositivos móviles
   - Valida la coherencia visual

4. **Despliegue**:
   - Copia el tema al directorio público
   - Actualiza el selector de temas
   - Documenta los cambios

## 🔧 Solución de Problemas

### Problemas Comunes

1. **El tema no se aplica**:
   - Verifica que el archivo CSS esté en `public/styles/themes/`
   - Asegúrate de que el nombre coincida en el ThemeSwitcher
   - Revisa la consola del navegador para errores

2. **Colores no cambian**:
   - Confirma que los componentes usan clases de Tailwind mapeadas
   - Verifica que las variables CSS estén definidas correctamente
   - Asegúrate de que no hay estilos inline que sobrescriban

3. **Fuentes no cargan**:
   - Verifica que las fuentes estén disponibles en Google Fonts o localmente
   - Asegúrate de importar las fuentes en el layout principal
   - Revisa que las variables de fuente estén correctamente definidas

### Depuración

1. **Inspección de Variables**:
   ```javascript
   // En la consola del navegador
   getComputedStyle(document.documentElement).getPropertyValue('--color-primary')
   ```

2. **Verificación de Clases**:
   - Usa las herramientas de desarrollo del navegador
   - Inspecciona los elementos para ver las clases aplicadas
   - Verifica que las variables CSS se resuelvan correctamente

## 📚 Recursos Adicionales

- **Documentación Técnica**: Ver `THEMING.md` para detalles técnicos
- **Tailwind CSS**: [Documentación oficial](https://tailwindcss.com/docs)
- **CSS Variables**: [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- **Accesibilidad**: [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

## 🎉 Conclusión

Este sistema de temas proporciona una base sólida para crear experiencias visuales únicas manteniendo la funcionalidad existente. Con los 5 temas incluidos y la capacidad de crear nuevos temas fácilmente, puedes adaptar completamente la aplicación a cualquier marca o cliente.

¡Experimenta con los diferentes temas y crea tu propia identidad visual única!