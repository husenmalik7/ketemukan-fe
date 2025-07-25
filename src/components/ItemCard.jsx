import React from 'react';

import { IoLocationOutline } from 'react-icons/io5';
import { MdOutlineDateRange } from 'react-icons/md';
import { CiCalendarDate } from 'react-icons/ci';
import { FaRegEdit } from 'react-icons/fa';
import { MdOutlineDeleteOutline } from 'react-icons/md';

function ItemCard() {
  return (
    <div className="rounded-lg bg-purple-200">
      <div className="aspect-video overflow-hidden rounded-t-lg">
        <img
          src="https://picsum.photos/600"
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
          alt="avatar"
        />
      </div>

      <div className="flex items-center px-4 pt-4">
        <p className="rounded-xl bg-orange-900 px-2.5 py-0.5 text-sm">Lost</p>
        <p className="mx-2 rounded-xl bg-orange-900 px-2.5 py-0.5 text-sm">Electronic</p>

        <div className="ml-auto flex gap-2">
          <FaRegEdit className="cursor-pointer text-lg" />
          <MdOutlineDeleteOutline className="cursor-pointer text-xl text-red-500" />
        </div>
      </div>

      <div className="px-4">
        <p className="text-lg font-semibold">item.title</p>
        <p className="mb-2 line-clamp-2 text-sm text-gray-500 md:line-clamp-none">
          Consider adding an error boundary to your tree to customize error handling behavior.
          VisitConsider adding an error boundary to your tree to customize error handling behavior.
          Visit
        </p>
        <div className="flex items-center">
          <IoLocationOutline className="mr-1 text-gray-500" />
          <p className="text-sm text-gray-500">Jakarta</p>
        </div>
        <div className="flex items-center">
          <MdOutlineDateRange className="mr-1 text-gray-500" />
          <p className="text-sm text-gray-500">Lost on xxxx</p>
        </div>
        <div className="flex items-center">
          <CiCalendarDate className="mr-1 text-gray-500" />
          <p className="text-sm text-gray-500">posted on xxxx</p>
        </div>
      </div>

      <div className="px-4 pb-2">
        <hr className="mt-3 mb-2 h-px border-0 bg-orange-300" />
      </div>
    </div>
  );
}

export default ItemCard;
