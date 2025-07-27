import React, { useState } from 'react';
import Button from '../Button';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// {
//     "title": "hilang dompet yuura",
//     "shortDesc": "saya kehilangan dompet di jalan A",
//     "description": "saya kehilangan dompet di jalan A. Detail dompet berwarna hitam, bagi yang menemukan silahkan hubungi saya",
//     "lostDate": "12-12-1212",
//     "categoryId": "category-orZUwJ9BPHB2lZVa",
//     "locationId": "location-otGRaNN1n5mWQIZH"
// }

function AddItemModal({
  title,
  onTitleChange,
  shortDesc,
  onShortDescChange,
  description,
  onDescriptionChange,
  date,
  onDateChange,
  type,
  setType,
  onPostItem,
  openModal,
  setOpenModal,
}) {
  const [startDate, setStartDate] = useState(new Date());

  return (
    // {/* Main modal */}
    <div
      id="crud-modal"
      tabIndex="-1"
      className={`${openModal ? '' : 'hidden'} fixed top-0 right-0 left-0 z-50 flex h-screen max-h-full w-full items-center justify-center bg-gray-100/70 md:inset-0`}
    >
      <div className="relative max-h-full w-full max-w-md p-4">
        {/* Modal content */}
        <div className="relative rounded-lg bg-white shadow-sm">
          {/* Modal header */}
          <div className="flex items-center justify-between rounded-t border-b border-gray-200 p-4 md:p-5">
            <h3 className="text-lg font-semibold text-gray-900">Add New Item</h3>
            <button
              type="button"
              onClick={() => setOpenModal(false)}
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
          <form
            onSubmit={onPostItem}
            className="max-h-100 overflow-y-auto bg-orange-200 p-4 md:p-5"
          >
            <div className="mb-4 grid grid-cols-2 gap-4 bg-lime-200">
              <div className="col-span-1">
                <button
                  type="button"
                  onClick={() => setType('lost')}
                  className={`${type === 'lost' ? 'bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 text-white' : 'bg-gray-100'} w-full cursor-pointer rounded-md px-5 py-2 text-center text-sm font-medium hover:bg-gradient-to-br focus:ring-4 focus:ring-orange-300 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50`}
                >
                  Lost Item
                </button>
              </div>

              <div className="col-span-1">
                <button
                  type="button"
                  onClick={() => setType('found')}
                  className={`${type === 'found' ? 'bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 text-white' : 'bg-gray-100'} w-full cursor-pointer rounded-md px-5 py-2 text-center text-sm font-medium hover:bg-gradient-to-br focus:ring-4 focus:ring-orange-300 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50`}
                >
                  Found Item
                </button>
              </div>

              <div className="col-span-2 bg-lime-300">
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-900">
                  Title
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                  placeholder="Title"
                  value={title}
                  onChange={onTitleChange}
                  required={true}
                />
              </div>

              {/* // TODO onChange error */}
              <div className="col-span-1">
                <label htmlFor="category" className="mb-2 block text-sm font-medium text-gray-900">
                  Category
                </label>
                <select
                  id="category"
                  value=""
                  className="focus:ring-primary-500 focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                >
                  <option value="">Select category</option>
                  <option value="TV">TV/Monitors</option>
                  <option value="PC">PC</option>
                  <option value="GA">Gaming/Console</option>
                  <option value="PH">Phones</option>
                </select>
              </div>

              <div className="col-span-1">
                <label htmlFor="category" className="mb-2 block text-sm font-medium text-gray-900">
                  Lokasi
                </label>
                <select
                  id="category"
                  value=""
                  className="focus:ring-primary-500 focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                >
                  <option value="">Select category</option>
                  <option value="TV">TV/Monitors</option>
                  <option value="PC">PC</option>
                  <option value="GA">Gaming/Console</option>
                  <option value="PH">Phones</option>
                </select>
              </div>

              <div className="col-span-1 bg-lime-400">
                <label htmlFor="price" className="mb-2 block text-sm font-medium text-gray-900">
                  Tanggal Kehilangan
                </label>

                <DatePicker
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />

                {/* <input
                  type="text"
                  name="price"
                  id="price"
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                  placeholder="12-12-2012"
                  value={date}
                  onChange={onDateChange}
                  required={true}
                /> */}
              </div>

              <div className="col-span-2 bg-lime-300">
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-900">
                  Short Description
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                  placeholder="Short Description"
                  value={shortDesc}
                  onChange={onShortDescChange}
                  required={true}
                />
              </div>

              <div className="col-span-2">
                <label
                  htmlFor="description"
                  className="mb-2 block text-sm font-medium text-gray-900"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  rows="4"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Write description here"
                  value={description}
                  onChange={onDescriptionChange}
                  required={true}
                ></textarea>
              </div>
            </div>

            <Button label="Add Item" type="submit" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddItemModal;
