function FoundPage() {
  const dummyItem = [
    {
      id: 'id-satu',
      title: 'ditemukan dompet warna hitam',
      short_desc: 'ditemukan dompet di dufan, warna hitam',
      description: 'jika ada yang menemukan dompet, mohon hubungi nomor saya, atau datang ke rumah',
      picture: 'link_picture',
      lostDate: '09-09-2000',
      createdAt: '2000',
      updatedAt: '2020',
      userId: 'id-user-satu',
    },
    {
      id: 'id-dua',
      title: 'ditemukan dompet warna putih',
      short_desc: 'ditemukan dompet di dufan, warna hitam',
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
      <p>FoundPage page</p>

      <div className="bg-orange-300 h-120">
        {dummyItem.map((item, index) => (
          <div key={index} className="item bg-orange-100 pb-12">
            <p>{item.id}</p>
            <p>{item.title}</p>
            <p>{item.short_desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FoundPage;
