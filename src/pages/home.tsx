import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import WelcomImg from '@/assets/images/welcome/no-data.svg';
import { AppDispatch } from '@/store';
import { setPageName } from '@/store/slice/page-slice';

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(setPageName({ name: 'home', group: 'home' }));
  });
  return (
    <>
      <div className="col-12">
        <div className="card mb-3">
          <div className="card-body text-center p-5">
            <img src={WelcomImg} className="img-fluid mx-size" alt="No Data" />
            <div className="mt-4 mb-2">
              <span className="text-muted"></span>
            </div>
            <button type="button" className="btn btn-primary border lift mt-1">
              Begin
            </button>
            {/* <button type="button" className="btn btn-primary border lift mt-1">
              Back to Home
            </button> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
