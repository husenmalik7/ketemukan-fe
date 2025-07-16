import { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

function Navbar({ username, logout }) {
  const [dropdownAvatarOpen, setDropdownAvatarOpen] = useState(false);
  const [dropdownLinkOpen, setDropdownLinkOpen] = useState(false);

  const navbarRef = useRef(null);

  const NavLinkItem = ({ name, to }) => {
    return (
      <li>
        <NavLink
          to={to}
          className={({ isActive }) =>
            `block rounded-sm px-3 py-2 md:p-0 ${isActive ? 'bg-blue-700 text-white md:bg-transparent md:text-blue-700 md:dark:text-blue-500' : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-blue-500'} `
          }
        >
          {name}
        </NavLink>
      </li>
    );
  };

  const NavAvatarItem = ({ name, to, onClick }) => {
    return (
      <li>
        <NavLink
          to={to}
          onClick={onClick}
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
        >
          {name}
        </NavLink>
      </li>
    );
  };

  const NavLogin = () => {
    return (
      <div className="relative ml-auto flex items-center space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse">
        <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 rtl:space-x-reverse dark:border-gray-700 dark:bg-gray-800 md:dark:bg-gray-900">
          <NavLinkItem name="Login" to="/login" />
        </ul>
      </div>
    );
  };

  const NavAvatar = () => {
    return (
      <div className="relative ml-auto flex items-center space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse">
        {/* Avatar */}
        <button
          type="button"
          className="flex cursor-pointer rounded-full text-sm focus:ring-4 focus:ring-gray-300 md:me-0 dark:focus:ring-gray-600"
          id="user-menu-button"
          aria-expanded="false"
          data-dropdown-toggle="user-dropdown"
          data-dropdown-placement="bottom"
          onClick={() => setDropdownAvatarOpen(!dropdownAvatarOpen)}
        >
          <span className="sr-only">Open user menu</span>
          <img className="h-8 w-8 rounded-full" src="https://picsum.photos/200" alt="user photo" />
        </button>

        {/* Dropdown Avatar */}
        <div
          className={`${dropdownAvatarOpen ? '' : 'hidden'} absolute top-full right-0 z-50 my-4 list-none divide-y divide-gray-100 rounded-lg bg-white text-base shadow-sm dark:divide-gray-600 dark:bg-gray-700`}
          id="user-dropdown"
        >
          <div className="px-4 py-3">
            <span className="block text-sm text-gray-900 dark:text-white">Bonnie Green</span>
            <span className="block truncate text-sm text-gray-500 dark:text-gray-400">
              name@flowbite.com
            </span>
          </div>
          <ul className="py-2" aria-labelledby="user-menu-button">
            <NavAvatarItem
              name="Profile"
              to="/profile"
              onClick={() => setDropdownAvatarOpen(false)}
            />
            <NavAvatarItem name="Sign out" onClick={logout} />
          </ul>
        </div>

        {/* Hamburger */}
        <button
          data-collapse-toggle="navbar-user"
          type="button"
          className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 focus:outline-none md:hidden dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-user"
          aria-expanded="false"
          onClick={() => setDropdownLinkOpen(!dropdownLinkOpen)}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="h-5 w-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
      </div>
    );
  };

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
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center gap-12 p-4">
        {/* Logo */}
        <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Flowbite
          </span>
        </a>

        {/* Avatar Container or Login */}
        {username ? <NavAvatar /> : <NavLogin />}

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
