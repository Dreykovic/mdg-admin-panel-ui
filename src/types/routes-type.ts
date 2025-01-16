import { JSX, ReactNode } from 'react';

export type RoutesConfigType = {
  [key: string]: {
    navLink: string;
    name: string;
    path: string;
    component: () => JSX.Element;
    pageName: string;
  };
};

export type NavType = {
  label: string;
  path: string;
  icon: ReactNode;
};
