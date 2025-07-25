import useInput from '../hooks/useInput';
import { addFoundItem } from '../utils/api/found';
import { addLostItem } from '../utils/api/lost';
import { getUserLogged } from '../utils/api/auth';

import ProfileCard from '../components/Profile/ProfileCard';
import MyItem from '../components/Profile/MyItem';
import AddItemModal from '../components/Profile/AddItemModal';
import { useEffect, useState } from 'react';

function ProfilePage() {
  const [title, onTitleChange] = useInput('');
  const [shortDesc, onShortDescChange] = useInput('');
  const [description, onDescriptionChange] = useInput('');
  const [date, onDateChange] = useInput('');

  const [type, setType] = useState('lost');
  const [openModal, setOpenModal] = useState(false);

  const [profile, setProfile] = useState({});

  useEffect(() => {
    async function fetchProfile() {
      try {
        const { data } = await getUserLogged();
        setProfile(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchProfile();
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
    // TODO h-screennya hapus sama bg
    <section className="h-screen bg-orange-200">
      <div className="bg-orange-900 p-4 py-6">
        <ProfileCard
          username={profile?.username}
          fullname={profile?.fullname}
          picture_url={profile?.picture_url}
          points={profile?.points}
          created_at={profile?.created_at}
          location_name={profile?.location_name}
        />
      </div>

      <div className="bg-orange-500 px-4">
        <MyItem setOpenModal={setOpenModal} />
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
