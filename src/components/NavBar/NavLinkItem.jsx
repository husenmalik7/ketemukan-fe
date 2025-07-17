import React from 'react';
import { NavLink } from 'react-router-dom';

function NavLinkItem({ name, to }) {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `block rounded-sm px-3 py-2 md:p-0 ${isActive ? 'bg-red-700 text-white md:bg-transparent md:text-red-700 md:dark:text-red-500' : 'text-gray-500 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-700 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-red-500'} `
        }
      >
        {name}
      </NavLink>
    </li>
  );
}

export default NavLinkItem;
