import React from 'react';
import Button from '../Button';
import FormAuthLocationDropdown from '../Form/FormAuthLocationDropdown';

function EditProfileModal({
  username,
  fullname,
  setFullname,
  selectedLocation,
  setSelectedLocation,
  locations,
  openModalEditProfile,
  setOpenModalEditProfile,
  onEditProfile,
}) {
  return (
    // {/* Main modal */}
    <div
      id="crud-modal"
      tabIndex="-1"
      className={`${openModalEditProfile ? '' : 'hidden'} fixed top-0 right-0 left-0 z-50 flex h-screen max-h-full w-full items-center justify-center bg-gray-100/70 md:inset-0`}
    >
      <div className="relative max-h-full w-full max-w-md p-4">
        {/* Modal content */}
        <div className="relative rounded-lg bg-white shadow-sm">
          {/* Modal header */}
          <div className="flex items-center justify-between rounded-t border-b border-gray-200 p-4 md:p-5">
            <h3 className="text-lg font-semibold text-gray-900">Edit Profile</h3>
            <button
              type="button"
              onClick={() => setOpenModalEditProfile(false)}
              className="ms-auto inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
              data-modal-toggle="crud-modal"
            >
              <svg
                className="h-3 w-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          {/* Modal body */}
          <form onSubmit={onEditProfile} className="max-h-100 overflow-y-auto p-4 md:p-5">
            <div className="mb-4 grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label htmlFor="category" className="mb-2 block text-sm font-medium text-gray-900">
                  Location
                </label>
                <FormAuthLocationDropdown
                  selectedLocation={selectedLocation}
                  setSelectedLocation={setSelectedLocation}
                  locations={locations}
                />
              </div>

              <div className="col-span-2">
                <label htmlFor="username" className="mb-2 block text-sm font-medium text-gray-900">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full cursor-not-allowed rounded-lg border border-gray-300 bg-gray-200 p-2.5 text-sm text-gray-900"
                  placeholder="Username"
                  value={username}
                  required={true}
                  disabled={true}
                />
              </div>

              <div className="col-span-2">
                <label htmlFor="fullname" className="mb-2 block text-sm font-medium text-gray-900">
                  Fullname
                </label>
                <input
                  type="text"
                  name="fullname"
                  id="fullname"
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                  placeholder="Fullname"
                  value={fullname}
                  onChange={(event) => setFullname(event.target.value)}
                  required={true}
                />
              </div>
            </div>

            <Button label="Edit Profile" type="submit" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProfileModal;
