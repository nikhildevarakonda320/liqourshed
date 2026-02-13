import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const LiquorCard = ({ liquor }) => {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (!user) {
      navigate('/login');
      return;
    }
    addToCart(liquor);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 group cursor-pointer border border-slate-100">
      <div className="bg-slate-50 p-6 flex justify-center items-center h-64 relative">
        <img 
          src={liquor.image} 
          alt={liquor.name} 
          className="h-full object-contain drop-shadow-md transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Quick Add Overlay */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button 
            onClick={handleAddToCart}
            disabled={liquor.countInStock === 0}
            className={`px-6 py-2 rounded-full font-bold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition duration-300 ${
              liquor.countInStock > 0 
                ? 'bg-[#D02046] text-white hover:bg-[#800000]' 
                : 'bg-gray-400 text-white cursor-not-allowed'
            }`}
          >
            {liquor.countInStock > 0 ? 'ADD TO CART' : 'SOLD OUT'}
          </button>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-semibold text-slate-800 mb-1 group-hover:text-[#D02046] transition-colors">{liquor.name}</h3>
        <p className="text-slate-500 text-xs mb-3 uppercase tracking-wider">{liquor.category}</p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-slate-900">${liquor.price.toFixed(2)}</span>
          <span className={`text-[10px] uppercase px-2 py-1 rounded-sm font-bold tracking-tighter ${
            liquor.countInStock > 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
          }`}>
            {liquor.countInStock > 0 ? 'Available' : 'Out of Stock'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default LiquorCard;
