import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'astro/components/Image.astro';

gsap.registerPlugin(ScrollTrigger);

function MasonryGallery() {
  const sectionGalleryRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  const images = Array.from({ length:7 }, (_, index) => ({
    id: index + 1,
    alt: `Wedding ${index + 1}`,
    imageUrl: `/image${index + 1}.jpeg`,
  }));

  useEffect(() => {
    if (galleryRef.current && sectionGalleryRef.current) {
      const imageElements = galleryRef.current.querySelectorAll('.image-item');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionGalleryRef.current,
          start: 'top center',
          toggleActions: 'play none none none',
        },
      });

      tl.fromTo(
        imageElements,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.2,
          ease: 'power2.out',
        }
      );

      return () => {
        tl.kill();
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    }
  }, []);

  return (
    <section ref={sectionGalleryRef} className="py-10 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-6">Album Hôn Lễ</h2>
      <div ref={galleryRef} className="container mx-auto px-4">
        {/* Masonry layout using Tailwind's columns utility */}
        <div className="columns-1 sm:columns-2 md:columns-3 gap-4">
          {images.map((image) => (
            <div
              key={image.id}
              className="image-item relative overflow-hidden group rounded-lg mb-4 break-inside-avoid"
            >
              <Image
                src={image.imageUrl}
                alt={image.alt}
                width={300} // Add appropriate width
                height={200} // Add appropriate height
                class="w-full h-auto rounded-lg transform transition-transform duration-300 group-hover:scale-105"
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