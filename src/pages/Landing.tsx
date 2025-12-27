import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heading } from '../components/ui';
import { ShoppingBag, Store, Sparkles, ArrowRight } from 'lucide-react';
import { UserRole } from '../types';

const Landing: React.FC = () => {
  const navigate = useNavigate();

  const handleRoleSelection = (role: UserRole) => {
    // Store selected role in localStorage for post-auth redirect
    localStorage.setItem('selectedRole', role);
    // Redirect to login page
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neo-bg via-white to-neo-bg flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center mb-6">
            <div className="w-24 h-24 bg-neo-green border-4 border-neo-black flex items-center justify-center font-display text-5xl shadow-neo-lg relative">
              F
              <Sparkles className="absolute -top-2 -right-2 text-neo-yellow" size={20} />
            </div>
          </div>
          
          <Heading size="2xl" className="mb-4">
            Welcome to FreshDrop
          </Heading>
          <p className="text-lg font-mono text-gray-600 max-w-2xl mx-auto">
            Choose how you want to get started
          </p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Customer Card */}
          <button
            onClick={() => handleRoleSelection(UserRole.CUSTOMER)}
            className="group bg-white border-4 border-neo-black p-10 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-neo-xl shadow-neo-lg transition-all duration-200 text-left relative overflow-hidden"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-neo-blue opacity-0 group-hover:opacity-5 transition-opacity" />
            
            <div className="relative">
              <div className="w-16 h-16 bg-neo-blue border-3 border-neo-black flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ShoppingBag className="text-white" size={32} />
              </div>
              
              <Heading size="lg" className="mb-3 uppercase">
                I'm a Customer
              </Heading>
              
              <p className="font-mono text-sm text-gray-600 mb-6 leading-relaxed">
                Shop amazing deals from local merchants, earn stars with every purchase, 
                and win exciting prizes through gamified lotteries.
              </p>
              
              <div className="flex items-center gap-2 font-display text-neo-blue group-hover:gap-4 transition-all">
                <span>Get Started</span>
                <ArrowRight size={20} />
              </div>
            </div>
          </button>

          {/* Merchant Card */}
          <button
            onClick={() => handleRoleSelection(UserRole.MERCHANT)}
            className="group bg-white border-4 border-neo-black p-10 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-neo-xl shadow-neo-lg transition-all duration-200 text-left relative overflow-hidden"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-neo-pink opacity-0 group-hover:opacity-5 transition-opacity" />
            
            <div className="relative">
              <div className="w-16 h-16 bg-neo-pink border-3 border-neo-black flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Store className="text-white" size={32} />
              </div>
              
              <Heading size="lg" className="mb-3 uppercase">
                I'm a Merchant
              </Heading>
              
              <p className="font-mono text-sm text-gray-600 mb-6 leading-relaxed">
                Turn surplus inventory into customer engagement. Create lotteries, 
                manage products, and build lasting loyalty with your community.
              </p>
              
              <div className="flex items-center gap-2 font-display text-neo-pink group-hover:gap-4 transition-all">
                <span>Get Started</span>
                <ArrowRight size={20} />
              </div>
            </div>
          </button>
        </div>

        {/* Info Section */}
        <div className="text-center">
          <div className="inline-block bg-white border-3 border-neo-black p-6 shadow-neo">
            <p className="font-mono text-sm text-gray-600">
              <span className="font-bold text-neo-black">New to FreshDrop?</span> 
              {' '}Select your role above to create an account and get started
            </p>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center">
          <p className="font-mono text-xs text-gray-500">
            © 2025 FreshDrop. Turn surplus into success.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Landing;
