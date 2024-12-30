import { ReactNode } from 'react';

export type RoutesConfigType = {
  [key: string]: {
    navLink: string;
    name: string;
    path: string;
    component: ReactNode;
    pageName: string;
  };
};

export type NavType = {
  label: string;
  path: string;
  icon: ReactNode;
};
