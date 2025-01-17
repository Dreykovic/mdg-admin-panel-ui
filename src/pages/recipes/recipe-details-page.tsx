import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import RecipeDetails from '@/features/recipes/components/recipe-details';
import { AppDispatch } from '@/store';
import { setPageName } from '@/store/page-slice';

const RecipeDetailsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();

  const navigate = useNavigate();

  const [recipe] = useState(location.state || {}); // <-- cache state locally

  useEffect(() => {
    navigate('.', { replace: true }); // <-- redirect to current path w/o state
    dispatch(setPageName({ name: 'recipe-edit', group: 'recipes' }));
  }, [dispatch, navigate]);

  return (
    <>
      <div className="row clearfix">
        <RecipeDetails recipe={recipe} />
      </div>
    </>
  );
};

export default RecipeDetailsPage;
