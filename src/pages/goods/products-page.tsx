import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';

import TableLoadingSkeleton from '@/components/ui/loading/table-loading';
import CustomPagination from '@/components/ui/pagination';
import ElementShow from '@/components/ui/pagination/element-show';
import PageSizePicker from '@/components/ui/pagination/page-size-picker';
import SearchInput from '@/components/ui/pagination/search-input';
import ProductStats from '@/features/products/components/product-stats';
import ProductTable from '@/features/products/components/products-table';
import { authRoutesConfig } from '@/router/config';
import { AppDispatch } from '@/store';
import { useGetSomeProductsQuery } from '@/store/api';
import { setPageName } from '@/store/slice/page-slice';

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
    { refetchOnMountOrArgChange: false },
  );

  const someProducts = result?.content.data;

  const currentPage = result?.content.page;
  const totalElements = result?.content.total; // Nombre total d'éléments

  useEffect(() => {
    dispatch(setPageName({ name: 'product-list', group: 'goods' }));
  }, [dispatch]);
  console.log(someProducts);
  return (
    <>
      <ProductStats />
      <div className="row clearfix g-3">
        <div className="col-sm-12">
          <div className="card mb-3 shadow">
            <div className="card-header d-flex justify-content-between">
              <SearchInput search={search} setSearch={setSearch} />
              <Link
                to={authRoutesConfig.addProduct.path}
                type="button"
                className="btn btn-dark w-sm-100"
              >
                <i className="icofont-plus-circle me-2 fs-6"></i>Add Product
              </Link>
            </div>
            {isFetching ? (
              <TableLoadingSkeleton rows={3} columns={6} />
            ) : (
              <ProductTable products={someProducts ?? []} />
            )}
            <div className="card-footer text-center border-top-0 d-flex align-items-center justify-content-between">
              <PageSizePicker
                pageSize={pageSize}
                setSearchParams={setSearchParams}
                setPageSize={setPageSize}
              />
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
