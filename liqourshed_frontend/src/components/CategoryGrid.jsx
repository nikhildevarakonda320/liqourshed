import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const CategoryGrid = () => {
  const categories = [
    {
      title: "WINE",
      image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=2070&auto=format&fit=crop",
      size: "large"
    },
    {
      title: "LIQUOR",
      image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop",
      size: "large"
    },
    {
      title: "Flash Deals",
      subtitle: "Limited Time Offers",
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2000&auto=format&fit=crop",
      size: "small"
    },
    {
      title: "Ship12Deals",
      subtitle: "Save on Shipping",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2000&auto=format&fit=crop",
      size: "small"
    },
    {
      title: "Cocktails",
      subtitle: "Seasonal Favorites",
      image: "https://images.unsplash.com/photo-1536935338788-843bb6303668?q=80&w=2000&auto=format&fit=crop",
      size: "small"
    },
    {
      title: "Top 100",
      subtitle: "2025 Lists",
      image: "https://images.unsplash.com/photo-1578269174936-2709b6aeb913?q=80&w=2071&auto=format&fit=crop",
      size: "small"
    },
    {
      title: "New Arrivals",
      subtitle: "Just In Stock",
      image: "https://images.unsplash.com/photo-1598155523122-38423bb4d6c1?q=80&w=2000&auto=format&fit=crop",
      size: "small"
    },
    {
      title: "Gifts",
      subtitle: "For Every Occasion",
      image: "https://images.unsplash.com/photo-1549417229-aa67d3263c09?q=80&w=2000&auto=format&fit=crop",
      size: "small"
    }
  ];

  return (
    <div className="container mx-auto px-12 md:px-24 py-12 -mt-24 relative z-20">
      {/* Top Grid: Two Large Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {categories.slice(0, 2).map((cat, idx) => (
          <Link 
            key={idx} 
            to={`/shop/${cat.title.toLowerCase()}`}
            className="h-96 relative group cursor-pointer overflow-hidden rounded-xl shadow-2xl"
          >
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition duration-300 z-10"></div>
            <img 
              src={cat.image} 
              alt={cat.title} 
              className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent p-8 z-20">
              <h3 className="text-4xl font-bold text-white uppercase tracking-wider drop-shadow-md">{cat.title}</h3>
            </div>
          </Link>
        ))}
      </div>

      {/* Bottom Slider Section */}
      <div className="relative group">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          navigation={{
            nextEl: '.swiper-button-next-custom',
            prevEl: '.swiper-button-prev-custom',
          }}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
          className="pb-12 px-2"
        >
          {categories.slice(2).map((cat, idx) => (
            <SwiperSlide key={idx}>
              <Link 
                to={`/shop/${cat.title.toLowerCase()}`}
                className="h-72 block relative cursor-pointer overflow-hidden rounded-xl shadow-lg border border-slate-100 hover:shadow-xl transition-shadow bg-white"
              >
                <img 
                  src={cat.image} 
                  alt={cat.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold text-slate-800 uppercase tracking-wide">{cat.title}</h3>
                  <p className="text-xs text-slate-500 mt-1">{cat.subtitle}</p>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
        
        {/* Custom Navigation Buttons */}
        <button className="swiper-button-prev-custom absolute top-1/2 -left-12 -translate-y-1/2 z-30 w-10 h-10 bg-slate-800 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-30">
          ❮
        </button>
        <button className="swiper-button-next-custom absolute top-1/2 -right-12 -translate-y-1/2 z-30 w-10 h-10 bg-slate-800 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-30">
          ❯
        </button>
      </div>
    </div>
  );
};

export default CategoryGrid;
