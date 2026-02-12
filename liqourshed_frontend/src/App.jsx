import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthProvider } from './context/AuthContext';

// Admin Imports
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import Products from './pages/admin/Products';
import Orders from './pages/admin/Orders';

const MainLayout = ({ children }) => (
  <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
    <Header />
    <main className="flex-grow">
      {children}
    </main>
    <Footer />
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Main Website Routes */}
          <Route path="/" element={<MainLayout><Home /></MainLayout>} />
          <Route path="/login" element={<MainLayout><Login /></MainLayout>} />
          <Route path="/register" element={<MainLayout><Register /></MainLayout>} />

          {/* Admin Dashboard Routes */}
          <Route path="/admin" element={<AdminLayout />}>
             <Route index element={<Dashboard />} />
             <Route path="products" element={<Products />} />
             <Route path="orders" element={<Orders />} />
             <Route path="users" element={<div>Users Management (Coming Soon)</div>} />
             <Route path="settings" element={<div>Settings (Coming Soon)</div>} />
           </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
