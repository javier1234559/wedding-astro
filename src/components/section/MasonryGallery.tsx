import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function MasonryGallery() {
  const galleryRef = useRef<HTMLDivElement>(null);
  
  const images = Array(6).fill({
    id: 1,
    alt: "Wedding photo 1",
    imageUrl: "https://images.prismic.io/lf-web/Zt6G-RoQrfVKl1Zv_LF_About_02.jpg"
  });

  useEffect(() => {
    if (galleryRef.current) {
      const imageElements = galleryRef.current.querySelectorAll('.image-item');
      
      gsap.fromTo(
        imageElements,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: galleryRef.current,
            start: "top center+=100",
            toggleActions: "play none none none",
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section className="py-10 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-6">Album Hôn Lễ</h2>
      <div 
        ref={galleryRef}
        className="container mx-auto px-4"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div 
              key={index} 
              className="image-item relative overflow-hidden group rounded-lg"
            >
              <img
                src={image.imageUrl}
                alt={image.alt}
                className="w-full h-auto rounded-lg transform transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default MasonryGallery;