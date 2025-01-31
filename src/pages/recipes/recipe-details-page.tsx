import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import RecipeDetails from '@/features/recipes/components/recipe-details';
import { AppDispatch } from '@/store';
import { setPageName } from '@/store/page-slice';
import NoCardData from '@/components/ui/no-data/no-card-data';
import { useGetUniqueRecipeQuery } from '@/features/recipes/store/recipe-api';
import CardLoading from '@/components/ui/loading/card-loading';
import ErrorAlert from '@/components/ui/error-alert';

const RecipeDetailsPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { recipeId } = useParams();
  if (!recipeId) {
    return (
      <>
        <NoCardData text="Something went wrong" />
      </>
    );
  }
  const {
    data: response,
    isFetching,
    isError,
    error,
  } = useGetUniqueRecipeQuery(
    { recipeId: parseInt(recipeId) },
    {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    },
  );
  useEffect(() => {
    dispatch(setPageName({ name: 'recipe-edit', group: 'recipes' }));
  }, [dispatch]);
  if (isFetching) {
    return <CardLoading />;
  }
  if (isError) {
    return <ErrorAlert error={error} />;
  }
  const recipe = response?.content.recipe;

  return (
    <>
      {recipe ? (
        <div className="row clearfix">
          <RecipeDetails recipe={recipe} />
        </div>
      ) : (
        <NoCardData text="Something went wrong" />
      )}
    </>
  );
};

export default RecipeDetailsPage;
