import { MouseEventHandler } from 'react';

interface IDynamicAddBtnProps {
  handleClick: MouseEventHandler<HTMLButtonElement>;
}
function DynamicAddBtn({ handleClick }: IDynamicAddBtnProps) {
  return (
    <span role="button" className="btn btn-light" onClick={handleClick}>
      <i className="icofont-plus  fs-4"></i>
    </span>
  );
}

export default DynamicAddBtn;
