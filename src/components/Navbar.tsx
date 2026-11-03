import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, User as UserIcon, LogOut, Calendar, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onOpenBooking: () => void;
  onOpenAuth: (mode?: 'login' | 'signup') => void;
  onOpenAccount: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenBooking,
  onOpenAuth,
  onOpenAccount,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const { user, profile, signOut } = useAuth();

  const navLinks = [
    { name: 'HOME', id: 'home' },
    { name: 'MENU', id: 'menu' },
    { name: 'ABOUT', id: 'about' },
    { name: 'EXPERIENCES', id: 'experiences' },
    { name: 'REVIEWS', id: 'reviews' },
    { name: 'GALLERY', id: 'gallery' },
    { name: 'RESERVATION', id: 'reservation' },
    { name: 'CONTACT', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (id: string, e?: React.MouseEvent) => {
    e?.preventDefault();
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    onNavigate(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogoutClick = async () => {
    setUserDropdownOpen(false);
    await signOut();
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#F6EFE6]/95 backdrop-blur-md shadow-[0_4px_25px_rgba(40,30,20,0.06)] border-b border-[#E8DECE]/80 py-3'
          : 'bg-[#F6EFE6]/70 backdrop-blur-xs py-4 md:py-5 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 flex items-center justify-between">
        {/* Brand Logo with Monogram Icon */}
        <button
          onClick={(e) => handleLinkClick('home', e)}
          className="flex items-center gap-3 group text-left"
        >
          <motion.div
            whileHover={{ scale: 1.08, rotate: 10 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className="w-10 h-10 rounded-full border border-[#8C735F] flex items-center justify-center bg-[#FAF6F0]/80 shadow-xs"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 text-[#4A392D] stroke-current"
              fill="none"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="2" x2="12" y2="22" />
              <path d="M12 7l5 5-5 5" />
              <path d="M12 7l-5 5 5 5" />
            </svg>
          </motion.div>
          <span className="font-serif text-2xl tracking-[0.2em] font-normal text-[#29221C] uppercase group-hover:text-[#8C735F] transition-colors">
            AURA
          </span>
        </button>

        {/* Desktop Navigation Links - Visible on md/lg and above */}
        <nav className="hidden lg:flex items-center space-x-5 xl:space-x-7">
          {navLinks.map((link) => {
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.name}
                type="button"
                onClick={(e) => handleLinkClick(link.id, e)}
                className={`text-xs uppercase tracking-[0.2em] transition-colors relative py-1 font-medium ${
                  isActive ? 'text-[#1F1712] font-semibold' : 'text-[#68574B] hover:text-[#1F1712]'
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#8C735F] rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Zone: Authentication + Book a Table */}
        <div className="hidden lg:flex items-center gap-3 xl:gap-4">
          {user ? (
            /* Logged in state */
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 py-1.5 px-3 rounded-full hover:bg-[#EBE0D2]/70 transition-colors border border-[#DDD0BF]/60 bg-[#FAF6F0]/60"
              >
                <div className="w-7 h-7 rounded-full bg-[#251B14] text-[#FAF6F0] flex items-center justify-center font-serif text-xs font-bold overflow-hidden">
                  {profile?.avatar_url ? (
                    <img
                      src={profile.avatar_url}
                      alt={profile.full_name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    profile?.full_name?.charAt(0).toUpperCase() || 'P'
                  )}
                </div>
                <span className="text-xs font-semibold text-[#251B14] max-w-[90px] truncate">
                  {profile?.full_name?.split(' ')[0] || 'Account'}
                </span>
                <ChevronDown size={14} className="text-[#8C735F]" />
              </button>

              {/* User Dropdown Menu */}
              <AnimatePresence>
                {userDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-48 bg-[#FAF6F0] rounded-2xl shadow-xl border border-[#E3D4C0] py-2 z-50"
                  >
                    <div className="px-4 py-2 border-b border-[#EFE4D6]">
                      <span className="text-[10px] uppercase tracking-wider text-[#8C735F] font-semibold block">
                        Patron Member
                      </span>
                      <p className="text-xs font-bold text-[#251B14] truncate">
                        {profile?.full_name || user.email}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onOpenAccount();
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs text-[#251B14] hover:bg-[#EFE4D6] transition-colors text-left"
                    >
                      <Calendar size={14} className="text-[#8C735F]" />
                      <span>My Reservations</span>
                    </button>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onOpenAccount();
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs text-[#251B14] hover:bg-[#EFE4D6] transition-colors text-left"
                    >
                      <UserIcon size={14} className="text-[#8C735F]" />
                      <span>My Account</span>
                    </button>

                    <div className="border-t border-[#EFE4D6] my-1" />

                    <button
                      onClick={handleLogoutClick}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-[#8A3A3A] hover:bg-[#FBEAEA] transition-colors text-left"
                    >
                      <LogOut size={14} />
                      <span>Sign Out</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            /* Logged out state */
            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenAuth('login')}
                className="text-xs uppercase tracking-[0.16em] font-semibold text-[#5A4B40] hover:text-[#251B14] transition-colors px-2 py-1"
              >
                Login
              </button>
              <button
                onClick={() => onOpenAuth('signup')}
                className="px-3.5 py-1.5 rounded-full border border-[#8C735F] text-xs font-semibold uppercase tracking-[0.14em] text-[#251B14] hover:bg-[#8C735F] hover:text-white transition-all duration-300"
              >
                Sign Up
              </button>
            </div>
          )}

          {/* BOOK A TABLE CTA */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onOpenBooking}
            className="animate-shimmer px-5 py-2.5 rounded-full bg-[#2B211A] text-xs font-semibold uppercase tracking-[0.18em] text-[#FAF6F0] hover:bg-[#433429] hover:shadow-lg transition-all duration-300 shrink-0"
          >
            BOOK A TABLE
          </motion.button>
        </div>

        {/* Mobile / Tablet Menu Toggle */}
        <div className="lg:hidden flex items-center gap-2">
          {user ? (
            <button
              onClick={onOpenAccount}
              className="w-8 h-8 rounded-full bg-[#251B14] text-[#FAF6F0] flex items-center justify-center text-xs font-bold font-serif"
            >
              {profile?.full_name?.charAt(0).toUpperCase() || 'P'}
            </button>
          ) : (
            <button
              onClick={() => onOpenAuth('login')}
              className="px-3 py-1.5 rounded-full border border-[#8C735F] text-[10px] font-semibold uppercase tracking-wider text-[#251B14]"
            >
              Login
            </button>
          )}

          <button
            onClick={onOpenBooking}
            className="px-3 py-1.5 rounded-full bg-[#2B211A] text-[10px] font-semibold uppercase tracking-wider text-[#FAF6F0]"
          >
            Book
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-[#2B211A] rounded-lg hover:bg-[#EDE3D4] transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown with instant page navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden bg-[#F6EFE6] border-b border-[#E2D5C3] px-6 py-6 shadow-2xl overflow-hidden"
          >
            {/* Mobile User Status */}
            {user && (
              <div className="pb-4 mb-4 border-b border-[#E5DACB] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#251B14] text-[#FAF6F0] flex items-center justify-center font-serif text-sm font-bold">
                    {profile?.full_name?.charAt(0).toUpperCase() || 'P'}
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm text-[#251B14]">
                      {profile?.full_name || 'Guest'}
                    </h4>
                    <span className="text-[10px] uppercase tracking-wider text-[#8C735F]">
                      Patron Member
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAccount();
                  }}
                  className="text-xs uppercase tracking-wider font-semibold text-[#8C735F] underline"
                >
                  My Account
                </button>
              </div>
            )}

            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={(e) => handleLinkClick(link.id, e)}
                  className={`text-left text-sm font-medium uppercase tracking-[0.2em] py-2 border-b border-[#EFE7DC] flex items-center justify-between ${
                    currentPage === link.id ? 'text-[#8C735F] font-bold pl-2 bg-[#EFE7DC]/50 rounded' : 'text-[#4A3C32]'
                  }`}
                >
                  <span>{link.name}</span>
                  {currentPage === link.id && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8C735F]" />
                  )}
                </button>
              ))}

              <div className="pt-3 space-y-2">
                {!user ? (
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onOpenAuth('login');
                      }}
                      className="py-2.5 rounded-full border border-[#8C735F] text-[#251B14] text-xs font-semibold uppercase tracking-wider hover:bg-[#FAF6F0]"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onOpenAuth('signup');
                      }}
                      className="py-2.5 rounded-full bg-[#8C735F] text-white text-xs font-semibold uppercase tracking-wider"
                    >
                      Sign Up
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      signOut();
                    }}
                    className="w-full py-2.5 text-center text-xs text-[#8A3A3A] font-semibold uppercase tracking-wider border border-[#F2D7D7] rounded-full"
                  >
                    Sign Out
                  </button>
                )}

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBooking();
                  }}
                  className="w-full py-3 rounded-full bg-[#2B211A] text-[#F6EFE6] text-xs font-semibold uppercase tracking-[0.18em] hover:bg-[#433429] transition-colors"
                >
                  Reserve a Table
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
