import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button, Heading } from '../components/ui';
import AuthModal from '../components/auth/AuthModal';
import { LogIn, UserPlus, ShoppingBag, Store, Star, Trophy, ArrowRight } from 'lucide-react';

const Landing: React.FC = () => {
  const { isAuthenticated, role, user, logout } = useAuth();
  const navigate = useNavigate();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  const openAuthModal = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const goToDashboard = () => {
    if (role === 'MERCHANT') {
      navigate('/merchant');
    } else if (role === 'CUSTOMER') {
      navigate('/customer');
    }
  };

  return (
    <div className="min-h-screen bg-neo-bg">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Pattern Grid */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" 
          style={{
            backgroundImage: 'linear-gradient(#000 2px, transparent 2px), linear-gradient(90deg, #000 2px, transparent 2px)',
            backgroundSize: '50px 50px'
          }}
        />

        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center mb-6">
              <div className="w-20 h-20 bg-neo-green border-4 border-neo-black flex items-center justify-center font-display text-4xl shadow-neo-lg">
                F
              </div>
            </div>
            
            <Heading size="2xl" className="mb-4">
              FreshDrop
            </Heading>
            <p className="text-xl font-mono font-bold text-gray-700 max-w-2xl mx-auto mb-8">
              Turn surplus inventory into customer loyalty with gamified lottery experiences
            </p>

            {/* Auth Buttons or User Info */}
            {isAuthenticated && user ? (
              <div className="flex flex-col items-center gap-4">
                <div className="bg-white border-3 border-neo-black p-4 shadow-neo">
                  <p className="font-mono text-sm text-gray-600">Welcome back,</p>
                  <p className="font-display text-2xl uppercase">{user.name}</p>
                  <p className="font-mono text-xs text-gray-500">
                    {role === 'MERCHANT' ? 'Merchant Account' : 'Customer Account'}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    variant="primary" 
                    className="px-8 py-4 text-lg"
                    onClick={goToDashboard}
                  >
                    <ArrowRight size={24} />
                    Go to Dashboard
                  </Button>
                  <Button 
                    variant="secondary" 
                    className="px-8 py-4 text-lg"
                    onClick={logout}
                  >
                    Logout
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="primary" 
                  className="px-8 py-4 text-lg"
                  onClick={() => openAuthModal('login')}
                >
                  <LogIn size={24} />
                  Login
                </Button>
                <Button 
                  variant="accent" 
                  className="px-8 py-4 text-lg"
                  onClick={() => openAuthModal('signup')}
                >
                  <UserPlus size={24} />
                  Sign Up
                </Button>
              </div>
            )}
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <div className="bg-white border-3 border-neo-black p-6 shadow-neo hover:shadow-neo-lg transition-all">
              <div className="w-12 h-12 bg-neo-blue border-2 border-neo-black flex items-center justify-center mb-4">
                <ShoppingBag className="text-white" size={24} />
              </div>
              <h3 className="font-display text-xl mb-2 uppercase">Shop Surplus</h3>
              <p className="font-mono text-sm text-gray-600">
                Browse local shops offering premium products at great prices
              </p>
            </div>

            <div className="bg-white border-3 border-neo-black p-6 shadow-neo hover:shadow-neo-lg transition-all">
              <div className="w-12 h-12 bg-neo-pink border-2 border-neo-black flex items-center justify-center mb-4">
                <Trophy className="text-white" size={24} />
              </div>
              <h3 className="font-display text-xl mb-2 uppercase">Win Prizes</h3>
              <p className="font-mono text-sm text-gray-600">
                Enter lotteries using stars earned from purchases
              </p>
            </div>

            <div className="bg-white border-3 border-neo-black p-6 shadow-neo hover:shadow-neo-lg transition-all">
              <div className="w-12 h-12 bg-neo-yellow border-2 border-neo-black flex items-center justify-center mb-4">
                <Star className="text-black" size={24} />
              </div>
              <h3 className="font-display text-xl mb-2 uppercase">Earn Rewards</h3>
              <p className="font-mono text-sm text-gray-600">
                Every purchase earns stars you can use in exciting lotteries
              </p>
            </div>
          </div>

          {/* For Merchants */}
          <div className="mt-16 bg-neo-black text-white border-4 border-neo-black p-8 shadow-neo-lg">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-16 h-16 bg-neo-green border-3 border-white flex items-center justify-center shadow-neo">
                <Store size={32} />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="font-display text-2xl mb-2 uppercase">For Merchants</h3>
                <p className="font-mono">
                  Manage inventory, create engaging lotteries, and build customer loyalty
                </p>
              </div>
              <Button 
                variant="accent" 
                className="px-6 py-3"
                onClick={() => openAuthModal('signup')}
              >
                Start Selling
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t-4 border-neo-black bg-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="font-mono text-sm text-gray-600">
            © 2025 FreshDrop. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
      />
    </div>
  );
};

export default Landing;
