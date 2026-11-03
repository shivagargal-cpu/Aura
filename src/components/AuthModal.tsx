import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { X, Mail, Lock, User as UserIcon, ArrowRight, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup' | 'forgot_password';
  onSuccess?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login',
  onSuccess,
}) => {
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot_password'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { signIn, signUp, signInWithGoogle, resetPassword, isConfigured } = useAuth();

  if (!isOpen) return null;

  const handleResetState = () => {
    setErrorMessage(null);
    setSuccessMessage(null);
  };

  const switchMode = (newMode: 'login' | 'signup' | 'forgot_password') => {
    handleResetState();
    setMode(newMode);
  };

  const validateEmail = (val: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    handleResetState();

    if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (mode === 'signup') {
      if (!fullName.trim()) {
        setErrorMessage('Please enter your full name.');
        return;
      }
      if (password.length < 6) {
        setErrorMessage('Password must be at least 6 characters long.');
        return;
      }
      if (password !== confirmPassword) {
        setErrorMessage('Passwords do not match. Please re-enter.');
        return;
      }

      setLoading(true);
      const res = await signUp(email, password, fullName);
      setLoading(false);

      if (res.error) {
        setErrorMessage(res.error);
      } else {
        setSuccessMessage('Account created successfully!');
        setTimeout(() => {
          onClose();
          onSuccess?.();
        }, 1200);
      }
    } else if (mode === 'login') {
      if (!password) {
        setErrorMessage('Please enter your password.');
        return;
      }

      setLoading(true);
      const res = await signIn(email, password);
      setLoading(false);

      if (res.error) {
        setErrorMessage(res.error);
      } else {
        setSuccessMessage('Signed in successfully!');
        setTimeout(() => {
          onClose();
          onSuccess?.();
        }, 800);
      }
    } else if (mode === 'forgot_password') {
      setLoading(true);
      const res = await resetPassword(email);
      setLoading(false);

      if (res.error) {
        setErrorMessage(res.error);
      } else {
        setSuccessMessage('Instructions sent! Please check your inbox.');
      }
    }
  };

  const handleGoogleAuth = async () => {
    handleResetState();
    setLoading(true);
    const res = await signInWithGoogle();
    setLoading(false);
    if (res?.error) {
      setErrorMessage(res.error);
    } else {
      setTimeout(() => {
        onClose();
        onSuccess?.();
      }, 900);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#160E08]/85 backdrop-blur-md"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative z-10 w-full max-w-md bg-[#FAF6F0] rounded-3xl overflow-hidden border border-[#E3D4C0] shadow-2xl text-[#251B14] p-6 sm:p-8 my-8"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close authentication modal"
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#EFE4D6] hover:bg-[#E2D5C3] text-[#251B14] flex items-center justify-center transition-colors"
          >
            <X size={18} />
          </button>

          {/* Modal Header */}
          <div className="text-center mb-6">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#8C735F] font-semibold block mb-1">
              Patron Circle
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-[#251B14] font-normal">
              {mode === 'login' && 'Welcome Back'}
              {mode === 'signup' && 'Create Account'}
              {mode === 'forgot_password' && 'Password Recovery'}
            </h3>
            <p className="text-xs text-[#6B5A4E] mt-1 font-light">
              {mode === 'login' && 'Sign in to access your bookings, tasting notes, and cellar preferences.'}
              {mode === 'signup' && 'Join the AURA Patron Circle for priority reservations and seasonal allocations.'}
              {mode === 'forgot_password' && 'Enter your account email to receive recovery instructions.'}
            </p>
          </div>

          {/* Status Notifications */}
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 rounded-xl bg-[#FDF2F2] border border-[#F8D7DA] text-[#A94442] text-xs flex items-start gap-2.5"
            >
              <AlertCircle size={15} className="shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </motion.div>
          )}

          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 rounded-xl bg-[#F0F8F1] border border-[#D4EDDA] text-[#246132] text-xs flex items-start gap-2.5"
            >
              <CheckCircle2 size={15} className="shrink-0 mt-0.5" />
              <span>{successMessage}</span>
            </motion.div>
          )}

          {/* Social Sign In (Google OAuth) */}
          {mode !== 'forgot_password' && (
            <div className="mb-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={handleGoogleAuth}
                disabled={loading}
                className="w-full py-3 px-4 rounded-full border border-[#D9CCBA] bg-white text-xs font-semibold uppercase tracking-wider text-[#251B14] hover:bg-[#FAF6F0] hover:border-[#8C735F] transition-all flex items-center justify-center gap-3 shadow-xs"
              >
                {/* Official Google G Icon */}
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Continue with Google</span>
              </motion.button>

              <div className="relative flex items-center justify-center my-5">
                <div className="border-t border-[#E3D4C0] w-full" />
                <span className="bg-[#FAF6F0] px-3 text-[11px] uppercase tracking-wider text-[#8A796A] absolute">
                  or with email
                </span>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#6E5D50] mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <UserIcon
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A796A]"
                  />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Arthur Pendelton"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-white border border-[#DDD0BF] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#251B14] focus:outline-none focus:border-[#8C735F] transition-colors"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#6E5D50] mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A796A]"
                />
                <input
                  type="email"
                  required
                  placeholder="name@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white border border-[#DDD0BF] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#251B14] focus:outline-none focus:border-[#8C735F] transition-colors"
                />
              </div>
            </div>

            {mode !== 'forgot_password' && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] uppercase tracking-wider font-semibold text-[#6E5D50]">
                    Password
                  </label>
                  {mode === 'login' && (
                    <button
                      type="button"
                      onClick={() => switchMode('forgot_password')}
                      className="text-[11px] text-[#8C735F] hover:underline"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A796A]"
                  />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white border border-[#DDD0BF] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#251B14] focus:outline-none focus:border-[#8C735F] transition-colors"
                  />
                </div>
              </div>
            )}

            {mode === 'signup' && (
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#6E5D50] mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A796A]"
                  />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-white border border-[#DDD0BF] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#251B14] focus:outline-none focus:border-[#8C735F] transition-colors"
                  />
                </div>
              </div>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="animate-shimmer w-full mt-2 py-3 rounded-full bg-[#251B14] text-[#FAF6F0] text-xs uppercase tracking-[0.18em] font-semibold hover:bg-[#433429] transition-all flex items-center justify-center gap-2 shadow-md disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>
                    {mode === 'login' && 'Sign In'}
                    {mode === 'signup' && 'Create Account'}
                    {mode === 'forgot_password' && 'Send Recovery Email'}
                  </span>
                  <ArrowRight size={14} />
                </>
              )}
            </motion.button>
          </form>

          {/* Mode Switch Footer */}
          <div className="mt-6 pt-4 border-t border-[#EAE0D2] text-center text-xs text-[#6B5A4E]">
            {mode === 'login' && (
              <p>
                Don't have an account yet?{' '}
                <button
                  type="button"
                  onClick={() => switchMode('signup')}
                  className="font-semibold text-[#251B14] hover:text-[#8C735F] underline ml-1"
                >
                  Sign Up
                </button>
              </p>
            )}
            {mode === 'signup' && (
              <p>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => switchMode('login')}
                  className="font-semibold text-[#251B14] hover:text-[#8C735F] underline ml-1"
                >
                  Sign In
                </button>
              </p>
            )}
            {mode === 'forgot_password' && (
              <p>
                Remembered your password?{' '}
                <button
                  type="button"
                  onClick={() => switchMode('login')}
                  className="font-semibold text-[#251B14] hover:text-[#8C735F] underline ml-1"
                >
                  Back to Sign In
                </button>
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
