import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { getShops } from '../../services/shopService';
import { Button, Heading } from '../../components/ui';
import { MapPin, ShoppingBag, User, LogOut, Search, Filter } from 'lucide-react';
import { Shop } from '../../types';

const CustomerHome: React.FC = () => {
  const [shops, setShops] = useState<Shop[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuth();
  const { cartItemCount } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    loadShops();
  }, []);

  const loadShops = async () => {
    try {
      const shopsData = await getShops();
      setShops(shopsData);
    } catch (error) {
      console.error('Error loading shops:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['All', 'Luxury Apparel', 'Fine Dining', 'Electronics', 'Wellness'];
  
  const filteredShops = shops.filter(shop => 
    (selectedCategory === 'All' || shop.category === selectedCategory) &&
    (searchTerm === '' || shop.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="h-screen w-full flex flex-col bg-neo-bg">
      {/* Top Navigation */}
      <header className="h-20 bg-white border-b-4 border-neo-black flex justify-between items-center px-6 shadow-neo">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-neo-green border-2 border-neo-black flex items-center justify-center font-display text-xl">F</div>
          <Heading size="md">FreshDrop</Heading>
        </div>

        <div className="flex items-center gap-6">
          <button className="font-mono font-bold uppercase hover:text-neo-blue transition-colors text-neo-blue underline decoration-4 underline-offset-4">
            Explore
          </button>
          
          <button 
            onClick={() => navigate('/customer/cart')}
            className="relative font-mono font-bold uppercase hover:text-neo-pink transition-colors flex items-center gap-2"
          >
            <span>Cart</span>
            <div className="relative">
              <ShoppingBag size={20} />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-neo-red text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-black">
                  {cartItemCount}
                </span>
              )}
            </div>
          </button>

          <button 
            onClick={() => navigate('/customer/profile')}
            className="flex items-center gap-2 font-mono font-bold uppercase hover:text-neo-blue transition-colors"
          >
            <div className="w-8 h-8 bg-gray-200 border-2 border-black overflow-hidden">
              <img src={user?.avatar} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <span className="hidden md:inline">{user?.name.split(' ')[0]}</span>
          </button>

          <button 
            onClick={logout}
            className="w-10 h-10 flex items-center justify-center border-2 border-neo-black bg-white hover:bg-neo-red hover:text-white transition-all shadow-neo-sm hover:shadow-none"
            title="Logout"
          >
            <LogOut size={20} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6">
        {/* Search and Filter */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="flex gap-4 mb-4">
            <div className="flex-1 bg-white border-3 border-neo-black shadow-neo px-4 py-3 flex items-center">
              <Search className="w-5 h-5 text-black mr-3" />
              <input 
                placeholder="SEARCH SHOPS..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent border-none outline-none text-black w-full placeholder-gray-500 font-mono font-bold uppercase" 
              />
            </div>
            <button className="w-12 h-12 bg-neo-pink border-3 border-neo-black shadow-neo flex items-center justify-center hover:translate-y-1 hover:shadow-none transition-all">
              <Filter className="w-6 h-6 text-black" />
            </button>
          </div>
          
          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 border-2 border-neo-black font-mono font-bold text-xs whitespace-nowrap transition-all ${
                  selectedCategory === cat 
                    ? 'bg-neo-blue text-white shadow-neo' 
                    : 'bg-white hover:bg-gray-100 shadow-neo-sm'
                }`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Shops Grid */}
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="text-center py-20 font-mono font-bold text-gray-400">
              Loading shops...
            </div>
          ) : filteredShops.length === 0 ? (
            <div className="text-center py-20 font-mono font-bold text-gray-400">
              No shops found
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredShops.map(shop => (
                <div
                  key={shop.id}
                  onClick={() => navigate(`/customer/shop/${shop.id}`)}
                  className="bg-white border-3 border-neo-black shadow-neo hover:shadow-neo-lg transition-all cursor-pointer hover:translate-y-[-4px]"
                >
                  <div className="h-48 border-b-3 border-neo-black relative">
                    <img src={shop.image} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all" alt={shop.name} />
                    <div className="absolute bottom-2 right-2 w-16 h-16 border-2 border-black bg-white">
                      <img src={shop.logo} className="w-full h-full object-cover" alt="Logo" />
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-display text-xl uppercase mb-1">{shop.name}</h3>
                    <p className="text-xs font-mono text-gray-500 mb-3">{shop.category}</p>
                    <div className="flex justify-between items-center border-t-2 border-black pt-2">
                      <span className="text-xs font-mono font-bold text-gray-600">Your Stars</span>
                      <span className="font-display text-xl">{shop.stars || 0} ★</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CustomerHome;
