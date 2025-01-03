import React from 'react';

interface Props {
  icon: React.ReactNode;
  text: string;
}

const IconText = (props: Props) => {
  return (
    <>
      <div className="col-xl-5">
        <div className="d-flex align-items-center">
          {props.icon}
          <span className="ms-2 small">{props.text} </span>
        </div>
      </div>
    </>
  );
};

export default IconText;
