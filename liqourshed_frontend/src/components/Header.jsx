import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaSearch, FaShoppingCart, FaUser, FaWineBottle, FaTimes } from 'react-icons/fa';
import AuthModal from './AuthModal';
import RegistrationModal from './RegistrationModal';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const openRegistration = () => {
    setIsAuthModalOpen(false);
    setIsRegistrationModalOpen(true);
  };

  return (
    <>
      <header className="bg-white py-6 px-8 border-b border-gray-100">
        <div className="container mx-auto flex justify-between items-center relative">
          {/* Logo Section */}
          <Link to="/" className="flex items-end group z-10">
            <div className="flex items-end mr-1 opacity-80 group-hover:opacity-100 transition">
               <FaWineBottle className="text-[#8B0000] text-3xl transform -rotate-12" />
               <FaWineBottle className="text-[#A52A2A] text-4xl -ml-2 mb-1" />
               <FaWineBottle className="text-[#800000] text-3xl -ml-2 transform rotate-12" />
            </div>
            <span className="text-4xl font-serif font-bold text-[#800000] tracking-wide ml-2 uppercase">
              LiquorShed
            </span>
          </Link>

          {isSearchOpen ? (
            /* Search Bar Overlay - Takes up remaining space */
            <div className="flex-grow ml-12 animate-fade-in flex items-center">
              <div className="relative w-full max-w-3xl mx-auto flex items-center">
                <div className="absolute left-4 text-slate-500">
                  <FaSearch className="text-lg" />
                </div>
                <input
                  type="text"
                  placeholder="Search Products"
                  className="w-full bg-gray-100 border-none rounded-sm py-3 pl-12 pr-12 text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#800000] transition"
                  autoFocus
                />
                <button 
                  onClick={() => setIsSearchOpen(false)}
                  className="absolute right-4 text-slate-500 hover:text-[#800000] transition"
                >
                  <FaTimes className="text-xl" />
                </button>
              </div>
            </div>
          ) : (
            /* Navigation & Actions */
            <div className="flex items-center space-x-12 animate-fade-in">
              {/* Main Nav Links */}
              <nav className="hidden md:flex items-center space-x-10 text-sm font-medium tracking-widest text-slate-600">
                <Link to="/" className="hover:text-[#800000] transition">HOME</Link>
                <Link to="/" className="text-[#D02046] border-b-2 border-[#D02046] pb-1">SHOP</Link>
                <Link to="/" className="hover:text-[#800000] transition">CONTACT US</Link>
              </nav>

              {/* Icons Section */}
              <div className="flex items-center space-x-6 text-slate-800">
                <button 
                  onClick={() => setIsSearchOpen(true)}
                  className="hover:text-[#800000] transition"
                >
                  <FaSearch className="text-xl" />
                </button>
                
                <button className="hover:text-[#800000] transition relative">
                  <FaShoppingCart className="text-xl" />
                  <span className="absolute -top-2 -right-2 bg-gray-200 text-slate-700 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">1</span>
                </button>

                {/* Auth User Icon/Menu */}
                <div className="relative group">
                  <button 
                    onClick={() => !user && setIsAuthModalOpen(true)}
                    className="hover:text-[#800000] transition flex items-center"
                  >
                    <FaUser className="text-xl" />
                    {user && <span className="ml-2 text-xs text-[#800000] hidden lg:block">{user.email.split('@')[0]}</span>}
                  </button>
                  
                  {/* Simple Dropdown for Logged In User Only */}
                  {user && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 shadow-xl rounded-md overflow-hidden hidden group-hover:block z-50">
                      <button 
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-3 text-sm text-slate-600 hover:bg-gray-50 hover:text-[#800000]"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Modals */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onRegisterClick={openRegistration}
      />
      <RegistrationModal
        isOpen={isRegistrationModalOpen}
        onClose={() => setIsRegistrationModalOpen(false)}
      />
    </>
  );
};

export default Header;
