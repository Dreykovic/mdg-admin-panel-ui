import { Recipe } from '@/types/entity';

import RecipeDeleteBlock from './delete';
import RecipeVisibilityBlock from './visibility';

type Props = {
  recipe: Recipe;
};
const RecipeStateCard = ({ recipe }: Props) => {
  return (
    <>
      <div className="card border-danger">
        <div className="card-body">
          <h6 className="fw-bold mb-3 text-danger">Danger Zone</h6>
          <div className="flex-grow-1">
            <RecipeVisibilityBlock recipe={recipe} />
            <RecipeDeleteBlock recipe={recipe} />
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipeStateCard;
