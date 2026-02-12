import React from 'react';
import { 
  Users, 
  Package, 
  ShoppingCart, 
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, trend, trendValue, color }) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-2 rounded-lg ${color} bg-opacity-10 text-${color.split('-')[1]}-600`}>
        <Icon size={24} />
      </div>
      <div className={`flex items-center text-sm ${trend === 'up' ? 'text-emerald-600' : 'text-rose-600'}`}>
        {trend === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
        <span className="font-medium ml-1">{trendValue}</span>
      </div>
    </div>
    <h3 className="text-slate-500 text-sm font-medium">{title}</h3>
    <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
  </div>
);

const Dashboard = () => {
  const stats = [
    { title: 'Total Sales', value: '$24,560', icon: TrendingUp, trend: 'up', trendValue: '12%', color: 'bg-amber-500' },
    { title: 'Total Orders', value: '456', icon: ShoppingCart, trend: 'up', trendValue: '8%', color: 'bg-blue-500' },
    { title: 'Total Products', value: '1,234', icon: Package, trend: 'down', trendValue: '3%', color: 'bg-purple-500' },
    { title: 'Active Users', value: '890', icon: Users, trend: 'up', trendValue: '15%', color: 'bg-emerald-500' },
  ];

  const recentOrders = [
    { id: '#ORD-001', customer: 'John Doe', product: 'Glenfiddich 12yr', date: '2024-02-12', status: 'Delivered', amount: '$65.00' },
    { id: '#ORD-002', customer: 'Jane Smith', product: 'Grey Goose Vodka', date: '2024-02-11', status: 'Processing', amount: '$45.00' },
    { id: '#ORD-003', customer: 'Mike Johnson', product: 'Hennessy VSOP', date: '2024-02-11', status: 'Pending', amount: '$85.00' },
    { id: '#ORD-004', customer: 'Sarah Wilson', product: 'Jack Daniels', date: '2024-02-10', status: 'Cancelled', amount: '$35.00' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Dashboard Overview</h2>
        <p className="text-slate-500">Welcome back to your administration panel.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">Recent Orders</h3>
          <button className="text-amber-600 hover:text-amber-700 font-medium text-sm">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
              <tr>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentOrders.map((order, index) => (
                <tr key={index} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">{order.id}</td>
                  <td className="px-6 py-4 text-slate-600">{order.customer}</td>
                  <td className="px-6 py-4 text-slate-600">{order.product}</td>
                  <td className="px-6 py-4 text-slate-600">{order.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-700' :
                      order.status === 'Processing' ? 'bg-blue-100 text-blue-700' :
                      order.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                      'bg-rose-100 text-rose-700'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-bold text-slate-900">{order.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
