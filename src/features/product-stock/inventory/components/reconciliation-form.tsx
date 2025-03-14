import React, { useState } from 'react';

import { Inventory } from '@/types/entity';

interface ReconciliationFormProps {
  inventory: Inventory;
}
// Reconciliation Form
const ReconciliationForm: React.FC<ReconciliationFormProps> = ({
  inventory,
}) => {
  const [actualQuantity, setActualQuantity] = useState<number>(
    inventory.quantity,
  );
  const [notes, setNotes] = useState<string>('');
  const [reason, setReason] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Reconciliation submitted:', {
      inventoryId: inventory.id,
      systemQuantity: inventory.quantity,
      actualQuantity,
      difference: actualQuantity - inventory.quantity,
      reason,
      notes,
    });
    // Submission logic here
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="alert alert-info">
        <i className="icofont-info-circle me-2"></i>
        Reconciliation allows inventory adjustment after a physical count.
      </div>

      <div className="row">
        <div className="col-md-4">
          <div className="card bg-light mb-3">
            <div className="card-header bg-primary text-white">
              <h6 className="mb-0">System</h6>
            </div>
            <div className="card-body text-center">
              <h3>{inventory.quantity}</h3>
              <p className="text-muted mb-0">Units</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card mb-3">
            <div className="card-header bg-primary text-white">
              <h6 className="mb-0">Physical Count</h6>
            </div>
            <div className="card-body">
              <input
                type="number"
                className="form-control form-control-lg text-center"
                min="0"
                value={actualQuantity}
                onChange={(e) => setActualQuantity(parseInt(e.target.value))}
              />
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card mb-3">
            <div className="card-header bg-primary text-white">
              <h6 className="mb-0">Difference</h6>
            </div>
            <div className="card-body text-center">
              <h3
                className={
                  actualQuantity - inventory.quantity === 0
                    ? 'text-success'
                    : actualQuantity - inventory.quantity > 0
                      ? 'text-info'
                      : 'text-danger'
                }
              >
                {actualQuantity - inventory.quantity > 0 ? '+' : ''}
                {actualQuantity - inventory.quantity}
              </h3>
              <p className="text-muted mb-0">units</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="reason" className="form-label fw-bold">
              Reason for Difference
            </label>
            <select
              className="form-select"
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            >
              <option value="">Select a reason...</option>
              <option value="COUNTING_ERROR">Previous Counting Error</option>
              <option value="THEFT">Theft</option>
              <option value="DAMAGE">Damage/Breakage</option>
              <option value="SYSTEM_ERROR">System Error</option>
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
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>
          </div>
        </div>
      </div>

      <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
        <button type="button" className="btn btn-outline-secondary">
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          <i className="icofont-check-circled me-1"></i>
          Validate Reconciliation
        </button>
      </div>
    </form>
  );
};
export default ReconciliationForm;
