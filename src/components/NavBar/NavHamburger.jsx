import React from 'react';

function NavHamburger({ dropdownLinkOpen, setDropdownLinkOpen }) {
  return (
    <button
      data-collapse-toggle="navbar-user"
      type="button"
      className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 focus:outline-none md:hidden"
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
  );
}

export default NavHamburger;
