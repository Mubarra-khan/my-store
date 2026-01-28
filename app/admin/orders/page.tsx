// app/admin/orders/page.tsx
"use client";
import { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Edit, 
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  Truck,
  Package,
  AlertCircle,
  ChevronDown,
  MoreVertical
} from 'lucide-react';

// Types
type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';
type PaymentMethod = 'cod' | 'credit_card' | 'easypaisa' | 'jazzcash' | 'bank_transfer';

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  date: string;
  amount: number;
  items: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  shippingMethod: string;
}

export default function OrdersPage() {
  // Sample data for testing
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD-2024-001',
      customerName: 'Ali Ahmed',
      customerEmail: 'ali.ahmed@example.com',
      date: '2024-01-15',
      amount: 125.99,
      items: 3,
      status: 'delivered',
      paymentStatus: 'paid',
      paymentMethod: 'easypaisa',
      shippingMethod: 'Express'
    },
    {
      id: 'ORD-2024-002',
      customerName: 'Sara Khan',
      customerEmail: 'sara.khan@example.com',
      date: '2024-01-14',
      amount: 89.50,
      items: 2,
      status: 'processing',
      paymentStatus: 'paid',
      paymentMethod: 'jazzcash',
      shippingMethod: 'Standard'
    },
    {
      id: 'ORD-2024-003',
      customerName: 'Raza Ali',
      customerEmail: 'raza.ali@example.com',
      date: '2024-01-13',
      amount: 210.75,
      items: 5,
      status: 'pending',
      paymentStatus: 'pending',
      paymentMethod: 'cod',
      shippingMethod: 'Express'
    },
    {
      id: 'ORD-2024-004',
      customerName: 'Fatima Noor',
      customerEmail: 'fatima.noor@example.com',
      date: '2024-01-12',
      amount: 45.99,
      items: 1,
      status: 'shipped',
      paymentStatus: 'paid',
      paymentMethod: 'credit_card',
      shippingMethod: 'Standard'
    },
    {
      id: 'ORD-2024-005',
      customerName: 'Bilal Hassan',
      customerEmail: 'bilal.hassan@example.com',
      date: '2024-01-11',
      amount: 150.25,
      items: 4,
      status: 'cancelled',
      paymentStatus: 'failed',
      paymentMethod: 'bank_transfer',
      shippingMethod: 'Express'
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all');
  const [paymentFilter, setPaymentFilter] = useState<PaymentStatus | 'all'>('all');
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);

  // Helper functions for status colors
  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-purple-100 text-purple-800';
      case 'shipped': return 'bg-indigo-100 text-indigo-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status: PaymentStatus) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'refunded': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentMethodText = (method: PaymentMethod) => {
    switch (method) {
      case 'cod': return 'Cash on Delivery';
      case 'easypaisa': return 'Easypaisa';
      case 'jazzcash': return 'JazzCash';
      case 'credit_card': return 'Credit Card';
      case 'bank_transfer': return 'Bank Transfer';
    }
  };

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case 'pending': return <Clock size={16} />;
      case 'confirmed': return <CheckCircle size={16} />;
      case 'processing': return <Package size={16} />;
      case 'shipped': return <Truck size={16} />;
      case 'delivered': return <CheckCircle size={16} />;
      case 'cancelled': return <XCircle size={16} />;
      default: return <AlertCircle size={16} />;
    }
  };

  // Filter orders
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesPayment = paymentFilter === 'all' || order.paymentStatus === paymentFilter;
    
    return matchesSearch && matchesStatus && matchesPayment;
  });

  // Handle order selection
  const handleSelectOrder = (id: string) => {
    setSelectedOrders(prev =>
      prev.includes(id)
        ? prev.filter(orderId => orderId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedOrders.length === filteredOrders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(filteredOrders.map(order => order.id));
    }
  };

  // Calculate statistics
  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => o.status === 'processing').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    revenue: orders.reduce((sum, order) => sum + order.amount, 0)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Orders Management</h1>
          <p className="text-gray-600">View and manage all customer orders</p>
        </div>
        
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition-colors">
            <Download size={18} />
            <span className="hidden sm:inline">Export</span>
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors">
            <span>+ New Order</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <Package className="text-blue-600" size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-800">{stats.pending}</p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <Clock className="text-yellow-600" size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Processing</p>
              <p className="text-2xl font-bold text-gray-800">{stats.processing}</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <Truck className="text-purple-600" size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Delivered</p>
              <p className="text-2xl font-bold text-gray-800">{stats.delivered}</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <CheckCircle className="text-green-600" size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Revenue</p>
              <p className="text-2xl font-bold text-gray-800">${stats.revenue.toFixed(2)}</p>
            </div>
            <div className="p-3 bg-indigo-50 rounded-lg">
              <span className="text-indigo-600 font-bold">$</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Status Filter */}
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as OrderStatus | 'all')}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>

              {/* Payment Filter */}
              <select
                value={paymentFilter}
                onChange={(e) => setPaymentFilter(e.target.value as PaymentStatus | 'all')}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Payments</option>
                <option value="pending">Payment Pending</option>
                <option value="paid">Paid</option>
                <option value="failed">Failed</option>
                <option value="refunded">Refunded</option>
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            {selectedOrders.length > 0 && (
              <button className="px-4 py-2 bg-red-600 text-white rounded-lg flex items-center gap-2 hover:bg-red-700 transition-colors">
                <Trash2 size={18} />
                <span className="hidden sm:inline">Delete ({selectedOrders.length})</span>
              </button>
            )}
            <button className="px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition-colors">
              <Filter size={18} />
              <span className="hidden sm:inline">More Filters</span>
            </button>
          </div>
        </div>
      </div>
            {/* Orders Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left w-12">
                  <input
                    type="checkbox"
                    checked={selectedOrders.length === filteredOrders.length && filteredOrders.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300"
                  />
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Order ID</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Customer</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Date</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Amount</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Payment</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      checked={selectedOrders.includes(order.id)}
                      onChange={() => handleSelectOrder(order.id)}
                      className="rounded border-gray-300"
                    />
                  </td>
                  <td className="px-4 py-4">
                    <div>
                      <p className="font-medium text-gray-900">{order.id}</p>
                      <p className="text-sm text-gray-500">{order.items} items • {order.shippingMethod}</p>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div>
                      <p className="font-medium text-gray-900">{order.customerName}</p>
                      <p className="text-sm text-gray-500">{order.customerEmail}</p>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-gray-600">{order.date}</td>
                  <td className="px-4 py-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-900">${order.amount.toFixed(2)}</span>
                      <span className="text-xs text-gray-500">{getPaymentMethodText(order.paymentMethod)}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <select
                        value={order.status}
                        onChange={(e) => {
                          const updatedOrders = orders.map(o =>
                            o.id === order.id ? { ...o, status: e.target.value as OrderStatus } : o
                          );
                          setOrders(updatedOrders);
                        }}
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)} border-0 focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                      <span className="text-gray-400">
                        {getStatusIcon(order.status)}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <button 
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye size={18} />
                      </button>
                      <button 
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Edit Order"
                      >
                        <Edit size={18} />
                      </button>
                      <button 
                        onClick={() => {
                          if (confirm(`Are you sure you want to delete order ${order.id}?`)) {
                            setOrders(orders.filter(o => o.id !== order.id));
                          }
                        }}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Order"
                      >
                        <Trash2 size={18} />
                      </button>
                      <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-600">
            Showing {filteredOrders.length} of {orders.length} orders
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              Previous
            </button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              1
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              2
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              3
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* No Results Message */}
      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <Package className="text-gray-400" size={32} />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
          <p className="text-gray-600">
            {searchTerm || statusFilter !== 'all' || paymentFilter !== 'all' 
              ? "Try changing your filters or search term"
              : "No orders have been placed yet"}
          </p>
        </div>
      )}
    </div>
  );
}