function HomePage() {
  return (
    <section className="flex min-h-screen flex-col bg-orange-200 pb-20">
      <div className="ketemukan-hero flex flex-col items-center justify-center bg-lime-200 p-4">
        <img src="/images/ketemukan.png" className="w-64" alt="Logo Ketemukan" />
        <p className="max-w-xl bg-orange-100 text-center text-3xl font-bold text-[#FB7A7C]">
          Temukan Barangmu, Bantu Temukan Barang Orang Lain
        </p>
        <p className="mt-2 max-w-xl bg-orange-300 text-center text-xl font-medium text-gray-500">
          Cari dan laporkan barang hilang atau ditemukan dengan mudah. Bersama Ketemukan, pasti bisa
          ketemu-kan
        </p>
      </div>
    </section>
  );
}

export default HomePage;
