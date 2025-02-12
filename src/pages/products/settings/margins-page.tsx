import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import TableLoadingSkeleton from '@/components/ui/loading/table-loading';
import CustomPagination from '@/components/ui/pagination';
import ElementShow from '@/components/ui/pagination/element-show';
import PageSizePicker from '@/components/ui/pagination/page-size-picker';
import SearchInput from '@/components/ui/pagination/search-input';
import MarginCreateForm from '@/features/margins/components/margin-create-form';
import MarginsTable from '@/features/margins/components/margin-table';
import { useGetSomeMarginsQuery } from '@/store/api-slice';
import { AppDispatch } from '@/store';
import { setPageName } from '@/store/page-slice';

const MarginsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [showCreateMarginModal, setShowCreateMarginModal] = useState(false);

  const handleCreateMarginModalClose = () => setShowCreateMarginModal(false);
  const handleCreateMarginModalShow = () => setShowCreateMarginModal(true);
  // États locaux pour `pageSize` et `search`
  const [pageSize, setPageSize] = useState(
    parseInt(searchParams.get('pageSize') || '10', 10),
  );
  const [search, setSearch] = useState(
    JSON.parse(searchParams.get('filter') || '{}')?.name || '',
  );

  // Récupérer les paramètres `page` ou définir une valeur par défaut
  const page = parseInt(searchParams.get('page') || '1', 10);

  // Créer l'objet `filter`
  const filters = search ? { name: search } : undefined;

  // Lancer la requête avec les paramètres actuels
  const { data: result, isFetching } = useGetSomeMarginsQuery(
    { page, pageSize, filters: JSON.stringify(filters ?? '') },
    { refetchOnMountOrArgChange: false },
  );

  const someMargins = result?.content.data;
  const currentPage = result?.content.page;
  const totalElements = result?.content.total; // Nombre total d'éléments

  useEffect(() => {
    dispatch(setPageName({ name: 'margin-list', group: 'product-settings' }));
  }, [dispatch]);

  return (
    <>
      <div className="row align-items-center">
        <div className="border-0 mb-4">
          <div className="card-header p-0 no-bg bg-transparent d-flex align-items-center px-0 justify-content-between border-bottom flex-wrap">
            <h3 className="fw-bold py-3 mb-0">Margin Levels</h3>
            <div className="d-flex py-2 project-tab flex-wrap w-sm-100">
              <button
                type="button"
                className="btn btn-dark w-sm-100"
                onClick={handleCreateMarginModalShow}
              >
                <i className="icofont-plus-circle me-2 fs-6"></i>New Margin
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row justify-content-center g-3">
        <div className="col-lg-8 col-md-12">
          <div className="card mb-3 shadow">
            <div className="card-header d-flex justify-content-between">
              <div>
                <PageSizePicker
                  pageSize={pageSize}
                  setSearchParams={setSearchParams}
                  setPageSize={setPageSize}
                />
              </div>

              <SearchInput search={search} setSearch={setSearch} />
            </div>
            {isFetching ? (
              <TableLoadingSkeleton rows={2} columns={3} />
            ) : (
              <MarginsTable margins={someMargins ?? []} />
            )}
            <div className="card-footer text-center border-top-0 d-flex align-items-center justify-content-between">
              <ElementShow
                length={someMargins?.length as number}
                totalElements={totalElements as number}
              />
              <CustomPagination
                totalElements={totalElements as number}
                pageSize={pageSize}
                currentPage={currentPage as number}
                setSearchParams={setSearchParams}
              />
            </div>
          </div>
        </div>
      </div>
      <MarginCreateForm
        show={showCreateMarginModal}
        handleClose={handleCreateMarginModalClose}
      />
    </>
  );
};

export default MarginsPage;
