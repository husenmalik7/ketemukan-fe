import React from 'react';
import { NavLink } from 'react-router-dom';

function NavAvatarItem({ name, to, onClick }) {
  return (
    <li>
      <NavLink
        to={to}
        onClick={onClick}
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        {name}
      </NavLink>
    </li>
  );
}

export default NavAvatarItem;
