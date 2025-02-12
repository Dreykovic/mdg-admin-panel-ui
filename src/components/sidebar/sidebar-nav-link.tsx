import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { RootState } from '@/store';
import { ISideBarLink } from './sidebar-content';
import { usePrefetch } from '@/store/api-slice';

type Props = {
  link: ISideBarLink;
};

const SidebarNavLink = ({ link }: Props) => {
  const { name, group } = useSelector((state: RootState) => state.page);

  // ✅ Vérifie que prefetchQuery existe avant d'utiliser usePrefetch
  const prefetch = link.prefetchQuery ? usePrefetch('getSomeUnits') : null;

  const [isLinkActive, setIsLinkActive] = useState<boolean>(false);

  useEffect(() => {
    const checkPage =
      link.targetPageName === name || link.targetModuleName === group;

    setIsLinkActive(checkPage);
  }, [name, group, link]);

  return (
    <Link
      className={`${link.isMenu ? 'm-link' : 'ms-link'} ${isLinkActive ? 'active' : ''}`}
      data-bs-toggle={link.collapse ? 'collapse' : undefined}
      data-bs-target={link.collapse ? '#' + link.id : undefined}
      to={link.collapse ? '#' : link.link}
      onMouseEnter={() => prefetch && prefetch({ page: 1 })} // ✅ Vérification avant d’appeler
      onFocus={() => prefetch && prefetch({ page: 1 })} // ✅ Vérification avant d’appeler
    >
      {link.icon}
      <span>{link.label}</span>
      {link.collapse && (
        <span className="arrow icofont-dotted-down ms-auto text-end fs-5"></span>
      )}
    </Link>
  );
};

export default SidebarNavLink;
