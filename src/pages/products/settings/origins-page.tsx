import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import CardLoading from '@/components/ui/loading/card-loading';
import CustomPagination from '@/components/ui/pagination';
import ElementShow from '@/components/ui/pagination/element-show';
import PageSizePicker from '@/components/ui/pagination/page-size-picker';
import SearchInput from '@/components/ui/pagination/search-input';
import OriginCreateForm from '@/features/origins/components/origin-create-form';
import OriginList from '@/features/origins/components/origin-list';
import { useGetSomeOriginsQuery } from '@/features/origins/store/api';
import { AppDispatch } from '@/store';
import { setPageName } from '@/store/page-slice';

const OriginsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [showCreateOriginModal, setShowCreateOriginModal] = useState(false);

  const handleCreateOriginModalClose = () => setShowCreateOriginModal(false);
  const handleCreateOriginModalShow = () => setShowCreateOriginModal(true);
  // États locaux pour `pageSize` et `search`
  const [pageSize, setPageSize] = useState(
    parseInt(searchParams.get('pageSize') || '10', 10),
  );
  const [search, setSearch] = useState(
    JSON.parse(searchParams.get('filter') || '{}')?.country || '',
  );

  useEffect(() => {
    dispatch(setPageName({ name: 'origin-list', group: 'products' }));
  }, [dispatch]);

  // Récupérer les paramètres `page` ou définir une valeur par défaut
  const page = parseInt(searchParams.get('page') || '1', 10);

  // Créer l'objet `filter`
  const filters = search ? { country: search } : undefined;

  // Lancer la requête avec les paramètres actuels
  const { data: result, isFetching } = useGetSomeOriginsQuery(
    { page, pageSize, filters: JSON.stringify(filters ?? '') },
    { refetchOnMountOrArgChange: true },
  );

  const someOrigins = result?.content.data;
  const currentPage = result?.content.page;
  const totalElements = result?.content.total; // Nombre total d'éléments

  return (
    <>
      <div className="row align-items-center">
        <div className="border-0 mb-4">
          <div className="card-header p-0 no-bg bg-transparent d-flex align-items-center px-0 justify-content-between border-bottom flex-wrap">
            <h3 className="fw-bold py-3 mb-0">Origins</h3>{' '}
            <div className="d-flex py-2 project-tab flex-wrap w-sm-100">
              <button
                type="button"
                className="btn btn-dark w-sm-100"
                onClick={handleCreateOriginModalShow}
              >
                <i className="icofont-plus-circle me-2 fs-6"></i>Create Origin
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
          <OriginList origins={someOrigins ?? []} />
        </>
      )}
      <div className="d-flex justify-content-between align-items-center">
        <ElementShow
          length={someOrigins?.length as number}
          totalElements={totalElements as number}
        />
        <CustomPagination
          totalElements={totalElements as number}
          pageSize={pageSize}
          currentPage={currentPage as number}
          setSearchParams={setSearchParams}
        />
      </div>
      <OriginCreateForm
        show={showCreateOriginModal}
        handleClose={handleCreateOriginModalClose}
      />
    </>
  );
};

export default OriginsPage;
