import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(email, password);
    if (result.success) {
      // If user is admin and not coming from a specific page, go to admin dashboard
      if (result.user.isAdmin && from === "/") {
        navigate('/admin', { replace: true });
      } else {
        navigate(from, { replace: true });
      }
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-slate-800">Login</h2>
        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-slate-600 mb-1">Email</label>
            <input
              type="email"
              className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-slate-600 mb-1">Password</label>
            <input
              type="password"
              className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="w-full bg-amber-600 text-white py-3 rounded-lg hover:bg-amber-700 transition font-semibold">
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-slate-600">
          Don't have an account? <Link to="/register" className="text-amber-600 hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
