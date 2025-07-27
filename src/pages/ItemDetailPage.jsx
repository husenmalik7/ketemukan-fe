import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useInput from '../hooks/useInput';
import Separator from '../components/Separator';
import Cat from '../assets/Cat';

import { addLostComment } from '../utils/api/lost';
import { addFoundComment } from '../utils/api/found';
import { getLostItemDetail } from '../utils/api/lost';
import { getFoundItemDetail } from '../utils/api/found';
import { showFormattedDate } from '../utils';

import { BiComment } from 'react-icons/bi';
import { IoLocationOutline } from 'react-icons/io5';
import { MdOutlineDateRange } from 'react-icons/md';
import { LuClock6 } from 'react-icons/lu';

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

  const LoginToGiveComment = () => {
    return username ? (
      <></>
    ) : (
      <div className="absolute top-0 h-full w-full">
        <div className="h-full w-full bg-gray-200/90 blur-xs" />
        <div className="absolute top-0 flex h-full w-full items-center justify-center">
          <p className="font-medium text-red-900">Login untuk berikan komentar</p>
        </div>
      </div>
    );
  };

  const RenderProfilePicture = ({ img }) => {
    return img ? (
      <img src={img} className="m-0.5 h-10 w-10 rounded-full object-cover" alt="avatar" />
    ) : (
      <div className="m-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-200 outline-1 outline-red-900">
        <Cat />
      </div>
    );
  };

  return (
    <section className="flex min-h-screen pb-20">
      <div className="w-1/2 p-4">
        <div className="rounded-lg shadow-lg">
          <div className="relative aspect-video overflow-hidden rounded-t-lg">
            <img
              src="https://picsum.photos/600"
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              alt="avatar"
            />
            <div className="absolute top-2 right-2 flex gap-2">
              <div className="flex items-center justify-center rounded-xl bg-orange-600 px-3 py-0.5">
                <LuClock6 className="mr-1 text-white" />
                <p className="text-sm font-medium text-white capitalize">{item.category_name}</p>
              </div>
              <div className="flex items-center justify-center rounded-xl bg-orange-600 px-3 py-0.5">
                <LuClock6 className="mr-1 text-white" />
                <p className="text-sm font-medium text-white capitalize">{item.status}</p>
              </div>
            </div>
          </div>

          <div className="p-4">
            <p className="text-3xl font-bold">{item.title}</p>
            <p className="text-lg text-gray-600">{item.short_desc}</p>

            <Separator />
            <div className="flex">
              <div className="m-2 flex w-1/2 rounded-lg bg-blue-100 p-2">
                <div className="flex items-center justify-center">
                  <MdOutlineDateRange className="text-red-500" />
                </div>
                <div className="ml-2 flex flex-col justify-center">
                  <p className="font-medium">Tanggal {type === 'lost' ? 'Hilang' : 'Ketemu'}</p>
                  <p className="text-gray-600">
                    {type === 'lost'
                      ? showFormattedDate(item.lost_date)
                      : showFormattedDate(item.found_date)}
                  </p>
                </div>
              </div>
              <div className="m-2 flex w-1/2 rounded-lg bg-blue-100 p-2">
                <div className="flex items-center justify-center">
                  <IoLocationOutline className="text-red-500" />
                </div>
                <div className="ml-2 flex flex-col justify-center">
                  <p className="font-medium">Lokasi terakhir</p>
                  <p className="text-gray-600">{item.location_name}</p>
                </div>
              </div>
            </div>
            <Separator />

            <p className="mb-2 text-lg font-semibold">Deskripsi Lengkap</p>
            <p className="text-gray-600">{item.description}</p>
          </div>
        </div>
      </div>

      <div className="w-1/2 p-4">
        <div className="rounded-lg p-4 shadow-lg">
          <div className="relative">
            <div className="flex items-center">
              <BiComment className="mr-2 text-red-500" />
              <p className="text-xl font-semibold">Komentar & Bantuan</p>
              <div className="ml-auto rounded-full bg-gray-300 px-3 py-0.5">
                <p className="text-sm font-medium">{comments.length}</p>
              </div>
            </div>

            <form onSubmit={onCommentHandler}>
              <div className="pt-3 pb-2">
                <textarea
                  id="message"
                  rows="2"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-100 p-2.5 text-sm text-gray-900 focus:border-red-700 focus:outline-none"
                  placeholder="Tulis komentar atau informasi yang membantu"
                  value={comment}
                  onChange={onCommentChange}
                />
              </div>

              <button
                type="submit"
                className="w-full cursor-pointer rounded-md bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 px-5 py-2 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:ring-4 focus:ring-orange-300 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                disabled={!comment}
              >
                Kirim Komentar
              </button>
            </form>

            <LoginToGiveComment />
          </div>

          <Separator />

          <div className="max-h-96 space-y-4 overflow-y-auto">
            {comments.map((item, index) => (
              <div key={index}>
                <div className="flex">
                  <RenderProfilePicture img={item.picture_url} />

                  <div className="w-full pr-2 pl-2">
                    <div className="flex items-center">
                      <p className="font-medium">{item.fullname}</p>
                      <p className="ml-auto text-sm text-gray-500">
                        {showFormattedDate(item.created_at)}
                      </p>
                    </div>

                    <div className="my-2 rounded-lg bg-orange-100 p-3">
                      <p className="text-sm">{item.comment}</p>
                    </div>
                  </div>
                </div>

                <Separator />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ItemDetailPage;
