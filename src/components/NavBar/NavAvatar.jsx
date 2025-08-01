import React from 'react';
import NavAvatarItem from './NavAvatarItem';
import Cat from '../../assets/Cat';

function NavAvatar({
  dropdownAvatarOpen,
  setDropdownAvatarOpen,
  fullname,
  username,
  picture_url,
  logout,
}) {
  const RenderAvatar = ({ img }) => {
    return img ? (
      <>
        <img className="h-8 w-8 rounded-full object-cover" src={img} alt="user photo" />
      </>
    ) : (
      <>
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-200 outline-1 outline-red-900">
          <Cat />
        </div>
      </>
    );
  };

  return (
    <div>
      {/* Avatar */}
      <button
        type="button"
        className="flex cursor-pointer rounded-full text-sm focus:ring-4 focus:ring-gray-300 md:me-0"
        id="user-menu-button"
        aria-expanded="false"
        data-dropdown-toggle="user-dropdown"
        data-dropdown-placement="bottom"
        onClick={() => setDropdownAvatarOpen(!dropdownAvatarOpen)}
      >
        <span className="sr-only">Open user menu</span>
        <RenderAvatar img={picture_url} />
      </button>

      {/* Dropdown Avatar */}
      <div
        className={`${dropdownAvatarOpen ? '' : 'hidden'} absolute top-full right-0 z-50 my-4 list-none divide-y divide-gray-100 rounded-lg bg-white text-base shadow-sm`}
        id="user-dropdown"
      >
        <div className="w-42 px-4 py-3">
          <span className="block text-sm text-gray-900">{fullname}</span>
          <span className="block truncate text-sm text-gray-500">{username}</span>
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
    </div>
  );
}

export default NavAvatar;
