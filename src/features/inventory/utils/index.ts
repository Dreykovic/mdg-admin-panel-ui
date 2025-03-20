/**
 * Get default reason based on movement type and reference type
 */

import { MovementReason, MovementType } from '@/types/entity';

export function getDefaultReasonForType(
  movementType: MovementType,
  referenceType?: string,
): MovementReason {
  switch (movementType) {
    case 'INCOMING':
      return 'PURCHASE';
    case 'OUTGOING':
      return referenceType === 'ORDER' ? 'SALE' : 'CONSUMPTION';
    case 'TRANSFER':
      return 'TRANSFER';
    case 'ADJUSTMENT':
      return 'ADJUSTMENT_INVENTORY';
    case 'RETURN':
      return 'RETURN_FROM_CUSTOMER';
    default:
      return 'OTHER';
  }
}
