import { ArrowLeft, ArrowRight } from 'react-bootstrap-icons';
import { useDispatch } from 'react-redux';

import { AppDispatch } from '@/store';

import { maximizeSidebar, minifySidebar } from './sidebar-slice';

interface Props {
  isMinified: boolean;
}

const SidebarMinifier = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const minify = () => {
    dispatch(minifySidebar());
  };
  const maximize = () => {
    dispatch(maximizeSidebar());
  };
  return (
    <>
      <button
        type="button"
        className="btn btn-link sidebar-mini-btn text-light"
        onClick={props.isMinified ? maximize : minify}
      >
        <span className="ms-2">
          {props.isMinified ? (
            <ArrowRight className="w-2 h-2" />
          ) : (
            <ArrowLeft className="w-2 h-2" />
          )}
        </span>
      </button>
    </>
  );
};

export default SidebarMinifier;
