import React from 'react';

import { IoLocationOutline } from 'react-icons/io5';
import { MdOutlineDateRange } from 'react-icons/md';

import Cat from '../../assets/Cat';

function ProfileCard() {
  return (
    <div className="flex rounded-lg border border-gray-300 bg-white p-4 hover:shadow-[0_6px_12px_rgba(0,0,0,0.15),0_-6px_12px_rgba(0,0,0,0.15)] hover:transition-shadow hover:duration-300">
      <div>
        <div className="mr-4 flex h-32 w-32 shrink-0 items-center justify-center rounded-full bg-gray-200 outline-1 outline-red-900">
          <Cat />
        </div>
      </div>

      <div>
        <p className="text-3xl font-bold">John Smith</p>

        <p className="text-lg text-gray-500">johnsmith</p>

        <div className="my-3 flex">
          <div className="mr-4 flex items-center">
            <IoLocationOutline className="mr-0.5 text-gray-500" />
            <p className="text-gray-500">Jakarta, Indonesia</p>
          </div>

          <div className="flex items-center">
            <MdOutlineDateRange className="mr-1 text-gray-500" />
            <p className="text-gray-500">Joined January 2024</p>
          </div>
        </div>

        <div className="flex">
          <div className="mr-4 flex flex-col items-center justify-center">
            <p className="text-2xl font-bold text-blue-500">12</p>
            <p className="text-gray-500">Lost Items</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="text-2xl font-bold text-green-500">31</p>
            <p className="text-gray-500">Found Items</p>
          </div>
        </div>
      </div>
      <div className="ml-auto">
        <button
          type="button"
          className="w-full cursor-pointer rounded-md bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 px-5 py-2 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:ring-4 focus:ring-orange-300 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
}

export default ProfileCard;
