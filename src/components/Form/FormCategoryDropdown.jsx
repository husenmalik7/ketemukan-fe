import React from 'react';
import { RiExpandUpDownFill } from 'react-icons/ri';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';

function FormCategoryDropdown({ selectedCategory, setSelectedCategory, categories }) {
  return (
    <Listbox value={selectedCategory} onChange={setSelectedCategory}>
      <div className="relative mt-2">
        <ListboxButton className="grid w-full cursor-default grid-cols-1 rounded-sm py-2.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-300 sm:text-sm/6">
          <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
            <p className="block truncate text-sm font-medium text-gray-900">
              {selectedCategory?.name || 'Pilih kategori...'}
            </p>
          </span>

          <RiExpandUpDownFill className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4" />
        </ListboxButton>

        <ListboxOptions
          transition
          className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
        >
          {categories.map((item) => (
            <ListboxOption
              key={item.id}
              value={item}
              className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-red-500 data-focus:text-white data-focus:outline-hidden"
            >
              <div className="flex items-center">
                <span className="block truncate font-normal group-data-selected:font-semibold">
                  {item.name}
                </span>
              </div>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  );
}

export default FormCategoryDropdown;
