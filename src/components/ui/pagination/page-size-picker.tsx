import { Dropdown } from 'react-bootstrap';
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
      <Dropdown>
        <Dropdown.Toggle variant="primary" id="dropdown-basic">
          {`Page Size: ${pageSize}`}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {[5, 10, 20, 50].map((size) => (
            <Dropdown.Item
              key={size}
              onClick={() => handlePageSizeChange(size)}
            >
              {size}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default PageSizePicker;
