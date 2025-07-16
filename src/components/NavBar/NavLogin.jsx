import React from 'react';
import NavLinkItem from './NavLinkItem';

function NavLogin() {
  return (
    <div className="relative ml-auto flex items-center space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse">
      <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 rtl:space-x-reverse dark:border-gray-700 dark:bg-gray-800 md:dark:bg-gray-900">
        <NavLinkItem name="Login" to="/login" />
      </ul>
    </div>
  );
}

export default NavLogin;
