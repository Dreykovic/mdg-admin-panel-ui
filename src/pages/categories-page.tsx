import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { setPageName } from '@/store/page-slice';

import CategoryList from '@/features/categories/components/category-list';
import { useGetSomeCategoriesQuery } from '@/features/categories/store/api';

import CustomPagination from '@/components/ui/pagination';
import { useSearchParams } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import CardLoading from '@/components/ui/loading/card-loading';

const CategoriesPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchParams, setSearchParams] = useSearchParams();

  // États locaux pour `pageSize` et `search`
  const [pageSize, setPageSize] = useState(
    parseInt(searchParams.get('pageSize') || '10', 10),
  );
  const [search, setSearch] = useState(
    JSON.parse(searchParams.get('filter') || '{}')?.name || '',
  );

  useEffect(() => {
    dispatch(setPageName({ name: 'category-list', group: 'resources' }));
  }, [dispatch]);

  // Récupérer les paramètres `page` ou définir une valeur par défaut
  const page = parseInt(searchParams.get('page') || '1', 10);

  // Créer l'objet `filter`
  const filter = { name: search };

  // Lancer la requête avec les paramètres actuels
  const { data: result, isFetching } = useGetSomeCategoriesQuery(
    { page, pageSize, filter },
    { refetchOnMountOrArgChange: true },
  );

  const someCategories = result?.content.data;
  const currentPage = result?.content.page;
  const totalElements = result?.content.total; // Nombre total d'éléments

  const handlePageChange = (page: number) => {
    setSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
      filter: JSON.stringify(filter), // Sérialiser l'objet `filter`
    });
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearch(value);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setSearchParams({
      page: '1',
      pageSize: size.toString(),
      filter: JSON.stringify(filter), // Conserver le filtre actuel
    });
  };

  return (
    <>
      <div className="row align-items-center">
        <div className="border-0 mb-4">
          <div className="card-header p-0 no-bg bg-transparent d-flex align-items-center px-0 justify-content-between border-bottom flex-wrap">
            <h3 className="fw-bold py-3 mb-0">Categories</h3>{' '}
            <span>{`Display ${someCategories?.length} elements of ${totalElements}`}</span>
            <div>
              <div className="input-group">
                <button
                  type="button"
                  className="input-group-text"
                  id="addon-wrapping"
                >
                  <i className="icofont-search"></i>
                </button>
                <input
                  type="search"
                  className="form-control"
                  placeholder="Search"
                  aria-label="search"
                  aria-describedby="addon-wrapping"
                  value={search}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {`Page Size: ${pageSize}`}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {[5, 10, 20, 50].map((size) => (
                  <Dropdown.Item
                    key={size}
                    onClick={() => handlePageSizeChange(size)}
                  >
                    {size}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <div className="d-flex py-2 project-tab flex-wrap w-sm-100">
              <button
                type="button"
                className="btn btn-dark w-sm-100"
                data-bs-toggle="modal"
                data-bs-target="#createproject"
              >
                <i className="icofont-plus-circle me-2 fs-6"></i>Create Category
              </button>
            </div>
          </div>
        </div>
      </div>
      {isFetching ? (
        <CardLoading number={10} />
      ) : (
        <>
          <CategoryList categories={someCategories ?? []} />
          <CustomPagination
            totalElements={totalElements as number}
            pageSize={pageSize}
            currentPage={currentPage as number}
            onPageChange={handlePageChange} // Passer la fonction de changement de page
          />
        </>
      )}
    </>
  );
};

export default CategoriesPage;
