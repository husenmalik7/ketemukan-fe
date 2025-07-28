import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import FormAuthLocationDropdown from '../Form/FormAuthLocationDropdown';
import FormCategoryDropdown from '../Form/FormCategoryDropdown';
import FormStatusDropdown from '../Form/FormStatusDropdown';
import Button from '../Button';

import { getAllLocations, getAllCategories } from '../../utils/api';

function EditItemModal({ onEditItem, selectedItem, isEditItemModalOpen, setIsEditItemModalOpen }) {
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [description, setDescription] = useState('');

  const [type, setType] = useState('lost');

  const [date, setDate] = useState(new Date());

  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [selectedStatus, setSelectedStatus] = useState(null);
  const statusesFound = [
    {
      id: 'status-found-1',
      name: 'found',
    },
    {
      id: 'status-found-2',
      name: 'resolved',
    },
  ];
  const statusesLost = [
    {
      id: 'status-lost-1',
      name: 'lost',
    },
    {
      id: 'status-lost-2',
      name: 'resolved',
    },
  ];

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
    if (selectedItem) {
      setId(selectedItem?.id || '');
      setTitle(selectedItem?.title || '');
      setShortDesc(selectedItem?.short_desc || '');
      setDescription(selectedItem?.description || '');
      setType(selectedItem?.id?.includes('lost') ? 'lost' : 'found');
      setDate(selectedItem?.lost_date || selectedItem?.found_date);

      setSelectedStatus({ id: 'x', name: selectedItem?.status });

      // const locationIndex = locations.findIndex((loc) => loc.name === selectedItem?.location_name);
      // setSelectedLocation(locations[locationIndex] || null);

      // const categoryIndex = categories.findIndex((cat) => cat.name === selectedItem?.category_name);
      // setSelectedCategory(categories[categoryIndex] || null);
    }
    // }, [selectedItem, locations, categories, selectedLocation, selectedCategory]);
  }, [selectedItem]);

  useEffect(() => {
    if (locations.length > 0 && !selectedLocation) {
      const locationIndex = locations.findIndex((loc) => loc.name === selectedItem?.location_name);
      setSelectedLocation(locations[locationIndex] || null);
    }

    if (categories.length > 0 && !selectedCategory) {
      const categoryIndex = categories.findIndex((cat) => cat.name === selectedItem?.category_name);
      setSelectedCategory(categories[categoryIndex] || null);
    }
  }, [selectedItem, locations, selectedLocation, categories, selectedCategory]);

  function handleEditItem(event) {
    event.preventDefault();

    const body = {
      id,
      title,
      shortDesc,
      description,
      type,
      date,
      status: selectedStatus.name,
      categoryId: selectedCategory.id,
      locationId: selectedLocation.id,
    };

    onEditItem(body);
  }

  return (
    // {/* Main modal */}
    <div
      id="crud-modal"
      tabIndex="-1"
      className={`${isEditItemModalOpen ? '' : 'hidden'} fixed top-0 right-0 left-0 z-50 flex h-screen max-h-full w-full items-center justify-center bg-gray-100/70 md:inset-0`}
    >
      <div className="relative max-h-full w-full max-w-md p-4">
        {/* Modal content */}
        <div className="relative rounded-lg bg-white shadow-sm">
          {/* Modal header */}
          <div className="flex items-center justify-between rounded-t border-b border-gray-200 p-4 md:p-5">
            <h3 className="text-lg font-semibold text-gray-900">Edit Item</h3>
            <button
              type="button"
              onClick={() => setIsEditItemModalOpen(false)}
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
          <form onSubmit={handleEditItem} className="max-h-100 overflow-y-auto p-4 md:p-5">
            <div className="mb-4 grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label htmlFor="title" className="mb-2 block text-sm font-medium text-gray-900">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-sm border border-gray-300 p-2.5 text-sm text-gray-900"
                  placeholder="Title"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
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

              <div className="col-span-1">
                <label htmlFor="date" className="mb-2 block text-sm font-medium text-gray-900">
                  Tanggal Kehilangan
                </label>

                <DatePicker
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-sm border border-gray-300 p-2.5 text-sm text-gray-900"
                  selected={date}
                  onChange={(date) => setDate(date)}
                  dateFormat="dd/MM/yyyy"
                />
              </div>

              <div className="col-span-1">
                <label htmlFor="date" className="mb-2 block text-sm font-medium text-gray-900">
                  Status
                </label>

                <FormStatusDropdown
                  selectedStatus={selectedStatus}
                  setSelectedStatus={setSelectedStatus}
                  statuses={type === 'lost' ? statusesLost : statusesFound}
                />
              </div>

              <div className="col-span-2">
                <label htmlFor="shortDesc" className="mb-2 block text-sm font-medium text-gray-900">
                  Short Description
                </label>
                <input
                  type="text"
                  name="shortDesc"
                  id="shortDesc"
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-sm border border-gray-300 p-2.5 text-sm text-gray-900"
                  placeholder="Short Description"
                  value={shortDesc}
                  onChange={(event) => setShortDesc(event.target.value)}
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
                  className="block w-full rounded-sm border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Write description here"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  required={true}
                />
              </div>
            </div>

            <Button label="Edit Item" type="submit" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditItemModal;
