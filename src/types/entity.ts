// This file was auto-generated by prisma-generator-typescript-interfaces

export type ProfileName = 'CUSTOMER' | 'ADMIN' | 'PARTNER';

export type TokenStatus = 'ACTIVE' | 'REVOKED';

export type VisibilityType = 'DRAFT' | 'VISIBLE' | 'HIDDEN' | 'ARCHIVED';

export type UOMType = 'WEIGHT' | 'VOLUME' | 'OTHER';

export type RecipeDifficultyType = 'EASY' | 'MEDIUM' | 'HARD';

export interface User {
  id: string;
  username: string;
  email: string;
  profiles: ProfileName[];
  password: string;
  email_verified_at: String | null;
  tokenFamilies?: TokenFamily[];
  recipes?: Recipe[];
  createdAt: Date;
  updatedAt: Date;
}

export interface TokenFamily {
  id: number;
  family: string;
  deviceModel: string;
  ipAddress: string;
  userAgent: string;
  acceptLang: string;
  deviceType: string;
  deviceBrand: string;
  osName: string;
  osVersion: string;
  clientName: string;
  clientType: string;
  clientVersion: string;
  status: TokenStatus;
  createdAt: Date;
  updatedAt: Date;
  user?: User;
  userId: string;
  RefreshToken?: RefreshToken[];
}

export interface RefreshToken {
  id: number;
  token: string;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
  status: TokenStatus;
  family?: TokenFamily;
  familyId: number;
  childrenTokens?: RefreshToken[];
  parentToken?: RefreshToken | null;
  parentTokenId: number | null;
}

export interface Origin {
  id: number;
  country: string;
  createdAt: Date;
  updatedAt: Date;
  products?: Product[];
}

export interface ProductCategory {
  id: number;
  name: string;
  description: string | null;
  imageRef: string | null;
  imageUrl: string | null;
  slug: string | null;
  subcategories?: ProductSubcategory[];
  Product?: Product[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductSubcategory {
  id: number;
  name: string;
  description: string | null;
  imageRef: string | null;
  imageUrl: string | null;
  slug: string | null;
  categoryId: number;
  category?: ProductCategory;
  products?: Product[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Supplier {
  id: number;
  name: string;
  address1: string;
  address2: string | null;
  city: string;
  state: string | null;
  postalCode: string;
  country: string;
  imageRef: string | null;
  products?: Product[];
  createdAt: Date;
  updatedAt: Date;
}

export interface MarginLevel {
  id: number;
  name: string;
  margin: number;
  products?: Product[];
  createdAt: Date;
  updatedAt: Date;
}

export interface UnitOfMeasure {
  id: number;
  name: string;
  type: UOMType;
  factor: number;
  isStandard: boolean;
  standardUnitId: number | null;
  derivedUnitOfMeasures?: UnitOfMeasure[];
  standardUnit?: UnitOfMeasure | null;
  ingredients?: Ingredient[];
  createdAt: Date;
  updatedAt: Date;
  volumeConversions?: VolumeConversion[];
}

export interface Product {
  id: string;
  name: string;
  isGlutenFree: boolean;
  isGMOFree: boolean;
  description: string | null;
  isActive: boolean;
  isPublic: boolean;
  visibility: VisibilityType;
  minimumStockLevel: number;
  quantity: number;
  additionalCost: number | null;
  imageRef: string | null;
  costPerGramWhole: number;
  costPerGramGround: number;
  pricePerGramWhole: number;
  pricePerGramGround: number;
  originId: number;
  subcategoryId: number | null;
  categoryId: number;
  supplierId: number;
  marginLevelId: number;
  ingredients?: Ingredient[];
  origin?: Origin;
  subCategory?: ProductSubcategory | null;
  category?: ProductCategory;
  supplier?: Supplier;
  marginLevel?: MarginLevel;
  createdAt: Date;
  updatedAt: Date;
  volumeConversion?: VolumeConversion | null;
}

export interface RecipeCategory {
  id: number;
  name: string;
  imageRef: string | null;
  imageUrl: string | null;
  slug: string | null;
  description: string | null;
  recipes?: RecipeCategoryLink[];
  createdAt: Date;
  updatedAt: Date;
}

export interface RecipeCategoryLink {
  id: number;
  recipeId: number;
  categoryId: number;
  recipe?: Recipe;
  category?: RecipeCategory;
  createdAt: Date;
  updatedAt: Date;
}

export interface Recipe {
  id: number;
  name: string;
  description: string | null;
  preparationTime: number;
  cookingTime: number | null;
  servings: number | null;
  isApproved: boolean;
  isPromoAwarded: boolean;
  difficulty: RecipeDifficultyType;
  visibility: VisibilityType;
  userId: string;
  categories?: RecipeCategoryLink[];
  ingrediants?: Ingredient[];
  steps?: Step[];
  author?: User;
  createdAt: Date;
  updatedAt: Date;
}

export interface Ingredient {
  id: number;
  quantity: number;
  grindRequired: boolean;
  recipeId: number;
  productId: string;
  unitOfMeasureId: number;
  unitOfMeasure?: UnitOfMeasure;
  product?: Product;
  recipe?: Recipe;
  createdAt: Date;
  updatedAt: Date;
}

export interface Step {
  id: number;
  recipeId: number;
  stepNumber: number;
  description: string;
  duration: number | null;
  recipe?: Recipe;
  createdAt: Date;
  updatedAt: Date;
}

export interface VolumeConversion {
  id: number;
  m1: number;
  m2: number;
  m3: number;
  avg: number;
  productId: string;
  stdVolId: number;
  stdVol?: UnitOfMeasure;
  product?: Product;
  createdAt: Date;
  updatedAt: Date;
}
