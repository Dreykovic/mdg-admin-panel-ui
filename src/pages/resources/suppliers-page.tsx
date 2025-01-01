import { useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import TableLoadingSkeleton from '@/components/ui/loading/table-loading';
import CustomPagination from '@/components/ui/pagination';
import SupplierCreateForm from '@/features/suppliers/components/supplier-create-form';
import SuppliersTable from '@/features/suppliers/components/suppliers-table';
import { useGetSomeSuppliersQuery } from '@/features/suppliers/store/api';
import { AppDispatch } from '@/store';
import { setPageName } from '@/store/page-slice';

const SuppliersPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [showCreateSupplierModal, setShowCreateSupplierModal] = useState(false);

  const handleCreateSupplierModalClose = () =>
    setShowCreateSupplierModal(false);
  const handleCreateSupplierModalShow = () => setShowCreateSupplierModal(true);
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
  const { data: result, isFetching } = useGetSomeSuppliersQuery(
    { page, pageSize, filters: JSON.stringify(filters ?? '') },
    { refetchOnMountOrArgChange: true },
  );

  const someSuppliers = result?.content.data;
  const currentPage = result?.content.page;
  const totalElements = result?.content.total; // Nombre total d'éléments

  const handlePageChange = (page: number) => {
    setSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
      filters: JSON.stringify(filters), // Sérialiser l'objet `filter`
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
      filters: JSON.stringify(filters), // Conserver le filtre actuel
    });
  };

  useEffect(() => {
    dispatch(setPageName({ name: 'supplier-list', group: 'resources' }));
  }, [dispatch]);

  return (
    <>
      <div className="row align-items-center">
        <div className="border-0 mb-4">
          <div className="card-header p-0 no-bg bg-transparent d-flex align-items-center px-0 justify-content-between border-bottom flex-wrap">
            <h3 className="fw-bold py-3 mb-0">Suppliers</h3>{' '}
            <div className="d-flex py-2 project-tab flex-wrap w-sm-100">
              <button
                type="button"
                className="btn btn-dark w-sm-100"
                onClick={handleCreateSupplierModalShow}
              >
                <i className="icofont-plus-circle me-2 fs-6"></i>New Supplier
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row clearfix g-3">
        <div className="col-sm-12">
          {isFetching ? (
            <TableLoadingSkeleton rows={3} columns={6} />
          ) : (
            <div className="card mb-3">
              <div className="card-header d-flex justify-content-between">
                <div>
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
                </div>

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
              </div>
              <SuppliersTable suppliers={someSuppliers ?? []} />
              <div className="card-footer text-center border-top-0 d-flex align-items-center justify-content-between">
                <span>{`Display ${someSuppliers?.length} elements of ${totalElements}`}</span>
                <CustomPagination
                  totalElements={totalElements as number}
                  pageSize={pageSize}
                  currentPage={currentPage as number}
                  onPageChange={handlePageChange} // Passer la fonction de changement de page
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <SupplierCreateForm
        show={showCreateSupplierModal}
        handleClose={handleCreateSupplierModalClose}
      />
    </>
  );
};

export default SuppliersPage;
