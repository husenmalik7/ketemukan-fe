import { useEffect, useState } from 'react';

import { ToastContainer, toast } from 'react-toastify';

import { addFoundItem, deleteFoundItem, editFoundPicture, editFoundItem } from '../utils/api/found';
import { addLostItem, deleteLostItem, editLostPicture, editLostItem } from '../utils/api/lost';
import { getUserLogged } from '../utils/api/auth';
import { getMyItems, getMyAchievements, editProfile, editProfilePicture } from '../utils/api/user';
import { getAllLocations } from '../utils/api';

import ProfileCard from '../components/Profile/ProfileCard';
import MyItem from '../components/Profile/MyItem';
import SearchMyItem from '../components/Profile/SearchMyItem';
import ItemCard from '../components/ItemCard';
import NoData from '../components/NoData';

import AddItemModal from '../components/Profile/AddItemModal';
import AchievementModal from '../components/Profile/AchievementModal';
import EditProfileModal from '../components/Profile/EditProfileModal';
import DeleteItemModal from '../components/Profile/DeleteItemModal';
import AddItemImageModal from '../components/Profile/AddItemImageModal';
import EditItemModal from '../components/Profile/EditItemModal';
import PointModal from '../components/Profile/PointModal';

import { useSearchParams } from 'react-router-dom';

function ProfilePage({ onChangeProfile }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [deleteItemTitle, setDeleteItemTitle] = useState('');
  const [deleteItemId, setDeleteItemId] = useState('');

  const [openModalAddItem, setOpenModalAddItem] = useState(false);
  const [openModalAchievement, setOpenModalAchievement] = useState(false);
  const [openModalEditProfile, setOpenModalEditProfile] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddItemImageModalOpen, setIsAddItemImageModalOpen] = useState(false);
  const [isEditItemModalOpen, setIsEditItemModalOpen] = useState(false);
  const [openModalPoint, setOpenModalPoint] = useState(false);

  const [profile, setProfile] = useState({});
  const [myItems, setMyItems] = useState([]);
  const [myAchievements, setMyAchievements] = useState([]);

  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const [addedItemId, setAddedItemId] = useState('');

  const [selectedItem, setSelectedItem] = useState({});

  const [isEdited, setIsEdited] = useState(false);

  useEffect(() => {
    async function fetchSearchedMyItem(queryParams) {
      const { data } = await getMyItems(queryParams);
      setMyItems(data);
    }

    const queryParams = searchParams.get('title');
    fetchSearchedMyItem(queryParams);
  }, [searchParams]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [
          userResponse,
          //  myItemResponse,
          myAchievementResponse,
          locationResponse,
        ] = await Promise.all([
          getUserLogged(),
          // getMyItems(),
          getMyAchievements(),
          getAllLocations(),
        ]);

        setProfile(userResponse.data);
        // setMyItems(myItemResponse.data);
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

  async function onPostItem(body) {
    const { title, shortDesc, description, type, date, categoryId, locationId } = body;
    let result;

    try {
      if (type === 'lost') {
        result = await addLostItem(title, shortDesc, description, date, categoryId, locationId);
      } else {
        result = await addFoundItem(title, shortDesc, description, date, categoryId, locationId);
      }

      if (result?.error) throw new Error('Gagal menambahkan item');

      setAddedItemId(result.data.lostId ? result.data.lostId : result.data.foundId);
      toast.success('Berhasil menambahkan item');
    } catch (error) {
      console.log(error);
      toast.error('Terjadi kesalahan pada server');
    } finally {
      setIsEdited(false);
      setOpenModalAddItem(false);
      setIsAddItemImageModalOpen(true);

      const [userResponse, myItemResponse] = await Promise.all([getUserLogged(), getMyItems()]);
      setProfile(userResponse.data);
      setMyItems(myItemResponse.data);
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
      onChangeProfile(data);
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
      onChangeProfile(data);
    }
  }

  async function handleUploadItemImage(id, event) {
    let result;

    try {
      if (id.includes('lost')) {
        result = await editLostPicture(id, event.target.files[0]);
      } else {
        result = await editFoundPicture(id, event.target.files[0]);
      }

      if (result?.error) throw new Error('Gagal mengupload gambar');

      toast.success('Unggah gambar berhasil');
    } catch (error) {
      console.log(error);
      toast.error('Terjadi kesalahan saat mengunggah gambar');
    } finally {
      setIsAddItemImageModalOpen(false);

      const [userResponse, myItemResponse] = await Promise.all([getUserLogged(), getMyItems()]);
      setProfile(userResponse.data);
      setMyItems(myItemResponse.data);
    }
  }

  async function handleOpenDeleteItemModal(id, title) {
    setDeleteItemTitle(title);
    setDeleteItemId(id);

    setIsDeleteModalOpen(true);
  }

  async function handleOpenEditItemModal(id) {
    const item = myItems.find((item) => item.id === id);

    setSelectedItem(item);
    setIsEditItemModalOpen(true);
  }

  async function onEditItem(body) {
    const { id, title, shortDesc, description, type, date, status, categoryId, locationId } = body;
    let result;

    const longitude = null;
    const latitude = null;

    try {
      if (type === 'lost') {
        result = await editLostItem(
          id,
          title,
          shortDesc,
          description,
          date,
          status,
          longitude,
          latitude,
          categoryId,
          locationId
        );
      } else {
        result = await editFoundItem(
          id,
          title,
          shortDesc,
          description,
          date,
          status,
          longitude,
          latitude,
          categoryId,
          locationId
        );
      }

      if (result?.error) throw new Error('Gagal mengedit item');

      setAddedItemId(id);
      toast.success('Berhasil mengedit item');
    } catch (error) {
      console.log(error);
      toast.error('Terjadi kesalahan pada server');
    } finally {
      setIsEdited(true);
      setIsEditItemModalOpen(false);
      setIsAddItemImageModalOpen(true);

      const [userResponse, myItemResponse] = await Promise.all([getUserLogged(), getMyItems()]);
      setProfile(userResponse.data);
      setMyItems(myItemResponse.data);
    }
  }

  async function handleDeleteItem(id) {
    try {
      if (id.includes('lost')) {
        await deleteLostItem(id);
      } else {
        await deleteFoundItem(id);
      }

      toast.success('Delete item berhasil');
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.log(error);
      toast.error('Terjadi kesalahan saat mendelete item');
    } finally {
      const { data } = await getMyItems();
      setMyItems(data);
    }
  }

  async function onSearchMyItem(searchValue) {
    setSearchParams({ title: searchValue });
  }

  const RenderMyItems = () => {
    if (myItems.length > 0) {
      return (
        <div className="m-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {myItems.map((item, index) => (
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
                handleOpenDeleteItemModal={handleOpenDeleteItemModal}
                handleOpenEditItemModal={handleOpenEditItemModal}
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
          setOpenModalPoint={setOpenModalPoint}
        />
      </div>

      <div className="px-4">
        <MyItem setOpenModal={setOpenModalAddItem} />
        <SearchMyItem onSearchMyItem={onSearchMyItem} searchParams={searchParams.get('title')} />
      </div>

      <RenderMyItems />

      <AddItemModal
        onPostItem={onPostItem}
        openModalAddItem={openModalAddItem}
        setOpenModalAddItem={setOpenModalAddItem}
      />

      <EditItemModal
        onEditItem={onEditItem}
        selectedItem={selectedItem}
        isEditItemModalOpen={isEditItemModalOpen}
        setIsEditItemModalOpen={setIsEditItemModalOpen}
      />

      <AddItemImageModal
        isEdited={isEdited}
        isAddItemImageModalOpen={isAddItemImageModalOpen}
        setIsAddItemImageModalOpen={setIsAddItemImageModalOpen}
        addedItemId={addedItemId}
        handleUploadItemImage={handleUploadItemImage}
      />

      <AchievementModal
        myAchievements={myAchievements}
        openModalAchievement={openModalAchievement}
        setOpenModalAchievement={setOpenModalAchievement}
      />

      <PointModal openModalPoint={openModalPoint} setOpenModalPoint={setOpenModalPoint} />

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

      <DeleteItemModal
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        deleteItemId={deleteItemId}
        deleteItemTitle={deleteItemTitle}
        handleDeleteItem={handleDeleteItem}
      />
    </section>
  );
}

export default ProfilePage;
