import React from 'react';

function MyItem() {
  return (
    <div className="flex">
      <div>
        <p className="text-2xl font-bold">My Items</p>
        <p className="text-gray-500">Manage your lost and found items</p>
      </div>

      <div className="ml-auto flex items-center">
        <button
          type="button"
          className="w-full cursor-pointer rounded-md bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 px-5 py-2 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:ring-4 focus:ring-orange-300 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        >
          Add Item
        </button>
      </div>
    </div>
  );
}

export default MyItem;
