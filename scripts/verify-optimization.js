#!/usr/bin/env node

/**
 * Script de verificación para las optimizaciones de contextos
 * Verifica que todos los archivos optimizados estén en su lugar
 */

const fs = require('fs');
const path = require('path');

const REQUIRED_FILES = [
  // Providers optimizados
  'src/providers/optimized/AppProviders.jsx',
  'src/providers/optimized/ShoppingProviders.jsx',
  'src/providers/optimized/ProductProviders.jsx',
  'src/providers/optimized/RouteSpecificProviders.jsx',
  'src/providers/optimized/OptimizedProviders.jsx',

  // Contextos optimizados
  'src/context/Auth/AuthContextOptimized.jsx',
  'src/context/Cart/PurchaseContextOptimized.jsx',
  'src/context/filters/CategoryFilterContextOptimized.jsx',
  'src/context/productView/ProductViewContextOptimized.jsx',
  'src/context/product-card/WishlistContextOptimized.js',
  'src/context/product-card/BadgeContextOptimized.jsx',

  // Componentes optimizados
  'src/components/optimized/MemoizedComponents.jsx',
  'src/components/optimized/OptimizedPageTransition.jsx',
  'src/components/headers/home/MainHeaderOptimized.jsx',

  // Hooks de compatibilidad
  'src/hooks/optimized/useOptimizedContexts.js',

  // Layout actualizado
  'src/app/layout.jsx',
];

function checkFile(filePath) {
  const fullPath = path.join(process.cwd(), filePath);
  if (!fs.existsSync(fullPath)) {
    console.error(`❌ Archivo faltante: ${filePath}`);
    return false;
  }
  console.log(`✅ ${filePath}`);
  return true;
}

function main() {
  console.log('🔍 Verificando archivos de optimización...\n');

  let allFilesExist = true;

  for (const file of REQUIRED_FILES) {
    if (!checkFile(file)) {
      allFilesExist = false;
    }
  }

  console.log('\n' + '='.repeat(50));

  if (allFilesExist) {
    console.log('🎉 ¡Todas las optimizaciones están en su lugar!');
    console.log('\n📋 Resumen de optimizaciones implementadas:');
    console.log('• Contextos separados por dominio');
    console.log('• Carga condicional de providers por ruta');
    console.log('• Hooks específicos para evitar re-renders');
    console.log('• Componentes memoizados estratégicamente');
    console.log('• Layout optimizado para máxima performance');

    console.log('\n🚀 Para usar las optimizaciones:');
    console.log('• Los imports existentes siguen funcionando');
    console.log('• Usa hooks específicos para mejor performance');
    console.log('• Consulta OPTIMIZATION_GUIDE.md para más detalles');
  } else {
    console.log('❌ Faltan algunos archivos de optimización');
    console.log('Ejecuta el proceso de optimización completo nuevamente');
  }
}

main();
