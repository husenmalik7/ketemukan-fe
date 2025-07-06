import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ItemDetailPage() {
  const navigate = useNavigate();
  const { type, id } = useParams();

  useEffect(() => {
    if (type !== 'lost' && type !== 'found') {
      navigate('/');
    }
  }, [type, navigate]);

  return (
    <section>
      <p>ItemDetailPage</p>
      <p>
        {type}---{id}
      </p>
    </section>
  );
}

export default ItemDetailPage;
