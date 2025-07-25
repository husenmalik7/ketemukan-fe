import useInput from '../hooks/useInput';
import { addFoundItem } from '../utils/api/found';
import { addLostItem } from '../utils/api/lost';
import { getUserLogged } from '../utils/api/auth';
import { getMyItems } from '../utils/api/user';

import ProfileCard from '../components/Profile/ProfileCard';
import MyItem from '../components/Profile/MyItem';
import AddItemModal from '../components/Profile/AddItemModal';
import SearchMyItem from '../components/Profile/SearchMyItem';
import { useEffect, useState } from 'react';
import ItemCard from '../components/ItemCard';

function ProfilePage() {
  const [title, onTitleChange] = useInput('');
  const [shortDesc, onShortDescChange] = useInput('');
  const [description, onDescriptionChange] = useInput('');
  const [date, onDateChange] = useInput('');

  const [type, setType] = useState('lost');
  const [openModal, setOpenModal] = useState(false);

  const [profile, setProfile] = useState({});
  const [myItems, setMyItems] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [userResponse, myItemResponse] = await Promise.all([getUserLogged(), getMyItems()]);

        setProfile(userResponse.data);
        setMyItems(myItemResponse.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  async function onPostItem(event) {
    event.preventDefault();
    try {
      if (type === 'lost') {
        await addLostItem(title, shortDesc, description, date);
      } else {
        await addFoundItem(title, shortDesc, description, date);
      }

      // alert('anda telah menambahkan lost item');
    } catch (error) {
      console.log(error);
      alert('Terjadi kesalahan pada server');
    } finally {
      setOpenModal(false);
    }
  }

  return (
    <section className="flex min-h-screen flex-col justify-between pb-20">
      <div className="p-4 py-6">
        <ProfileCard
          username={profile?.username}
          fullname={profile?.fullname}
          picture_url={profile?.picture_url}
          points={profile?.points}
          created_at={profile?.created_at}
          location_name={profile?.location_name}
          foundCount={profile?.foundCount}
          lostCount={profile?.lostCount}
        />
      </div>

      <div className="px-4">
        <MyItem setOpenModal={setOpenModal} />
        <SearchMyItem />
      </div>

      <div className="m-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {myItems.map((item, index) => (
          <div key={index}>
            <ItemCard
              id={item?.id}
              title={item?.title}
              short_desc={item?.short_desc}
              picture_url={item?.picture_url}
              lost_date={item.lost_date}
              found_date={item.found_date}
              status={item.status}
              created_at={item.created_at}
              category_name={item.category_name}
              location_name={item.location_name}
            />
          </div>
        ))}
      </div>

      <AddItemModal
        title={title}
        onTitleChange={onTitleChange}
        shortDesc={shortDesc}
        onShortDescChange={onShortDescChange}
        description={description}
        onDescriptionChange={onDescriptionChange}
        date={date}
        onDateChange={onDateChange}
        type={type}
        setType={setType}
        onPostItem={onPostItem}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </section>
  );
}

export default ProfilePage;
