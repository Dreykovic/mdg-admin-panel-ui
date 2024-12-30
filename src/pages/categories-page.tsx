import { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { AppDispatch } from '@/store';
import { setPageName } from '@/store/page-slice';

import CategoryList from '@/features/categories/components/category-list';
import { useGetSomeCategoriesQuery } from '@/features/categories/store/api';
import { Loading } from '@/components/ui/loading';

const CategoriesPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(setPageName({ name: 'category-list', group: 'resources' }));
  }, [dispatch]);

  const { data: result, isFetching } = useGetSomeCategoriesQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const someCategories = result?.content.data;

  if (isFetching) {
    return <Loading />;
  }
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
                data-bs-toggle="modal"
                data-bs-target="#createproject"
              >
                <i className="icofont-plus-circle me-2 fs-6"></i>Create Category
              </button>
            </div>
          </div>
        </div>
      </div>
      <CategoryList categories={someCategories ?? []} />
    </>
  );
};

export default CategoriesPage;
