import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFoundItems } from '../utils/api/found';
import Card from '../components/Card';

function FoundPage() {
  const [founds, setFounds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchFoundItems() {
      const { error, data } = await getFoundItems();
      if (error) return alert('Terjadi kesalahan pada server');
      setFounds(data);
    }

    fetchFoundItems();
  }, []);

  function handleClick(id) {
    navigate(`/detail/found/${id}`);
  }

  return (
    <section className="mx-auto my-12 grid max-w-fit grid-cols-1 gap-y-4 sm:grid-cols-2 md:grid-cols-3">
      {founds.map((item, index) => (
        <div key={index} onClick={() => handleClick(item.id)}>
          <Card title={item.title} shortDesc={item.short_desc} />
        </div>
      ))}
    </section>
  );
}

export default FoundPage;
