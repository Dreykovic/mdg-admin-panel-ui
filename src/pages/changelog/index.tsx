import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import ChangelogImg from '@/assets/images/change-log.webp';
import { AppDispatch } from '@/store';
import { setPageName } from '@/store/slice/page-slice';

import ChangelogUpdates from './update';
const Changelog = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(setPageName({ name: 'changelog', group: 'Changelog' }));
  });
  return (
    <>
      <div className="container-xxl">
        <div className="row align-items-center mb-4">
          <div className="col">
            <h1 className="h4 mt-1">Changelog</h1>
          </div>
          {/* <div className="col-auto">
            <a href="#" title="" className="btn btn-white border lift">
              Get Support
            </a>
            <a href="#" title="" className="btn btn-primary border lift">
              Our Portfolio
            </a>
          </div> */}
        </div>
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body text-center p-5">
                <img
                  src={ChangelogImg}
                  className="img-fluid mx-size"
                  alt="No Data"
                />
              </div>
            </div>
          </div>
          <div className="col-12 col-md-12 mt-5">
            <div className="card">
              <div className="card-body">
                <ChangelogUpdates />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Changelog;
