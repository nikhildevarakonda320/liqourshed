import React, { useState } from 'react';
import Carousel from '../components/Carousel';
import CategoryGrid from '../components/CategoryGrid';
import PaymentModal from '../components/PaymentModal';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [selectedLiquor, setSelectedLiquor] = useState(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLiquorClick = (liquor) => {
    if (!user) {
      navigate('/login', { state: { from: { pathname: '/' } } });
      return;
    }
    
    setSelectedLiquor(liquor);
    setIsPaymentModalOpen(true);
  };

  const handlePaymentSuccess = (orderId) => {
    alert(`Order placed successfully! Order ID: ${orderId}`);
    setIsPaymentModalOpen(false);
    setSelectedLiquor(null);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Full screen carousel */}
      <Carousel onLiquorClick={handleLiquorClick} />
      
      {/* Category Grid Section - Overlapping the carousel slightly or just below */}
      <CategoryGrid />

      {selectedLiquor && (
        <PaymentModal
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          product={selectedLiquor}
          user={user}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
};

export default Home;
