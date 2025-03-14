import React, { useState } from 'react';

import { MovementType, Inventory } from '@/types/entity';
interface AdjustmentFormProps {
  inventory: Inventory;
}

// Formulaire de réajustement
const AdjustmentForm: React.FC<AdjustmentFormProps> = ({ inventory }) => {
  const [adjustmentType, setAdjustmentType] =
    useState<MovementType>('STOCK_IN');
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
    // Logique de soumission ici
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
                id="stockIn"
                value="STOCK_IN"
                checked={adjustmentType === 'STOCK_IN'}
                onChange={() => setAdjustmentType('STOCK_IN')}
              />
              <label className="btn btn-outline-success" htmlFor="stockIn">
                <i className="icofont-plus-circle me-1"></i>Entrée
              </label>

              <input
                type="radio"
                className="btn-check"
                name="adjustmentType"
                id="stockOut"
                value="STOCK_OUT"
                checked={adjustmentType === 'STOCK_OUT'}
                onChange={() => setAdjustmentType('STOCK_OUT')}
              />
              <label className="btn btn-outline-danger" htmlFor="stockOut">
                <i className="icofont-minus-circle me-1"></i>Sortie
              </label>
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="quantity" className="form-label fw-bold">
              Quantité
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
              Motif d&apos;ajustement
            </label>
            <select
              className="form-select"
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            >
              <option value="">Sélectionner un motif...</option>
              <option value="ADJUSTMENT">Ajustement manuel</option>
              <option value="DAMAGE">Produit endommagé</option>
              <option value="RETURN">Retour client</option>
              <option value="TRANSFER">Transfert d&apos;entrepôt</option>
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
              rows={8}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Veuillez expliquer la raison de cet ajustement..."
            ></textarea>
          </div>
        </div>
      </div>

      <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
        <button type="button" className="btn btn-outline-secondary">
          Annuler
        </button>
        <button
          type="submit"
          className={`btn ${adjustmentType === 'STOCK_IN' ? 'btn-success' : 'btn-danger'}`}
        >
          <i
            className={`icofont-${adjustmentType === 'STOCK_IN' ? 'plus' : 'minus'}-circle me-1`}
          ></i>
          {adjustmentType === 'STOCK_IN'
            ? 'Ajouter au stock'
            : 'Retirer du stock'}
        </button>
      </div>
    </form>
  );
};
export default AdjustmentForm;
