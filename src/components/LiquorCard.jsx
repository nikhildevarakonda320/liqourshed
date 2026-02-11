import React from 'react';
import { getLiquorImageUrl } from '../services/api';

const LiquorCard = ({ liquor }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 cursor-pointer border border-slate-100">
      <div className="bg-slate-50 p-6 flex justify-center items-center h-64">
        <img 
          src={getLiquorImageUrl(liquor.strIngredient)} 
          alt={liquor.strIngredient} 
          className="h-full object-contain drop-shadow-md"
          loading="lazy"
        />
      </div>
      <div className="p-5">
        <h3 className="text-xl font-semibold text-slate-800 mb-2">{liquor.strIngredient}</h3>
        <div className="flex justify-between items-center">
          <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full font-medium">In Stock</span>
          <button className="text-slate-600 hover:text-amber-600 font-medium text-sm">View Details →</button>
        </div>
      </div>
    </div>
  );
};

export default LiquorCard;
