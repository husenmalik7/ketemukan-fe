import React from 'react';

function Button({ label, type }) {
  return (
    <button
      type={type}
      className="w-full cursor-pointer rounded-md bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 px-5 py-2 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:ring-4 focus:ring-orange-300 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
    >
      {label}
    </button>
  );
}

export default Button;
