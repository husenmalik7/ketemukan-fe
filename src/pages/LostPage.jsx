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
    <section className="flex min-h-screen flex-col pb-20">
      <div className="m-4 mt-24 grid grid-cols-1 gap-4 md:mt-12 md:grid-cols-2 lg:grid-cols-3">
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
