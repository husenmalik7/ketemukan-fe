import { Link } from 'react-router-dom';

function LostPage() {
  const dummyItem = [
    {
      id: 'id-satu',
      title: 'hilang dompet warna hitam',
      short_desc: 'hilang dompet di dufan, warna hitam',
      description: 'jika ada yang menemukan dompet, mohon hubungi nomor saya, atau datang ke rumah',
      picture: 'link_picture',
      lostDate: '09-09-2000',
      createdAt: '2000',
      updatedAt: '2020',
      userId: 'id-user-satu',
    },
    {
      id: 'id-dua',
      title: 'hilang dompet warna putih',
      short_desc: 'hilang dompet di dufan, warna hitam',
      description: 'jika ada yang menemukan dompet, mohon hubungi nomor saya, atau datang ke rumah',
      picture: 'link_picture',
      lostDate: '09-09-2000',
      createdAt: '2000',
      updatedAt: '2020',
      userId: 'id-user-satu',
    },
  ];

  return (
    <section>
      <p>LostPage page</p>

      <div className="bg-orange-300 h-120">
        {dummyItem.map((item, index) => (
          <div key={index} className="item bg-orange-100 pb-12">
            <p>{item.id}</p>
            <p>{item.title}</p>
            <p>{item.short_desc}</p>
            <button className="font-bold">
              <Link to={`/detail/lost/${item.id}`}>LIHAT DETAIL LOST</Link>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default LostPage;
