import { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import NavLogin from './NavLogin';
import NavAvatar from './NavAvatar';
import NavLinkItem from './NavLinkItem';
import NavHamburger from './NavHamburger';

function Navbar({ username, fullname, logout }) {
  const [dropdownAvatarOpen, setDropdownAvatarOpen] = useState(false);
  const [dropdownLinkOpen, setDropdownLinkOpen] = useState(false);

  const navbarRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setDropdownAvatarOpen(false);
        setDropdownLinkOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav
      ref={navbarRef}
      className="fixed start-0 top-0 z-20 w-full border-b border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-900"
    >
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center p-2 px-8">
        {/* Logo */}
        <NavLink to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="/images/ketemukan2.png" className="h-12 pr-8" alt="Logo Ketemukan" />
        </NavLink>

        {/* Avatar Container or Login */}
        <div className="relative ml-auto flex items-center space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse">
          {username ? (
            <NavAvatar
              dropdownAvatarOpen={dropdownAvatarOpen}
              setDropdownAvatarOpen={setDropdownAvatarOpen}
              fullname={fullname}
              username={username}
              logout={logout}
            />
          ) : (
            <NavLogin />
          )}

          {/* Hamburger */}
          <NavHamburger
            dropdownLinkOpen={dropdownLinkOpen}
            setDropdownLinkOpen={setDropdownLinkOpen}
          />
        </div>

        {/* Link */}
        <div
          className={`${dropdownLinkOpen ? '' : 'hidden'} w-full items-center justify-between md:order-1 md:flex md:w-auto`}
          id="navbar-user"
        >
          <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 rtl:space-x-reverse dark:border-gray-700 dark:bg-gray-800 md:dark:bg-gray-900">
            <NavLinkItem name="Home" to="/" />
            <NavLinkItem name="Lost" to="/lost" />
            <NavLinkItem name="Found" to="/found" />
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
