import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { AppDispatch } from '@/store';
import { setPageName } from '@/store/page-slice';

import RecipeDetails from '@/features/recipes/components/recipe-details';
import { useLocation } from 'react-router-dom';
const RecipeDetailsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const recipe = location.state;
  console.log(recipe);

  useEffect(() => {
    dispatch(setPageName({ name: 'recipe-edit', group: 'recipes' }));
  }, [dispatch]);

  return (
    <>
      <div className="row clearfix">
        <RecipeDetails recipe={recipe} />
      </div>
    </>
  );
};

export default RecipeDetailsPage;
