import React, { useRef } from 'react';
import { FaCheck } from 'react-icons/fa';

function AddItemImageModal({
  isAddItemImageModalOpen,
  setIsAddItemImageModalOpen,
  addedItemId,
  handleUploadItemImage,
}) {
  const fileInputRef = useRef(null);

  function handleClickInputFile() {
    fileInputRef.current.click();
  }

  return (
    <div
      id="popup-modal"
      tabIndex="-1"
      className={`${isAddItemImageModalOpen ? '' : 'hidden'} fixed top-0 right-0 left-0 z-50 flex h-screen max-h-full w-full items-center justify-center overflow-x-hidden overflow-y-auto bg-gray-100/70 md:inset-0`}
    >
      <div className="relative max-h-full w-full max-w-md p-4">
        <div className="relative rounded-lg bg-white shadow-sm">
          <button
            type="button"
            className="absolute end-2.5 top-3 ms-auto inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
            data-modal-hide="popup-modal"
            onClick={() => setIsAddItemImageModalOpen(false)}
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
          <div className="p-4 text-center md:p-5">
            <FaCheck className="mx-auto mb-4 h-12 w-12 text-gray-400" />
            <h3 className="mb-5 text-lg font-normal text-gray-500">
              Post Item berhasil, apakah Anda ingin menambahkan gambar untuk item ini?
            </h3>

            <button
              data-modal-hide="popup-modal"
              type="button"
              className="inline-flex cursor-pointer items-center rounded-lg bg-red-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:ring-4 focus:ring-red-300 focus:outline-none"
              onClick={() => handleClickInputFile()}
            >
              Pilih gambar
            </button>

            <input
              onChange={(event) => handleUploadItemImage(addedItemId, event)}
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
            />

            <button
              data-modal-hide="popup-modal"
              type="button"
              className="ms-3 cursor-pointer rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-red-700 focus:z-10 focus:ring-4 focus:ring-gray-100 focus:outline-none"
              onClick={() => setIsAddItemImageModalOpen(false)}
            >
              Nanti aja
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddItemImageModal;
