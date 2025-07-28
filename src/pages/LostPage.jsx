import { useEffect, useState } from 'react';
import { getLostItems } from '../utils/api/lost';
import ItemCard from '../components/ItemCard';

function LostPage() {
  const [losts, setLosts] = useState([]);

  useEffect(() => {
    async function fetchLostItems() {
      const { error, data } = await getLostItems();
      if (error) return alert('Terjadi kesalahan pada server');
      setLosts(data);
    }

    fetchLostItems();
  }, []);

  return (
    <section className="flex min-h-screen flex-col bg-orange-200 pb-20">
      <form className="m-4 mt-24 grid grid-cols-1 gap-4 bg-orange-300 md:mt-12 md:grid-cols-6">
        <div className="col-span-1 md:col-span-2">
          <input
            id="id"
            type="text"
            // value={value}
            // onChange={onChange}
            className="block w-full rounded-sm border border-gray-300 bg-gray-50 p-2.5 text-sm font-medium text-gray-900 focus:outline-gray-300"
            placeholder="Judul Item"
          />
        </div>

        <div className="col-span-1">
          <button
            type="submit"
            className="w-full cursor-pointer rounded-lg bg-gradient-to-r from-red-400 via-red-500 to-red-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:ring-4 focus:ring-red-300 focus:outline-none"
          >
            Cari Item
          </button>
        </div>
      </form>

      <div className="m-4 mt-12 grid grid-cols-1 gap-4 bg-orange-400 md:grid-cols-2 lg:grid-cols-3">
        {losts.map((item, index) => (
          <div key={index}>
            <ItemCard
              id={item?.id}
              title={item?.title}
              short_desc={item?.short_desc}
              picture_url={item?.picture_url}
              lost_date={item?.lost_date}
              found_date={item?.found_date}
              status={item?.status}
              created_at={item?.created_at}
              category_name={item?.category_name}
              location_name={item?.location_name}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default LostPage;
