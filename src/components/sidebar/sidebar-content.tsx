import { PrefetchEndpoints } from '@/store/api';

export interface ISideBarLink {
  id: string;
  targetPageName?: string;
  targetModuleName?: string;
  icon?: React.ReactNode;
  label: string;
  collapse: boolean;
  link: string;
  subLinks?: ISideBarLink[];
  isMenu: boolean;
  prefetchQuery?: PrefetchEndpoints; // 🔥 Correctif ici !
}

export type ISideBarLinkModule = Record<string, ISideBarLink[]>;

export const data: ISideBarLinkModule = {
  //DASHBOARDS
  Dashboards: [
    // Home
    {
      id: 'home',
      targetPageName: 'home',
      icon: <i className="icofont-home"></i>,
      label: 'Dashboard',
      collapse: false,
      link: '/',
      isMenu: true,
    },
  ],
  Catalog: [
    // Goods
    {
      id: 'goodsNavId',
      collapse: true,
      icon: <i className="icofont-food-cart"></i>,
      label: 'Goods',
      link: '',
      isMenu: true,

      targetModuleName: 'goods',
      subLinks: [
        // Products List
        {
          id: 'productNavId',
          collapse: false,
          label: 'Products',
          link: '/catalog/goods/products',
          targetPageName: 'product-list',
          isMenu: false,
          prefetchQuery: 'getSomeProducts', // <-- Précharger les recettes
        },
        // Add Product

        {
          id: 'AddProductNavId',
          collapse: false,
          label: 'Add Product',
          link: '/catalog/goods/products/add',
          targetPageName: 'add-product',
          isMenu: false,
        },

        // Categories
        {
          id: 'categoryNavId',
          collapse: false,
          label: 'Categories',
          link: '/catalog/goods/categories',
          targetPageName: 'category-list',
          isMenu: false,
          prefetchQuery: 'getSomeCategories', // <-- Précharger les recettes
        },
        // Suppliers
        {
          id: 'supplierNavId',
          collapse: false,
          label: 'Suppliers',
          link: '/catalog/goods/suppliers',
          targetPageName: 'supplier-list',
          isMenu: false,
          prefetchQuery: 'getSomeSuppliers', // <-- Précharger les recettes
        },
        // Origins
        {
          id: 'originNavId',
          collapse: false,
          label: 'Origins',
          link: '/catalog/goods/origins',
          targetPageName: 'origin-list',
          isMenu: false,
          prefetchQuery: 'getSomeOrigins', // <-- Précharger les recettes
        },
        // Margins
        {
          id: 'marginNavId',
          collapse: false,
          label: 'Margin Levels',
          link: 'catalog/goods/margins',
          targetPageName: 'margin-list',
          isMenu: false,
          prefetchQuery: 'getSomeMargins', // <-- Précharger les recettes
        },
        // Units
        {
          id: 'unitNavId',
          collapse: false,
          label: 'Units Of Mesure',
          link: '/catalog/goods/units',
          targetPageName: 'unit-list',
          isMenu: false,
          prefetchQuery: 'getSomeUnits', // <-- Précharger les recettes
        },
      ],
    },
    // Compositions
    {
      id: 'compositionNavId',
      collapse: true,
      icon: <i className="icofont-culinary"></i>,
      label: 'Compositions',
      link: '',
      isMenu: true,

      targetModuleName: 'compositions',
      subLinks: [
        // Recipes List

        {
          id: 'recipeNavId',
          collapse: false,
          label: 'Recipes',

          link: 'catalog/compositions/recipes',
          targetPageName: 'recipe-list',
          isMenu: false,
          prefetchQuery: 'getSomeRecipes', // <-- Précharger les recettes
        },
      ],
    },
  ],
  Resources: [
    // ChangeLog
    {
      id: 'changelogNavId',
      collapse: false,
      label: 'Changelog',
      link: '/resources/Changelog',
      targetPageName: 'changelog',
      isMenu: true,

      icon: <i className="icofont-edit"></i>,
    },
  ],
};
