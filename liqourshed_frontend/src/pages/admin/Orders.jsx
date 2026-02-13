import React, { useEffect, useState } from 'react';
import { Search, Filter, Eye, CheckCircle, Clock, X, MapPin, CreditCard, Package, User } from 'lucide-react';
import { getOrders, deliverOrder } from '../../services/api';

const OrderDetailsModal = ({ order, onClose, onUpdate }) => {
  const [loading, setLoading] = useState(false);

  const handleDeliver = async () => {
    if (window.confirm('Mark this order as delivered?')) {
      setLoading(true);
      try {
        await deliverOrder(order._id);
        onUpdate();
        onClose();
      } catch (error) {
        console.error('Error updating order:', error);
        alert('Failed to update order status');
      } finally {
        setLoading(false);
      }
    }
  };

  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl relative">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-100 p-6 flex items-center justify-between z-10">
          <div>
            <h3 className="text-xl font-bold text-slate-900">Order Details</h3>
            <p className="text-sm text-slate-500 mt-1">Order ID: {order._id}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <X size={24} className="text-slate-400" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Status and Actions */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50 p-4 rounded-xl">
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                order.isDelivered ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' :
                order.isPaid ? 'bg-blue-100 text-blue-700 border border-blue-200' :
                'bg-amber-100 text-amber-700 border border-amber-200'
              }`}>
                {order.isDelivered ? 'Delivered' : order.isPaid ? 'Paid' : 'Pending'}
              </span>
              <span className="text-sm text-slate-500">
                Placed on {new Date(order.createdAt).toLocaleString()}
              </span>
            </div>
            
            {!order.isDelivered && (
              <button
                onClick={handleDeliver}
                disabled={loading}
                className="bg-amber-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-amber-700 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {loading ? 'Updating...' : (
                  <>
                    <CheckCircle size={18} />
                    Mark as Delivered
                  </>
                )}
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Customer Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-slate-900 font-bold">
                <User size={20} className="text-amber-600" />
                <h4>Customer Information</h4>
              </div>
              <div className="bg-white border border-slate-100 p-4 rounded-xl space-y-2">
                <p className="text-slate-900 font-medium">{order.user?.name || 'Guest User'}</p>
                <p className="text-slate-500 text-sm">{order.user?.email || 'No email provided'}</p>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-slate-900 font-bold">
                <MapPin size={20} className="text-amber-600" />
                <h4>Shipping Address</h4>
              </div>
              <div className="bg-white border border-slate-100 p-4 rounded-xl space-y-1">
                <p className="text-slate-600">{order.shippingAddress.address}</p>
                <p className="text-slate-600">{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
                <p className="text-slate-600">{order.shippingAddress.country}</p>
              </div>
            </div>
          </div>

          {/* Payment Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-slate-900 font-bold">
              <CreditCard size={20} className="text-amber-600" />
              <h4>Payment Information</h4>
            </div>
            <div className="bg-white border border-slate-100 p-4 rounded-xl">
              <p className="text-slate-600">Method: <span className="font-medium">{order.paymentMethod}</span></p>
              <p className="text-slate-600">Status: <span className="font-medium text-emerald-600">Success (Simulated)</span></p>
            </div>
          </div>

          {/* Order Items */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-slate-900 font-bold">
              <Package size={20} className="text-amber-600" />
              <h4>Order Items</h4>
            </div>
            <div className="border border-slate-100 rounded-xl overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-500 text-xs uppercase">
                  <tr>
                    <th className="px-6 py-3">Product</th>
                    <th className="px-6 py-3 text-center">Qty</th>
                    <th className="px-6 py-3 text-right">Price</th>
                    <th className="px-6 py-3 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {order.orderItems.map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded-lg" />
                          <span className="font-medium text-slate-900">{item.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center text-slate-600">{item.qty}</td>
                      <td className="px-6 py-4 text-right text-slate-600">${item.price.toFixed(2)}</td>
                      <td className="px-6 py-4 text-right font-bold text-slate-900">${(item.qty * item.price).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-slate-50 font-bold">
                  <tr>
                    <td colSpan="3" className="px-6 py-4 text-right text-slate-900">Order Total</td>
                    <td className="px-6 py-4 text-right text-amber-600 text-lg">${order.totalPrice.toFixed(2)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchOrders = async () => {
    try {
      const data = await getOrders();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getStatusIcon = (order) => {
    if (order.isDelivered) return <CheckCircle size={16} className="mr-1" />;
    return <Clock size={16} className="mr-1" />;
  };

  const getStatusClass = (order) => {
    if (order.isDelivered) return 'bg-emerald-100 text-emerald-700';
    if (order.isPaid) return 'bg-blue-100 text-blue-700';
    return 'bg-amber-100 text-amber-700';
  };

  const getStatusText = (order) => {
    if (order.isDelivered) return 'Delivered';
    if (order.isPaid) return 'Paid';
    return 'Pending';
  };

  const filteredOrders = orders.filter(o => 
    o._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (o.user?.name || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="flex justify-center items-center h-full">Loading...</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Order Management</h2>
        <p className="text-slate-500">Track and manage customer orders.</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-col md:flex-row gap-4 justify-between">
          <div className="relative flex-grow max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Search orders by ID or customer..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center space-x-2 px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-slate-600">
              <Filter size={18} />
              <span>Filter Status</span>
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
              <tr>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Items</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredOrders.map((order) => (
                <tr key={order._id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">{order._id.substring(0, 8)}...</td>
                  <td className="px-6 py-4 text-slate-600">{order.user?.name || 'Guest'}</td>
                  <td className="px-6 py-4 text-slate-600">{order.orderItems.length} items</td>
                  <td className="px-6 py-4 text-slate-600">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusClass(order)}`}>
                      {getStatusIcon(order)}
                      {getStatusText(order)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-900 font-bold">${order.totalPrice.toFixed(2)}</td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => setSelectedOrder(order)}
                      className="p-1.5 text-slate-400 hover:text-amber-600 transition-colors flex items-center justify-end w-full space-x-1"
                    >
                      <Eye size={18} />
                      <span className="text-sm font-medium">View Details</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedOrder && (
        <OrderDetailsModal 
          order={selectedOrder} 
          onClose={() => setSelectedOrder(null)} 
          onUpdate={fetchOrders}
        />
      )}
    </div>
  );
};

export default Orders;
