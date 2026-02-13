import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { FaSearch, FaShoppingCart, FaUser, FaWineBottle, FaTimes, FaPlus, FaMinus, FaTrash } from 'react-icons/fa';
import AuthModal from './AuthModal';
import RegistrationModal from './RegistrationModal';

const Header = () => {
  const { user, logout } = useAuth();
  const { cartItems, cartTotal, cartCount, removeFromCart, updateQty, isCartOpen, setIsCartOpen } = useCart();
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
                
                {/* SHOP Dropdown */}
                <div className="relative group">
                  <button className="text-[#D02046] border-b-2 border-[#D02046] pb-1 hover:text-[#800000] transition flex items-center">
                    SHOP
                  </button>
                  <div className="absolute left-0 top-full pt-2 w-48 hidden group-hover:block z-50">
                    <div className="bg-white border border-gray-100 shadow-xl rounded-md overflow-hidden">
                      <Link 
                        to="/shop/wine" 
                        className="block w-full text-left px-4 py-3 text-sm text-slate-600 hover:bg-gray-50 hover:text-[#D02046] transition-colors"
                      >
                        WINE
                      </Link>
                      <Link 
                        to="/shop/liquor" 
                        className="block w-full text-left px-4 py-3 text-sm text-slate-600 hover:bg-gray-50 hover:text-[#D02046] transition-colors"
                      >
                        LIQUOR
                      </Link>
                      <Link 
                        to="/shop/cans" 
                        className="block w-full text-left px-4 py-3 text-sm text-slate-600 hover:bg-gray-50 hover:text-[#D02046] transition-colors"
                      >
                        CANS
                      </Link>
                    </div>
                  </div>
                </div>

                <Link to="/" className="hover:text-[#800000] transition">CONTACT US</Link>
              </nav>

              {/* Actions Icons */}
              <div className="flex items-center space-x-6 text-slate-700">
                <button 
                  onClick={() => setIsSearchOpen(true)}
                  className="hover:text-[#800000] transition flex items-center group"
                >
                  <FaSearch className="text-xl group-hover:scale-110 transition" />
                </button>
                
                {/* Cart Icon with Badge */}
                <button 
                  onClick={() => setIsCartOpen(true)}
                  className="hover:text-[#800000] transition relative group flex items-center"
                >
                  <FaShoppingCart className="text-xl group-hover:scale-110 transition" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#D02046] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-bounce-short">
                      {cartCount}
                    </span>
                  )}
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
                    <div className="absolute right-0 top-full pt-2 w-48 hidden group-hover:block z-50">
                      <div className="bg-white border border-gray-100 shadow-xl rounded-md overflow-hidden">
                        {user.isAdmin && (
                          <Link 
                            to="/admin" 
                            className="block w-full text-left px-4 py-3 text-sm text-slate-600 hover:bg-gray-50 hover:text-[#800000] border-b border-gray-50"
                          >
                            Admin Dashboard
                          </Link>
                        )}
                        <button 
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-3 text-sm text-slate-600 hover:bg-gray-50 hover:text-[#800000]"
                        >
                          Logout
                        </button>
                      </div>
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

      {/* Shopping Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[100] overflow-hidden">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}></div>
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl animate-slide-left flex flex-col">
            {/* Cart Header */}
            <div className="p-6 border-b flex justify-between items-center bg-slate-50">
              <h2 className="text-xl font-bold text-slate-800 flex items-center">
                <FaShoppingCart className="mr-2 text-[#D02046]" />
                YOUR CART ({cartCount})
              </h2>
              <button onClick={() => setIsCartOpen(false)} className="text-slate-400 hover:text-slate-600 transition">
                <FaTimes className="text-xl" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-grow overflow-y-auto p-6">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-400">
                  <FaShoppingCart className="text-6xl mb-4 opacity-20" />
                  <p className="text-lg">Your cart is empty</p>
                  <button 
                    onClick={() => {
                      setIsCartOpen(false);
                      navigate('/');
                    }}
                    className="mt-6 text-[#D02046] font-bold hover:underline"
                  >
                    START SHOPPING
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div key={item._id} className="flex space-x-4 pb-6 border-b border-slate-100">
                      <div className="w-20 h-20 bg-slate-50 rounded p-2 flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between">
                          <h3 className="font-bold text-slate-800 text-sm">{item.name}</h3>
                          <button onClick={() => removeFromCart(item._id)} className="text-slate-300 hover:text-rose-500 transition">
                            <FaTrash size={12} />
                          </button>
                        </div>
                        <p className="text-xs text-slate-500 mb-2 uppercase tracking-tighter">{item.category}</p>
                        <div className="flex justify-between items-center mt-2">
                          <div className="flex items-center border rounded overflow-hidden">
                            <button 
                              onClick={() => updateQty(item._id, Math.max(1, item.qty - 1))}
                              className="px-2 py-1 bg-gray-50 hover:bg-gray-100 text-slate-600"
                            >
                              <FaMinus size={8} />
                            </button>
                            <span className="px-3 py-1 text-sm font-medium">{item.qty}</span>
                            <button 
                              onClick={() => updateQty(item._id, item.qty + 1)}
                              className="px-2 py-1 bg-gray-50 hover:bg-gray-100 text-slate-600"
                            >
                              <FaPlus size={8} />
                            </button>
                          </div>
                          <span className="font-bold text-slate-900">${(item.price * item.qty).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Cart Footer */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t bg-slate-50 space-y-4">
                <div className="flex justify-between items-center text-slate-800">
                  <span className="font-medium">Subtotal</span>
                  <span className="text-2xl font-bold">${cartTotal.toFixed(2)}</span>
                </div>
                <p className="text-xs text-slate-500 italic text-center">Shipping & taxes calculated at checkout</p>
                <button 
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/checkout');
                  }}
                  className="w-full bg-[#D02046] hover:bg-[#800000] text-white py-4 rounded font-bold transition shadow-lg tracking-widest"
                >
                  CHECKOUT NOW
                </button>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="w-full text-center text-sm font-medium text-slate-500 hover:text-slate-800 transition"
                >
                  CONTINUE SHOPPING
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
