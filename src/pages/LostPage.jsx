import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLostItems } from '../utils/api/lost';
import Card from '../components/Card';

function LostPage() {
  const [losts, setLosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchLostItems() {
      const { error, data } = await getLostItems();
      if (error) return alert('Terjadi kesalahan pada server');
      setLosts(data);
    }

    fetchLostItems();
  }, []);

  function handleClick(id) {
    navigate(`/detail/lost/${id}`);
  }

  return (
    <section className="mx-auto my-12 grid max-w-fit grid-cols-1 gap-y-4 sm:grid-cols-2 md:grid-cols-3">
      {losts.map((item, index) => (
        <div key={index} onClick={() => handleClick(item.id)}>
          <Card title={item.title} shortDesc={item.short_desc} />
        </div>
      ))}
    </section>
  );
}

export default LostPage;
