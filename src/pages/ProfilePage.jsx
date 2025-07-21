import useInput from '../hooks/useInput';
import { addFoundItem } from '../utils/api/found';
import { addLostItem } from '../utils/api/lost';

import ProfileCard from '../components/Profile/ProfileCard';
import MyItem from '../components/Profile/MyItem';

function ProfilePage() {
  const [lostTitle, onLostTitleChange] = useInput('');
  const [lostShortDesc, onLostShortDescChange] = useInput('');
  const [lostDescription, onLostDescriptionChange] = useInput('');
  const [lostDate, onLostDateChange] = useInput('');

  const [foundTitle, onFoundTitleChange] = useInput('');
  const [foundShortDesc, onFoundShortDescChange] = useInput('');
  const [foundDescription, onFoundDescriptionChange] = useInput('');
  const [foundDate, onFoundDateChange] = useInput('');

  async function onPostLostItem(event) {
    event.preventDefault();
    try {
      await addLostItem(lostTitle, lostShortDesc, lostDescription, lostDate);
      // alert('anda telah menambahkan lost item');
    } catch (error) {
      console.log(error);
      alert('Terjadi kesalahan pada server');
    }
  }

  async function onPostFoundItem(event) {
    event.preventDefault();
    try {
      await addFoundItem(foundTitle, foundShortDesc, foundDescription, foundDate);
      // alert('anda telah menambahkan found item');
    } catch (error) {
      console.log(error);
      alert('Terjadi kesalahan pada server');
    }
  }

  return (
    // TODO h-screennya hapus sama bg
    <section className="h-screen bg-orange-200">
      <div className="bg-orange-900 p-4 py-6">
        <ProfileCard />
      </div>

      <div className="bg-orange-500 px-4">
        <MyItem />
      </div>
    </section>
  );
}

export default ProfilePage;
