import React from 'react';
import { PacmanLoader } from 'react-spinners';

function LoadingModal({ isLoading }) {
  return (
    <div
      id="popup-modal"
      tabIndex="-1"
      className={`${isLoading ? '' : 'hidden'} fixed top-0 right-0 left-0 z-50 flex h-screen max-h-full w-full items-center justify-center overflow-x-hidden overflow-y-auto bg-gray-100/70 md:inset-0`}
    >
      <div className="relative max-h-full w-full max-w-xs p-4">
        <div className="relative rounded-lg bg-white shadow-sm">
          <div className="flex flex-col items-center justify-center p-4 text-center md:p-5">
            <PacmanLoader
              color="#FB7A7C"
              loading={true}
              size={22}
              aria-label="Loading Spinner"
              data-testid="loader"
            />

            <h3 className="mt-2 text-lg font-medium text-gray-500">Loading</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoadingModal;
