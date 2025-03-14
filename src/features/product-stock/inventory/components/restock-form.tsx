import React, { useState } from 'react';

import { Inventory } from '@/types/entity';

interface RestockFormProps {
  inventory: Inventory;
}
// Formulaire de réapprovisionnement
const RestockForm: React.FC<RestockFormProps> = ({ inventory }) => {
  const [quantity, setQuantity] = useState<number>(inventory.reorderQuantity);
  const [notes, setNotes] = useState<string>('');
  const [supplierOrder, setSupplierOrder] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Restock order submitted:', {
      inventoryId: inventory.id,
      quantity,
      supplierOrder,
      notes,
    });
    // Logique de soumission ici
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="quantity" className="form-label fw-bold">
              Quantité à réapprovisionner
            </label>
            <input
              type="number"
              className="form-control"
              id="quantity"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            />
            <small className="text-muted">
              Quantité recommandée: {inventory.reorderQuantity}
            </small>
          </div>

          <div className="mb-3">
            <label htmlFor="supplierOrder" className="form-label fw-bold">
              N° Commande Fournisseur
            </label>
            <input
              type="text"
              className="form-control"
              id="supplierOrder"
              value={supplierOrder}
              onChange={(e) => setSupplierOrder(e.target.value)}
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="notes" className="form-label fw-bold">
              Notes
            </label>
            <textarea
              className="form-control"
              id="notes"
              rows={5}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>
          </div>
        </div>
      </div>

      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
        <button type="button" className="btn btn-outline-secondary">
          Cancel
        </button>
        <button type="submit" className="btn btn-success">
          <i className="icofont-check-circled me-1"></i>
          Confirm restock
        </button>
      </div>
    </form>
  );
};
export default RestockForm;
