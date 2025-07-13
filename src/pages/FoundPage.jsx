import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getFoundItems } from '../utils/api/found';

function FoundPage() {
  const [founds, setFounds] = useState([]);

  useEffect(() => {
    async function fetchFoundItems() {
      const { error, data } = await getFoundItems();
      if (error) return alert('Terjadi kesalahan pada server');
      setFounds(data);
    }

    fetchFoundItems();
  }, []);

  return (
    <section>
      <p>FoundPage page</p>

      <div className="bg-orange-300 h-120">
        {founds.map((item, index) => (
          <div key={index} className="item bg-orange-100 pb-12">
            <p>{item.id}</p>
            <p>{item.title}</p>
            <p>{item.short_desc}</p>
            <button className="font-bold">
              <Link to={`/detail/found/${item.id}`}>LIHAT DETAIL FOUND</Link>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FoundPage;
