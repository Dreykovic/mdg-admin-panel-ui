import { Spinner } from 'react-bootstrap';

import { ProductTag } from '@/types/entity';

type TagBadgeProps = {
  tag: ProductTag;
  onRemove?: () => void;
  isRemovingTag: boolean;
};

const TagBadge = ({ tag, onRemove, isRemovingTag }: TagBadgeProps) => {
  return (
    <div
      className={`badge ${onRemove ? 'd-flex align-items-center p-2' : 'p-2'} bg-light text-dark`}
      title={tag.description || ''}
    >
      {tag.imageUrl && (
        <img
          src={tag.imageUrl}
          alt=""
          className="me-1 rounded-circle"
          style={{ width: '16px', height: '16px' }}
        />
      )}
      <span>{tag.name}</span>
      {onRemove &&
        (isRemovingTag ? (
          <Spinner animation="border" />
        ) : (
          <button
            className="btn btn-sm p-0 ms-2 text-danger"
            onClick={onRemove}
            style={{ fontSize: '0.7rem' }}
          >
            <i className="icofont-close-line"></i>
          </button>
        ))}
    </div>
  );
};

export default TagBadge;
