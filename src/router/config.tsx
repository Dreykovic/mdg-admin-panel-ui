// All components mapping with path for internal routes
//TODO: rendre les routes nommé

import Changelog from '@/pages/changelog';
import RecipeDetailsPage from '@/pages/compositions/recipe-details-page';
import RecipesPage from '@/pages/compositions/recipes-page';
import InventoryCreatePage from '@/pages/goods/add-inventory-page';
import AddProductPage from '@/pages/goods/add-product-page';
import CategoriesPage from '@/pages/goods/categories-page';
import MarginsPage from '@/pages/goods/margins-page';
import OriginsPage from '@/pages/goods/origins-page';
import ProductDetailsPage from '@/pages/goods/product-details-page';
import ProductsPage from '@/pages/goods/products-page';
import SuppliersPage from '@/pages/goods/suppliers-page';
import UnitsPage from '@/pages/goods/units-page';
import Home from '@/pages/home';
import Login from '@/pages/login';
import { RoutesConfigType } from '@/types/routes-type';

export const authRoutesConfig: RoutesConfigType = {
  home: {
    navLink: 'homeNavId',
    name: 'home',
    path: '/',
    component: Home,
    pageName: 'Home',
  },
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
  changelog: {
    navLink: 'changelogNavId',

    name: 'changelog',

    path: '/resources/changelog',
    component: Changelog,
    pageName: 'changelog',
  },
};
export const guestRoutesConfig: RoutesConfigType = {
  login: {
    navLink: 'homeNavId',

    name: 'login',
    path: '/', // the url
    component: Login, // view rendered
    pageName: '',
  },

  any: {
    navLink: 'homeNavId',

    name: 'any',
    path: '*', // the url
    component: Login, // view rendered
    pageName: '',
  },
};
