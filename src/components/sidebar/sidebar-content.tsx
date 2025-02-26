import { PrefetchEndpoints } from '@/store/base-api-slice';

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

export const data: ISideBarLink[] = [
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

  // Goods
  {
    id: 'productNavId',
    collapse: true,
    icon: <i className="icofont-food-cart"></i>,
    label: 'Goods',
    link: '',
    isMenu: true,

    targetModuleName: 'goods',
    // Products List
    subLinks: [
      {
        id: 'productNavId',
        collapse: false,
        label: 'Products',
        link: '/products',
        targetPageName: 'product-list',
        isMenu: false,
        prefetchQuery: 'getSomeProducts', // <-- Précharger les recettes
      },
      {
        id: 'AddProductNavId',
        collapse: false,
        label: 'Add Product',
        link: '/products/add',
        targetPageName: 'add-product',
        isMenu: false,
      },
      {
        id: 'categoryNavId',
        collapse: false,
        label: 'Categories',
        link: '/products/categories',
        targetPageName: 'category-list',
        isMenu: false,
        prefetchQuery: 'getSomeCategories', // <-- Précharger les recettes
      },
    ],
  },
  // Product Settings
  {
    id: 'productSettingsNavId',
    collapse: true,
    icon: <i className="icofont-laboratory"></i>,
    label: 'Product Settings',
    link: '',
    isMenu: true,

    targetModuleName: 'product-settings',
    subLinks: [
      {
        id: 'supplierNavId',
        collapse: false,
        label: 'Suppliers',
        link: '/product-settings/suppliers',
        targetPageName: 'supplier-list',
        isMenu: false,
        prefetchQuery: 'getSomeSuppliers', // <-- Précharger les recettes
      },
      {
        id: 'originNavId',
        collapse: false,
        label: 'Origins',
        link: '/product-settings/origins',
        targetPageName: 'origin-list',
        isMenu: false,
        prefetchQuery: 'getSomeOrigins', // <-- Précharger les recettes
      },
      {
        id: 'marginNavId',
        collapse: false,
        label: 'Margin Levels',
        link: '/product-settings/margins',
        targetPageName: 'margin-list',
        isMenu: false,
        prefetchQuery: 'getSomeMargins', // <-- Précharger les recettes
      },
    ],
  },
];
