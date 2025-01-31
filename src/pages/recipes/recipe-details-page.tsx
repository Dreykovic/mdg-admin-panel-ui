import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import RecipeDetails from '@/features/recipes/components/recipe-details';
import { AppDispatch } from '@/store';
import { setPageName } from '@/store/page-slice';
import NoCardData from '@/components/ui/no-data/no-card-data';

const RecipeDetailsPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { recipeId } = useParams();

  useEffect(() => {
    dispatch(setPageName({ name: 'recipe-edit', group: 'recipes' }));
  }, [dispatch]);

  return (
    <>
      {recipeId ? (
        <div className="row clearfix">
          <RecipeDetails recipeId={parseInt(recipeId)} />
        </div>
      ) : (
        <NoCardData text="Something went wrong" />
      )}
    </>
  );
};

export default RecipeDetailsPage;
