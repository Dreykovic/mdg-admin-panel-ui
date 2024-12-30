import { useEffect, useState } from 'react';
import * as Icon from 'react-bootstrap-icons';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { RootState } from '@/store';

import { ISideBarLink } from './sidebar-content';
type Props = {
  link: ISideBarLink;
  toggleShow: () => void;
  show: boolean;
};

const SidebarNavLink = ({ link, toggleShow, show }: Props) => {
  const { name, group } = useSelector((state: RootState) => state.page);

  const [isLinkActive, setIsLinkActive] = useState<boolean>(false);

  useEffect(() => {
    const checkPage =
      link.targetPageName === name || link.targetModuleName === group;

    checkPage ? setIsLinkActive(true) : setIsLinkActive(false);
  }, [name, group]);
  return (
    <>
      <Link
        className={`m-link ${isLinkActive ? 'active' : ''}`}
        data-bs-toggle={link.collapse ? 'collapse' : ''}
        data-bs-target={link.collapse ? '#' + link.id : ''}
        to={link.collapse ? '#' : link.link}
        onClick={() => (link.collapse ? toggleShow() : () => {})}
      >
        {link.icon}
        <span>{link.label}</span>
        {link.collapse ? (
          <span className="arrow ms-auto text-end fs-5 text-white">
            {show ? <Icon.CaretDown /> : <Icon.CaretRight />}
          </span>
        ) : (
          ''
        )}
      </Link>
    </>
  );
};

export default SidebarNavLink;
