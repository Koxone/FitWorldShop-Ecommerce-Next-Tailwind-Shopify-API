import { usePathname } from 'next/navigation';
import ShopifyProductCard from '../../cards/shopify/ShopifyProductCard';
import FilterButtonsHomeRopa from '@/components/buttons/filter/FilterButtonsHomeRopa';
import FilterButtonsHomeSuplementos from '@/components/buttons/filter/FilterButtonsHomeSuplementos';
import RevealOnScroll from '@/Styles/RevealOnScroll';

function HomeProductCardsContainer({
  title1,
  title2,
  subtitle1,
  subtitle2,
  viewScope1,
  viewScope2,
}) {
  const pathname = usePathname();

  return (
    <div className={`${pathname === '/' ? 'px-4' : 'px-0'}`}>
      <div className="flex flex-col gap-6">
        <RevealOnScroll>
          <div className="flex flex-col gap-4">
            <div className="animate-fade-in text-left">
              <h2 className="text-lg font-bold tracking-wider text-neutral-400 uppercase">
                {subtitle2}
              </h2>
              <h2 className="mb-4 text-2xl font-bold tracking-wider text-white uppercase">
                {title2}
              </h2>
            </div>
            <FilterButtonsHomeSuplementos viewScope={viewScope2} />
            <ShopifyProductCard viewScope={viewScope2} />
          </div>
        </RevealOnScroll>
        <RevealOnScroll>
          <div className="flex flex-col gap-4">
            <div className="animate-fade-in text-left">
              <h2 className="text-lg font-bold tracking-wider text-neutral-400 uppercase">
                {subtitle1}
              </h2>
              <h2 className="mb-4 text-2xl font-bold tracking-wider text-white uppercase">
                {title1}
              </h2>
            </div>
            <FilterButtonsHomeRopa viewScope={viewScope1} />
            <ShopifyProductCard viewScope={viewScope1} />
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
}

export default HomeProductCardsContainer;
