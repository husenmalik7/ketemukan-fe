import useInput from '../hooks/useInput';
import { addFoundItem } from '../utils/api/found';
import { addLostItem } from '../utils/api/lost';

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
    <section>
      <p>profile page</p>

      <form onSubmit={onPostLostItem} className="bg-green-200 flex flex-col p-5">
        <p>input barang hilang</p>

        <label htmlFor="lostTitle">judul barang hilang</label>
        <input
          className="bg-orange-200"
          type="text"
          id="lostTitle"
          value={lostTitle}
          onChange={onLostTitleChange}
        />

        <label htmlFor="lostShortDesc">deskripsi singkat barang hilang</label>
        <input
          className="bg-orange-200"
          type="text"
          id="lostShortDesc"
          value={lostShortDesc}
          onChange={onLostShortDescChange}
        />

        <label htmlFor="lostDescription">deskripsi barang hilang</label>
        <input
          className="bg-orange-200"
          type="text"
          id="lostDescription"
          value={lostDescription}
          onChange={onLostDescriptionChange}
        />

        <label htmlFor="lostDate">tanggal kehilangan</label>
        <input
          className="bg-orange-200"
          type="text"
          id="lostDate"
          value={lostDate}
          onChange={onLostDateChange}
        />

        <button className="bg-purple-200 mt-2 cursor-pointer" type="submit">
          submit
        </button>
      </form>

      <br />
      <br />

      <form onSubmit={onPostFoundItem} className="bg-green-200 flex flex-col p-5">
        <p>input barang ketemu</p>

        <label htmlFor="foundTitle">judul barang ketemu</label>
        <input
          className="bg-orange-200"
          type="text"
          id="foundTitle"
          value={foundTitle}
          onChange={onFoundTitleChange}
        />

        <label htmlFor="foundShortDesc">deskripsi singkat barang ketemu</label>
        <input
          className="bg-orange-200"
          type="text"
          id="foundShortDesc"
          value={foundShortDesc}
          onChange={onFoundShortDescChange}
        />

        <label htmlFor="foundDescription">deskripsi barang ketemu</label>
        <input
          className="bg-orange-200"
          type="text"
          id="foundDescription"
          value={foundDescription}
          onChange={onFoundDescriptionChange}
        />

        <label htmlFor="foundDate">tanggal penemuan</label>
        <input
          className="bg-orange-200"
          type="text"
          id="foundDate"
          value={foundDate}
          onChange={onFoundDateChange}
        />

        <button className="bg-purple-200 mt-2 cursor-pointer" type="submit">
          submit
        </button>
      </form>
    </section>
  );
}

export default ProfilePage;
