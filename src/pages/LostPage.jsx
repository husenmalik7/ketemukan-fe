import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { getLostItems } from '../utils/api/lost';
import { getAllCategories, getAllLocations } from '../utils/api';

import ItemCard from '../components/ItemCard';
import NoData from '../components/NoData';
import LoadingModal from '../components/LoadingModal';

import FormAuthLocationDropdown from '../components/Form/FormAuthLocationDropdown';
import FormCategoryDropdown from '../components/Form/FormCategoryDropdown';

function LostPage() {
  const [losts, setLosts] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(searchParams.get('title') || '');

  const [isLoading, setIsLoading] = useState(false);

  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [locationResponse, categoryResponse] = await Promise.all([
          getAllLocations(),
          getAllCategories(),
        ]);

        const locationsArray = locationResponse.data;
        locationsArray.unshift({
          id: '',
          name: 'Pilih lokasi',
        });

        const categoriesArray = categoryResponse.data;
        categoriesArray.unshift({
          id: '',
          name: 'Pilih kategori',
        });

        setLocations(locationsArray);
        setCategories(categoriesArray);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (locations.length > 0 && !selectedLocation) {
      const locationIndex = locations.findIndex((loc) => loc.id === searchParams.get('location'));
      setSelectedLocation(locations[locationIndex] || null);
    }

    if (categories.length > 0 && !selectedCategory) {
      const categoryIndex = categories.findIndex((cat) => cat.id === searchParams.get('category'));
      setSelectedCategory(categories[categoryIndex] || null);
    }
  }, [locations, selectedLocation, categories, selectedCategory, searchParams]);

  useEffect(() => {
    async function fetchSearchedMyItem(queryParamsTitle, queryParamsLocation, queryParamsCategory) {
      setIsLoading(true);
      try {
        const { data } = await getLostItems(
          queryParamsTitle,
          queryParamsLocation,
          queryParamsCategory
        );

        await new Promise((resolve) => setTimeout(resolve, 1300));
        setLosts(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    const queryParamsTitle = searchParams.get('title');
    const queryParamsLocation = searchParams.get('location');
    const queryParamsCategory = searchParams.get('category');
    fetchSearchedMyItem(queryParamsTitle, queryParamsLocation, queryParamsCategory);
  }, [searchParams]);

  function handleSearch(event) {
    event.preventDefault();

    setSearchParams({
      title: searchValue || '',
      location: selectedLocation?.id || '',
      category: selectedCategory?.id || '',
    });
  }

  const RenderLostItem = () => {
    if (isLoading || losts === null) {
      return <></>;
    }

    if (losts?.length > 0) {
      return (
        <div className="m-4 mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {losts.map((item, index) => (
            <div key={index}>
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
        </div>
      );
    }

    return (
      <div className="m-4 mt-16 flex flex-col items-center justify-center">
        <NoData className="text-6xl text-[#FB7A7C]" />
        <p className="text-xl font-medium text-[#FB7A7C]">Oops tidak ada data</p>
      </div>
    );
  };

  return (
    <section className="flex min-h-screen flex-col pb-20">
      <form
        onSubmit={handleSearch}
        className="m-4 mt-24 grid grid-cols-1 gap-4 md:mt-12 md:grid-cols-6"
      >
        <div className="col-span-1 md:col-span-2">
          <input
            id="id"
            type="text"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            className="mt-2 block w-full rounded-sm border border-gray-300 bg-gray-50 p-2.5 text-sm font-medium text-gray-900 focus:outline-gray-300"
            placeholder="Judul Item"
          />
        </div>

        <div className="col-span-1">
          <FormAuthLocationDropdown
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
            locations={locations}
          />
        </div>

        <div className="col-span-1">
          <FormCategoryDropdown
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            categories={categories}
          />
        </div>

        <div className="col-span-1">
          <button
            type="submit"
            className="mt-2 w-full cursor-pointer rounded-lg bg-gradient-to-r from-red-400 via-red-500 to-red-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:ring-4 focus:ring-red-300 focus:outline-none"
          >
            Cari Item
          </button>
        </div>
      </form>

      <RenderLostItem />

      <LoadingModal isLoading={isLoading} />
    </section>
  );
}

export default LostPage;
