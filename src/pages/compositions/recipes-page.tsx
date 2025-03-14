import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import CardLoading from '@/components/ui/loading/card-loading';
import CustomPagination from '@/components/ui/pagination';
import ElementShow from '@/components/ui/pagination/element-show';
import PageSizePicker from '@/components/ui/pagination/page-size-picker';
import SearchInput from '@/components/ui/pagination/search-input';
import RecipeCreateForm from '@/features/recipes/components/recipe-create-form';
import RecipeList from '@/features/recipes/components/recipe-list';
import { AppDispatch } from '@/store';
import { useGetSomeRecipesQuery } from '@/store/api';
import { setPageName } from '@/store/slice/page-slice';

const RecipesPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [showCreateRecipeModal, setShowCreateRecipeModal] = useState(false);

  const handleCreateRecipeModalClose = () => setShowCreateRecipeModal(false);
  const handleCreateRecipeModalShow = () => setShowCreateRecipeModal(true);
  // États locaux pour `pageSize` et `search`
  const [pageSize, setPageSize] = useState(
    parseInt(searchParams.get('pageSize') || '10', 10),
  );
  const [search, setSearch] = useState(
    JSON.parse(searchParams.get('filter') || '{}')?.name || '',
  );

  useEffect(() => {
    dispatch(setPageName({ name: 'recipe-list', group: 'compositions' }));
  }, [dispatch]);

  // Récupérer les paramètres `page` ou définir une valeur par défaut
  const page = parseInt(searchParams.get('page') || '1', 10);

  // Créer l'objet `filter`
  const filters = search ? { name: search } : undefined;

  // Lancer la requête avec les paramètres actuels
  const { data: result, isFetching } = useGetSomeRecipesQuery(
    { page, pageSize, filters: JSON.stringify(filters ?? '') },
    { refetchOnMountOrArgChange: false },
  );

  const someRecipes = result?.content.data;
  const currentPage = result?.content.page;
  const totalElements = result?.content.total; // Nombre total d'éléments

  return (
    <>
      <div className="row align-items-center">
        <div className="border-0 mb-4">
          <div className="card-header p-0 no-bg bg-transparent d-flex align-items-center px-0 justify-content-between border-bottom flex-wrap">
            <h3 className="fw-bold py-3 mb-0">Recipes</h3>
            <div className="d-flex py-2 project-tab flex-wrap w-sm-100">
              <button
                type="button"
                className="btn btn-dark w-sm-100"
                onClick={handleCreateRecipeModalShow}
              >
                <i className="icofont-plus-circle me-2 fs-6"></i>Create Recipe
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
        <CardLoading number={2} />
      ) : (
        <>
          <RecipeList recipes={someRecipes ?? []} />
        </>
      )}
      <div className="d-flex justify-content-between align-items-center">
        <ElementShow
          length={someRecipes?.length as number}
          totalElements={totalElements as number}
        />
        <CustomPagination
          totalElements={totalElements as number}
          pageSize={pageSize}
          currentPage={currentPage as number}
          setSearchParams={setSearchParams}
        />
      </div>
      <RecipeCreateForm
        show={showCreateRecipeModal}
        handleClose={handleCreateRecipeModalClose}
      />
    </>
  );
};

export default RecipesPage;
