import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <section className="flex min-h-screen flex-col">
      <div className="m-auto">
        <img src="/images/notfound.png" className="h-54" alt="Not Found" />
        <div className="pt-4 pb-20 text-center">
          <p className="text-3xl font-medium text-[#444450]">Oops!</p>
          <p className="text-l pb-4 text-[#444444]">Halaman yang kamu cari ga ada nih</p>

          <Link to="/">
            <button
              type="button"
              className="me-2 mb-2 cursor-pointer rounded-full bg-gradient-to-r from-red-400 via-red-500 to-red-600 px-5 py-1.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:ring-4 focus:ring-red-300 focus:outline-none"
            >
              Kembali ke Halaman Utama
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default NotFound;
