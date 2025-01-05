import GeneralInfo from './general-info';
import { IRecipeProps } from '../../types';
import RecipeSteps from './recipe-steps';
import RecipeIngredients from './recipe-ingredients';

const RecipeDetails = ({ recipe }: IRecipeProps) => {
  return (
    <>
      <div className="row g-3">
        <div className="col-md-12">
          <div className="card border-0 mb-4 no-bg">
            <div className="card-header py-3 px-0 d-flex align-items-center  justify-content-between border-bottom">
              <h3 className=" fw-bold flex-fill mb-0">Recipe Details</h3>
            </div>
          </div>
        </div>
        <div className="col-xl-8 col-lg-12 col-md-12">
          <GeneralInfo recipe={recipe} />
          <div className="row g-3 row-deck">
            <RecipeIngredients recipe={recipe} />
          </div>
        </div>
        <div className="col-xl-4 col-lg-12 col-md-12">
          <RecipeSteps recipe={recipe} />
        </div>
      </div>
    </>
  );
};

export default RecipeDetails;
