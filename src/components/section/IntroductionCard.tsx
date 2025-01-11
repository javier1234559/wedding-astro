import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface IntroductionCardProps {
  type: string;
  name: string;
  description: string;
  images: string[];
}

const IntroductionCard: React.FC<IntroductionCardProps> = ({ type, name, description, images }) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const timeline = gsap.timeline();

    // Animating title
    timeline.to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "sine.out",
    });

    // Animating description
    timeline.to(
      descriptionRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "sine.out",
      },
      "-=0.5" // Bắt đầu animation sớm hơn 0.5s
    );

    // Animating images
    imagesRef.current.forEach((image, index) => {
      timeline.to(
        image,
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 0.8,
          ease: "sine.out",
        },
        "-=0.5"
      );
    });
  }, [type]);

  return (
    <div className="p-6 bg-white shadow rounded text-center">
      <h3
        ref={titleRef}
        className="text-xl font-bold mb-2 opacity-0 translate-y-8"
      >
        {type}
      </h3>
      <p
        ref={descriptionRef}
        className="mb-8 opacity-0 translate-y-8"
      >
        <strong>{name}</strong> - {description}
      </p>
      <div className="relative grid grid-cols-3 gap-2 mt-4">
        {images.map((src, index) => (
          <div
            key={index}
            ref={(el) => {
              imagesRef.current[index] = el;
            }} 
            className={`relative overflow-hidden rounded-lg opacity-0 translate-y-8`}
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
};

export default IntroductionCard;
