import { MouseEventHandler } from 'react';
import Button from 'react-bootstrap/Button';

import { VariantType } from '@/types/style';

interface ILoadingButtonProps {
  loadingText?: string;
  text?: string;
  isLoading: boolean;
  variant?: VariantType;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
  classes?: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
}
function LoadingButton({
  loadingText = 'Loading...',
  text = 'Submit',
  isLoading,
  handleClick,
  variant = 'primary',
  classes,
  type = 'submit',
}: ILoadingButtonProps) {
  return (
    <Button
      type={type}
      variant={variant}
      className={classes}
      disabled={isLoading}
      onClick={!isLoading ? handleClick : undefined}
    >
      {isLoading ? (
        <span
          className="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span>
      ) : (
        ''
      )}

      {`${isLoading ? loadingText : text}`}
    </Button>
  );
}

export default LoadingButton;
