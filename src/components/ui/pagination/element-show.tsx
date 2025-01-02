interface IElementShowProps {
  length: number;
  totalElements: number;
}

const ElementShow = ({ length, totalElements }: IElementShowProps) => {
  return (
    <>
      <span>{`Display ${length} elements of ${totalElements}`}</span>
    </>
  );
};

export default ElementShow;
