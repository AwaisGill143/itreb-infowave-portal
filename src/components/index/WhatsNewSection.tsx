
import { useState, useEffect } from "react";

const WhatsNewSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const whatsNewSlides = [
    {
      image: "/lovable-uploads/cc.jpg",
      title: "New Community Initiative Launch",
      text: "Join us in our latest community outreach program"
    },
    {
      image: "/lovable-uploads/bb.jpg",
      title: "Educational Workshop Series",
      text: "Enhance your skills with our comprehensive workshops"
    },
    {
      image: "/lovable-uploads/cc.jpg",
      title: "Annual Conference 2024",
      text: "Register now for our biggest event of the year"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % whatsNewSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 bg-gradient-to-r from-religious-50 to-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-religious-800 mb-12">What's New</h2>
        <div className="relative max-w-4xl mx-auto">
          <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
            {whatsNewSlides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div className="relative h-full bg-gradient-to-r from-religious-600 to-religious-800 flex items-center">
                  <img
                      src={slide.image}
                      alt={slide.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  <div className="absolute inset-0 bg-black opacity-30"></div>
                  <div className="relative z-10 text-white p-12 max-w-2xl">
                    <h3 className="text-3xl font-bold mb-4">{slide.title}</h3>
                    <p className="text-xl opacity-90">{slide.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-6 space-x-2">
            {whatsNewSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-religious-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatsNewSection;
