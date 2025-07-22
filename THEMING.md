# Design Token System Documentation

This project implements a comprehensive design token system using CSS variables, allowing for complete visual customization without modifying individual components.

## 🎯 Overview

The design token system centralizes all visual design decisions (colors, typography, spacing, etc.) in CSS variables, enabling:
- **Full theme customization** from a single file
- **Dynamic theme switching** 
- **Scalable design system** for multiple brands/clients
- **Maintainable codebase** with consistent styling

## 📁 File Structure

```
src/
├── styles/
│   └── themes/
│       ├── default.css      # Default dark theme
│       ├── client1.css      # Corporate blue theme
│       └── client2.css      # Light modern theme
├── app/
│   └── globals.css         # Imports theme and applies base styles
└── components/
    └── theming/
        └── ThemeSwitcher.jsx  # Development theme switcher
```

## 🎨 Design Tokens Reference

### Brand Colors
```css
--color-primary: #22c55e;           /* Main brand color */
--color-primary-hover: #16a34a;     /* Primary hover state */
--color-primary-light: #4ade80;     /* Light primary variant */
--color-secondary: #3b82f6;         /* Secondary brand color */
--color-secondary-hover: #2563eb;   /* Secondary hover state */
--color-accent: #f59e0b;            /* Accent color */
--color-accent-hover: #d97706;      /* Accent hover state */
```

### Neutral Colors
```css
--color-background: #101828;        /* Main background */
--color-surface: #1f2937;           /* Card/surface background */
--color-surface-hover: #374151;     /* Surface hover state */
--color-surface-elevated: #4b5563;  /* Elevated surface (headers) */
--color-border: #6b7280;            /* Border color */
--color-border-light: #9ca3af;      /* Light border variant */
```

### Text Colors
```css
--color-text: #ffffff;              /* Primary text */
--color-text-secondary: #d1d5db;    /* Secondary text */
--color-text-muted: #9ca3af;        /* Muted/disabled text */
--color-text-inverse: #111827;      /* Inverse text (light backgrounds) */
```

### Status Colors
```css
--color-success: #10b981;           /* Success state */
--color-error: #ef4444;             /* Error state */
--color-warning: #f59e0b;           /* Warning state */
--color-info: #3b82f6;              /* Info state */
```

### Typography
```css
--font-sans: 'Inter', sans-serif;   /* Sans-serif font family */
--font-serif: 'Georgia', serif;     /* Serif font family */
--font-mono: 'SF Mono', monospace;  /* Monospace font family */
```

### Spacing & Layout
```css
--spacing-xs: 0.25rem;   /* 4px */
--spacing-sm: 0.5rem;    /* 8px */
--spacing-md: 1rem;      /* 16px */
--spacing-lg: 1.5rem;    /* 24px */
--spacing-xl: 2rem;      /* 32px */
--spacing-2xl: 3rem;     /* 48px */
```

## 🛠 Usage

### Using Tailwind Utilities
The design tokens are mapped to Tailwind CSS utilities:

```jsx
// Background colors
<div className="bg-primary">Primary background</div>
<div className="bg-surface">Surface background</div>
<div className="bg-surface-hover">Surface hover</div>

// Text colors
<p className="text">Primary text</p>
<p className="text-secondary">Secondary text</p>
<p className="text-muted">Muted text</p>

// Border colors
<div className="border border">Default border</div>
<div className="border border-light">Light border</div>
```

### Using CSS Variables Directly
```css
.custom-component {
  background-color: var(--color-primary);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  padding: var(--spacing-md);
  border-radius: var(--radius-lg);
  font-family: var(--font-sans);
}
```

### Creating Hover States
```css
.button {
  background-color: var(--color-primary);
  transition: background-color var(--transition-normal);
}

.button:hover {
  background-color: var(--color-primary-hover);
}
```

## 🎭 Creating New Themes

### 1. Create Theme File
Create a new CSS file in `src/styles/themes/`:

```css
/* src/styles/themes/my-brand.css */
:root {
  /* Override any design tokens */
  --color-primary: #ff6b6b;
  --color-secondary: #4ecdc4;
  --color-background: #2c3e50;
  /* ... other tokens */
}
```

### 2. Apply Theme
To use the theme, import it in your CSS:

```css
/* globals.css */
@import '../styles/themes/my-brand.css';
```

Or load it dynamically:
```javascript
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = '/styles/themes/my-brand.css';
document.head.appendChild(link);
```

## 🔄 Dynamic Theme Switching

The project includes a `ThemeSwitcher` component for development that demonstrates dynamic theme loading:

```jsx
import ThemeSwitcher from '@/components/theming/ThemeSwitcher';

// The component is only shown in development mode
{process.env.NODE_ENV === 'development' && <ThemeSwitcher />}
```

### Implementation Details
The theme switcher:
1. Stores theme preference in localStorage
2. Dynamically loads CSS files
3. Applies theme classes to document root
4. Preserves theme choice across page reloads

## 🏗 Tailwind Configuration

The project's `tailwind.config.js` maps design tokens to Tailwind utilities:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary)',
          hover: 'var(--color-primary-hover)',
        },
        surface: {
          DEFAULT: 'var(--color-surface)',
          hover: 'var(--color-surface-hover)',
        },
        // ... more mappings
      },
    },
  },
};
```

## 🎯 Best Practices

### 1. Use Semantic Naming
- ✅ `--color-primary` instead of `--color-blue`
- ✅ `--spacing-lg` instead of `--spacing-24px`
- ✅ `--text-secondary` instead of `--text-gray`

### 2. Maintain Consistency
- Always use design tokens instead of hardcoded values
- Test themes across all components
- Ensure sufficient contrast ratios for accessibility

### 3. Theme Inheritance
- Start with default.css as base
- Override only necessary tokens in custom themes
- Maintain the same token structure across themes

### 4. Performance
- Minimize the number of CSS custom property changes
- Use CSS layers for better organization
- Consider CSS-in-JS for complex dynamic theming

## 📱 Example Themes

### Default Theme (Dark)
- Dark background with gray surfaces
- Green primary color (#22c55e)
- High contrast for accessibility

### Corporate Blue Theme
- Slate background with blue accents
- Blue primary color (#2563eb)
- Professional appearance

### Light Modern Theme
- White background with light surfaces
- Purple primary color (#7c3aed)
- Clean, minimal design

## 🚀 Deployment

### Production Considerations
1. Remove ThemeSwitcher component from production builds
2. Choose default theme in globals.css
3. Consider server-side theme preference handling
4. Optimize CSS delivery for performance

### Client Customization
For client projects:
1. Create new theme file with client's brand colors
2. Update globals.css to import client theme
3. Test all components with new theme
4. Deploy with customized branding

## 🔧 Troubleshooting

### Common Issues

**Theme not applying:**
- Check CSS import order in globals.css
- Verify CSS variable names match exactly
- Ensure theme file is in public/styles/themes/ for dynamic loading

**Tailwind utilities not working:**
- Verify tailwind.config.js includes token mappings
- Check if CSS variables are defined in :root
- Restart development server after config changes

**Performance issues:**
- Limit CSS custom property animations
- Use transform/opacity for animations when possible
- Consider CSS containment for isolated components

## 📚 Resources

- [CSS Custom Properties (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [Tailwind CSS Configuration](https://tailwindcss.com/docs/configuration)
- [Design Tokens Community Group](https://design-tokens.github.io/community-group/)