import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { RootState } from '@/store';

import { ISideBarLink } from './sidebar-content';
type Props = {
  link: ISideBarLink;
};

const SidebarNavLink = ({ link }: Props) => {
  const { name, group } = useSelector((state: RootState) => state.page);

  const [isLinkActive, setIsLinkActive] = useState<boolean>(false);

  useEffect(() => {
    const checkPage =
      link.targetPageName === name || link.targetModuleName === group;

    checkPage ? setIsLinkActive(true) : setIsLinkActive(false);
  }, [name, group, link]);
  return (
    <>
      <Link
        className={`${link.isMenu ? 'm-link' : 'ms-link'} ${isLinkActive ? 'active' : ''}`}
        data-bs-toggle={link.collapse ? 'collapse' : ''}
        data-bs-target={link.collapse ? '#' + link.id : ''}
        to={link.collapse ? '#' : link.link}
      >
        {link.icon}
        <span>{link.label}</span>
        {link.collapse ? (
          <span className="arrow icofont-dotted-down ms-auto text-end fs-5"></span>
        ) : (
          ''
        )}
      </Link>
    </>
  );
};

export default SidebarNavLink;
