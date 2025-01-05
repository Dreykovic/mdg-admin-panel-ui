import { Recipe } from '@/types/entity';

import * as Icon from 'react-bootstrap-icons';

interface IRecipeProps {
  recipe: Partial<Recipe>;
}
const RecipeCard = ({ recipe }: IRecipeProps) => {
  return (
    <>
      <div className="col">
        <div className="card teacher-card">
          <div className="card-body  d-flex">
            <div className="profile-av pe-xl-4 pe-md-2 pe-sm-4 pe-4 text-center w220">
              <Icon.Person className="avatar xl img-thumbnail shadow-sm" />
              <h6 className="mb-0 fw-bold d-block fs-6 mt-2">{``}</h6>
            </div>

            <div className="teacher-info border-start ps-xl-4 ps-md-3 ps-sm-4 ps-4 w-100">
              <h6 className="mb-0 mt-2  fw-bold d-block fs-6">{recipe.name}</h6>
              <span className="py-1 fw-bold small-11 mb-0 mt-1 text-muted">
                {`Created By ${recipe.author?.username}`}
              </span>
              <div className="video-setting-icon mt-3 pt-3 border-top">
                <p>{recipe.description}</p>
              </div>
              <div className="d-flex flex-wrap align-items-center ct-btn-set">
                <a href="chat.html" className="btn btn-dark btn-sm mt-1 me-1">
                  <i className="icofont-ui-text-chat me-2 fs-6"></i>Chat
                </a>
                <a href="profile.html" className="btn btn-dark btn-sm mt-1">
                  <i className="icofont-invisible me-2 fs-6"></i>Profile
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipeCard;
