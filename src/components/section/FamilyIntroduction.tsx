interface IntroductionCardProps {
  type: string;
  name: string;
  description: string;
  images: string[];
}

function IntroductionCard({ type, name, description, images }: IntroductionCardProps) {
  return (
    <div className="p-6 bg-white shadow rounded text-center">
      <h3 className="text-xl font-bold mb-2">{type}</h3>
      <p className="mb-4">
        <strong>{name}</strong> - {description}
      </p>
      <div className="relative grid grid-cols-3 gap-2">
        {images.map((src, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-lg"
            style={{
              transform: `translateY(${index * -10}px) rotate(${index * 3 - 3}deg)`,
            }}
          >
            <img
              src={src}
              alt={`${type} Image ${index + 1}`}
              className="w-full h-auto object-cover shadow-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
}


function FamilyIntroduction() {

  const introductions = [
    {
      id: 1,
      type: 'Đàng Trai',
      name: 'Anh Tuấn',
      description: 'Chú rể với nụ cười ấm áp và trái tim chân thành.',
      images: [
        'https://images.prismic.io/lf-web/ZtsgSxoQrfVKlzFP_banh-nua-entremet.jpg',
        'https://images.prismic.io/lf-web/Zt6G-RoQrfVKl1Zv_LF_About_02.jpg',
        'https://images.prismic.io/lf-web/Zt6G-BoQrfVKl1Zu_LF_About_01.jpg',
      ],
    },
    {
      id: 2,
      type: 'Đàng Gái',
      name: 'Thu Hương',
      description: 'Cô dâu xinh đẹp với nụ cười rạng ngời.',
      images: [
        'https://images.prismic.io/lf-web/ZtsgSxoQrfVKlzFP_banh-nua-entremet.jpg',
        'https://images.prismic.io/lf-web/Zt6G-RoQrfVKl1Zv_LF_About_02.jpg',
        'https://images.prismic.io/lf-web/Zt6G-BoQrfVKl1Zu_LF_About_01.jpg',
      ],
    },
  ];
  

  return (
    <section className="py-10 text-center">
      <h2 className="text-3xl font-bold mb-6">Giới thiệu Đàng Trai & Đàng Gái</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {introductions.map((intro) => (
          <IntroductionCard
          key={intro.id}
          type={intro.type}
          name={intro.name}
          description={intro.description}
          images={intro.images}
          />
        ))}
      </div>
    </section>
  );
}
export default FamilyIntroduction;