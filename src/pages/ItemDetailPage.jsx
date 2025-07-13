import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getLostItemDetail } from '../utils/api/lost';
import { getFoundItemDetail } from '../utils/api/found';

function ItemDetailPage() {
  const navigate = useNavigate();
  const { type, id } = useParams();
  const [item, setItem] = useState({});
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function fetchItemDetail() {
      const { error, data } =
        type === 'lost' ? await getLostItemDetail(id) : await getFoundItemDetail(id);
      if (error) return alert('Terjadi kesalahan pada server');
      setItem(data);
      setComments(data.comments);
    }

    if (type !== 'lost' && type !== 'found') {
      navigate('/');
    } else {
      fetchItemDetail();
    }
  }, [type, id, navigate]);

  return (
    <section>
      <p>ItemDetailPage</p>
      <p>
        {type}---{id}
      </p>

      <p>{item.id}</p>
      <p>{item.title}</p>
      <p>{item.short_desc}</p>
      <p>{item.description}</p>
      <p>{type === 'lost' ? item.lost_date : item.found_date}</p>

      <br />

      {comments.map((item, index) => (
        <div key={index}>
          <p>
            {item.comment} -- {item.fullname}
          </p>
        </div>
      ))}
    </section>
  );
}

export default ItemDetailPage;
