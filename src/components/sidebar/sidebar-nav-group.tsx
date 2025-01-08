import { ISideBarLink } from './sidebar-content';
import SidebarNavLink from './sidebar-nav-link';
type Props = {
  link: ISideBarLink;
};

const SidebarNavGroup = ({ link }: Props) => {
  return (
    <>
      <li className={link.collapse ? 'collapsed' : undefined}>
        <SidebarNavLink link={link} />

        {link.collapse && link.subLinks && link.subLinks.length > 0 ? (
          // <ul
          //   className={`sub-menu ${collapsing ? 'collapsing' : 'collapse'} ${show ? 'show ' : ''}`}
          //   id={link.id}
          // >
          <ul className={`sub-menu collapse`} id={link.id}>
            {link.subLinks.map((subLink) => (
              <li key={subLink.id}>
                <SidebarNavLink link={subLink} />
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
