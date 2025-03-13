// src/routes/config.ts
import React from 'react';

import NotFound from '@/components/ui/not-found'; // Add this component for 404 handling
// Resources
import Changelog from '@/pages/changelog';
// Catalog - Compositions
import RecipeDetailsPage from '@/pages/compositions/recipe-details-page';
import RecipesPage from '@/pages/compositions/recipes-page';
// Catalog - Goods
import InventoryCreatePage from '@/pages/goods/add-inventory-page';
import AddProductPage from '@/pages/goods/add-product-page';
import CategoriesPage from '@/pages/goods/categories-page';
import MarginsPage from '@/pages/goods/margins-page';
import OriginsPage from '@/pages/goods/origins-page';
import ProductDetailsPage from '@/pages/goods/product-details-page';
import ProductsPage from '@/pages/goods/products-page';
import SuppliersPage from '@/pages/goods/suppliers-page';
import UnitsPage from '@/pages/goods/units-page';
// Home & Auth
import Home from '@/pages/home';
import Login from '@/pages/login';

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
