import { useState } from 'react';

import { Product, Inventory } from '@/types/entity';

import AdjustmentForm from './adjustment-form';
import InventorySummary from './inventory-summary';
import MovementHistory from './movement-history';
import ReconciliationForm from './reconciliation-form';
import RestockForm from './restock-form';

// Composant principal de gestion d'inventaire
const InventoryManagement = ({
  sampleInventory,
}: {
  selectedProduct: Product;
  sampleInventory: Inventory;
}) => {
  const [activeTab, setActiveTab] = useState<string>('history');

  return (
    <>
      <h1 className="mb-4 text-primary fw-bold">Gestion d&apos;Inventaire</h1>
      <InventorySummary inventory={sampleInventory} />
      <div className="card shadow-sm border-0">
        <div className="card-header bg-white">
          <ul className="nav nav-tabs card-header-tabs">
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'history' ? 'active bg-primary text-white' : ''}`}
                onClick={() => setActiveTab('history')}
              >
                <i className="icofont-history me-2"></i>Historique
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'restock' ? 'active bg-primary text-white' : ''}`}
                onClick={() => setActiveTab('restock')}
              >
                <i className="icofont-refresh me-2"></i>Restock
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'reconcile' ? 'active bg-primary text-white' : ''}`}
                onClick={() => setActiveTab('reconcile')}
              >
                <i className="icofont-check-circled me-2"></i>Réconciliation
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'adjust' ? 'active bg-primary text-white' : ''}`}
                onClick={() => setActiveTab('adjust')}
              >
                <i className="icofont-ui-settings me-2"></i>Réajustement
              </button>
            </li>
          </ul>
        </div>

        <div className="card-body">
          {activeTab === 'history' && (
            <MovementHistory inventory={sampleInventory} />
          )}
          {activeTab === 'restock' && (
            <RestockForm inventory={sampleInventory} />
          )}
          {activeTab === 'reconcile' && (
            <ReconciliationForm inventory={sampleInventory} />
          )}
          {activeTab === 'adjust' && (
            <AdjustmentForm inventory={sampleInventory} />
          )}
        </div>
      </div>
    </>
  );
};

export default InventoryManagement;
