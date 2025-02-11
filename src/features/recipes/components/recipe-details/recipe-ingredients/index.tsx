import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import { showAlert } from '@/components/ui/alerts/alert-slice';
import DeletionConfirmModal from '@/components/ui/deletion-confirm-modal';
import CardLoading from '@/components/ui/loading/card-loading';
import NoCardData from '@/components/ui/no-data/no-card-data';
import {
  useDeleteIngredientMutation,
  useGetIngredientsQuery,
} from '@/features/recipes/store/ingredient-api';

import { AppDispatch } from '@/store';
import { Ingredient } from '@/types/entity';

import IngredientCreateForm from './add-ingredient';
import IngredientEditForm from './edit-ingredient';
import IngredientItem from './ingredient-item';
type Props = {
  recipeId: number;
};
const RecipeIngredients = ({ recipeId }: Props) => {
  const [showCreateIngredientModal, setShowCreateIngredientModal] =
    useState(false);

  const handleCreateIngredientModalClose = () =>
    setShowCreateIngredientModal(false);
  const handleCreateIngredientModalShow = () =>
    setShowCreateIngredientModal(true);
  // Créer l'objet `filter`
  const filters = { recipeId };
  // Récupération des categories
  const { data: ingredientsResponse, isFetching: isIngredientsFetching } =
    useGetIngredientsQuery(
      { filters: JSON.stringify(filters ?? '') },
      {
        refetchOnMountOrArgChange: false,
      },
    );
  const ingredients = ingredientsResponse?.content.ingredients;

  const [updateInitialValues, setUpdateInitialValues] =
    useState<Partial<Ingredient>>();
  const [showDeleteItemModal, setShowDeleteItemModal] = useState(false);

  const handleDeleteItemModalClose = () => setShowDeleteItemModal(false);
  const handleDeleteItemModalShow = () => setShowDeleteItemModal(true);
  const [showEditSupplierModal, setShowEditSupplierModal] = useState(false);

  const handleEditIngredientModalClose = () => setShowEditSupplierModal(false);
  const handleEditIngredientModalShow = () => setShowEditSupplierModal(true);
  const [marginId, setIngredientId] = useState<number>();
  const dispatch = useDispatch<AppDispatch>();

  const [deleteIngredient, { isLoading }] = useDeleteIngredientMutation();

  const handleDeletion = useCallback(async () => {
    try {
      if (marginId) {
        const response = await deleteIngredient({
          id: marginId,
        }).unwrap();

        if (response.success) {
          dispatch(
            showAlert({
              title: 'Success !',
              message: response.message,
            }),
          );
        }
      } else {
        throw new Error('No data provided');
      }
    } catch (error) {
      console.error(error);

      dispatch(
        showAlert({
          title: 'Error !',
          message: 'An error occurred during deletion' + JSON.stringify(error),
          success: false,
        }),
      );
    } finally {
      handleDeleteItemModalClose();
    }
  }, [marginId, deleteIngredient, dispatch]);
  return (
    <>
      <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6">
        <div className="card shadow">
          <div className="card-header p-3 no-bg bg-transparent d-flex align-items-center justify-content-between border-bottom flex-wrap">
            <h3 className="">Ingredients</h3>
            <div className="d-flex py-2 project-tab flex-wrap w-sm-100">
              <button
                type="button"
                className="btn btn-dark w-sm-100"
                onClick={handleCreateIngredientModalShow}
              >
                <i className="icofont-plus-circle me-2 fs-6"></i>Add
              </button>
            </div>
          </div>
          <div className="card-body">
            {isIngredientsFetching ? (
              <CardLoading number={1} />
            ) : (
              <>
                {ingredients && ingredients.length > 0 ? (
                  <ul className="list-styled mb-0">
                    {ingredients.map((ingredient, index) => (
                      <IngredientItem
                        ingredient={ingredient}
                        key={index}
                        setIngredientId={setIngredientId}
                        handleDeleteItemModalShow={handleDeleteItemModalShow}
                        handleEditIngredientModalShow={
                          handleEditIngredientModalShow
                        }
                        setUpdateInitialValues={setUpdateInitialValues}
                      />
                    ))}
                  </ul>
                ) : (
                  <>
                    <NoCardData text="No Ingredient" />
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <IngredientCreateForm
        show={showCreateIngredientModal}
        handleClose={handleCreateIngredientModalClose}
        recipeId={recipeId}
      />
      <IngredientEditForm
        show={showEditSupplierModal}
        handleClose={handleEditIngredientModalClose}
        initialValues={updateInitialValues as Partial<Ingredient>}
      />
      <DeletionConfirmModal
        show={showDeleteItemModal}
        handleClose={handleDeleteItemModalClose}
        isLoading={isLoading}
        deleteHandler={handleDeletion}
      />
    </>
  );
};

export default RecipeIngredients;
