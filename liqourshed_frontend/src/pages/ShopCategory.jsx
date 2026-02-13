import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaWineBottle, FaShoppingCart } from 'react-icons/fa';
import LiquorCard from '../components/LiquorCard';
import { getLiquors } from '../services/api';

const ShopCategory = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const categoryConfig = {
    wine: {
      title: 'Exquisite Wines',
      description: 'Discover our curated selection of fine red, white, and sparkling wines from the world\'s best vineyards.',
      banner: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=2070&auto=format&fit=crop',
      accent: '#8B0000'
    },
    liquor: {
      title: 'Premium Spirits',
      description: 'From small-batch bourbon to imported vodka, find the perfect spirit for your next cocktail or neat pour.',
      banner: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=2069&auto=format&fit=crop',
      accent: '#A52A2A'
    },
    cans: {
      title: 'Canned & Craft',
      description: 'Refreshing craft beers, hard seltzers, and ready-to-drink cocktails in convenient cans.',
      banner: 'https://images.unsplash.com/photo-1550348245-4209598f869a?q=80&w=2000&auto=format&fit=crop',
      accent: '#2F4F4F'
    }
  };

  const currentConfig = (category && categoryConfig[category.toLowerCase()]) || {
    title: 'Our Collection',
    description: 'Explore our full range of premium spirits, fine wines, and craft beverages.',
    banner: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop',
    accent: '#D02046'
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await getLiquors(category);
        setProducts(data);
      } catch (error) {
        console.error(`Failed to load ${category} products`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    window.scrollTo(0, 0);
  }, [category]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Hero Banner */}
      <div className="relative h-[40vh] min-h-[300px] overflow-hidden">
        <img 
          src={currentConfig.banner} 
          alt={category || 'Our Collection'} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center px-6">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-4 uppercase tracking-tighter">
            {currentConfig.title}
          </h1>
          <p className="text-white/80 max-w-2xl text-lg font-light leading-relaxed">
            {currentConfig.description}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Breadcrumbs */}
        <div className="flex items-center space-x-2 text-xs text-slate-400 mb-10 uppercase tracking-widest">
          <Link to="/" className="hover:text-[#D02046]">Home</Link>
          <span>/</span>
          <Link to="/shop" className={`hover:text-[#D02046] ${!category ? 'text-slate-900 font-bold' : ''}`}>Shop</Link>
          {category && (
            <>
              <span>/</span>
              <span className="text-slate-900 font-bold">{category}</span>
            </>
          )}
        </div>

        {/* Product Count & Filter placeholder */}
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-100">
          <p className="text-slate-500 font-medium">Showing {products.length} products</p>
          <div className="flex space-x-4">
            <select className="bg-transparent border-none text-sm font-bold text-slate-800 focus:outline-none cursor-pointer">
              <option>FEATURED</option>
              <option>PRICE: LOW TO HIGH</option>
              <option>PRICE: HIGH TO LOW</option>
              <option>NEWEST</option>
            </select>
          </div>
        </div>
        
        {products.length === 0 ? (
          <div className="bg-slate-50 p-20 rounded-xl border-2 border-dashed border-slate-200 text-center">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Coming Soon!</h2>
            <p className="text-slate-500">We're currently stocking up our {category} collection. Check back soon!</p>
            <Link 
              to="/" 
              className="mt-8 inline-block bg-slate-900 text-white px-8 py-3 rounded-full font-bold hover:bg-[#D02046] transition"
            >
              BROWSE HOME
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {products.map((product) => (
              <LiquorCard key={product._id} liquor={product} />
            ))}
          </div>
        )}

        {/* Promotional Section */}
        {products.length > 0 && (
          <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-900 text-white p-12 rounded-2xl relative overflow-hidden group">
              <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-4">Bulk Orders</h3>
                <p className="text-slate-400 mb-8 max-w-sm">Planning an event? Get special pricing on orders of 12 bottles or more.</p>
                <button className="border-2 border-white/20 px-6 py-2 rounded-full font-bold hover:bg-white hover:text-slate-900 transition">
                  LEARN MORE
                </button>
              </div>
              <div className="absolute right-[-20px] bottom-[-20px] opacity-10 group-hover:scale-110 transition duration-500">
                 <FaWineBottle size={200} />
              </div>
            </div>
            <div className="bg-[#D02046] text-white p-12 rounded-2xl relative overflow-hidden group">
              <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-4">Fast Delivery</h3>
                <p className="text-white/80 mb-8 max-w-sm">Order by 2PM and get same-day delivery in the metropolitan area.</p>
                <button className="border-2 border-white/20 px-6 py-2 rounded-full font-bold hover:bg-white hover:text-[#D02046] transition">
                  CHECK POSTCODE
                </button>
              </div>
              <div className="absolute right-[-20px] bottom-[-20px] opacity-10 group-hover:scale-110 transition duration-500">
                 <FaShoppingCart size={200} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopCategory;
