import React from 'react';

import { showFormattedDate } from '../utils';

import { IoLocationOutline } from 'react-icons/io5';
import { MdOutlineDateRange } from 'react-icons/md';
import { CiCalendarDate } from 'react-icons/ci';
import { FaRegEdit } from 'react-icons/fa';
import { MdOutlineDeleteOutline } from 'react-icons/md';

import { NavLink, useLocation } from 'react-router-dom';

function ItemCard({
  id,
  title,
  short_desc,
  picture_url,
  lost_date,
  found_date,
  status,
  created_at,
  category_name,
  location_name,
  handleDeleteItem,
}) {
  const location = useLocation();
  const statusColorMap = {
    lost: 'bg-orange-500',
    found: 'bg-green-500',
    resolved: 'bg-gray-500',
  };

  const RenderMyItemPicture = ({ img }) => {
    return img ? (
      <img
        src={img}
        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
        alt="avatar"
      />
    ) : (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-24 text-red-300"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
        />
      </svg>
    );
  };

  return (
    <div className="rounded-lg shadow-md transition-transform duration-200 hover:-translate-y-1">
      <div className="aspect-video overflow-hidden rounded-t-lg">
        <NavLink
          to={`${id.includes('lost') ? `/detail/lost/${id}` : `/detail/found/${id}`}`}
          className="flex h-full w-full items-center justify-center bg-gray-400 object-cover transition-transform duration-500 hover:scale-105"
        >
          <RenderMyItemPicture img={picture_url} />
        </NavLink>
      </div>

      <div className="flex items-center px-4 pt-4">
        <p
          className={`${statusColorMap[status]} rounded-xl px-2.5 py-0.5 text-sm text-white capitalize`}
        >
          {status}
        </p>
        <p className="mx-2 rounded-xl bg-purple-500 px-2.5 py-0.5 text-sm text-white">
          {category_name}
        </p>

        {location.pathname === '/profile' ? (
          <div className="ml-auto flex gap-2">
            <FaRegEdit className="cursor-pointer text-lg" />
            <MdOutlineDeleteOutline
              onClick={() => handleDeleteItem(id)}
              className="cursor-pointer text-xl text-red-500"
            />
          </div>
        ) : (
          <></>
        )}
      </div>

      <div className="px-4">
        <NavLink to={`${status === 'lost' ? `/detail/lost/${id}` : `/detail/found/${id}`}`}>
          <p className="text-lg font-semibold">{title}</p>
        </NavLink>
        <p className="mb-2 line-clamp-2 text-sm text-gray-500 md:line-clamp-none">{short_desc}</p>
        <div className="flex items-center">
          <IoLocationOutline className="mr-1 text-gray-500" />
          <p className="text-sm text-gray-500">{location_name}</p>
        </div>
        <div className="flex items-center">
          <MdOutlineDateRange className="mr-1 text-gray-500" />
          <p className="text-sm text-gray-500">
            Lost on {lost_date ? showFormattedDate(lost_date) : showFormattedDate(found_date)}
          </p>
        </div>
        <div className="flex items-center">
          <CiCalendarDate className="mr-1 text-gray-500" />
          <p className="text-sm text-gray-500">Posted on {showFormattedDate(created_at)}</p>
        </div>
      </div>

      <div className="px-4 pb-2">
        <hr className="mt-3 mb-2 h-px border-0 bg-gray-300" />
      </div>
    </div>
  );
}

export default ItemCard;
