import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getLostItems } from '../utils/api/lost';

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
    <section>
      <p>LostPage page</p>

      <div className="h-120 bg-orange-300">
        {losts.map((item, index) => (
          <div key={index} className="item bg-orange-100 pb-12">
            <p>{item.id}</p>
            <p>{item.title}</p>
            <p>{item.short_desc}</p>
            <button className="font-bold">
              <Link to={`/detail/lost/${item.id}`}>LIHAT DETAIL LOST</Link>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default LostPage;
