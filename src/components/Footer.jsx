function Footer() {
  return (
    <section className="grid grid-cols-2 gap-4 bg-gradient-to-r from-red-700 via-red-600 to-red-500 p-4 pt-8 md:grid-cols-5">
      <div className="col-span-2 md:col-span-2">
        <img src="/images/ketemukan.png" className="h-24" alt="Logo Ketemukan" />

        <p className="mt-4 text-white">
          Temukan dan laporkan barang hilang dengan mudah di Ketemukan! Bantu orang lain atau cari
          barangmu yang hilang kapan saja, di mana saja.
        </p>
      </div>

      <div className="hidden md:col-span-1 md:block" />

      <div className="col-span-1 mt-4">
        <p className="mb-2 font-medium text-white">About</p>
        <ul className="space-y-1">
          <li>
            <span className="cursor-pointer text-white hover:italic">About Us</span>
          </li>
          <li>
            <span className="cursor-pointer text-white hover:italic">Dicoding</span>
          </li>
        </ul>
      </div>

      <div className="col-span-1 mt-4">
        <p className="mb-2 font-medium text-white">Tech Stack</p>
        <ul className="space-y-1">
          <li>
            <a href="https://react.dev/" className="text-white hover:italic">
              React
            </a>
          </li>
          <li>
            <a href="https://hapi.dev/" className="text-white hover:italic">
              Hapi
            </a>
          </li>
        </ul>
      </div>

      <div className="col-span-2 mt-4 md:col-span-5">
        <p className="text-center text-white">
          © 2025 <span className="font-bold">Ketemukan</span>. All rights reserved
        </p>
      </div>
    </section>
  );
}

export default Footer;
