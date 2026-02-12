import React, { useEffect, useState } from 'react';
import LiquorCard from './LiquorCard';
import { getLiquors } from '../services/api';

const LiquorList = () => {
  const [liquors, setLiquors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLiquors = async () => {
      try {
        const data = await getLiquors();
        setLiquors(data);
      } catch (error) {
        console.error("Failed to load liquors", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLiquors();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold text-slate-800 mb-8 border-b pb-4 border-slate-200">Our Collection</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {liquors.map((liquor) => (
          <LiquorCard key={liquor.idStr || liquor.strIngredient} liquor={liquor} />
        ))}
      </div>
    </div>
  );
};

export default LiquorList;
