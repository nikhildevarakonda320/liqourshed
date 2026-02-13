import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ShopCategory from './pages/ShopCategory';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// Admin Imports
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import Products from './pages/admin/Products';
import Orders from './pages/admin/Orders';
import UsersList from './pages/admin/Users';

const MainLayout = ({ children }) => (
  <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
    <Header />
    <main className="flex-grow">
      {children}
    </main>
    <Footer />
  </div>
);

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) return null;
  
  if (!user || !user.isAdmin) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) return null;
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            {/* Main Website Routes */}
             <Route path="/" element={<MainLayout><Home /></MainLayout>} />
             <Route path="/shop" element={<MainLayout><ShopCategory /></MainLayout>} />
             <Route path="/shop/:category" element={<MainLayout><ShopCategory /></MainLayout>} />
             <Route path="/checkout" element={<PrivateRoute><MainLayout><Checkout /></MainLayout></PrivateRoute>} />
             <Route path="/login" element={<MainLayout><Login /></MainLayout>} />
            <Route path="/register" element={<MainLayout><Register /></MainLayout>} />

            {/* Admin Dashboard Routes */}
            <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
               <Route index element={<Dashboard />} />
               <Route path="products" element={<Products />} />
               <Route path="orders" element={<Orders />} />
               <Route path="users" element={<UsersList />} />
               <Route path="settings" element={<div>Settings (Coming Soon)</div>} />
             </Route>
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
