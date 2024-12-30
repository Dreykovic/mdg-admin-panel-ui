import CategoryCard from './category-card';
import { ProductCategory } from '@/types/entity';

interface ICategoryList {
  categories: Partial<ProductCategory>[];
}

const CategoryList = ({ categories }: ICategoryList) => {
  console.log('categories', categories);

  return (
    <>
      <div className="row g-3 gy-5 py-3 row-deck">
        {categories.map((category, index) => (
          <CategoryCard key={category.id ?? index++} />
        ))}
      </div>
    </>
  );
};

export default CategoryList;
