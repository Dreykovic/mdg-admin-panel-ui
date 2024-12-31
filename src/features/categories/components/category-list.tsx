import { useCallback, useState } from 'react';
import CategoryCard from './category-card';
import { ProductCategory } from '@/types/entity';
import CategoryEditForm from './edit-form';
import DeletionConfirmModal from '@/components/ui/deletion-confirm-modal';
import { useDeleteCategoryMutation } from '../store/api';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { showAlert } from '@/components/ui/alerts/alert-slice';
import NoDataComponents from '@/components/ui/no-data';

interface ICategoryList {
  categories: Partial<ProductCategory>[];
}

const CategoryList = ({ categories }: ICategoryList) => {
  // console.log('categories', categories);
  const [updateInitialValues, setUpdateInitialValues] =
    useState<Partial<ProductCategory>>();
  const [showDeleteItemModal, setShowDeleteItemModal] = useState(false);

  const handleDeleteItemModalClose = () => setShowDeleteItemModal(false);
  const handleDeleteItemModalShow = () => setShowDeleteItemModal(true);
  const [showEditCategoryModal, setShowEditCategoryModal] = useState(false);

  const handleEditCategoryModalClose = () => setShowEditCategoryModal(false);
  const handleEditCategoryModalShow = () => setShowEditCategoryModal(true);
  const [categoryId, setCategoryId] = useState<number>();
  const dispatch = useDispatch<AppDispatch>();

  const [deleteCategory, { isLoading }] = useDeleteCategoryMutation();

  const handleDeletion = useCallback(async () => {
    try {
      if (categoryId) {
        const response = await deleteCategory({
          id: categoryId,
        }).unwrap();
        console.log(response);

        if (response.success) {
          dispatch(
            showAlert({
              title: 'Succès !',
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
          title: 'Erreur !',
          message: 'An error occurred during deletion' + JSON.stringify(error),
          success: false,
        }),
      );
    } finally {
      handleDeleteItemModalClose();
    }
  }, [categoryId]);
  return (
    <>
      <div className="row g-3 gy-5 py-3 row-deck">
        {categories.length > 0 ? (
          categories.map((category, index) => (
            <CategoryCard
              key={category.id ?? index++}
              category={category}
              setCategoryId={setCategoryId}
              handleDeleteItemModalShow={handleDeleteItemModalShow}
              handleEditCategoryModalShow={handleEditCategoryModalShow}
              setUpdateInitialValues={setUpdateInitialValues}
            />
          ))
        ) : (
          <>
            <NoDataComponents />
          </>
        )}
      </div>
      <CategoryEditForm
        show={showEditCategoryModal}
        handleClose={handleEditCategoryModalClose}
        initialValues={updateInitialValues as Partial<ProductCategory>}
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

export default CategoryList;
