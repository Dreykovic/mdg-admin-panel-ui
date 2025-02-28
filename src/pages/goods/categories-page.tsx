import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import CardLoading from '@/components/ui/loading/card-loading';
import CustomPagination from '@/components/ui/pagination';
import ElementShow from '@/components/ui/pagination/element-show';
import PageSizePicker from '@/components/ui/pagination/page-size-picker';
import SearchInput from '@/components/ui/pagination/search-input';
import CategoryCreateForm from '@/features/categories/components/category-create-form';
import CategoryList from '@/features/categories/components/category-list';
import { AppDispatch } from '@/store';
import { useGetSomeCategoriesQuery } from '@/store/base-api-slice';
import { setPageName } from '@/store/page-slice';

const CategoriesPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [showCreateCategoryModal, setShowCreateCategoryModal] = useState(false);

  const handleCreateCategoryModalClose = () =>
    setShowCreateCategoryModal(false);
  const handleCreateCategoryModalShow = () => setShowCreateCategoryModal(true);
  // États locaux pour `pageSize` et `search`
  const [pageSize, setPageSize] = useState(
    parseInt(searchParams.get('pageSize') || '10', 10),
  );
  const [search, setSearch] = useState(
    JSON.parse(searchParams.get('filter') || '{}')?.name || '',
  );

  useEffect(() => {
    dispatch(setPageName({ name: 'category-list', group: 'goods' }));
  }, [dispatch]);

  // Récupérer les paramètres `page` ou définir une valeur par défaut
  const page = parseInt(searchParams.get('page') || '1', 10);

  // Créer l'objet `filter`
  const filters = search ? { name: search } : undefined;

  // Lancer la requête avec les paramètres actuels
  const { data: result, isFetching } = useGetSomeCategoriesQuery(
    { page, pageSize, filters: JSON.stringify(filters ?? '') },
    { refetchOnMountOrArgChange: false },
  );

  const someCategories = result?.content.data;
  const currentPage = result?.content.page;
  const totalElements = result?.content.total; // Nombre total d'éléments

  return (
    <>
      <div className="row align-items-center">
        <div className="border-0 mb-4">
          <div className="card-header p-0 no-bg bg-transparent d-flex align-items-center px-0 justify-content-between border-bottom flex-wrap">
            <h3 className="fw-bold py-3 mb-0">Categories</h3>
            <div className="d-flex py-2 project-tab flex-wrap w-sm-100">
              <button
                type="button"
                className="btn btn-dark w-sm-100"
                onClick={handleCreateCategoryModalShow}
              >
                <i className="icofont-plus-circle me-2 fs-6"></i>Create Category
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row align-items-center">
        <div className="border-0 mb-4">
          <div className="card-header p-0 no-bg bg-transparent d-flex align-items-center px-0 justify-content-between border-bottom flex-wrap">
            <PageSizePicker
              pageSize={pageSize}
              setSearchParams={setSearchParams}
              setPageSize={setPageSize}
            />
            <SearchInput search={search} setSearch={setSearch} />
          </div>
        </div>
      </div>
      {isFetching ? (
        <CardLoading number={4} />
      ) : (
        <>
          <CategoryList categories={someCategories ?? []} />
        </>
      )}
      <div className="d-flex justify-content-between align-items-center">
        <ElementShow
          length={someCategories?.length as number}
          totalElements={totalElements as number}
        />
        <CustomPagination
          totalElements={totalElements as number}
          pageSize={pageSize}
          currentPage={currentPage as number}
          setSearchParams={setSearchParams}
        />
      </div>
      <CategoryCreateForm
        show={showCreateCategoryModal}
        handleClose={handleCreateCategoryModalClose}
      />
    </>
  );
};

export default CategoriesPage;
