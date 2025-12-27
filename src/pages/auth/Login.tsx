import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { createUser, getUser } from '../../services/userService';
import { Button, Input, Heading, Card } from '../../components/ui';
import { LogIn, ArrowLeft } from 'lucide-react';
import { UserRole } from '../../types';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get selected role from localStorage
    const storedRole = localStorage.getItem('selectedRole') as UserRole;
    if (storedRole) {
      setSelectedRole(storedRole);
    }
  }, []);

  const redirectToRoleDashboard = (role: UserRole) => {
    if (role === UserRole.MERCHANT) {
      navigate('/merchant', { replace: true });
    } else if (role === UserRole.CUSTOMER) {
      navigate('/customer', { replace: true });
    }
    // Clear stored role after redirect
    localStorage.removeItem('selectedRole');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Get user data to determine role
      const userData = await getUser(userCredential.user.uid);
      
      if (userData) {
        // Existing users should always use their saved role
        redirectToRoleDashboard(userData.role);
      } else {
        // If the user authenticated but has no profile doc, send them to signup to complete profile
        setError('Profile not found. Please complete signup.');
        navigate('/signup', { replace: true });
      }
    } catch (err: any) {
      setError(err.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      // Get user data to determine role
      const userData = await getUser(result.user.uid);
      
      if (userData) {
        // Existing users should always use their saved role
        redirectToRoleDashboard(userData.role);
        return;
      }

      // First-time Google sign-in: create the Firestore profile using the role selected on Landing
      if (!selectedRole) {
        setError('Please choose a role first.');
        navigate('/', { replace: true });
        return;
      }

      await createUser({
        id: result.user.uid,
        email: result.user.email || '',
        name: result.user.displayName || 'User',
        phone: result.user.phoneNumber || '',
        role: selectedRole,
        avatar:
          result.user.photoURL ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(result.user.displayName || 'User')}&background=random`,
        stars: {}
      });

      redirectToRoleDashboard(selectedRole);
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-neo-bg p-4">
      <Card className="w-full max-w-md">
        <div className="mb-6 flex items-center justify-center">
          <div className="w-16 h-16 bg-neo-green border-3 border-neo-black flex items-center justify-center font-display text-3xl shadow-neo">
            F
          </div>
        </div>
        
        <Heading size="lg" className="text-center mb-2">
          Welcome Back
        </Heading>
        <p className="text-center font-mono text-sm text-gray-600 mb-2">
          Login to your FreshDrop account
        </p>
        
        {selectedRole && (
          <div className="text-center mb-8">
            <div className="inline-block bg-neo-bg border-2 border-neo-black px-4 py-2">
              <p className="font-mono text-xs text-gray-500">Logging in as</p>
              <p className="font-display uppercase text-sm">
                {selectedRole === UserRole.MERCHANT ? 'Merchant' : 'Customer'}
              </p>
            </div>
          </div>
        )}

        {!selectedRole && <div className="mb-8" />}

        {error && (
          <div className="mb-4 p-3 bg-neo-red border-2 border-neo-black text-white font-mono text-sm">
            {error}
          </div>
        )}

        {/* Google Sign In */}
        <Button
          onClick={handleGoogleSignIn}
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
          Continue with Google
        </Button>

        <div className="relative mb-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t-2 border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white font-mono text-gray-500">OR</span>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            type="email"
            label="Email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          
          <Input
            type="password"
            label="Password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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

        <div className="mt-6 text-center">
          <p className="font-mono text-sm">
            Don't have an account?{' '}
            <Link to="/signup" className="text-neo-blue font-bold hover:underline">
              Sign Up
            </Link>
          </p>
        </div>

        <div className="mt-4 text-center">
          <Link to="/" className="font-mono text-xs text-gray-500 hover:text-gray-700">
            ← Back to Home
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Login;
