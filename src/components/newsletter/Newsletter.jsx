import React from 'react';

function NewsLetter() {
  return (
    <div className="bg-gray-900 pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-montserrat mb-4 text-3xl font-bold text-white">
            ENTERATE DE NUESTRAS NOVEDADES!
          </h2>
          <p className="font-inter mx-auto mb-8 max-w-2xl text-gray-400">
            Sé el primero en enterarte de nuevos lanzamientos, ofertas
            exclusivas y contenido detrás de cámaras de FitWorld Shop.
          </p>
          <div className="mx-auto max-w-md">
            <div className="flex flex-col gap-4 sm:flex-row">
              <input
                type="email"
                placeholder="Ingresa tu Email"
                className="font-inter flex-1 rounded-lg border border-gray-600 bg-gray-800 px-4 py-3 text-white placeholder-gray-400 focus:border-transparent focus:ring-2 focus:ring-white focus:outline-none"
              />
              <button className="font-poppins cursor-pointer rounded-lg bg-white px-6 py-3 font-semibold text-gray-900 transition-colors duration-200 hover:bg-gray-100">
                Subscribete
              </button>
            </div>
            <p className="font-inter mt-3 text-xs text-gray-500">
              Al registrarte, aceptas recibir mensajes de marketing
              automatizados recurrentes y recordatorios de carrito de compras.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsLetter;
