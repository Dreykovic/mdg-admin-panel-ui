import { SetURLSearchParams } from 'react-router-dom';

interface IPageSizePickerPrps {
  pageSize: number;
  setPageSize: (size: number) => void;
  setSearchParams: SetURLSearchParams;
}

const PageSizePicker = ({
  pageSize,

  setPageSize,
  setSearchParams,
}: IPageSizePickerPrps) => {
  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setSearchParams({
      page: '1',
      pageSize: size.toString(),
    });
  };

  return (
    <>
      <div className="dropdown">
        <a
          className="btn btn-primary dropdown-toggle"
          href="#"
          role="button"
          id="dropdownMenuLink1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {`Page Size: ${pageSize}`}
        </a>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          {[5, 10, 20, 50].map((size) => (
            <li key={size}>
              <a
                className="dropdown-item"
                href="#"
                onClick={() => handlePageSizeChange(size)}
              >
                {size}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default PageSizePicker;
