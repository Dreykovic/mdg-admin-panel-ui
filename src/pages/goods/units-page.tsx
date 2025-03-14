import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import TableLoadingSkeleton from '@/components/ui/loading/table-loading';
import CustomPagination from '@/components/ui/pagination';
import ElementShow from '@/components/ui/pagination/element-show';
import PageSizePicker from '@/components/ui/pagination/page-size-picker';
import SearchInput from '@/components/ui/pagination/search-input';
import UnitCreateForm from '@/features/units/components/unit-create-form';
import UnitsTable from '@/features/units/components/unit-table';
import { AppDispatch } from '@/store';
import { useGetSomeUnitsQuery } from '@/store/api';
import { setPageName } from '@/store/slice/page-slice';

const UnitsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [showCreateUnitModal, setShowCreateUnitModal] = useState(false);

  const handleCreateUnitModalClose = () => setShowCreateUnitModal(false);
  const handleCreateUnitModalShow = () => setShowCreateUnitModal(true);
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
  const { data: result, isFetching } = useGetSomeUnitsQuery(
    { page, pageSize, filters: JSON.stringify(filters ?? '') },
    { refetchOnMountOrArgChange: false },
  );

  const someUnits = result?.content.data;
  const currentPage = result?.content.page;
  const totalElements = result?.content.total; // Nombre total d'éléments

  useEffect(() => {
    dispatch(setPageName({ name: 'unit-list', group: 'goods' }));
  }, [dispatch]);

  return (
    <>
      <div className="row align-items-center">
        <div className="border-0 mb-4">
          <div className="card-header p-0 no-bg bg-transparent d-flex align-items-center px-0 justify-content-between border-bottom flex-wrap">
            <h3 className="fw-bold py-3 mb-0">Units Of Mesure</h3>
            <div className="d-flex py-2 project-tab flex-wrap w-sm-100">
              <button
                type="button"
                className="btn btn-dark w-sm-100"
                onClick={handleCreateUnitModalShow}
              >
                <i className="icofont-plus-circle me-2 fs-6"></i>New Unit
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
              <TableLoadingSkeleton rows={2} columns={4} />
            ) : (
              <UnitsTable units={someUnits ?? []} />
            )}
            <div className="card-footer text-center border-top-0 d-flex align-items-center justify-content-between">
              <ElementShow
                length={someUnits?.length as number}
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
      <UnitCreateForm
        show={showCreateUnitModal}
        handleClose={handleCreateUnitModalClose}
      />
    </>
  );
};

export default UnitsPage;
