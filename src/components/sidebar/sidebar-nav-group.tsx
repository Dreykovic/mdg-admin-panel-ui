import { useState } from 'react';

import { ISideBarLink } from './sidebar-content';
import SidebarNavLink from './sidebar-nav-link';
type Props = {
  link: ISideBarLink;
};

const SidebarNavGroup = ({ link }: Props) => {
  const [show, setShow] = useState<boolean>(true);
  const toggleShow = () => {
    show ? setShow(false) : setShow(true);
  };

  return (
    <>
      <li className="collapsed">
        <SidebarNavLink link={link} toggleShow={toggleShow} show={show} />

        {link.collapse && link.subLinks && link.subLinks.length > 0 ? (
          <ul
            className={`sub-menu collapse ${show ? 'show fade' : ''}`}
            id={link.id}
          >
            {link.subLinks.map((subLink) => (
              <li key={subLink.id}>
                <SidebarNavLink
                  link={subLink}
                  toggleShow={toggleShow}
                  show={show}
                />
              </li>
            ))}
          </ul>
        ) : (
          ''
        )}
      </li>
    </>
  );
};

export default SidebarNavGroup;
