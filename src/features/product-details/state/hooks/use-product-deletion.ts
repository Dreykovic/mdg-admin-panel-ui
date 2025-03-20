import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { showAlert } from '@/components/ui/alerts/alert-slice';
import { authRoutesConfig } from '@/router/config';
import { AppDispatch } from '@/store';
import { useDeleteProductMutation } from '@/services/product';

/**
 * Custom hook to handle product deletion with optimized error handling
 * @param productId The ID of the product to delete (instead of full product object)
 * @returns Object containing deletion handler and loading state
 */
export const useProductDeletion = (productId: string) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [deleteProduct, { isLoading }] = useDeleteProductMutation();

  const handleDeletion = useCallback(async () => {
    if (!productId) return;

    try {
      const response = await deleteProduct({ id: productId }).unwrap();

      if (response.success) {
        dispatch(
          showAlert({
            title: 'Success!',
            message: response.message,
          }),
        );
        navigate(authRoutesConfig.products.path);
      }
    } catch (error: unknown) {
      console.error('Product deletion error:', error);

      // More robust error message handling
      let errorMessage = 'An error occurred during deletion';

      if (error instanceof Error) {
        errorMessage += `: ${error.message}`;
      } else if (typeof error === 'object' && error !== null) {
        try {
          // Only stringify relevant parts of the error if possible
          const safeError = JSON.stringify(error, [
            'message',
            'data',
            'status',
          ]);
          errorMessage += ` - ${safeError}`;
        } catch (e) {
          // If JSON.stringify fails, just use a generic message
          errorMessage += ' (details unavailable)';
          console.error(e);
        }
      }

      dispatch(
        showAlert({
          title: 'Error!',
          message: errorMessage,
          success: false,
        }),
      );
    }
  }, [productId, deleteProduct, dispatch, navigate]);

  return {
    handleDeletion,
    isLoading,
  };
};
