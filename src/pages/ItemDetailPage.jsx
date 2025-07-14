import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getLostItemDetail } from '../utils/api/lost';
import { getFoundItemDetail } from '../utils/api/found';
import useInput from '../hooks/useInput';
import { addLostComment } from '../utils/api/lost';
import { addFoundComment } from '../utils/api/found';

function ItemDetailPage({ username }) {
  const navigate = useNavigate();
  const { type, id } = useParams();
  const [item, setItem] = useState({});
  const [comments, setComments] = useState([]);
  const [comment, onCommentChange, setComment] = useInput('');

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

  async function onCommentHandler(event) {
    event.preventDefault();

    try {
      if (type === 'lost') {
        await addLostComment({ id, comment });
      } else {
        await addFoundComment({ id, comment });
      }
      setComment('');
      const { data } = type === 'lost' ? await getLostItemDetail(id) : await getFoundItemDetail(id);
      setComments(data.comments);
    } catch (error) {
      console.log(error);
      alert('Terjadi kesalahan pada server');
    } finally {
      // setIsLoading(false);
    }
  }

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

      <br />
      <br />

      {username ? (
        <>
          <p>berikan komentar</p>

          <form onSubmit={onCommentHandler} className="bg-green-200 flex flex-col p-5">
            <label htmlFor="comment">komentar</label>
            <textarea
              className="bg-orange-200"
              type="text"
              id="comment"
              value={comment}
              onChange={onCommentChange}
            />
            <button className="bg-purple-200 mt-2 cursor-pointer" type="submit">
              submit
            </button>
          </form>
        </>
      ) : (
        <></>
      )}
    </section>
  );
}

export default ItemDetailPage;
