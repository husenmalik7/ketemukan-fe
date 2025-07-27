import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import useInput from '../../hooks/useInput';

import FormAuthLocationDropdown from '../Form/FormAuthLocationDropdown';
import FormCategoryDropdown from '../Form/FormCategoryDropdown';
import Button from '../Button';

import { getAllLocations, getAllCategories } from '../../utils/api';

function AddItemModal({ onPostItem, openModalAddItem, setOpenModalAddItem }) {
  const [title, onTitleChange] = useInput('');
  const [shortDesc, onShortDescChange] = useInput('');
  const [description, onDescriptionChange] = useInput('');

  const [type, setType] = useState('lost');

  const [date, setDate] = useState(new Date());

  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [locationResponse, categoryResponse] = await Promise.all([
          getAllLocations(),
          getAllCategories(),
        ]);

        setLocations(locationResponse.data);
        setCategories(categoryResponse.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (locations.length > 0 && !selectedLocation) {
      setSelectedLocation(locations[0]);
    }

    if (categories.length > 0 && !selectedCategory) {
      setSelectedCategory(categories[0]);
    }
  }, [locations, selectedLocation, categories, selectedCategory]);

  function handlePostItem(event) {
    event.preventDefault();

    const body = {
      title,
      shortDesc,
      description,
      type,
      date,
      categoryId: selectedCategory.id,
      locationId: selectedLocation.id,
    };

    onPostItem(body);
  }

  return (
    // {/* Main modal */}
    <div
      id="crud-modal"
      tabIndex="-1"
      className={`${openModalAddItem ? '' : 'hidden'} fixed top-0 right-0 left-0 z-50 flex h-screen max-h-full w-full items-center justify-center bg-gray-100/70 md:inset-0`}
    >
      <div className="relative max-h-full w-full max-w-md p-4">
        {/* Modal content */}
        <div className="relative rounded-lg bg-white shadow-sm">
          {/* Modal header */}
          <div className="flex items-center justify-between rounded-t border-b border-gray-200 p-4 md:p-5">
            <h3 className="text-lg font-semibold text-gray-900">Add New Item</h3>
            <button
              type="button"
              onClick={() => setOpenModalAddItem(false)}
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
            onSubmit={handlePostItem}
            className="max-h-100 overflow-y-auto bg-orange-200 p-4 md:p-5"
          >
            <div className="mb-4 grid grid-cols-2 gap-4 bg-lime-200">
              <div className="col-span-1">
                <button
                  type="button"
                  onClick={() => setType('lost')}
                  className={`${type === 'lost' ? 'bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 text-white' : 'bg-gray-100'} w-full cursor-pointer rounded-lg px-5 py-2 text-center text-sm font-medium hover:bg-gradient-to-br focus:ring-4 focus:ring-orange-300 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50`}
                >
                  Lost Item
                </button>
              </div>

              <div className="col-span-1">
                <button
                  type="button"
                  onClick={() => setType('found')}
                  className={`${type === 'found' ? 'bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 text-white' : 'bg-gray-100'} w-full cursor-pointer rounded-lg px-5 py-2 text-center text-sm font-medium hover:bg-gradient-to-br focus:ring-4 focus:ring-orange-300 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50`}
                >
                  Found Item
                </button>
              </div>

              <div className="col-span-2 bg-lime-300">
                <label htmlFor="title" className="mb-2 block text-sm font-medium text-gray-900">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-sm border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                  placeholder="Title"
                  value={title}
                  onChange={onTitleChange}
                  required={true}
                />
              </div>

              <div className="col-span-2">
                <label htmlFor="category" className="mb-2 block text-sm font-medium text-gray-900">
                  Kategori
                </label>

                <FormCategoryDropdown
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  categories={categories}
                />
              </div>

              <div className="col-span-2">
                <label htmlFor="location" className="mb-2 block text-sm font-medium text-gray-900">
                  Lokasi
                </label>

                <FormAuthLocationDropdown
                  selectedLocation={selectedLocation}
                  setSelectedLocation={setSelectedLocation}
                  locations={locations}
                />
              </div>

              <div className="col-span-1 bg-lime-400">
                <label htmlFor="date" className="mb-2 block text-sm font-medium text-gray-900">
                  Tanggal Kehilangan
                </label>

                <DatePicker
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-sm border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                  selected={date}
                  onChange={(date) => setDate(date)}
                  dateFormat="dd/MM/yyyy"
                />
              </div>

              <div className="col-span-2 bg-lime-300">
                <label htmlFor="shortDesc" className="mb-2 block text-sm font-medium text-gray-900">
                  Short Description
                </label>
                <input
                  type="text"
                  name="shortDesc"
                  id="shortDesc"
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-sm border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
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
                  className="block w-full rounded-sm border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Write description here"
                  value={description}
                  onChange={onDescriptionChange}
                  required={true}
                />
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
