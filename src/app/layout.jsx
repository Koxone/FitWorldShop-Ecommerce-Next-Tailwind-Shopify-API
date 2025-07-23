

import '@/app/globals.css';
import { SpeedInsights } from '@vercel/speed-insights/next';
import I18nProvider from '@/providers/I18nProvider';
import PageTransitionWrapper from '@/components/wrappers/PageTransitionWrapper';
import MainHeader from '@/components/headers/home/MainHeader';
import { ImageSourceProvider } from '@/context/general/ImageSourceContext';
import Footer from '@/components/footers/desktop/Footer';
import { WishlistProvider } from '@/context/product-card/WishlistContext';
import { BadgeProvider } from '@/context/product-card/BadgeContext';
import { CategoryFilterProvider } from '@/context/filters/CategoryFilterContext';
import { ProductViewProvider } from '@/context/productView/ProductViewContext';
import SplashScreen from '@/components/PWA/Splash';
import BottomNavBar from '@/components/footers/mobile/BottomNavBar';
import { PurchaseProvider } from '@/context/Cart/PurchaseContext';
import Cart from '@/components/cart/Cart';
import { AuthProvider } from '@/context/Auth/AuthContext';
import { ClerkProvider } from '@clerk/nextjs';
import { dark, shadesOfPurple } from '@clerk/themes';
import { esES } from '@clerk/localizations'

export const metadata = {
  title: {
    default: 'FitWorld Shop',
    template: '%s | FitWorld Shop',
  },
  description:
    'Tienda en línea moderna y responsiva especializada en vitaminas, suplementos y ropa deportiva. Descubre productos de calidad para tu salud, rendimiento y estilo de vida activo en FitWorld Shop.',
  keywords: [
    'vitaminas',
    'suplementos',
    'ropa deportiva',
    'ropa de gimnasio',
    'creatina',
    'proteína',
    'quemadores de grasa',
    'tienda fitness',
    'tienda online',
    'ecommerce méxico',
    'shopify méxico',
    'next.js tienda',
    'tailwind css ecommerce',
    'ropa activa para hombre y mujer',
  ],
  metadataBase: new URL('https://fitworldshop.koxland.dev'),
  openGraph: {
    title: 'FitWorld Shop',
    description:
      'Explora vitaminas, suplementos de alto rendimiento y ropa deportiva en FitWorld Shop. Vive una experiencia moderna, rápida y enfocada en tu bienestar.',
    url: 'https://fitworldshop.koxland.dev',
    siteName: 'FitWorld Shop',
    images: [
      {
        url: 'https://fitworldshop.koxland.dev/og-image.png',
        width: 1200,
        height: 630,
        alt: 'FitWorld Shop - Vitaminas, suplementos y ropa deportiva premium',
      },
    ],
    locale: 'es_MX',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      maxVideoPreview: -1,
      maxImagePreview: 'large',
      maxSnippet: -1,
    },
  },
  authors: [{ name: 'Kox', url: 'https://github.com/Koxone' }],
  creator: 'Kox',
  publisher: 'FitWorld Shop',
  alternates: {
    canonical: 'https://fitworldshop.koxland.dev',
    languages: {
      'es-MX': 'https://fitworldshop.koxland.dev',
      'en-US': 'https://fitworldshop.koxland.dev/en',
    },
  },
  category: 'ecommerce',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon.ico',
  },
  manifest: '/site.webmanifest',
};


export default function RootLayout({ children }) {
  // Check if Clerk keys are available
  const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  const hasValidClerkKey = clerkPublishableKey && clerkPublishableKey.startsWith('pk_') && !clerkPublishableKey.includes('dummy');
  
  if (!hasValidClerkKey) {
    console.log('🔧 Rendering without Clerk - using fallback layout');
    // Render without Clerk if keys are not available
    return (
      <html lang="es">
        <body>
          <SplashScreen />
          <AuthProvider>
            <PurchaseProvider>
              <CategoryFilterProvider>
                <ProductViewProvider>
                  <WishlistProvider>
                    <BadgeProvider>
                      <ImageSourceProvider>
                        <I18nProvider>
                          <MainHeader />
                          <PageTransitionWrapper>
                            {children}
                          </PageTransitionWrapper>
                          <Footer />
                          <BottomNavBar />
                          <Cart />
                        </I18nProvider>
                        <SpeedInsights />
                      </ImageSourceProvider>
                    </BadgeProvider>
                  </WishlistProvider>
                </ProductViewProvider>
              </CategoryFilterProvider>
            </PurchaseProvider>
          </AuthProvider>
        </body>
      </html>
    );
  }

  return (
    <ClerkProvider
      localization={esES}
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: '#22c55e',
          colorBackground: '#0f172a',
          colorText: '#ffffff',
          borderRadius: '0.5rem',
        },
      }}
    >
      <html lang="es">
        <body>
          <SplashScreen />
          <AuthProvider>
            <PurchaseProvider>
              <CategoryFilterProvider>
                <ProductViewProvider>
                  <WishlistProvider>
                    <BadgeProvider>
                      <ImageSourceProvider>
                        <I18nProvider>
                          <MainHeader />
                          <PageTransitionWrapper>
                            {children}
                          </PageTransitionWrapper>
                          <Footer />
                          <BottomNavBar />
                          <Cart />
                        </I18nProvider>
                        <SpeedInsights />
                      </ImageSourceProvider>
                    </BadgeProvider>
                  </WishlistProvider>
                </ProductViewProvider>
              </CategoryFilterProvider>
            </PurchaseProvider>
          </AuthProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
