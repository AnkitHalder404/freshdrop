import React, { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { createUser } from '../../services/userService';
import { UserRole } from '../../types';
import { Button, Input, Heading } from '../ui';
import { X, Mail, LogIn, UserPlus, Store, ShoppingBag } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialMode = 'login' }) => {
  const [mode, setMode] = useState<'login' | 'signup' | 'role'>(initialMode);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if user exists in Firestore, if not, need role selection
      // For new Google users, we'll default to customer or show role selection
      const roleToUse = selectedRole || UserRole.CUSTOMER;
      
      await createUser({
        id: user.uid,
        email: user.email!,
        name: user.displayName || 'User',
        phone: user.phoneNumber || '',
        role: roleToUse,
        avatar: user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || 'User')}&background=random`,
        stars: {}
      });

      onClose();
    } catch (err: any) {
      if (err.code === 'auth/popup-closed-by-user') {
        setError('Sign-in cancelled');
      } else {
        setError(err.message || 'Failed to sign in with Google');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!selectedRole) {
      setError('Please select a role first');
      return;
    }

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      await createUser({
        id: userCredential.user.uid,
        email: formData.email,
        name: formData.name,
        phone: formData.phone,
        role: selectedRole,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=random`,
        stars: {}
      });

      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setMode('signup');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white border-4 border-neo-black shadow-neo-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 bg-neo-red border-2 border-neo-black hover:bg-red-600 transition-colors flex items-center justify-center shadow-neo"
        >
          <X className="text-white" size={20} />
        </button>

        <div className="p-8">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-neo-green border-3 border-neo-black flex items-center justify-center font-display text-3xl shadow-neo">
              F
            </div>
          </div>

          {/* Role Selection */}
          {mode === 'role' && (
            <div className="space-y-6">
              <div className="text-center">
                <Heading size="lg" className="mb-2">Choose Your Role</Heading>
                <p className="font-mono text-sm text-gray-600">
                  How do you want to use FreshDrop?
                </p>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => handleRoleSelect(UserRole.CUSTOMER)}
                  className="w-full bg-neo-blue border-3 border-neo-black p-6 hover:translate-x-1 hover:translate-y-1 hover:shadow-none shadow-neo transition-all text-left"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white border-2 border-neo-black flex items-center justify-center shrink-0">
                      <ShoppingBag size={24} className="text-neo-blue" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl text-white mb-1 uppercase">Customer</h3>
                      <p className="font-mono text-sm text-blue-100">
                        Shop deals, earn stars, win prizes
                      </p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => handleRoleSelect(UserRole.MERCHANT)}
                  className="w-full bg-neo-pink border-3 border-neo-black p-6 hover:translate-x-1 hover:translate-y-1 hover:shadow-none shadow-neo transition-all text-left"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white border-2 border-neo-black flex items-center justify-center shrink-0">
                      <Store size={24} className="text-neo-pink" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl text-white mb-1 uppercase">Merchant</h3>
                      <p className="font-mono text-sm text-pink-100">
                        Sell inventory, create lotteries, grow loyalty
                      </p>
                    </div>
                  </div>
                </button>
              </div>

              <div className="text-center pt-4 border-t-2 border-gray-200">
                <p className="font-mono text-sm text-gray-600">
                  Already have an account?{' '}
                  <button
                    onClick={() => setMode('login')}
                    className="text-neo-blue font-bold hover:underline"
                  >
                    Login
                  </button>
                </p>
              </div>
            </div>
          )}

          {/* Login Form */}
          {mode === 'login' && (
            <div className="space-y-6">
              <div className="text-center">
                <Heading size="lg" className="mb-2">Welcome Back</Heading>
                <p className="font-mono text-sm text-gray-600">
                  Login to your FreshDrop account
                </p>
              </div>

              {error && (
                <div className="p-3 bg-neo-red border-2 border-neo-black text-white font-mono text-sm">
                  {error}
                </div>
              )}

              {/* Google Sign In */}
              <Button
                onClick={handleGoogleSignIn}
                variant="secondary"
                className="w-full"
                isLoading={loading}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t-2 border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white font-mono text-gray-500">OR</span>
                </div>
              </div>

              <form onSubmit={handleEmailLogin} className="space-y-4">
                <Input
                  type="email"
                  name="email"
                  label="Email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                
                <Input
                  type="password"
                  name="password"
                  label="Password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full"
                  isLoading={loading}
                >
                  <LogIn size={20} />
                  Login
                </Button>
              </form>

              <div className="text-center pt-4 border-t-2 border-gray-200">
                <p className="font-mono text-sm text-gray-600">
                  Don't have an account?{' '}
                  <button
                    onClick={() => setMode('role')}
                    className="text-neo-blue font-bold hover:underline"
                  >
                    Sign Up
                  </button>
                </p>
              </div>
            </div>
          )}

          {/* Signup Form */}
          {mode === 'signup' && selectedRole && (
            <div className="space-y-6">
              <div className="text-center">
                <Heading size="lg" className="mb-2">Create Account</Heading>
                <p className="font-mono text-sm text-gray-600">
                  Sign up as {selectedRole === 'CUSTOMER' ? 'a Customer' : 'a Merchant'}
                </p>
              </div>

              {error && (
                <div className="p-3 bg-neo-red border-2 border-neo-black text-white font-mono text-sm">
                  {error}
                </div>
              )}

              {/* Google Sign In */}
              <Button
                onClick={handleGoogleSignIn}
                variant="secondary"
                className="w-full"
                isLoading={loading}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Sign up with Google
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t-2 border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white font-mono text-gray-500">OR</span>
                </div>
              </div>

              <form onSubmit={handleEmailSignup} className="space-y-4">
                <Input
                  type="text"
                  name="name"
                  label="Full Name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />

                <Input
                  type="email"
                  name="email"
                  label="Email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

                <Input
                  type="tel"
                  name="phone"
                  label="Phone Number"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
                
                <Input
                  type="password"
                  name="password"
                  label="Password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

                <Input
                  type="password"
                  name="confirmPassword"
                  label="Confirm Password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full"
                  isLoading={loading}
                >
                  <UserPlus size={20} />
                  Create Account
                </Button>
              </form>

              <div className="text-center pt-4 border-t-2 border-gray-200">
                <button
                  onClick={() => {
                    setMode('role');
                    setSelectedRole(null);
                  }}
                  className="font-mono text-sm text-gray-600 hover:text-gray-800"
                >
                  ← Change role
                </button>
                <p className="font-mono text-sm text-gray-600 mt-2">
                  Already have an account?{' '}
                  <button
                    onClick={() => setMode('login')}
                    className="text-neo-blue font-bold hover:underline"
                  >
                    Login
                  </button>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
