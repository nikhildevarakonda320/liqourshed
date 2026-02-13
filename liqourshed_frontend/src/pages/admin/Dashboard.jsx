import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Package, 
  ShoppingCart, 
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { getDashboardSummary, getOrders } from '../../services/api';

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
  const [summary, setSummary] = useState({
    numOrders: 0,
    numProducts: 0,
    numUsers: 0,
    totalSales: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [summaryData, ordersData] = await Promise.all([
          getDashboardSummary(),
          getOrders()
        ]);
        setSummary(summaryData);
        setRecentOrders(ordersData.slice(0, 5)); // Only show last 5
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const stats = [
    { title: 'Total Sales', value: `$${summary.totalSales.toFixed(2)}`, icon: TrendingUp, trend: 'up', trendValue: '12%', color: 'bg-amber-500' },
    { title: 'Total Orders', value: summary.numOrders.toString(), icon: ShoppingCart, trend: 'up', trendValue: '8%', color: 'bg-blue-500' },
    { title: 'Total Products', value: summary.numProducts.toString(), icon: Package, trend: 'down', trendValue: '3%', color: 'bg-purple-500' },
    { title: 'Active Users', value: summary.numUsers.toString(), icon: Users, trend: 'up', trendValue: '15%', color: 'bg-emerald-500' },
  ];

  if (loading) {
    return <div className="flex justify-center items-center h-full">Loading...</div>;
  }

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
          <Link to="/admin/orders" className="text-amber-600 hover:text-amber-700 font-medium text-sm">View All</Link>
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
                <th className="px-6 py-4 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentOrders.map((order) => (
                <tr key={order._id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">{order._id.substring(0, 8)}...</td>
                  <td className="px-6 py-4 text-slate-600">{order.user?.name || 'Guest'}</td>
                  <td className="px-6 py-4 text-slate-600">{order.orderItems.length} items</td>
                  <td className="px-6 py-4 text-slate-600">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      order.isDelivered ? 'bg-emerald-100 text-emerald-700' :
                      order.isPaid ? 'bg-blue-100 text-blue-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>
                      {order.isDelivered ? 'Delivered' : order.isPaid ? 'Paid' : 'Pending'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-bold text-slate-900">${order.totalPrice.toFixed(2)}</td>
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
