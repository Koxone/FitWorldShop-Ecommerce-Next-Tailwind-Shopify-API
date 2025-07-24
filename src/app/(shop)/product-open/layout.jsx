import ProductDetailProvider from '@/providers/ProductDetailProvider';

export default function ProductOpenLayout({ children }) {
  return (
    <ProductDetailProvider>
      {children}
    </ProductDetailProvider>
  );
}