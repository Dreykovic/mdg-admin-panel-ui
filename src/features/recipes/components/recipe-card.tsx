import { Link } from 'react-router-dom';

import { authRoutes } from '@/routes';
import { Recipe } from '@/types/entity';

interface IRecipeProps {
  recipe: Partial<Recipe>;
}
const RecipeCard = ({ recipe }: IRecipeProps) => {
  return (
    <>
      <div className="col">
        <div className="card teacher-card shadow">
          <div className="card-body  d-flex">
            <div className="profile-av pe-xl-4 pe-md-2 pe-sm-4 pe-4 text-center w220">
              <div
                className="bg-secondary d-flex justify-content-center align-items-center rounded"
                style={{
                  width: '100%',
                  height: '200px', // Définissez une hauteur par défaut
                  maxWidth: '400px', // Largeur maximale pour un rendu propre
                  margin: 'auto', // Centre horizontalement dans les conteneurs
                }}
              >
                <i
                  className="icofont-culinary xl shadow-sm"
                  style={{
                    fontSize: '7rem', // Taille de l'icône
                    color: '#fff', // Couleur blanche pour contraste
                  }}
                ></i>
              </div>
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
                <Link
                  to={authRoutes.recipeEdit.path}
                  state={recipe}
                  className="btn btn-dark btn-sm mt-1"
                >
                  <i className="icofont-invisible me-2 fs-6"></i>Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipeCard;
