// src/router/config.ts
import React from 'react';

// Home & Auth - Keep these eager loaded for fast initial access
import NotFound from '@/components/ui/not-found';
import Home from '@/pages/home';
import Login from '@/pages/login';

// Lazy load all other components
// Goods
const CategoriesPage = React.lazy(
  () => import('@/pages/goods/categories-page'),
);
const OriginsPage = React.lazy(() => import('@/pages/goods/origins-page'));
const SuppliersPage = React.lazy(() => import('@/pages/goods/suppliers-page'));
const MarginsPage = React.lazy(() => import('@/pages/goods/margins-page'));
const UnitsPage = React.lazy(() => import('@/pages/goods/units-page'));
const ProductsPage = React.lazy(() => import('@/pages/goods/products-page'));
const ProductDetailsPage = React.lazy(
  () => import('@/pages/goods/product-details-page'),
);
const InventoryCreatePage = React.lazy(
  () => import('@/pages/goods/add-inventory-page'),
);
const AddProductPage = React.lazy(
  () => import('@/pages/goods/add-product-page'),
);

// Compositions
const RecipesPage = React.lazy(
  () => import('@/pages/compositions/recipes-page'),
);
const RecipeDetailsPage = React.lazy(
  () => import('@/pages/compositions/recipe-details-page'),
);

// Resources
const Changelog = React.lazy(() => import('@/pages/changelog'));

/**
 * Route configuration type
 */
export interface RouteConfig {
  navLink: string;
  name: string;
  path: string;
  component: React.ComponentType;
  pageName: string;
}

// Rest of your route configuration code remains the same
// ...

/**
 * Type for route configuration maps
 */
export type RoutesConfigType = Record<string, RouteConfig>;

/**
 * Routes for authenticated users
 */
export const authRoutesConfig: RoutesConfigType = {
  home: {
    navLink: 'homeNavId',
    name: 'home',
    path: '/',
    component: Home,
    pageName: 'Home',
  },

  // Goods section
  category: {
    navLink: 'categoryNavId',
    name: 'category-list',
    path: '/catalog/goods/categories',
    component: CategoriesPage,
    pageName: 'Categories Page',
  },
  origin: {
    navLink: 'originNavId',
    name: 'origin-list',
    path: '/catalog/goods/origins',
    component: OriginsPage,
    pageName: 'Origins Page',
  },
  supplier: {
    navLink: 'supplierNavId',
    name: 'supplier-list',
    path: '/catalog/goods/suppliers',
    component: SuppliersPage,
    pageName: 'Suppliers Page',
  },
  margin: {
    navLink: 'marginNavId',
    name: 'margin-list',
    path: '/catalog/goods/margins',
    component: MarginsPage,
    pageName: 'Margins Page',
  },
  unit: {
    navLink: 'unitNavId',
    name: 'unit-list',
    path: '/catalog/goods/units',
    component: UnitsPage,
    pageName: 'Units Page',
  },
  products: {
    navLink: 'productNavId',
    name: 'product-list',
    path: '/catalog/goods/products',
    component: ProductsPage,
    pageName: 'Products Page',
  },
  productDetails: {
    navLink: 'productDetailsNavId',
    name: 'product-details',
    path: '/catalog/goods/products/details/:productId',
    component: ProductDetailsPage,
    pageName: 'Product Details Page',
  },
  addInventory: {
    navLink: 'addInventoryNavId',
    name: 'add-inventory',
    path: '/catalog/goods/products/add-inventory/:sku',
    component: InventoryCreatePage,
    pageName: 'Inventory Create Page',
  },
  addProduct: {
    navLink: 'addProductNavId',
    name: 'add-product-list',
    path: '/catalog/goods/products/add',
    component: AddProductPage,
    pageName: 'Product Add Page',
  },

  // Compositions section
  recipes: {
    navLink: 'recipeNavId',
    name: 'recipe-list',
    path: '/catalog/compositions/recipes',
    component: RecipesPage,
    pageName: 'Recipes Page',
  },
  recipeEdit: {
    navLink: 'recipeEditNavId',
    name: 'recipe-edit',
    path: '/catalog/compositions/recipes/edit/:recipeId',
    component: RecipeDetailsPage,
    pageName: 'Recipes Edit',
  },

  // Resources section
  changelog: {
    navLink: 'changelogNavId',
    name: 'changelog',
    path: '/resources/changelog',
    component: Changelog,
    pageName: 'Changelog',
  },

  // Add a 404 route for authenticated users
  notFound: {
    navLink: 'notFoundNavId',
    name: 'not-found',
    path: '*',
    component: NotFound,
    pageName: 'Page Not Found',
  },
};

/**
 * Routes for unauthenticated users
 */
export const guestRoutesConfig: RoutesConfigType = {
  login: {
    navLink: 'loginNavId',
    name: 'login',
    path: '/',
    component: Login,
    pageName: 'Login',
  },

  // Add a 404 route for guests
  notFound: {
    navLink: 'notFoundNavId',
    name: 'not-found',
    path: '*',
    component: Login, // Redirect guests to login
    pageName: 'Not Found',
  },
};
