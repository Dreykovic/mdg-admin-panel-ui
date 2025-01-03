import { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import TableLoadingSkeleton from '@/components/ui/loading/table-loading';
import CustomPagination from '@/components/ui/pagination';

import { AppDispatch } from '@/store';
import { setPageName } from '@/store/page-slice';
import PageSizePicker from '@/components/ui/pagination/page-size-picker';

import ElementShow from '@/components/ui/pagination/element-show';
import { useGetSomeProductsQuery } from '@/features/products/store/api';
import ProductTable from '@/features/products/components/products-table';
import SearchInput from '@/components/ui/pagination/search-input';

const ProductsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchParams, setSearchParams] = useSearchParams();

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
  const { data: result, isFetching } = useGetSomeProductsQuery(
    { page, pageSize, filters: JSON.stringify(filters ?? '') },
    { refetchOnMountOrArgChange: true },
  );

  const someProducts = result?.content.data;
  console.log(someProducts);

  const currentPage = result?.content.page;
  const totalElements = result?.content.total; // Nombre total d'éléments

  useEffect(() => {
    dispatch(setPageName({ name: 'product-list', group: 'products' }));
  }, [dispatch]);

  return (
    <>
      <div className="row g-3 mb-3">
        <div className="col-md-4">
          <div className="card shadow">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="avatar lg  rounded-1 no-thumbnail bg-secondary color-defult">
                  <i className="icofont-optic fs-4"></i>
                </div>
                <div className="flex-fill ms-4 text-truncate">
                  <div className="text-truncate">In-Store Sales</div>
                  <span className="badge bg-secondary">$</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="avatar lg  rounded-1 no-thumbnail bg-secondary color-defult">
                  <i className="icofont-user fs-4"></i>
                </div>
                <div className="flex-fill ms-4 text-truncate">
                  <div className="text-truncate">Website Sales</div>
                  <span className="fw-bold">Sally Graham</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="avatar lg  rounded-1 no-thumbnail bg-secondary color-defult">
                  <i className="icofont-price fs-4"></i>
                </div>
                <div className="flex-fill ms-4 text-truncate">
                  <div className="text-truncate">Discount</div>
                  <span className="badge bg-secondary">$</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row clearfix g-3">
        <div className="col-sm-12">
          <div className="card mb-3 shadow">
            <div className="card-header d-flex justify-content-between">
              <PageSizePicker
                pageSize={pageSize}
                setSearchParams={setSearchParams}
                setPageSize={setPageSize}
              />

              <SearchInput search={search} setSearch={setSearch} />
            </div>
            {isFetching ? (
              <TableLoadingSkeleton rows={3} columns={6} />
            ) : (
              <ProductTable products={someProducts ?? []} />
            )}
            <div className="card-footer text-center border-top-0 d-flex align-items-center justify-content-between">
              <ElementShow
                length={someProducts?.length as number}
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
    </>
  );
};

export default ProductsPage;
