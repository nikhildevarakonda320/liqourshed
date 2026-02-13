import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { createOrder } from '../services/api';
import { FaCreditCard, FaLock, FaCheckCircle, FaChevronRight, FaTimes } from 'react-icons/fa';

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    email: user?.email || '',
    address: '',
    city: '',
    postcode: '',
    phone: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  if (cartItems.length === 0 && !isCompleted) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6">
        <h2 className="text-3xl font-serif font-bold text-slate-800 mb-4">Your Cart is Empty</h2>
        <p className="text-slate-500 mb-8">You need items in your cart to proceed to checkout.</p>
        <Link to="/shop" className="bg-[#D02046] text-white px-8 py-3 rounded-full font-bold hover:bg-[#800000] transition">
          RETURN TO SHOP
        </Link>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    setStep(prev => prev + 1);
    window.scrollTo(0, 0);
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setError('');
    
    try {
      const orderData = {
        orderItems: cartItems.map(item => ({
          name: item.name,
          qty: item.qty,
          image: item.image,
          price: item.price,
          product: item._id
        })),
        shippingAddress: {
          address: formData.address,
          city: formData.city,
          postalCode: formData.postcode,
          country: 'Australia' // Default for now
        },
        paymentMethod: 'Credit Card',
        totalPrice: cartTotal
      };

      const createdOrder = await createOrder(orderData);
      
      setOrderId(createdOrder._id);
      setIsProcessing(false);
      setIsCompleted(true);
      clearCart();
      window.scrollTo(0, 0);
    } catch (err) {
      console.error('Order creation failed:', err);
      setError(err.response?.data?.message || 'Failed to place order. Please try again.');
      setIsProcessing(false);
    }
  };

  if (isCompleted) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center animate-fade-in">
        <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-8 animate-bounce-short">
          <FaCheckCircle className="text-emerald-500 text-5xl" />
        </div>
        <h2 className="text-4xl font-serif font-bold text-slate-800 mb-4">Order Confirmed!</h2>
        <p className="text-slate-500 max-w-md mb-10">
          Thank you for your purchase, {formData.firstName}. Your premium spirits will be delivered to your doorstep soon.
        </p>
        <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 mb-10 w-full max-w-md">
          <p className="text-xs text-slate-400 uppercase tracking-widest mb-2">Order Reference</p>
          <p className="text-xl font-mono font-bold text-slate-800">#{orderId || 'LS-REF-PENDING'}</p>
        </div>
        <button 
          onClick={() => navigate('/')}
          className="bg-slate-900 text-white px-10 py-4 rounded-full font-bold hover:bg-[#D02046] transition shadow-xl"
        >
          CONTINUE SHOPPING
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Checkout Steps */}
          <div className="flex-grow">
            <div className="flex items-center space-x-4 mb-10 overflow-x-auto pb-4">
              <div className={`flex items-center space-x-2 ${step >= 1 ? 'text-[#D02046]' : 'text-slate-400'}`}>
                <span className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 1 ? 'border-[#D02046] bg-[#D02046] text-white' : 'border-slate-300'}`}>1</span>
                <span className="font-bold whitespace-nowrap text-sm uppercase tracking-widest">Shipping</span>
              </div>
              <FaChevronRight className="text-slate-300 flex-shrink-0" />
              <div className={`flex items-center space-x-2 ${step >= 2 ? 'text-[#D02046]' : 'text-slate-400'}`}>
                <span className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 2 ? 'border-[#D02046] bg-[#D02046] text-white' : 'border-slate-300'}`}>2</span>
                <span className="font-bold whitespace-nowrap text-sm uppercase tracking-widest">Payment</span>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 md:p-12">
              {step === 1 ? (
                <form onSubmit={handleNextStep}>
                  <h2 className="text-2xl font-serif font-bold text-slate-800 mb-8">Shipping Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-2">First Name</label>
                      <input 
                        type="text" required name="firstName" value={formData.firstName} onChange={handleInputChange}
                        className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#D02046] outline-none transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Last Name</label>
                      <input 
                        type="text" required name="lastName" value={formData.lastName} onChange={handleInputChange}
                        className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#D02046] outline-none transition"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Address</label>
                      <input 
                        type="text" required name="address" value={formData.address} onChange={handleInputChange}
                        className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#D02046] outline-none transition"
                        placeholder="Street address, P.O. box"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-2">City</label>
                      <input 
                        type="text" required name="city" value={formData.city} onChange={handleInputChange}
                        className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#D02046] outline-none transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Postcode</label>
                      <input 
                        type="text" required name="postcode" value={formData.postcode} onChange={handleInputChange}
                        className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#D02046] outline-none transition"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Phone</label>
                      <input 
                        type="tel" required name="phone" value={formData.phone} onChange={handleInputChange}
                        className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#D02046] outline-none transition"
                      />
                    </div>
                  </div>
                  <button type="submit" className="mt-12 w-full bg-[#D02046] text-white py-4 rounded-xl font-bold hover:bg-[#800000] transition shadow-lg tracking-widest uppercase">
                    Continue to Payment
                  </button>
                </form>
              ) : (
                <form onSubmit={handlePayment}>
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-serif font-bold text-slate-800">Secure Payment</h2>
                    <div className="flex items-center text-emerald-500 text-xs font-bold uppercase">
                      <FaLock className="mr-1" /> SSL Encrypted
                    </div>
                  </div>
                  
                  <div className="bg-slate-900 text-white p-8 rounded-2xl mb-10 relative overflow-hidden">
                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-12">
                        <FaCreditCard className="text-4xl opacity-50" />
                        <div className="text-right">
                          <p className="text-[10px] uppercase tracking-widest opacity-50">Card Holder</p>
                          <p className="font-bold">{formData.firstName} {formData.lastName}</p>
                        </div>
                      </div>
                      <p className="text-2xl font-mono tracking-widest mb-6">
                        {formData.cardNumber ? formData.cardNumber.replace(/(.{4})/g, '$1 ') : '•••• •••• •••• ••••'}
                      </p>
                      <div className="flex space-x-8">
                        <div>
                          <p className="text-[10px] uppercase tracking-widest opacity-50">Expires</p>
                          <p className="font-bold">{formData.expiry || 'MM/YY'}</p>
                        </div>
                      </div>
                    </div>
                    <div className="absolute right-[-20px] bottom-[-20px] w-48 h-48 bg-white/5 rounded-full blur-3xl"></div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Card Number</label>
                      <input 
                        type="text" required name="cardNumber" maxLength="16" value={formData.cardNumber} onChange={handleInputChange}
                        placeholder="0000 0000 0000 0000"
                        className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#D02046] outline-none transition font-mono"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Expiry Date</label>
                        <input 
                          type="text" required name="expiry" placeholder="MM/YY" maxLength="5" value={formData.expiry} onChange={handleInputChange}
                          className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#D02046] outline-none transition font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">CVV</label>
                        <input 
                          type="password" required name="cvv" placeholder="•••" maxLength="3" value={formData.cvv} onChange={handleInputChange}
                          className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#D02046] outline-none transition font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  {error && (
                    <div className="mt-6 p-4 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl text-sm font-bold flex items-center">
                      <FaTimes className="mr-2" /> {error}
                    </div>
                  )}

                  <button 
                    type="submit" 
                    disabled={isProcessing}
                    className={`mt-12 w-full py-4 rounded-xl font-bold transition shadow-lg tracking-widest uppercase flex items-center justify-center space-x-3 ${
                      isProcessing ? 'bg-slate-400 cursor-not-allowed' : 'bg-[#D02046] hover:bg-[#800000] text-white'
                    }`}
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Processing...</span>
                      </>
                    ) : (
                      <span>Pay ${cartTotal.toFixed(2)} Now</span>
                    )}
                  </button>
                  <button 
                    type="button" onClick={() => setStep(1)}
                    className="mt-4 w-full text-center text-xs font-bold text-slate-400 hover:text-slate-600 transition"
                  >
                    GO BACK TO SHIPPING
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-96">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 sticky top-24">
              <h3 className="text-xl font-bold text-slate-800 mb-6 pb-4 border-b">Order Summary</h3>
              <div className="space-y-4 mb-8 max-h-80 overflow-y-auto pr-2">
                {cartItems.map(item => (
                  <div key={item._id} className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-slate-50 rounded p-1">
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800 leading-none mb-1">{item.name}</p>
                        <p className="text-xs text-slate-400">Qty: {item.qty}</p>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-slate-800">${(item.price * item.qty).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-3 border-t pt-6">
                <div className="flex justify-between text-slate-500 text-sm">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-500 text-sm">
                  <span>Shipping</span>
                  <span className="text-emerald-500 font-bold uppercase text-[10px] bg-emerald-50 px-2 py-1 rounded">Free</span>
                </div>
                <div className="flex justify-between text-slate-800 font-bold text-xl pt-3 border-t border-dashed">
                  <span>Total</span>
                  <span className="text-[#D02046]">${cartTotal.toFixed(2)}</span>
                </div>
              </div>
              <div className="mt-8 flex items-center justify-center space-x-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                <FaLock className="text-[#D02046]" />
                <span>100% Secure Transaction</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;