import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


function MasonryGallery() {
  const sectionGalleryRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  
  const images = Array(6).fill({
    id: 1,
    alt: "Wedding photo 1",
    imageUrl: "https://images.prismic.io/lf-web/Zt6G-RoQrfVKl1Zv_LF_About_02.jpg"
  });

  useEffect(() => {
    if (galleryRef.current && sectionGalleryRef.current) {
      const imageElements = galleryRef.current.querySelectorAll('.image-item');
      
      console.log(imageElements);
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionGalleryRef.current,
          start: "top center", 
          toggleActions: "play none none none", 
          markers: true, 
        }
      });

      tl.fromTo(
        imageElements,
        { 
          opacity: 0, 
          y: 20 
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.2,
          ease: "power2.out",
        }
      );

      return () => {
        tl.kill();
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    }
  }, []);

  return (
    <section ref={sectionGalleryRef} className="py-10 bg-gray-100">
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