import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function useShopifyProducts() {
  const { data, error, isLoading } = useSWR('/api/products', fetcher);

  const products = data?.edges?.map((edge) => edge.node) || [];

  return {
    products,
    isLoading,
    isError: error,
  };
}
