import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

// Curated list of authentic, high-quality liquor/bar background images
const SLIDES = [
  {
    title: "Summer Sale",
    subtitle: "Up to 20% Off Select Brands",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=2070&auto=format&fit=crop", // Bright summer cocktails
    search: "Rum"
  },
  {
    title: "Wine Tasting",
    subtitle: "Join Us This Friday • 7 PM",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=2070&auto=format&fit=crop", // Wine toasting event
    search: "Wine"
  },
  {
    title: "New Arrivals",
    subtitle: "Exclusive Japanese Whiskies",
    image: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?q=80&w=2070&auto=format&fit=crop", // Whiskey focus
    search: "Whiskey"
  },
  {
    title: "Mixology Class",
    subtitle: "Learn to Craft the Perfect Cocktail",
    image: "https://images.unsplash.com/photo-1574096079513-d82599602950?q=80&w=2070&auto=format&fit=crop", // Bartender mixing
    search: "Gin"
  },
  {
    title: "Premium Spirits",
    subtitle: "Aged to Perfection",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop", // Moody bar shelf
    search: "Vodka"
  }
];

const Carousel = ({ onLiquorClick }) => {
  return (
    <div className="w-full h-[70vh] relative bg-black group">
      <Swiper
        modules={[Pagination, Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        spaceBetween={0}
        slidesPerView={1}
        pagination={{ 
          clickable: true,
          dynamicBullets: true,
          renderBullet: function (index, className) {
            return '<span class="' + className + ' !bg-white"></span>';
          }
        }}
        autoplay={{ delay: 10000, disableOnInteraction: false }}
        className="h-full w-full"
      >
        {SLIDES.map((slide) => (
          <SwiperSlide key={slide.title} className="relative cursor-pointer" onClick={() => onLiquorClick(slide.search)}>
            {/* Dark Overlay for text readability */}
            <div className="absolute inset-0 bg-black/40 z-10 flex flex-col justify-center items-center text-center p-12">
              <h2 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 drop-shadow-2xl tracking-tight animate-fade-in-up">
                {slide.title}
              </h2>
              <p className="text-slate-100 text-xl md:text-3xl font-light tracking-widest uppercase mb-10 drop-shadow-lg animate-fade-in-up delay-100 border-t border-b border-white/30 py-3 px-10 backdrop-blur-sm">
                {slide.subtitle}
              </p>
              <button className="px-8 py-3 bg-amber-700/90 hover:bg-amber-600 text-white text-base font-medium tracking-wider rounded-sm transition transform hover:scale-105 shadow-2xl animate-fade-in-up delay-200 border border-amber-500/50 backdrop-blur-md">
                EXPLORE COLLECTION
              </button>
            </div>
            
            {/* Background Image */}
            <img 
              src={slide.image}
              alt={slide.title} 
              className="w-full h-full object-cover animate-slow-zoom"
              style={{ animationDuration: '20s' }} // Subtle zoom effect
            />
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Bottom Gradient Fade to White */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-white z-20 pointer-events-none"></div>
    </div>
  );
};

export default Carousel;
