import React from 'react';
import { Search, Filter, Eye, CheckCircle, XCircle, Clock } from 'lucide-react';

const Orders = () => {
  const orders = [
    { id: '#ORD-001', customer: 'John Doe', items: 3, date: '2024-02-12', status: 'Delivered', amount: '$195.00' },
    { id: '#ORD-002', customer: 'Jane Smith', items: 1, date: '2024-02-11', status: 'Processing', amount: '$45.00' },
    { id: '#ORD-003', customer: 'Mike Johnson', items: 2, date: '2024-02-11', status: 'Pending', amount: '$125.00' },
    { id: '#ORD-004', customer: 'Sarah Wilson', items: 1, date: '2024-02-10', status: 'Cancelled', amount: '$35.00' },
    { id: '#ORD-005', customer: 'Robert Brown', items: 4, date: '2024-02-09', status: 'Delivered', amount: '$240.00' },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Delivered': return <CheckCircle size={16} className="mr-1" />;
      case 'Processing': return <Clock size={16} className="mr-1" />;
      case 'Pending': return <Clock size={16} className="mr-1" />;
      case 'Cancelled': return <XCircle size={16} className="mr-1" />;
      default: return null;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-emerald-100 text-emerald-700';
      case 'Processing': return 'bg-blue-100 text-blue-700';
      case 'Pending': return 'bg-amber-100 text-amber-700';
      case 'Cancelled': return 'bg-rose-100 text-rose-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

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
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">{order.id}</td>
                  <td className="px-6 py-4 text-slate-600">{order.customer}</td>
                  <td className="px-6 py-4 text-slate-600">{order.items} items</td>
                  <td className="px-6 py-4 text-slate-600">{order.date}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusClass(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-900 font-bold">{order.amount}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1.5 text-slate-400 hover:text-amber-600 transition-colors flex items-center justify-end w-full space-x-1">
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
    </div>
  );
};

export default Orders;
