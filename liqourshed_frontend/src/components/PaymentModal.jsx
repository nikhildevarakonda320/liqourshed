import React, { useState } from 'react';

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
      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const isPaymentSuccessful = Math.random() > 0.1; // 90% success rate
      
      if (!isPaymentSuccessful) {
        throw new Error('Payment failed. Please try again.');
      }

      const orderData = {
        id: Math.random().toString(36).substr(2, 9),
        userEmail: user.email,
        userId: user.uid || 'guest',
        product: product.strIngredient || product,
        amount: 29.99,
        date: new Date().toISOString(),
        status: 'completed',
        paymentMethod: 'Credit Card'
      };

      // Mock saving order to local storage
      const orders = JSON.parse(localStorage.getItem('liquorshed_mock_orders') || '[]');
      orders.push(orderData);
      localStorage.setItem('liquorshed_mock_orders', JSON.stringify(orders));

      onSuccess(orderData.id);
      onClose();
    } catch (err) {
      setError(err.message || 'Payment processing failed');
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
              <span className="text-lg font-medium text-slate-800">{product.strIngredient || product}</span>
              <span className="text-amber-600 font-bold">$29.99</span>
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
                  type="text"
                  maxLength="3"
                  placeholder="123"
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
              className={`w-full py-3 rounded-lg text-white font-semibold shadow-md transition
                ${loading ? 'bg-slate-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
            >
              {loading ? 'Processing...' : `Pay $29.99`}
            </button>
            
            <p className="text-center text-xs text-slate-400 mt-4 flex justify-center items-center gap-1">
              🔒 256-bit SSL Encrypted Payment
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;