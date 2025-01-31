import { Recipe } from '@/types/entity';
type Props = {
  recipe: Recipe;
};
const GeneralInfo = ({ recipe }: Props) => {
  return (
    <>
      <div className="card teacher-card  mb-3 shadow">
        <div className="card-body  d-flex teacher-fulldeatil">
          <div className="profile-teacher pe-xl-4 pe-md-2 pe-sm-4 pe-0 text-center w220 mx-sm-0 mx-auto">
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
            <div className="about-info d-flex align-items-center mt-3 justify-content-center flex-column">
              <span className="text-muted small">{`Difficulty : ${recipe.difficulty?.toLowerCase()}`}</span>
            </div>
          </div>
          <div className="teacher-info border-start ps-xl-4 ps-md-3 ps-sm-4 ps-4 w-100">
            <h6 className="mb-0 mt-2  fw-bold d-block fs-6">{recipe.name}</h6>
            <span className="py-1 fw-bold small-11 mb-0 mt-1 text-muted">
              {`Created By ${recipe.author?.username}`}
            </span>
            <p className="mt-2 small">{recipe.description}</p>
            <div className="row g-2 pt-2">
              <div className="col-xl-5">
                <div className="d-flex align-items-center">
                  <i className="icofont-ui-clock p-1"> Cooking TIme :</i>
                  <span className="ms-2 small">{recipe.cookingTime}</span>
                </div>
              </div>
              <div className="col-xl-5">
                <div className="d-flex align-items-center">
                  <i className="icofont-ui-clock p-1"> Preparation TIme :</i>
                  <span className="ms-2 small">{recipe.preparationTime}</span>
                </div>
              </div>
              <div className="col-xl-5">
                <div className="d-flex align-items-center">
                  <i className="icofont-users p-1"> Servings :</i>
                  <span className="ms-2 small">{recipe.servings}</span>
                </div>
              </div>
              <div className="col-xl-5">
                <div className="d-flex align-items-center">
                  <i className="icofont-flag p-1"> State :</i>
                  <span className="ms-2 small">
                    {recipe.isApproved ? 'Approved' : 'Not  Approved'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GeneralInfo;
