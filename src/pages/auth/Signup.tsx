import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { createUser } from '../../services/userService';
import { UserRole } from '../../types';
import { Button, Input, Heading, Card } from '../../components/ui';
import { UserPlus, Store, ShoppingBag } from 'lucide-react';

const Signup: React.FC = () => {
  const [step, setStep] = useState<'role' | 'form'>('role');
  const [role, setRole] = useState<UserRole | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if role was preselected from landing page
    const storedRole = localStorage.getItem('selectedRole') as UserRole;
    if (storedRole) {
      setRole(storedRole);
      setStep('form');
    }
  }, []);

  const redirectToRoleDashboard = (userRole: UserRole) => {
    if (userRole === UserRole.MERCHANT) {
      navigate('/merchant', { replace: true });
    } else if (userRole === UserRole.CUSTOMER) {
      navigate('/customer', { replace: true });
    }
    // Clear stored role after redirect
    localStorage.removeItem('selectedRole');
  };

  const handleRoleSelect = (selectedRole: UserRole) => {
    setRole(selectedRole);
    setStep('form');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleGoogleSignUp = async () => {
    if (!role) {
      setError('Please select a role first');
      return;
    }

    setError('');
    setLoading(true);

    try {
      console.log('Starting Google signup with role:', role);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      console.log('Google auth successful, creating profile...');
      // Create user profile with selected role
      await createUser({
        id: user.uid,
        email: user.email!,
        name: user.displayName || 'User',
        phone: user.phoneNumber || '',
        role: role,
        avatar: user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || 'User')}&background=random`,
        stars: {}
      });

      console.log('Profile created, redirecting to:', role);
      // Redirect to role-specific dashboard
      redirectToRoleDashboard(role);
    } catch (err: any) {
      console.error('Google signup error:', err);
      if (err.code === 'auth/popup-closed-by-user') {
        setError('Sign-up cancelled');
      } else {
        setError(err.message || 'Failed to sign up with Google');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!role) {
      setError('Please select a role');
      return;
    }

    setLoading(true);

    try {
      console.log('Creating user with role:', role);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      console.log('User authenticated, creating profile...');
      await createUser({
        id: userCredential.user.uid,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        role: role,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=random`,
        stars: {}
      });

      console.log('Profile created, redirecting to:', role);
      // Redirect to role-specific dashboard
      redirectToRoleDashboard(role);
    } catch (err: any) {
      console.error('Signup error:', err);
      setError(err.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neo-bg p-4">
      <Card className="w-full max-w-md">
        <div className="mb-6 flex items-center justify-center">
          <div className="w-16 h-16 bg-neo-yellow border-3 border-neo-black flex items-center justify-center font-display text-3xl shadow-neo">
            F
          </div>
        </div>
        
        <Heading size="lg" className="text-center mb-2">
          Join FreshDrop
        </Heading>
        <p className="text-center font-mono text-sm text-gray-600 mb-8">
          {step === 'role' ? 'Choose your account type' : 'Complete your registration'}
        </p>

        {error && (
          <div className="mb-4 p-3 bg-neo-red border-2 border-neo-black text-white font-mono text-sm">
            {error}
          </div>
        )}

        {step === 'role' && (
          <div className="space-y-4">
            <button
              onClick={() => handleRoleSelect(UserRole.CUSTOMER)}
              className="w-full p-6 border-3 border-neo-black bg-white hover:bg-neo-blue hover:text-white transition-all shadow-neo hover:translate-y-[-2px] hover:shadow-neo-lg text-left"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-neo-green border-2 border-neo-black flex items-center justify-center">
                  <ShoppingBag size={24} />
                </div>
                <div className="flex-1">
                  <div className="font-display text-xl uppercase">Customer</div>
                  <div className="text-xs font-mono">Browse shops and join lotteries</div>
                </div>
              </div>
            </button>

            <button
              onClick={() => handleRoleSelect(UserRole.MERCHANT)}
              className="w-full p-6 border-3 border-neo-black bg-white hover:bg-neo-yellow transition-all shadow-neo hover:translate-y-[-2px] hover:shadow-neo-lg text-left"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-neo-pink border-2 border-neo-black flex items-center justify-center">
                  <Store size={24} />
                </div>
                <div className="flex-1">
                  <div className="font-display text-xl uppercase">Merchant</div>
                  <div className="text-xs font-mono">Manage your shop and create lotteries</div>
                </div>
              </div>
            </button>

            <div className="mt-6 text-center">
              <p className="font-mono text-sm">
                Already have an account?{' '}
                <Link to="/login" className="text-neo-blue font-bold hover:underline">
                  Login
                </Link>
              </p>
            </div>
          </div>
        )}

        {step === 'form' && (
          <div>
            <div className="mb-4 p-3 bg-neo-bg border-2 border-neo-black">
              <div className="text-xs font-mono font-bold uppercase text-gray-600">Account Type</div>
              <div className="font-display text-lg">
                {role === UserRole.CUSTOMER ? 'Customer' : 'Merchant'}
              </div>
              <button
                type="button"
                onClick={() => setStep('role')}
                className="text-xs font-mono text-neo-blue hover:underline mt-1"
              >
                Change
              </button>
            </div>

            {/* Google Sign Up */}
            <Button
              onClick={handleGoogleSignUp}
              variant="secondary"
              className="w-full mb-4"
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

            <div className="relative mb-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white font-mono text-gray-500">OR</span>
              </div>
            </div>

            <form onSubmit={handleSignup} className="space-y-4">
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
              label="Phone"
              placeholder="+1234567890"
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
              variant="accent"
              className="w-full"
              isLoading={loading}
            >
              <UserPlus size={20} />
              Create Account
            </Button>
          </form>

          <div className="text-center mt-4">
            <Link to="/login" className="font-mono text-xs text-gray-500 hover:text-gray-700">
              ← Back to Login
            </Link>
          </div>
        </div>
        )}
      </Card>
    </div>
  );
};

export default Signup;
