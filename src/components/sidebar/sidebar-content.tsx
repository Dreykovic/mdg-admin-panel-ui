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
}

export const data: ISideBarLink[] = [
  {
    id: 'home',
    targetPageName: 'home',
    icon: <i className="icofont-home"></i>,
    label: 'Dashboard',
    collapse: false,
    link: '/',
    isMenu: true,
  },
  {
    id: 'recipeNavId',
    collapse: false,
    icon: <i className="icofont-culinary"></i>,
    label: 'Recipes',

    targetModuleName: 'recipes',

    link: '/recipes',
    targetPageName: 'recipe-list',
    isMenu: true,
  },
  {
    id: 'unitNavId',
    collapse: false,
    label: 'Units Of Mesure',
    link: '/settings/units',
    targetPageName: 'unit-list',
    isMenu: true,

    icon: <i className="icofont-measure"></i>,
  },
  {
    id: 'productNavId',
    collapse: true,
    icon: <i className="icofont-food-cart"></i>,
    label: 'Products',
    link: '',
    isMenu: true,

    targetModuleName: 'products',
    subLinks: [
      {
        id: 'productNavId',
        collapse: false,
        label: 'List',
        link: '/products',
        targetPageName: 'product-list',
        isMenu: false,
      },
      {
        id: 'AddProductNavId',
        collapse: false,
        label: 'Add',
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
      },
    ],
  },

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
      },
      {
        id: 'originNavId',
        collapse: false,
        label: 'Origins',
        link: '/product-settings/origins',
        targetPageName: 'origin-list',
        isMenu: false,
      },
      {
        id: 'marginNavId',
        collapse: false,
        label: 'Margin Levels',
        link: '/product-settings/margins',
        targetPageName: 'margin-list',
        isMenu: false,
      },
    ],
  },
  {
    id: 'changelogNavId',
    collapse: false,
    label: 'Changelog',
    link: '/Changelog',
    targetPageName: 'changelog',
    isMenu: true,

    icon: <i className="icofont-edit"></i>,
  },
];
