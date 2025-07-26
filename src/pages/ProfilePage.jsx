import { useEffect, useState } from 'react';
import useInput from '../hooks/useInput';

import { ToastContainer, toast } from 'react-toastify';

import { addFoundItem } from '../utils/api/found';
import { addLostItem } from '../utils/api/lost';
import { getUserLogged } from '../utils/api/auth';
import { getMyItems, getMyAchievements, editProfile, editProfilePicture } from '../utils/api/user';
import { getAllLocations } from '../utils/api';

import ProfileCard from '../components/Profile/ProfileCard';
import MyItem from '../components/Profile/MyItem';
import SearchMyItem from '../components/Profile/SearchMyItem';
import ItemCard from '../components/ItemCard';

import AddItemModal from '../components/Profile/AddItemModal';
import AchievementModal from '../components/Profile/AchievementModal';
import EditProfileModal from '../components/Profile/EditProfileModal';

function ProfilePage() {
  const [title, onTitleChange] = useInput('');
  const [shortDesc, onShortDescChange] = useInput('');
  const [description, onDescriptionChange] = useInput('');
  const [date, onDateChange] = useInput('');

  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');

  const [type, setType] = useState('lost');

  const [openModalAddItem, setOpenModalAddItem] = useState(false);
  const [openModalAchievement, setOpenModalAchievement] = useState(false);
  const [openModalEditProfile, setOpenModalEditProfile] = useState(false);

  const [profile, setProfile] = useState({});
  const [myItems, setMyItems] = useState([]);
  const [myAchievements, setMyAchievements] = useState([]);

  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [userResponse, myItemResponse, myAchievementResponse, locationResponse] =
          await Promise.all([
            getUserLogged(),
            getMyItems(),
            getMyAchievements(),
            getAllLocations(),
          ]);

        setProfile(userResponse.data);
        setMyItems(myItemResponse.data);
        setMyAchievements(myAchievementResponse.data);
        setLocations(locationResponse.data);

        setFullname(userResponse.data.fullname);
        setUsername(userResponse.data.username);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (locations.length > 0 && !selectedLocation) {
      const index = locations.findIndex((loc) => loc.id === profile.location_id);
      setSelectedLocation(locations[index]);
    }
  }, [locations, selectedLocation, profile.location_id]);

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
      setOpenModalAddItem(false);
    }
  }

  async function onEditProfile(event) {
    event.preventDefault();

    try {
      await editProfile(fullname, selectedLocation.id);

      toast.success('Edit Profile berhasil');
      setOpenModalEditProfile(false);
    } catch (error) {
      console.log(error);
      toast.error('Terjadi kesalahan pada server');
    } finally {
      const { data } = await getUserLogged();
      setProfile(data);
    }
  }

  async function onEditProfileImage(event) {
    try {
      await editProfilePicture(event.target.files[0]);
      toast.success('Unggah gambar berhasil');
    } catch (error) {
      console.log(error);
      toast.error('Terjadi kesalahan saat mengunggah gambar');
    } finally {
      const { data } = await getUserLogged();
      setProfile(data);
    }
  }

  return (
    <section className="flex min-h-screen flex-col pb-20">
      <ToastContainer position="bottom-right" />
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
          myAchievementsCount={myAchievements.length}
          setOpenModalAchievement={setOpenModalAchievement}
          setOpenModalEditProfile={setOpenModalEditProfile}
          onEditProfileImage={onEditProfileImage}
        />
      </div>

      <div className="px-4">
        <MyItem setOpenModal={setOpenModalAddItem} />
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
        openModal={openModalAddItem}
        setOpenModal={setOpenModalAddItem}
      />

      <AchievementModal
        myAchievements={myAchievements}
        openModalAchievement={openModalAchievement}
        setOpenModalAchievement={setOpenModalAchievement}
      />

      <EditProfileModal
        username={username}
        fullname={fullname}
        location_id={profile?.location_id}
        setFullname={setFullname}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        locations={locations}
        openModalEditProfile={openModalEditProfile}
        setOpenModalEditProfile={setOpenModalEditProfile}
        onEditProfile={onEditProfile}
      />
    </section>
  );
}

export default ProfilePage;
