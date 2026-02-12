import React, { useState } from 'react';
import { createOrder } from '../services/api';

const PaymentModal = ({ isOpen, onClose, product, user, onSuccess }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const orderData = {
        orderItems: [{
          name: product.name,
          qty: 1,
          image: product.image,
          price: product.price,
          product: product._id
        }],
        shippingAddress: {
          address: '123 Test St',
          city: 'Sample City',
          postalCode: '12345',
          country: 'Sample Country'
        },
        paymentMethod: 'Credit Card',
        itemsPrice: product.price,
        taxPrice: product.price * 0.1,
        shippingPrice: 5.00,
        totalPrice: (product.price * 1.1) + 5.00
      };

      const createdOrder = await createOrder(orderData);
      onSuccess(createdOrder._id);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Payment processing failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in-up">
        <div className="bg-slate-900 p-4 flex justify-between items-center text-white">
          <h3 className="text-xl font-semibold">Secure Checkout</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition">✕</button>
        </div>
        
        <div className="p-6">
          <div className="mb-6 bg-slate-50 p-4 rounded-lg border border-slate-200">
            <p className="text-sm text-slate-500 uppercase tracking-wide font-semibold">Product</p>
            <div className="flex justify-between items-center mt-1">
              <span className="text-lg font-medium text-slate-800">{product.name}</span>
              <span className="text-amber-600 font-bold">${product.price.toFixed(2)}</span>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm border border-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-slate-600 text-sm font-medium mb-1">Card Number</label>
              <input
                type="text"
                maxLength="16"
                placeholder="0000 0000 0000 0000"
                className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ''))}
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-600 text-sm font-medium mb-1">Expiry Date</label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  maxLength="5"
                  className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-slate-600 text-sm font-medium mb-1">CVC</label>
                <input
                  type="password"
                  placeholder="000"
                  maxLength="3"
                  className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value.replace(/\D/g, ''))}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-lg text-white font-bold text-lg transition shadow-lg ${
                loading 
                  ? 'bg-slate-400 cursor-not-allowed' 
                  : 'bg-amber-600 hover:bg-amber-700 active:scale-95'
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : `PAY $${((product.price * 1.1) + 5.00).toFixed(2)}`}
            </button>
            
            <p className="text-center text-xs text-slate-400 mt-4">
              �️ Your payment information is encrypted and secure.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;