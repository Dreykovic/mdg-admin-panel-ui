import { Recipe } from '@/types/entity';

import RecipeCard from './recipe-card';
import NoCardData from '@/components/ui/no-data/no-card-data';

interface IRecipeListProps {
  recipes: Partial<Recipe>[];
}

const RecipeList = ({ recipes }: IRecipeListProps) => {
  return (
    <>
      <div className="row g-3 row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2 row-cols-xl-2 row-cols-xxl-2 row-deck py-1 pb-4">
        {recipes.length > 0 ? (
          recipes.map((recipe, index) => (
            <RecipeCard recipe={recipe} key={index} />
          ))
        ) : (
          <>
            <NoCardData />
          </>
        )}
      </div>
    </>
  );
};

export default RecipeList;
