import * as Icon from 'react-bootstrap-icons';

export interface ISideBarLink {
  id: string;
  targetPageName?: string;
  targetModuleName?: string;
  icon?: React.ReactNode;
  label: string;
  collapse: boolean;
  link: string;
  subLinks?: ISideBarLink[];
}
const IconClasses = 'fs-5 mb-2 mx-2';
export const data: ISideBarLink[] = [
  {
    id: 'home',
    targetPageName: 'home',
    icon: <Icon.HouseFill className={IconClasses} />,
    label: 'Dashboard',
    collapse: false,
    link: '/',
  },
  {
    id: 'resourceNavId',
    collapse: true,
    icon: <Icon.PersonFill className={IconClasses} />,
    label: 'Resources',
    link: '',
    targetModuleName: 'resources',
    subLinks: [
      {
        id: 'categoryNavId',
        collapse: false,
        label: 'Categories',
        link: '/categories',
        targetPageName: 'category-list',
      },
    ],
  },
];
