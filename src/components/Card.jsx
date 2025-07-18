import React from 'react';

function Card({ title, shortDesc }) {
  return (
    <div className="mx-2 max-w-3xs cursor-pointer rounded-2xl border border-gray-200 bg-white hover:shadow-lg">
      <div className="aspect-[16/9] w-full overflow-hidden rounded-t-2xl">
        <img className="h-full w-full object-cover" src="/images/noimage.jpg" alt={title} />
      </div>

      <div className="px-5 py-3">
        <h5 className="mb-2 text-base font-bold tracking-tight text-gray-900">{title}</h5>
        <p className="text-sm font-normal text-gray-700">{shortDesc}</p>
      </div>
    </div>
  );
}

export default Card;
