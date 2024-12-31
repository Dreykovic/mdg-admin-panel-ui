// TableLoadingSkeleton.jsx
import React from 'react';
import Placeholder from 'react-bootstrap/Placeholder';

interface ITableLoadingSkeletonProps {
  rows?: number;
  columns?: number;
}

const TableLoadingSkeleton: React.FC<ITableLoadingSkeletonProps> = ({
  rows = 4,
  columns = 6,
}) => {
  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            {Array.from({ length: columns }).map((_, colIndex) => (
              <th key={colIndex}>
                <Placeholder as="span" animation="glow">
                  <Placeholder xs={6} />
                </Placeholder>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              {Array.from({ length: columns }).map((_, colIndex) => (
                <td key={colIndex}>
                  <Placeholder as="span" animation="glow">
                    <Placeholder xs={Math.floor(Math.random() * 6) + 3} />
                  </Placeholder>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableLoadingSkeleton;
