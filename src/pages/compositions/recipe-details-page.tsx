import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import ErrorAlert from '@/components/ui/error-alert';
import CardLoading from '@/components/ui/loading/card-loading';
import NoCardData from '@/components/ui/no-data/no-card-data';
import RecipeDetails from '@/features/recipes/components/recipe-details';
import { AppDispatch } from '@/store';
import { useGetUniqueRecipeQuery } from '@/store/api/recipe';
import { setPageName } from '@/store/slice/page-slice';

const RecipeDetailsPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { recipeId } = useParams();

  useEffect(() => {
    dispatch(setPageName({ name: 'recipe-edit', group: 'recipes' }));
  }, [dispatch]);

  const {
    data: response,
    isFetching,
    isError,
    error,
  } = useGetUniqueRecipeQuery(
    { recipeId: recipeId ? parseInt(recipeId) : 0 },
    {
      refetchOnMountOrArgChange: false,
      refetchOnReconnect: true,
    },
  );

  if (!recipeId) {
    return (
      <>
        <NoCardData text="Something went wrong" />
      </>
    );
  }

  if (isFetching) {
    return <CardLoading number={4} />;
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
