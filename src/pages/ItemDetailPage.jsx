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
import { BiSolidCategory } from 'react-icons/bi';
import { FaMapLocation } from 'react-icons/fa6';

import LoadingModal from '../components/LoadingModal';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function ItemDetailPage({ username }) {
  const navigate = useNavigate();
  const { type, id } = useParams();
  const [item, setItem] = useState(null);
  const [comments, setComments] = useState(null);
  const [comment, onCommentChange, setComment] = useInput('');

  const [isLoading, setIsLoading] = useState(false);

  const [openModalGeolocation, setOpenModalGeolocation] = useState(false);

  const statusColorMap = {
    lost: 'bg-orange-500',
    found: 'bg-green-500',
    resolved: 'bg-gray-500',
  };

  useEffect(() => {
    async function fetchItemDetail() {
      setIsLoading(true);
      try {
        const { error, data } =
          type === 'lost' ? await getLostItemDetail(id) : await getFoundItemDetail(id);
        if (error) return navigate('/notfound');

        await new Promise((resolve) => setTimeout(resolve, 1300));
        setItem(data);
        setComments(data.comments);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    if (type !== 'lost' && type !== 'found') {
      navigate('/');
    } else {
      fetchItemDetail();
    }
  }, [type, id, navigate]);

  async function onCommentHandler(event) {
    event.preventDefault();
    setIsLoading(true);

    try {
      if (type === 'lost') {
        await addLostComment({ id, comment });
      } else {
        await addFoundComment({ id, comment });
      }

      const { data } = type === 'lost' ? await getLostItemDetail(id) : await getFoundItemDetail(id);

      await new Promise((resolve) => setTimeout(resolve, 1300));
      setComments(data.comments);
      setComment('');
    } catch (error) {
      console.log(error);
      alert('Terjadi kesalahan pada server');
    } finally {
      setIsLoading(false);
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

  const RenderItemImage = ({ img }) => {
    return img ? (
      <img
        src={img}
        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
        alt={`item-${img}`}
      />
    ) : (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-24 text-red-300"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
        />
      </svg>
    );
  };

  return (
    <section className="flex min-h-screen flex-col pb-20">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* detail */}
        <div className="order-1 col-span-1 p-4">
          <div className="rounded-lg shadow-lg">
            <div className="relative aspect-video overflow-hidden rounded-t-lg">
              <div className="flex h-full w-full items-center justify-center bg-gray-400 object-cover transition-transform duration-500 hover:scale-105">
                <RenderItemImage img={item?.picture_url} />
              </div>

              <div className="absolute top-2 right-2 flex gap-2">
                <div className="flex items-center justify-center rounded-xl bg-purple-600 px-3 py-0.5">
                  <BiSolidCategory className="mr-1 text-white" />
                  <p className="text-sm font-medium text-white capitalize">{item?.category_name}</p>
                </div>

                <div
                  className={`${statusColorMap[item?.status]} flex items-center justify-center rounded-xl px-3 py-0.5`}
                >
                  <LuClock6 className="mr-1 text-white" />
                  <p className="text-sm font-medium text-white capitalize">{item?.status}</p>
                </div>
              </div>
            </div>

            <div className="p-4">
              <p className="text-3xl font-bold">{item?.title}</p>
              <p className="text-lg text-gray-600">{item?.short_desc}</p>

              <Separator />
              <div className="grid grid-cols-2">
                <div className="col-span-2 md:col-span-1">
                  <div className="m-2 flex rounded-lg bg-blue-100 p-2">
                    <div className="flex items-center justify-center">
                      <MdOutlineDateRange className="text-red-500" />
                    </div>
                    <div className="ml-2 flex flex-col justify-center">
                      <p className="font-medium">Tanggal {type === 'lost' ? 'Hilang' : 'Ketemu'}</p>
                      <p className="text-gray-600">
                        {type === 'lost'
                          ? showFormattedDate(item?.lost_date)
                          : showFormattedDate(item?.found_date)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-span-2 md:col-span-1">
                  <div className="m-2 flex rounded-lg bg-blue-100 p-2">
                    <div className="flex items-center justify-center">
                      <IoLocationOutline className="text-red-500" />
                    </div>
                    <div className="ml-2 flex flex-col justify-center">
                      <p className="font-medium">Lokasi terakhir</p>
                      <p className="text-gray-600">{item?.location_name}</p>
                    </div>
                  </div>
                </div>

                {item?.longitude ? (
                  <div
                    onClick={() => setOpenModalGeolocation(!openModalGeolocation)}
                    className="col-span-2 cursor-pointer transition-transform duration-200 hover:-translate-y-1 md:col-span-1"
                  >
                    <div className="m-2 flex rounded-lg bg-blue-100 p-2">
                      <div className="flex items-center justify-center">
                        <FaMapLocation className="text-red-500" />
                      </div>
                      <div className="ml-2 flex flex-col justify-center">
                        <p className="font-medium">Lihat Geolokasi</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <Separator />

              <p className="mb-2 text-lg font-semibold">Deskripsi Lengkap</p>
              <p className="text-gray-600">{item?.description}</p>
            </div>
          </div>
        </div>

        {/* comment */}
        <div className="order-3 col-span-1 p-4 md:order-2">
          <div className="rounded-lg p-4 shadow-lg">
            <div className="relative">
              <div className="flex items-center">
                <BiComment className="mr-2 text-red-500" />
                <p className="text-xl font-semibold">Komentar & Bantuan</p>
                <div className="ml-auto rounded-full bg-gray-300 px-3 py-0.5">
                  <p className="text-sm font-medium">{comments?.length}</p>
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
              {comments?.map((item, index) => (
                <div key={index}>
                  <div className="flex">
                    <RenderProfilePicture img={item?.picture_url} />

                    <div className="w-full pr-2 pl-2">
                      <div className="flex items-center">
                        <p className="font-medium">{item?.fullname}</p>
                        <p className="ml-auto text-sm text-gray-500">
                          {showFormattedDate(item?.created_at)}
                        </p>
                      </div>

                      <div className="my-2 rounded-lg bg-orange-100 p-3">
                        <p className="text-sm">{item?.comment}</p>
                      </div>
                    </div>
                  </div>

                  <Separator />
                </div>
              ))}
            </div>
          </div>
        </div>

        {item?.longitude && openModalGeolocation ? (
          <div className="order-2 col-span-1 m-4 rounded-lg p-4 shadow md:order-3 md:col-span-2">
            <MapContainer
              center={[item?.latitude, item?.longitude]}
              zoom={13}
              scrollWheelZoom={false}
              className="relative z-0 h-[400px] w-full"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[item?.latitude, item?.longitude]}>
                <Popup>{item?.title}</Popup>
              </Marker>
            </MapContainer>
          </div>
        ) : (
          <></>
        )}
      </div>

      <LoadingModal isLoading={isLoading} />
    </section>
  );
}

export default ItemDetailPage;
