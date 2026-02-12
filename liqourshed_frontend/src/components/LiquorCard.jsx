import React from 'react';

const LiquorCard = ({ liquor }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 cursor-pointer border border-slate-100">
      <div className="bg-slate-50 p-6 flex justify-center items-center h-64">
        <img 
          src={liquor.image} 
          alt={liquor.name} 
          className="h-full object-contain drop-shadow-md"
          loading="lazy"
        />
      </div>
      <div className="p-5">
        <h3 className="text-xl font-semibold text-slate-800 mb-2">{liquor.name}</h3>
        <p className="text-slate-600 text-sm mb-4 line-clamp-2">{liquor.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-slate-900">${liquor.price.toFixed(2)}</span>
          <span className={`text-xs px-2 py-1 rounded-full font-medium ${
            liquor.countInStock > 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
          }`}>
            {liquor.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default LiquorCard;
