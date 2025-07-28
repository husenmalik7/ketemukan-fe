import React from 'react';
import NavLinkItem from './NavLinkItem';

function NavLogin() {
  return (
    <div className="list-none font-medium">
      <NavLinkItem name="Login" to="/login" />
    </div>
  );
}

export default NavLogin;
