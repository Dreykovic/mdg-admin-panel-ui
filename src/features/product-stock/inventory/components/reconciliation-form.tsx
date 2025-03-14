import React, { useState } from 'react';

import { Inventory } from '@/types/entity';

interface ReconciliationFormProps {
  inventory: Inventory;
}
// Formulaire de réconciliation
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
    // Logique de soumission ici
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
              <h6 className="mb-0">Comptage Physique</h6>
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
              <h6 className="mb-0">Différence</h6>
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
              <p className="text-muted mb-0">unités</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="reason" className="form-label fw-bold">
              Raison de la différence
            </label>
            <select
              className="form-select"
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            >
              <option value="">Sélectionner une raison...</option>
              <option value="COUNTING_ERROR">
                Erreur de comptage précédent
              </option>
              <option value="THEFT">Vol</option>
              <option value="DAMAGE">Dommage/Casse</option>
              <option value="SYSTEM_ERROR">Erreur système</option>
              <option value="OTHER">Autre</option>
            </select>
          </div>
        </div>

        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="notes" className="form-label fw-bold">
              Notes explicatives
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
          Annuler
        </button>
        <button type="submit" className="btn btn-primary">
          <i className="icofont-check-circled me-1"></i>
          Valider la réconciliation
        </button>
      </div>
    </form>
  );
};
export default ReconciliationForm;
