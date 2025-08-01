import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import ItemCard from '../components/ItemCard';
import { getHome } from '../utils/api/user';

import { FaMagnifyingGlass } from 'react-icons/fa6';
import { FaCoins } from 'react-icons/fa';
import { BsPeopleFill } from 'react-icons/bs';

import Cat from '../assets/Cat';
import NoData from '../components/NoData';

import LoadingModal from '../components/LoadingModal';

function HomePage() {
  const [topContributor, setTopContributor] = useState(null);
  const [mostLostedLocations, setMostLostedLocations] = useState(null);
  const [mostLostedCategories, setMostLostedCategories] = useState(null);
  const [recentItems, setRecentItems] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const { data } = await getHome();

        await new Promise((resolve) => setTimeout(resolve, 1300));
        setTopContributor(data.topContributor);
        setMostLostedLocations(data.mostLostedLocations);
        setMostLostedCategories(data.mostLostedCategories);
        setRecentItems(data.myItems);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  const RenderProfilePicture = ({ img }) => {
    return img ? (
      <img src={img} className="h-24 w-24 rounded-full object-cover" alt="Top Contributor" />
    ) : (
      <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-gray-200 outline-1 outline-red-900">
        <Cat />
      </div>
    );
  };

  const NoDataContainer = () => (
    <div
      data-aos="fade-up"
      data-aos-duration="2000"
      className="col-span-1 text-center md:col-span-3"
    >
      <div className="flex flex-col items-center justify-center">
        <NoData className="text-3xl text-gray-300" />
        <p className="text-xl font-medium text-gray-300">Oops tidak ada data</p>
      </div>
    </div>
  );

  const RenderMostLostedLocations = () => {
    if (isLoading || mostLostedLocations === null) {
      return <></>;
    }

    if (mostLostedLocations?.length > 0) {
      return (
        <>
          {mostLostedLocations.map((item, index) => (
            <div
              key={index}
              data-aos="flip-left"
              data-aos-duration="2000"
              data-aos-delay={index * 150}
            >
              <div className="col-span-1 mx-12 flex flex-col items-center justify-center rounded-lg bg-orange-100 p-4 shadow-lg transition-transform duration-200 hover:-translate-y-1 md:mx-4 md:p-6">
                <p className="text-3xl font-bold text-pink-400">{item.total}</p>
                <p className="text-xl font-medium text-gray-500">{item.location_name}</p>
              </div>
            </div>
          ))}
        </>
      );
    }

    return <NoDataContainer />;
  };

  const RenderMostLostedCategories = () => {
    if (isLoading || mostLostedCategories === null) {
      return <></>;
    }

    if (mostLostedCategories?.length > 0) {
      return (
        <>
          {mostLostedCategories.map((item, index) => (
            <div
              key={index}
              data-aos="flip-right"
              data-aos-duration="2000"
              data-aos-delay={(3 - 1 - index) * 150}
            >
              <div className="col-span-1 mx-12 flex flex-col items-center justify-center rounded-lg bg-orange-100 p-4 shadow-lg transition-transform duration-200 hover:-translate-y-1 md:mx-4 md:p-6">
                <p className="text-3xl font-bold text-pink-400">{item.total}</p>
                <p className="text-xl font-medium text-gray-500">{item.category_name}</p>
              </div>
            </div>
          ))}
        </>
      );
    }

    return <NoDataContainer />;
  };

  const RenderTopContributor = () => {
    if (isLoading || topContributor === null) {
      return <></>;
    }

    if (topContributor?.length > 0) {
      return (
        <>
          {topContributor.map((item, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-duration="1300"
              data-aos-delay={index * 150}
            >
              <div className="col-span-1 mx-12 p-4 md:mx-4 md:p-6">
                <div className="flex flex-col items-center justify-center transition-transform duration-200 hover:-translate-y-1">
                  <RenderProfilePicture img={item.picture_url} />
                  <p className="text-xl font-medium text-white">{item.username}</p>
                </div>
              </div>
            </div>
          ))}
        </>
      );
    }

    return <NoDataContainer />;
  };

  const RenderRecentItems = () => {
    if (isLoading || recentItems === null) {
      return <></>;
    }

    if (recentItems?.length > 0) {
      return (
        <>
          {recentItems.map((item, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-duration="1300"
              data-aos-delay={index * 150}
            >
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
        </>
      );
    }

    return (
      <div
        data-aos="fade-up"
        data-aos-duration="2000"
        className="col-span-1 text-center md:col-span-4"
      >
        <div className="flex flex-col items-center justify-center">
          <NoData className="text-3xl text-[#FB7A7C]" />
          <p className="text-xl font-medium text-[#FB7A7C]">Oops tidak ada data</p>
        </div>
      </div>
    );
  };

  return (
    <section className="flex min-h-screen flex-col pb-6">
      {/* hero */}
      <div className="flex flex-col items-center justify-center p-4 pb-12">
        <img src="/images/ketemukan.png" className="w-64" alt="Logo Ketemukan" />
        <p className="max-w-xl text-center text-3xl font-bold text-[#FB7A7C]">
          Temukan Barangmu, Bantu Temukan Barang Orang Lain
        </p>
        <p className="mt-2 max-w-xl text-center text-xl font-medium text-gray-500">
          Cari dan laporkan barang hilang atau ditemukan dengan mudah. Bersama Ketemukan, pasti bisa
          ketemu-kan
        </p>
      </div>

      {/* statistic */}
      <div className="bg-red-500">
        <div className="my-4 grid grid-cols-1 gap-4 md:my-12 md:grid-cols-3">
          <div data-aos="fade-down" data-aos-duration="1500" className="col-span-1 md:col-span-3">
            <p className="my-2 text-center text-2xl font-bold text-white">
              Lokasi Kehilangan Paling Sering
            </p>
          </div>
          <RenderMostLostedLocations />
        </div>

        <div className="my-4 grid grid-cols-1 gap-4 md:my-12 md:grid-cols-3">
          <div data-aos="fade-down" data-aos-duration="1500" className="col-span-1 md:col-span-3">
            <p className="my-2 text-center text-2xl font-bold text-white">
              Kategori Paling Sering Dilaporkan
            </p>
          </div>
          <RenderMostLostedCategories />
        </div>

        <div className="my-4 grid grid-cols-1 gap-4 md:my-12 md:grid-cols-3">
          <div data-aos="fade-down" data-aos-duration="1500" className="col-span-1 md:col-span-3">
            <p className="my-2 text-center text-2xl font-bold text-white">Top Contributor</p>
          </div>
          <RenderTopContributor />
        </div>
      </div>

      {/* recent item */}
      <div className="mt-12">
        <p
          data-aos="fade-down"
          data-aos-duration="1500"
          className="mb-6 text-center text-2xl font-bold text-gray-500"
        >
          Recent Item
        </p>
        <div className="mx-2 grid grid-cols-1 gap-4 md:grid-cols-4">
          <RenderRecentItems />
        </div>
      </div>

      {/* cara kerja */}
      <div className="mt-12 grid grid-cols-1 gap-4 bg-red-500 p-4 pt-6 pb-8 md:grid-cols-3">
        <div data-aos="fade-down" data-aos-duration="1500" className="col-span-1 md:col-span-3">
          <p className="text-center text-2xl font-bold text-white">Gimana cara kerjanya?</p>
        </div>

        <div
          data-aos="fade-up"
          data-aos-duration="1300"
          data-aos-delay={1 * 150}
          className="flex flex-col items-center text-center"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600">
            <FaMagnifyingGlass className="text-2xl text-white" />
          </div>
          <p className="mt-2 text-xl font-medium text-white">Post Item</p>
          <p className="text-white">
            Laporkan barang hilangmu atau unggah barang yang kamu temukan dengan deskripsi yang
            jelas
          </p>
        </div>

        <div
          data-aos="fade-up"
          data-aos-duration="1300"
          data-aos-delay={2 * 150}
          className="flex flex-col items-center text-center"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-400 via-green-500 to-green-600">
            <BsPeopleFill className="text-2xl text-white" />
          </div>
          <p className="mt-2 text-xl font-medium text-white">Comment</p>
          <p className="text-white">
            Bantu mereka dengan membagikan informasi dan meninggalkan komentar yang berguna
          </p>
        </div>

        <div
          data-aos="fade-up"
          data-aos-duration="1300"
          data-aos-delay={3 * 150}
          className="flex flex-col items-center text-center"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600">
            <FaCoins className="text-2xl text-white" />
          </div>
          <p className="mt-2 text-xl font-medium text-white">Points</p>
          <p className="text-white">Dapatkan point dari pelaporan dan komentar yang membantu</p>
        </div>
      </div>

      {/* create your account */}
      <div
        data-aos="fade-down"
        data-aos-duration="1500"
        className="m-6 mt-12 flex flex-col items-center rounded-2xl bg-gradient-to-br from-orange-100 via-orange-200 to-orange-300 p-6 text-center"
      >
        <p className="text-3xl font-bold text-[#ff4548]">Siap untuk Memulai?</p>
        <p className="text-lg font-medium text-[#ff4548]">
          Bergabunglah dengan kami dan bantu mengembalikan barang hilang kepada pemiliknya
        </p>
        <div>
          <Link to="/register">
            <button
              type="button"
              className="mt-6 cursor-pointer rounded-lg bg-gradient-to-r from-red-400 via-red-500 to-red-600 px-5 py-1.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:ring-4 focus:ring-red-300 focus:outline-none"
            >
              Buat akunmu
            </button>
          </Link>
        </div>
      </div>

      <LoadingModal isLoading={isLoading} />
    </section>
  );
}

export default HomePage;
