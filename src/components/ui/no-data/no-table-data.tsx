type Props = {
  text?: string;
  number?: number;
};

const NoTableData = (props: Props) => {
  return (
    <>
      <tr style={{ width: '100%' }}>
        <td colSpan={props.number ?? 6}>
          <div className="card" style={{ width: '100%' }}>
            <div className="card-body">
              <div className=" card justify-content-center flex-column d-flex">
                <h5 className="card-title text-center">
                  <i
                    className={`icofont-sad text-warning  display-2 text-center mt-2`}
                  ></i>
                </h5>

                <div className="card-text">
                  <p className="mt-4 fs-5 text-center">
                    {props.text ?? 'No Data'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </td>
      </tr>
    </>
  );
};

export default NoTableData;
