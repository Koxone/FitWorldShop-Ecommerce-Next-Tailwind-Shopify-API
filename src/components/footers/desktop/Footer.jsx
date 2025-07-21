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
              <h2 className="text-lg font-semibold text-white">Shop</h2>
              <ul className="space-y-2">
                {[
                  "Women's",
                  "Men's",
                  'Accessories',
                  'All Products',
                  'Sale',
                  'New Arrivals',
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
            </div>

            {/* Support Links */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-white">Support</h2>
              <ul className="space-y-2">
                {[
                  'Contact Us',
                  'Size Guide',
                  'Shipping Info',
                  'Returns & Exchanges',
                  'FAQ',
                  'Track Your Order',
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
            </div>

            {/* Company Links */}
            <div className="space-y-4">
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
            </div>
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
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(
                (item, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="text-sm text-gray-400 transition-colors duration-200 hover:text-white"
                  >
                    {item}
                  </a>
                )
              )}
            </div>

            {/* Payment Methods */}
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-400">We accept:</span>
              <div className="flex space-x-2">
                {['VISA', 'MC', 'PP', '🍎'].map((method, idx) => (
                  <div
                    key={idx}
                    className={`flex h-5 w-8 items-center justify-center rounded text-xs font-bold text-white ${
                      method === 'VISA'
                        ? 'bg-blue-600'
                        : method === 'MC'
                          ? 'bg-red-600'
                          : method === 'PP'
                            ? 'bg-blue-500'
                            : 'bg-black'
                    }`}
                  >
                    {method}
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
