import { useEffect, useRef } from "react";
import { Users, Church, UtensilsCrossed } from "lucide-react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface TimeLineItemProps {
  time: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

function TimeLineItem({ time, title, description, icon }: TimeLineItemProps) {
  return (
    <li className="mb-10 ml-4 opacity-0">
      <div className="absolute w-8 h-8 bg-primary rounded-full -left-8 border-2 border-primary flex items-center justify-center">
        {icon}
      </div>
      <time className="mb-1 text-sm font-normal text-gray-400 ml-2">{time}</time>
      <h3 className="text-lg font-semibold text-gray-900 ml-2">{title}</h3>
      <p className="text-base font-normal text-gray-600 ml-2">{description}</p>
    </li>
  );
}

function TimeLine() {
  const timelineRef = useRef<HTMLOListElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const timelineData = [
    {
      time: "9:00 AM",
      title: "Đón khách",
      description: "Bắt đầu đón khách tại nhà trai.",
      icon: <Users size={16} className="text-secondary" />
    },
    {
      time: "11:00 AM",
      title: "Lễ thành hôn",
      description: "Tiến hành lễ thành hôn tại nhà gái.",
      icon: <Church size={16} className="text-secondary" />
    },
    {
      time: "1:00 PM",
      title: "Tiệc cưới",
      description: "Thưởng thức tiệc cưới tại nhà hàng sang trọng.",
      icon: <UtensilsCrossed size={16} className="text-secondary" />
    },
  ];

  useEffect(() => {
    if (timelineRef.current && sectionRef.current) {
      const items = timelineRef.current.querySelectorAll("li");
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center", 
          toggleActions: "play none none none", 
          markers: true, 
        }
      });

      tl.fromTo(
        items,
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
    <section ref={sectionRef} className="py-10 mx-4">
      <h2 className="text-3xl font-bold text-center mb-6">Lịch trình Hôn Lễ</h2>
      <div className="md:block flex justify-center md:max-w-3xl w-full mx-auto">
        <ol
          className="relative border-l border-gray-200"
          ref={timelineRef}
        >
          {timelineData.map((item, index) => (
            <TimeLineItem
              key={index}
              time={item.time}
              title={item.title}
              description={item.description}
              icon={item.icon}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}

export default TimeLine;