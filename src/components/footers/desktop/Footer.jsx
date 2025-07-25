'use client';

import LogoButton from '../../buttons/header/LogoButton';

const Footer = () => {
  return (
    <footer className="hidden border-t border-gray-700 bg-gray-800 lg:block">
      {/* Main Footer Content */}
      <div className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Company Info */}
            <div className="space-y-4">
              <LogoButton />
              <p className="text-sm text-gray-400">
                Ropa deportiva premium diseñada para quienes exigen excelencia
                en cada aspecto de su viaje fitness.
              </p>
              {/* Social Media */}
              <div className="flex gap-4">
                {['instagram', 'tiktok', 'whatsapp'].map((platform, idx) => (
                  <a
                    key={idx}
                    href={
                      platform === 'instagram'
                        ? 'https://www.instagram.com/fitworldshop/'
                        : platform === 'tiktok'
                          ? 'https://www.tiktok.com/@fitworldshop1'
                          : 'https://wa.me/5215582525125'
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-12 w-12 items-center justify-center transition-colors duration-200 hover:opacity-80"
                  >
                    <img
                      src={`/${platform}.svg`}
                      alt={platform}
                      className="h-full w-full object-contain"
                    />
                  </a>
                ))}
              </div>
            </div>

            {/* Shop Links */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-white">
                Nuestras Marcas
              </h2>
              <ul className="space-y-2">
                {[
                  {
                    label: 'Perfumes Arabes',
                    href: 'https://www.etereah.com/',
                  },
                  {
                    label: 'Ropa Deportiva',
                    href: 'https://www.fitworldshop.com.mx/',
                  },
                  {
                    label: 'Desarrollo Web',
                    href: 'https://koxland.dev/',
                  },
                ].map((item, idx) => (
                  <li key={idx}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 transition-colors duration-200 hover:text-white"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-white">
                Atencion al Cliente
              </h2>
              <ul className="space-y-2">
                {['Contactanos', 'Envio', 'Cambios y Devoluciones'].map(
                  (item, idx) => (
                    <li key={idx}>
                      <a
                        href="#"
                        className="text-gray-400 transition-colors duration-200 hover:text-white"
                      >
                        {item}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Company Links */}
            {/* <div className="space-y-4">
              <h2 className="text-lg font-semibold text-white">Company</h2>
              <ul className="space-y-2">
                {[
                  'About Us',
                  'FitWorld Shop',
                  'Careers',
                  'Press',
                  'Sustainability',
                  'Affiliate Program',
                ].map((item, idx) => (
                  <li key={idx}>
                    <a
                      href="#"
                      className="text-gray-400 transition-colors duration-200 hover:text-white"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div> */}
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700 py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            {/* Copyright */}
            <div className="text-sm text-gray-400">
              © 2025 FitWorld Shop. All rights reserved.
            </div>

            {/* Legal Links */}
            <div className="flex space-x-6">
              <div className="text-sm text-gray-400">
                © Developed by{' '}
                <a
                  href="https://koxland.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Koxland.Inc
                </a>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-400">Metodos de Pago:</span>
              <div className="flex space-x-2">
                {[
                  { src: '/visa.svg', alt: 'Visa' },
                  { src: '/amex.svg', alt: 'American Express' },
                  { src: '/mastercard.svg', alt: 'Mastercard' },
                  { src: '/paypal.svg', alt: 'PayPal' },
                ].map((method, idx) => (
                  <div
                    key={idx}
                    className="flex h-5 w-8 items-center justify-center rounded"
                  >
                    <img
                      src={method.src}
                      alt={method.alt}
                      className="h-8 w-auto object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
