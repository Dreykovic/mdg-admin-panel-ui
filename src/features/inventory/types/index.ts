import { ValuationMethod } from '@/types/entity';

/**
 * Interface pour les métadonnées d'inventaire
 */
export interface InventoryMetadata {
  // Champs de quantité
  quantity: number;
  availableQuantity?: number;
  minimumQuantity?: number;
  maximumQuantity?: number;
  safetyStockLevel?: number;
  reservedQuantity?: number;

  // Champs de réapprovisionnement
  reorderThreshold: number;
  reorderQuantity: number;
  economicOrderQuantity?: number;
  leadTimeInDays?: number;

  // Champs de coût et valorisation
  unitCost?: number;
  valuationMethod?: ValuationMethod;

  // Statuts
  inStock: boolean | string;
  backOrderable: boolean | string;

  // Informations d'emplacement et dates
  stockLocation?: string;
  lastStockCheck?: Date;
  nextScheduledCheck?: Date;
  lastReceivedDate?: Date;
  expiryDate?: Date;

  // Informations additionnelles
  notes?: string;
}

/**
 * Interface pour la payload de création d'inventaire
 */
export interface CreateInventoryPayload {
  sku: string;
  warehouseId?: string;
  inventoryMetaData: InventoryMetadata;
}

/**
 * Interface pour les mouvements de stock
 */
export interface StockMovementPayload {
  inventoryId: string;
  productId: string;
  quantity: number;
  unitCost?: number;
  movementType: string;
  reason?: string;
  notes?: string;
  lotNumber?: string;
  expiryDate?: string | Date;
  batchId?: string;
  isAdjustment?: boolean;
  documentNumber?: string;
  scheduledAt?: string | Date;
  sourceWarehouseId?: string;
  destinationWarehouseId?: string;
}

/**
 * Types d'action pour les mouvements de stock
 */
export type StockMovementAction = 'approve' | 'start' | 'complete' | 'cancel';

/**
 * Interface pour le résumé d'inventaire
 */
export interface InventorySummary {
  total: number;
  inStock: number;
  lowStock: number;
  outOfStock: number;
  totalValue: number;
}

/**
 * Interface pour les entrepôts
 */
export interface Warehouse {
  id: string;
  name: string;
  location?: string;
  isDefault: boolean;
}

/**
 * Types d'onglets pour le formulaire d'inventaire
 */
export type InventoryFormTab = 'quantities' | 'cost' | 'location' | 'overview';
