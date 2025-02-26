import { useEffect, useMemo, useRef, useState } from 'react';
import * as Icon from 'react-bootstrap-icons';
import { useSelector } from 'react-redux';

import useBoundingClientRect from '@/hooks/use-bounding-client-rect';
import useWindowDimensions from '@/hooks/use-window-dimensions';
import { RootState } from '@/store';

import { data } from './sidebar-content';
import SidebarMinifier from './sidebar-minifier';
import SidebarNavGroup from './sidebar-nav-group';
import ThemeSwitcher from './theme-switcher';

const SideBar = () => {
  const mainContentRef = useRef<HTMLDivElement>(null);
  const { width, height } = useWindowDimensions();
  const [rect, ref] = useBoundingClientRect<HTMLDivElement>();
  const [contentOverflow, setContentOverflow] = useState<'visible' | 'scroll'>(
    'visible',
  );

  const { isMinified, isOpened } = useSelector(
    (state: RootState) => state.sidebar,
  );
  // const { name } = useSelector((state: RootState) => state.page);
  const [sidebarState, setSidebarState] = useState<string>('');
  const [sidebarOpenedClass, setSidebarOpenedClass] = useState<string>('');
  useEffect(() => {
    isMinified ? setSidebarState('sidebar-mini') : setSidebarState('');
    isOpened ? setSidebarOpenedClass('open') : setSidebarOpenedClass('');

    if (rect) {
      if (rect.height <= 780 + 48 && sidebarState === 'sidebar-mini') {
        setContentOverflow('scroll');
      }
    }
  }, [ref, isMinified, rect, height, width, isOpened]);
  const contentRender = useMemo(() => {
    return Object.keys(data).map((module) => {
      return (
        <div className="mt-3">
          <span className={`text-muted text-uppercase my-2 font-weight-bold`}>
            {module}
          </span>
          {data[module].map((link) => (
            <SidebarNavGroup link={link} key={link.id} />
          ))}
        </div>
      );
    });
  }, []);
  return (
    <>
      <div
        className={`sidebar px-4 py-4 py-md-5 me-0 ${sidebarState} ${sidebarOpenedClass}`}
        style={{
          overflowX: contentOverflow,
        }}
        ref={mainContentRef}
      >
        <div className="d-flex flex-column h-100">
          <a href="index.html" className="mb-0 brand-icon">
            <span className="logo-icon">
              <Icon.House className="w-10 h-10" />
            </span>
            <span className="logo-text">MDG</span>
          </a>

          <ul className="menu-list flex-grow-1 mt-3">{contentRender}</ul>

          <ThemeSwitcher />
          <SidebarMinifier isMinified={isMinified} />
        </div>
      </div>
    </>
  );
};

export default SideBar;
