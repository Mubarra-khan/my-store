// app/admin/layout.tsx
"use client";
import { ReactNode, useState } from 'react';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Users, 
  Package, 
  Settings,
  BarChart3,
  Bell,
  Search,
  LogOut,
  Menu,
  X
} from 'lucide-react';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', href: '/admin' },
    { icon: <ShoppingBag size={20} />, label: 'Orders', href: '/admin/orders', active: true },
    { icon: <Package size={20} />, label: 'Products', href: '/admin/products' },
    { icon: <Users size={20} />, label: 'Customers', href: '/admin/customers' },
    { icon: <BarChart3 size={20} />, label: 'Analytics', href: '/admin/analytics' },
    { icon: <Settings size={20} />, label: 'Settings', href: '/admin/settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md"
      >
        <Menu size={24} />
      </button>

      {/* Sidebar for Mobile */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setSidebarOpen(false)}>
          <div 
            className="fixed top-0 left-0 h-full w-64 bg-white" 
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-pink-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">A</span>
                </div>
                <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
              </div>
              <button onClick={() => setSidebarOpen(false)}>
                <X size={24} />
              </button>
            </div>

            <nav className="p-4 space-y-2">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    item.active
                      ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-pink-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">A</span>
            </div>
            <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
          </div>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                item.active
                  ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </a>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <button className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg w-full transition-colors">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64">
        {/* Top Navigation */}
        <header className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <div className="relative w-full lg:w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search orders, customers, products..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center gap-4 ml-4">
              <button className="relative p-2 hover:bg-gray-100 rounded-lg">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                  A
                </div>
                <div className="hidden md:block">
                  <p className="font-medium text-gray-800">Admin User</p>
                  <p className="text-sm text-gray-500">admin@example.com</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}