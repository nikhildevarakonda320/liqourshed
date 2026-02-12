import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const RegistrationModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
    birthDate: '',
    zipCode: '',
    timezone: '',
    newsletter: false
  });

  const { register } = useAuth();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    
    // Call register with detailed data
    const result = await register(formData.email, formData.password, { 
      firstName: formData.firstName, 
      lastName: formData.lastName,
      zipCode: formData.zipCode,
      birthDate: formData.birthDate,
      timezone: formData.timezone,
      newsletter: formData.newsletter
    });

    if (result.success) {
      alert(result.message);
      onClose();
      // Stay on homepage, user is logged out and needs to verify
      navigate('/');
    } else {
      alert(result.message || 'Registration failed');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm overflow-y-auto py-10" onClick={onClose}>
      <div 
        className="bg-white w-full max-w-5xl p-8 rounded-lg shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold text-slate-800 mb-1">My Account</h2>
        <h3 className="text-lg text-[#006837] font-semibold mb-2">No Account? Register</h3>
        <p className="text-slate-600 mb-8 text-sm">
          Registration takes less than a minute but gives you full control over your orders and shopping experience.
        </p>

        <form onSubmit={handleSubmit} className="bg-slate-50 p-8 rounded-lg border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            
            {/* Left Column */}
            <div>
              <div className="mb-6">
                <h4 className="font-bold text-slate-700 mb-1">Personal Information</h4>
                <p className="text-xs text-slate-500">Use a permanent address where you can receive mail.</p>
              </div>

              <div className="mb-4">
                 <label className="block text-sm font-semibold text-slate-600 mb-1">Email address</label>
                 <input 
                   type="email"
                   name="email"
                   value={formData.email}
                   onChange={handleChange}
                   className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-slate-700 focus:outline-none focus:border-[#800000]"
                 />
              </div>

              <div className="mb-4">
                 <label className="block text-sm font-semibold text-slate-600 mb-1">Password</label>
                 <input 
                   type="password"
                   name="password"
                   value={formData.password}
                   onChange={handleChange}
                   className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-slate-700 focus:outline-none focus:border-[#800000]"
                 />
              </div>

              <div className="mb-4">
                 <label className="block text-sm font-semibold text-slate-600 mb-1">Birthdate (must be over 21)</label>
                 <input 
                   type="text"
                   name="birthDate"
                   placeholder="MM/DD/YYYY"
                   value={formData.birthDate}
                   onChange={handleChange}
                   className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-slate-700 focus:outline-none focus:border-[#800000]"
                 />
              </div>

              <div className="mb-4">
                 <label className="block text-sm font-semibold text-slate-600 mb-1">Primary zip code?</label>
                 <input 
                   type="text"
                   name="zipCode"
                   value={formData.zipCode}
                   onChange={handleChange}
                   className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-slate-700 max-w-[150px] focus:outline-none focus:border-[#800000]"
                 />
              </div>
            </div>

            {/* Right Column */}
            <div className="pt-12 md:pt-14">
              <div className="flex gap-4 mb-4">
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-slate-600 mb-1">First name</label>
                  <input 
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-slate-700 focus:outline-none focus:border-[#800000]"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-slate-600 mb-1">Last name</label>
                  <input 
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-slate-700 focus:outline-none focus:border-[#800000]"
                  />
                </div>
              </div>

              <div className="mb-4">
                 <label className="block text-sm font-semibold text-slate-600 mb-1">Confirm email address</label>
                 <input 
                   type="email"
                   name="confirmEmail"
                   value={formData.confirmEmail}
                   onChange={handleChange}
                   className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-slate-700 focus:outline-none focus:border-[#800000]"
                 />
              </div>

              <div className="mb-4">
                 <label className="block text-sm font-semibold text-slate-600 mb-1">Confirm Password</label>
                 <input 
                   type="password"
                   name="confirmPassword"
                   value={formData.confirmPassword}
                   onChange={handleChange}
                   className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-slate-700 focus:outline-none focus:border-[#800000]"
                 />
              </div>

              <div className="mb-4">
                 <label className="block text-sm font-semibold text-slate-600 mb-1">Default/Current U.S. Time Zone</label>
                 <select 
                   name="timezone"
                   value={formData.timezone}
                   onChange={handleChange}
                   className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-slate-700 focus:outline-none focus:border-[#800000]"
                 >
                   <option value="">Select your default/current U.S. time zone</option>
                   <option value="ET">Eastern Time</option>
                   <option value="CT">Central Time</option>
                   <option value="MT">Mountain Time</option>
                   <option value="PT">Pacific Time</option>
                 </select>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-start gap-2">
            <input 
              type="checkbox" 
              name="newsletter"
              checked={formData.newsletter}
              onChange={handleChange}
              className="mt-1"
            />
            <div>
              <label className="block text-sm font-semibold text-slate-700">Please Add me to the EmpireWine.com email list</label>
              <p className="text-xs text-slate-500">We send no more than one deal email per week unless you say otherwise!</p>
            </div>
          </div>

          <button 
            type="submit"
            className="mt-8 bg-[#990000] hover:bg-[#800000] text-white font-bold py-2 px-8 rounded shadow-md transition duration-200"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationModal;
