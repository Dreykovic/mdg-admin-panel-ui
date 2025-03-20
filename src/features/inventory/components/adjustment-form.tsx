import React, { useState } from 'react';

import { MovementType, Inventory } from '@/types/entity';
import { StockMovementData } from '../types';
interface AdjustmentFormProps {
  inventory: Inventory;
}

// Adjustment Form
const AdjustmentForm: React.FC<AdjustmentFormProps> = ({ inventory }) => {
  const initialValues: StockMovementData = {
    inventoryId: inventory.id,
    quantity: 0,
    documentNumber: '',
    notes: '',
    productId: inventory.productId,
    movementType: 'INCOMING',
  };
  const [adjustmentType, setAdjustmentType] =
    useState<MovementType>('INCOMING');
  const [quantity, setQuantity] = useState<number>(1);
  const [reason, setReason] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Adjustment submitted:', {
      inventoryId: inventory.id,
      adjustmentType,
      quantity,
      reason,
      notes,
    });
    // Submission logic here
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="alert alert-warning">
        <i className="icofont-warning-alt me-2"></i>
        Adjustment allows you to manually add or remove units from inventory.
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="adjustmentType" className="form-label fw-bold">
              Adjustment Type
            </label>
            <div className="btn-group w-100" role="group">
              <input
                type="radio"
                className="btn-check"
                name="adjustmentType"
                id="incoming"
                value="INCOMING"
                checked={adjustmentType === 'INCOMING'}
                onChange={() => setAdjustmentType('INCOMING')}
              />
              <label className="btn btn-outline-success" htmlFor="incoming">
                <i className="icofont-plus-circle me-1"></i>Input
              </label>

              <input
                type="radio"
                className="btn-check"
                name="adjustmentType"
                id="outgoing"
                value="OUTGOING"
                checked={adjustmentType === 'OUTGOING'}
                onChange={() => setAdjustmentType('OUTGOING')}
              />
              <label className="btn btn-outline-danger" htmlFor="outgoing">
                <i className="icofont-minus-circle me-1"></i>Output
              </label>
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="quantity" className="form-label fw-bold">
              Quantity
            </label>
            <input
              type="number"
              className="form-control"
              id="quantity"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="reason" className="form-label fw-bold">
              Adjustment Reason
            </label>
            <select
              className="form-select"
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            >
              <option value="">Select a reason...</option>
              <option value="ADJUSTMENT">Manual Adjustment</option>
              <option value="DAMAGE">Damaged Product</option>
              <option value="RETURN">Customer Return</option>
              <option value="TRANSFER">Warehouse Transfer</option>
              <option value="OTHER">Other</option>
            </select>
          </div>
        </div>

        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="notes" className="form-label fw-bold">
              Explanatory Notes
            </label>
            <textarea
              className="form-control"
              id="notes"
              rows={8}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Please explain the reason for this adjustment..."
            ></textarea>
          </div>
        </div>
      </div>

      <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
        <button type="button" className="btn btn-outline-secondary">
          Cancel
        </button>
        <button
          type="submit"
          className={`btn ${adjustmentType === 'INCOMING' ? 'btn-success' : 'btn-danger'}`}
        >
          <i
            className={`icofont-${adjustmentType === 'INCOMING' ? 'plus' : 'minus'}-circle me-1`}
          ></i>
          {adjustmentType === 'INCOMING' ? 'Add to Stock' : 'Remove from Stock'}
        </button>
      </div>
    </form>
  );
};
export default AdjustmentForm;
