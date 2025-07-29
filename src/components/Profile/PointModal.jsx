import React from 'react';
import NoData from '../NoData';

function PointModal({ openModalPoint, setOpenModalPoint }) {
  return (
    // {/* Main modal */}
    <div
      id="crud-modal"
      tabIndex="-1"
      className={`${openModalPoint ? '' : 'hidden'} fixed top-0 right-0 left-0 z-50 flex h-screen max-h-full w-full items-center justify-center bg-gray-100/70 md:inset-0`}
    >
      <div className="relative max-h-full w-full max-w-3xl p-4">
        {/* Modal content */}
        <div className="relative rounded-lg bg-white shadow-sm">
          {/* Modal header */}
          <div className="flex items-center justify-between rounded-t border-b border-gray-200 p-4 md:p-5">
            <h3 className="text-lg font-semibold text-gray-900">Tukarkan Point Anda 🎁</h3>
            <button
              type="button"
              onClick={() => setOpenModalPoint(false)}
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
          <div className="flex max-h-100 flex-col items-center justify-center overflow-y-auto p-4 md:p-5">
            <p>Tukarkan point anda dengan berbagai reward yang menarik</p>

            <a
              className="mt-4 cursor-pointer rounded-full bg-gradient-to-r from-red-400 via-red-500 to-red-600 px-5 py-1.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:ring-4 focus:ring-red-300 focus:outline-none"
              target="_blank"
              href="https://wa.me/62812123213"
            >
              Tukar Point
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PointModal;
