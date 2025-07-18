import React from 'react';

function FormSubmitButton({ label }) {
  return (
    <button
      type="submit"
      className="me-2 mt-6 mb-2 w-full cursor-pointer rounded-full bg-gradient-to-r from-red-400 via-red-500 to-red-600 px-5 py-2 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:ring-4 focus:ring-red-300 focus:outline-none"
    >
      {label}
    </button>
  );
}

export default FormSubmitButton;
