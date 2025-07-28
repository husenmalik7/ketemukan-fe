function HomePage() {
  return (
    <section className="flex min-h-screen flex-col bg-orange-200 pb-20">
      <div className="flex flex-col items-center justify-center bg-lime-200 p-4">
        <img src="/images/ketemukan.png" className="w-64" alt="Logo Ketemukan" />
        <p className="max-w-xl bg-orange-100 text-center text-3xl font-bold text-[#FB7A7C]">
          Temukan Barangmu, Bantu Temukan Barang Orang Lain
        </p>
        <p className="mt-2 max-w-xl bg-orange-300 text-center text-xl font-medium text-gray-500">
          Cari dan laporkan barang hilang atau ditemukan dengan mudah. Bersama Ketemukan, pasti bisa
          ketemu-kan
        </p>
      </div>

      <div className="bg-red-700">
        <div className="my-4 grid grid-cols-1 gap-4 bg-lime-300 md:my-12 md:grid-cols-3">
          <div className="col-span-1 md:col-span-3">
            <p className="my-2 text-center text-2xl font-bold text-gray-500">
              Lokasi Kehilangan Paling Sering
            </p>
          </div>

          <div className="col-span-1 mx-12 flex flex-col items-center justify-center rounded-lg bg-orange-100 p-4 shadow-lg transition-transform duration-200 hover:-translate-y-1 md:mx-4 md:p-6">
            <p className="text-3xl font-bold text-pink-400">9</p>
            <p className="text-xl font-medium text-gray-500">Aceh</p>
          </div>

          <div className="col-span-1 mx-12 flex flex-col items-center justify-center rounded-lg bg-orange-100 p-4 shadow-lg transition-transform duration-200 hover:-translate-y-1 md:mx-4 md:p-6">
            <p className="text-3xl font-bold text-pink-400">9</p>
            <p className="text-xl font-medium text-gray-500">Aceh</p>
          </div>

          <div className="col-span-1 mx-12 flex flex-col items-center justify-center rounded-lg bg-orange-100 p-4 shadow-lg transition-transform duration-200 hover:-translate-y-1 md:mx-4 md:p-6">
            <p className="text-3xl font-bold text-pink-400">9</p>
            <p className="text-xl font-medium text-gray-500">Aceh</p>
          </div>
        </div>

        <div className="my-4 grid grid-cols-1 gap-4 bg-lime-300 md:my-12 md:grid-cols-3">
          <div className="col-span-1 md:col-span-3">
            <p className="my-2 text-center text-2xl font-bold text-gray-500">
              Kategori Paling Sering Dilaporkan
            </p>
          </div>

          <div className="col-span-1 mx-12 flex flex-col items-center justify-center rounded-lg bg-orange-100 p-4 shadow-lg transition-transform duration-200 hover:-translate-y-1 md:mx-4 md:p-6">
            <p className="text-3xl font-bold text-pink-400">9</p>
            <p className="text-xl font-medium text-gray-500">Eletronik</p>
          </div>

          <div className="col-span-1 mx-12 flex flex-col items-center justify-center rounded-lg bg-orange-100 p-4 shadow-lg transition-transform duration-200 hover:-translate-y-1 md:mx-4 md:p-6">
            <p className="text-3xl font-bold text-pink-400">9</p>
            <p className="text-xl font-medium text-gray-500">Eletronik</p>
          </div>

          <div className="col-span-1 mx-12 flex flex-col items-center justify-center rounded-lg bg-orange-100 p-4 shadow-lg transition-transform duration-200 hover:-translate-y-1 md:mx-4 md:p-6">
            <p className="text-3xl font-bold text-pink-400">9</p>
            <p className="text-xl font-medium text-gray-500">Eletronik</p>
          </div>
        </div>

        <div className="my-4 grid grid-cols-1 gap-4 bg-lime-300 md:my-12 md:grid-cols-3">
          <div className="col-span-1 md:col-span-3">
            <p className="my-2 text-center text-2xl font-bold text-gray-500">Top Contributor</p>
          </div>

          <div className="col-span-1 mx-12 flex flex-col items-center justify-center rounded-lg bg-orange-100 p-4 shadow-lg transition-transform duration-200 hover:-translate-y-1 md:mx-4 md:p-6">
            <img src="/images/ketemukan.png" className="w-12" alt="Logo Ketemukan" />
            <p className="text-xl font-medium text-gray-500">Eletronik</p>
          </div>

          <div className="col-span-1 mx-12 flex flex-col items-center justify-center rounded-lg bg-orange-100 p-4 shadow-lg transition-transform duration-200 hover:-translate-y-1 md:mx-4 md:p-6">
            <img src="/images/ketemukan.png" className="w-12" alt="Logo Ketemukan" />
            <p className="text-xl font-medium text-gray-500">Eletronik</p>
          </div>

          <div className="col-span-1 mx-12 flex flex-col items-center justify-center rounded-lg bg-orange-100 p-4 shadow-lg transition-transform duration-200 hover:-translate-y-1 md:mx-4 md:p-6">
            <img src="/images/ketemukan.png" className="w-12" alt="Logo Ketemukan" />
            <p className="text-xl font-medium text-gray-500">Eletronik</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomePage;
