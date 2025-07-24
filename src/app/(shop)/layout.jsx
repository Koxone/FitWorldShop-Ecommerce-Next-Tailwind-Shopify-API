import ProductContextProvider from '@/providers/ProductContextProvider';

export default function ShopLayout({ children }) {
  return (
    <ProductContextProvider>
      {children}
    </ProductContextProvider>
  );
}