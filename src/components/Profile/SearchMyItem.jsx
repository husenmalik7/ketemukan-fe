import React, { useState } from 'react';

function SearchMyItem({ onSearchMyItem, searchParams }) {
  const [searchValue, setSearchValue] = useState(searchParams || '');

  function onHandleSubmit(event) {
    event.preventDefault();
    onSearchMyItem(searchValue);
  }

  return (
    <form onSubmit={onHandleSubmit} className="flex">
      <div className="mr-4">
        <input
          className="my-4 mr-8 block w-full rounded-sm border border-gray-300 bg-gray-50 p-2 text-sm font-medium text-gray-900 focus:outline-gray-300"
          placeholder="Search Item"
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
        />
      </div>

      <div className="flex items-center">
        <button
          type="submit"
          className="w-full cursor-pointer rounded-md bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 px-5 py-2 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:ring-4 focus:ring-orange-300 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        >
          Search
        </button>
      </div>
    </form>
  );
}

export default SearchMyItem;
