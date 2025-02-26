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

export type ISideBarLinkModule = Record<string, ISideBarLink[]>;

export const data: ISideBarLinkModule = {
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
};
