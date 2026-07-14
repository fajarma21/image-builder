import css from './View.module.scss';
import type { SidebarProps } from './View.types';

const Sidebar = ({ children }: SidebarProps) => {
  return <div className={css.sidebar}>{children}</div>;
};

export default Sidebar;
