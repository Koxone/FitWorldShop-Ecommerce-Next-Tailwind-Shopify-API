'use client';

import { useCategoryFilter } from '@/components/shopify/context/CategoryFilterContext';
import ShopifyProductCard from '@/components/shopify/ShopifyProductCard';
import { useState } from 'react';

export default function ProductsView() {
  const { setCategory, currentCategory, categoryLabels } = useCategoryFilter();
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => setShowMore((prev) => !prev);

  return (
    <div className="grid min-h-screen grid-cols-[auto_1fr] overflow-x-hidden bg-gray-900 py-8 text-white sm:px-6 lg:px-8">
      {/* Sidebar Desktop */}
      <aside className="sticky top-0 hidden h-fit w-full max-w-[220px] flex-col overflow-y-auto rounded-lg border border-neutral-600 bg-[#0b1320] p-4 pr-4 text-white md:flex">
        {/* Categoría */}
        <div className="mb-6">
          <h3 className="mb-2 text-sm font-semibold text-neutral-300">
            Categoría
          </h3>
          <div className="flex flex-col gap-2">
            {categoryLabels.slice(0, 5).map((label) => (
              <button
                key={label}
                onClick={() => setCategory(label)}
                className={`w-full cursor-pointer rounded px-3 py-1 text-left text-sm capitalize transition ${
                  currentCategory === label
                    ? 'bg-neutral-700 text-white'
                    : 'text-neutral-400 hover:bg-neutral-800'
                }`}
              >
                {label}
              </button>
            ))}

            {showMore &&
              categoryLabels.slice(5).map((label) => (
                <button
                  key={label}
                  onClick={() => setCategory(label)}
                  className={`w-full cursor-pointer rounded px-3 py-1 text-left text-sm capitalize transition ${
                    currentCategory === label
                      ? 'bg-neutral-700 text-white'
                      : 'text-neutral-400 hover:bg-neutral-800'
                  }`}
                >
                  {label}
                </button>
              ))}

            {categoryLabels.length > 5 && (
              <button
                onClick={toggleShowMore}
                className="mt-2 text-left text-sm text-white underline hover:text-neutral-300"
              >
                {showMore ? 'Ver menos' : 'Ver más'}
              </button>
            )}
          </div>
        </div>

        {/* Filtros rápidos */}
        <div className="mb-6">
          <h3 className="mb-2 text-sm font-semibold text-neutral-300">
            Filtros rápidos
          </h3>
          <div className="flex flex-col gap-2 text-sm text-neutral-400">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-neutral-600" />
              En oferta
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-neutral-600" />
              Novedades
            </label>
          </div>
        </div>

        {/* Precio */}
        <div className="mb-6">
          <h3 className="mb-2 text-sm font-semibold text-neutral-300">
            Precio
          </h3>
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="0"
              onChange={(e) => setMinPrice(Number(e.target.value))}
              className="w-1/2 rounded border border-neutral-600 bg-neutral-800 px-2 py-1 text-xs text-neutral-300 placeholder-neutral-500"
            />
            <input
              type="number"
              placeholder="Max"
              onChange={(e) =>
                setMaxPrice(
                  e.target.value === '' ? Infinity : Number(e.target.value)
                )
              }
              className="w-1/2 rounded border border-neutral-600 bg-neutral-800 px-2 py-1 text-xs text-neutral-300 placeholder-neutral-500"
            />
          </div>
        </div>

        {/* Calificación mínima */}
        <div className="mb-6">
          <h3 className="mb-2 text-sm font-semibold text-neutral-300">
            Calificación mínima
          </h3>
          <input
            type="range"
            min={0}
            max={5}
            step={0.5}
            onChange={(e) => setMinRating(Number(e.target.value))}
            className="w-full accent-neutral-600"
          />
          <div className="mt-1 text-xs text-neutral-400">★ 0 o más</div>
        </div>

        {/* Ordenar por */}
        <div className="mb-6">
          <h3 className="mb-2 text-sm font-semibold text-neutral-300">
            Ordenar por
          </h3>
          <div className="flex flex-col gap-1">
            {[
              'Destacados',
              'Novedades',
              'Precio: Menor a mayor',
              'Precio: Mayor a menor',
              'Mejor calificados',
            ].map((label, idx) => (
              <button
                key={idx}
                className={`w-full cursor-pointer rounded px-3 py-1 text-left text-sm transition ${
                  idx === 0
                    ? 'bg-neutral-700 text-white'
                    : 'text-neutral-400 hover:bg-neutral-800'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Colores */}
        <div className="mb-6">
          <h3 className="mb-2 text-sm font-semibold text-neutral-300">
            Colores
          </h3>
          <div className="flex flex-wrap gap-2">
            {[
              '#000000',
              '#fff',
              '#f87171',
              '#fbbf24',
              '#34d399',
              '#60a5fa',
              '#a78bfa',
              '#ec4899',
              '#facc15',
            ].map((color, i) => (
              <div
                key={i}
                className="h-6 w-6 cursor-pointer rounded border border-neutral-500"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        {/* Tallas */}
        <div>
          <h3 className="mb-2 text-sm font-semibold text-neutral-300">
            Tallas
          </h3>
          <div className="flex flex-wrap gap-2">
            {['XXS', 'XS', 'S', 'M', 'L'].map((size) => (
              <button
                key={size}
                className="rounded border border-neutral-600 px-2 py-1 text-xs text-neutral-400 transition hover:bg-neutral-800"
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="mx-auto w-full max-w-7xl">
        {/* Heading */}
        <div className="px-3 md:px-10">
          <h1 className="font-montserrat mb-2 text-2xl font-bold uppercase md:text-3xl">
            todos los productos
          </h1>
          <p className="font-inter mb-6 text-gray-400">
            Descubre nuestra coleccion completa de Ropa y Accesorios.
          </p>
        </div>

        {/* Products Cards */}
        <div>
          <ShopifyProductCard />
        </div>
      </div>
    </div>
  );
}
