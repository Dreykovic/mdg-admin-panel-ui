// Enums
export enum ProfileName {
  CUSTOMER = 'CUSTOMER',
  ADMIN = 'ADMIN',
  PARTNER = 'PARTNER',
}

export enum TokenStatus {
  ACTIVE = 'ACTIVE',
  REVOKED = 'REVOKED',
}

export enum MediaType {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
}

export enum StockMovementType {
  ADDITION = 'ADDITION',
  REMOVAL = 'REMOVAL',
  CORRECTION = 'CORRECTION',
}

export enum UOMType {
  WEIGHT = 'WEIGHT',
  VOLUME = 'VOLUME',
  OTHER = 'OTHER',
}

// Base Entity
export interface BaseEntity {
  id: string | number;
  createdAt: Date;
  updatedAt: Date;
}

// User Types
export interface User extends BaseEntity {
  username: string;
  email: string;
  profiles: ProfileName[];
  password: string;
  emailVerifiedAt?: Date;

  userProfile: UserProfile[];
}

export interface UserProfile extends BaseEntity {
  salutation?: string;
  firstName: string;
  lastName: string;
  phone?: string;
  address1: string;
  address2?: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
  userId: string;
}

export interface Origin extends BaseEntity {
  code: string;
  country: string;
  productDetails: Product[];
}

export interface ProductCategory extends BaseEntity {
  name: string;
  imageRef?: string;
  imageUrl?: string;
  slug?: string;
  productDetails: Product[];
  subcategories: ProductSubcategory[];
}

export interface ProductSubcategory extends BaseEntity {
  name: string;
  imageRef?: string;
  imageUrl?: string;
  slug?: string;
  categoryId: number;
  productDetails: Product[];
}

export interface Supplier extends BaseEntity {
  // Properties
  name: string; // Nom du fournisseur
  address1: string; // Adresse ligne 1
  address2?: string; // Adresse ligne 2
  city: string; // Ville
  state?: string; // État ou région
  postalCode: string; // Code postal
  country: string; // Pays
  // Relations
  imageRef?: string;
  productDetails: Product[];
}

export interface MarginLevel extends BaseEntity {
  // Properties
  name: string; // Nom du fournisseur
  margin: number;
  productDetails: Product[];
}
export interface UnitOfMesure extends BaseEntity {
  // Properties
  name: string; // Nom du fournisseur
  type: UOMType;
  factor: number;
  isStandard: number;
  unitOfMesureId: number;
  productDetails: Product[];
}

export interface Product extends BaseEntity {
  name: string;
  isGlutenFree: boolean;
  isGMOFree: boolean;
  description?: string;
  barcode: string;
  isActive: boolean;
  minimumStockLevel: number;
  quantity: number;
  additionalCost?: number;
  costPerGramWhole: number;
  costPerGramGround: number;
  pricePerGramWhole: number;
  pricePerGramGround: number;
  originId: number;
  subcategoryId?: number;
  categoryId: number;
  supplierId: number;
  marginLevelId: number;

  unitOfMesureId: number;
  productMedia: ProductMedia[];
  stockMovements: StockMovement[];
  category: ProductCategory;
}

export interface StockMovement extends BaseEntity {
  productId: string;
  quantity: number;
  type: StockMovementType;
  description?: string;
}

export interface ProductMedia extends BaseEntity {
  url: string;
  type: MediaType;
  altText?: string;
  isPrimary: boolean;
  width?: number;
  height?: number;
  size?: number;
  duration?: number;
  order?: number;
  position?: string;
  mediaCategoryId: string;
  productId: string;
}
