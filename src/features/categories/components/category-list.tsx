import { useState } from 'react';
import CategoryCard from './category-card';
import { ProductCategory } from '@/types/entity';
import CategoryEditForm from './edit-form';

interface ICategoryList {
  categories: Partial<ProductCategory>[];
}

const CategoryList = ({ categories }: ICategoryList) => {
  // console.log('categories', categories);
  const [updateInitialValues, setUpdateInitialValues] =
    useState<Partial<ProductCategory>>();
  const [showEditCategoryModal, setShowEditCategoryModal] = useState(false);

  const handleEditCategoryModalClose = () => setShowEditCategoryModal(false);
  const handleEditCategoryModalShow = () => setShowEditCategoryModal(true);
  return (
    <>
      <div className="row g-3 gy-5 py-3 row-deck">
        {categories.map((category, index) => (
          <CategoryCard
            key={category.id ?? index++}
            category={category}
            handleEditCategoryModalShow={handleEditCategoryModalShow}
            setUpdateInitialValues={setUpdateInitialValues}
          />
        ))}
      </div>
      <CategoryEditForm
        show={showEditCategoryModal}
        handleClose={handleEditCategoryModalClose}
        initialValues={updateInitialValues as Partial<ProductCategory>}
      />
    </>
  );
};

export default CategoryList;
