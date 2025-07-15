import GenderFilterButton from '../buttons/filter/GenderFilterButton';
import ShopifyProductCard from '../shopify/ShopifyProductCard';

function HomeProductCardsContainer({ title, subtitle }) {
  return (
    <div>
      <div className="animate-fade-in text-left">
        <h2 className="text-lg uppercase font-bold tracking-wider text-neutral-400">
          {subtitle}
        </h2>
        <h2 className="mb-4 uppercase text-2xl font-bold tracking-wider text-white ">
          {title}
        </h2>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex gap-2">
          <GenderFilterButton text="Todos" />
          <GenderFilterButton text="Mujer" />
          <GenderFilterButton text="Hombre" />
        </div>
        <ShopifyProductCard />
      </div>
    </div>
  );
}

export default HomeProductCardsContainer;
