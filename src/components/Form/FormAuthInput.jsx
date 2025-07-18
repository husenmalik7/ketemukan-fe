import React from 'react';

function FormAuthInput({ id, type, value, onChange, placeholder, isFilled, warnMessage }) {
  return (
    <div className="mb-4">
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        className="block w-full rounded-sm border border-gray-300 bg-gray-50 p-2.5 text-sm font-medium text-gray-900 focus:outline-gray-300"
        placeholder={placeholder}
      />
      {isFilled ? <></> : <p className="text-xs text-red-500 italic">{warnMessage}</p>}
    </div>
  );
}

export default FormAuthInput;
