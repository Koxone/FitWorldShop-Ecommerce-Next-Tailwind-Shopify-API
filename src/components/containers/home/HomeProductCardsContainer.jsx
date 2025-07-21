import { usePathname } from 'next/navigation';
import { useState } from 'react';
import GenderFilterButton from '../../buttons/filter/GenderFilterButton';
import ShopifyProductCard from '../../cards/shopify/ShopifyProductCard';

function HomeProductCardsContainer({ title, subtitle, filterType = 'gender' }) {
  const pathname = usePathname();

  const genderOptions = ['Todos', 'Mujer', 'Hombre'];
  const categoryOptions = ['Vitaminas', 'Suplementos'];

  const options = filterType === 'gender' ? genderOptions : categoryOptions;

  const [selectedCategory, setSelectedCategory] = useState(
    filterType === 'category' ? 'Vitaminas' : null
  );

  return (
    <div className={`${pathname === '/' ? 'px-4' : 'px-0'}`}>
      <div className="animate-fade-in text-left">
        <h2 className="text-lg font-bold tracking-wider text-neutral-400 uppercase">
          {subtitle}
        </h2>
        <h2 className="mb-4 text-2xl font-bold tracking-wider text-white uppercase">
          {title}
        </h2>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex gap-2">
          {options.map((text) => (
            <GenderFilterButton
              key={text}
              text={text}
              isActive={selectedCategory === text}
              onClick={() =>
                setSelectedCategory(text === 'Todos' ? null : text)
              }
            />
          ))}
        </div>

        <ShopifyProductCard selectedCategory={selectedCategory} />
      </div>
    </div>
  );
}

export default HomeProductCardsContainer;
