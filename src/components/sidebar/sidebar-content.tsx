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
    icon: <i className="icofont-paint"></i>,
    label: 'Dashboard',
    collapse: false,
    link: '/',
    isMenu: true,
  },

  {
    id: 'settingsNavId',
    collapse: true,
    icon: <i className="icofont-paint"></i>,
    label: 'Settings',
    link: '',
    isMenu: true,

    targetModuleName: 'settings',
    subLinks: [
      {
        id: 'supplierNavId',
        collapse: false,
        label: 'Suppliers',
        link: '/settings/suppliers',
        targetPageName: 'supplier-list',
        isMenu: false,
      },
      {
        id: 'marginNavId',
        collapse: false,
        label: 'Margin Levels',
        link: '/settings/margins',
        targetPageName: 'margin-list',
        isMenu: false,
      },
      {
        id: 'unitNavId',
        collapse: false,
        label: 'Units Of Mesure',
        link: '/settings/units',
        targetPageName: 'unit-list',
        isMenu: false,
      },
    ],
  },
  {
    id: 'productNavId',
    collapse: true,
    icon: <i className="icofont-paint"></i>,
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
];
