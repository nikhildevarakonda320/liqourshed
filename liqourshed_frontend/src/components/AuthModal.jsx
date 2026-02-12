import React, { useState } from 'react';
import { FaWineBottle } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AuthModal = ({ isOpen, onClose, onRegisterClick }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await login(email, password);
    if (result.success) {
      onClose();
      navigate('/');
    } else {
      alert(result.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="bg-white w-full max-w-4xl p-8 rounded-lg shadow-2xl relative flex flex-col md:flex-row gap-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold"
        >
          &times;
        </button>

        <h2 className="absolute top-8 left-8 text-2xl font-bold text-slate-800">My Account</h2>

        <div className="mt-12 w-full flex flex-col md:flex-row gap-12">
            {/* Left Column: Login Section */}
            <div className="flex-1 bg-gray-50 p-6 rounded-lg border border-gray-100">
                <div className="flex items-center mb-6">
                    <FaWineBottle className="text-[#800000] text-3xl mr-3 transform -rotate-12" />
                    <div>
                        <h3 className="text-xl font-bold text-slate-700">Nikhil</h3>
                        <p className="text-xs text-[#800000] cursor-pointer hover:underline">Switch accounts / logout</p>
                    </div>
                </div>

                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-sm font-bold text-slate-600 mb-1">Email address</label>
                        <input 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="n****************@gmail.com"
                            className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-slate-700 focus:outline-none focus:border-[#800000]"
                        />
                    </div>
                    
                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-1">
                            <label className="block text-sm font-bold text-slate-600">Password</label>
                            <a href="#" className="text-xs text-slate-500 hover:text-[#800000]">Forgot your password?</a>
                        </div>
                        <input 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-slate-700 focus:outline-none focus:border-[#800000]"
                        />
                    </div>

                    <button 
                        type="submit"
                        className="w-full bg-[#1B4D2B] hover:bg-[#143d22] text-white font-bold py-3 rounded transition duration-200"
                    >
                        Login
                    </button>
                </form>
            </div>

            {/* Right Column: Register Prompt */}
            <div className="flex-1 flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-slate-800 mb-2">No Account? Register</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                    Registration takes less than a minute and gives you full control over your orders and shopping experience.
                </p>
                <button 
                    onClick={onRegisterClick}
                    className="w-full bg-[#006837] hover:bg-[#00552d] text-white font-bold py-3 rounded transition duration-200"
                >
                    Create Account Now!
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
