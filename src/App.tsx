/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MenuPedestals } from './components/MenuPedestals';
import { AboutSection } from './components/AboutSection';
import { Experiences } from './components/Experiences';
import { Reviews } from './components/Reviews';
import { GallerySection } from './components/GallerySection';
import { ReservationSection } from './components/ReservationSection';
import { ContactLocation } from './components/ContactLocation';
import { Footer } from './components/Footer';
import { DishModal } from './components/DishModal';
import { ReservationModal } from './components/ReservationModal';
import { AuthModal } from './components/AuthModal';
import { MyAccountModal } from './components/MyAccountModal';
import { Preloader } from './components/Preloader';
import { MenuItem } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

// Dedicated standalone page views
import { MenuPage } from './pages/MenuPage';
import { AboutPage } from './pages/AboutPage';
import { ExperiencesPage } from './pages/ExperiencesPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { GalleryPage } from './pages/GalleryPage';
import { ReservationPage } from './pages/ReservationPage';
import { ContactPage } from './pages/ContactPage';

const VALID_PAGES = ['home', 'menu', 'about', 'experiences', 'reviews', 'gallery', 'reservation', 'contact'];

function MainAppContent() {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingDishTarget, setBookingDishTarget] = useState<MenuItem | null>(null);

  // Authentication & Account modals
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup' | 'forgot_password'>('login');
  const [accountModalOpen, setAccountModalOpen] = useState(false);
  const [postAuthAction, setPostAuthAction] = useState<(() => void) | null>(null);

  const { user, notification, clearNotification } = useAuth();

  // Listen to browser hash for seamless routing (e.g. #menu, #about, etc.)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (VALID_PAGES.includes(hash)) {
        setCurrentPage(hash);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleNavigate = (page: string) => {
    const target = VALID_PAGES.includes(page) ? page : 'home';
    setCurrentPage(target);
    window.location.hash = target === 'home' ? '' : target;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBooking = (dish?: MenuItem) => {
    if (dish) {
      setBookingDishTarget(dish);
    } else {
      setBookingDishTarget(null);
    }
    setBookingModalOpen(true);
  };

  const handleOpenAuth = (mode: 'login' | 'signup' = 'login') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handleOpenAccount = () => {
    if (user) {
      setAccountModalOpen(true);
    } else {
      // Protected action: redirect to Login, then open Account once logged in
      setPostAuthAction(() => () => setAccountModalOpen(true));
      handleOpenAuth('login');
    }
  };

  const handleAuthSuccess = () => {
    if (postAuthAction) {
      postAuthAction();
      setPostAuthAction(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#F6EFE6] text-[#251B14] selection:bg-[#433429] selection:text-[#F6EFE6] font-sans overflow-x-hidden">
      {/* Luxury Initial Preloader */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {/* Global Toast Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className={`fixed top-6 left-1/2 z-[60] px-5 py-3 rounded-2xl shadow-xl border flex items-center gap-3 text-xs max-w-md w-full mx-auto backdrop-blur-md ${
              notification.type === 'success'
                ? 'bg-[#FAF6F0] text-[#246132] border-[#C8E4CD]'
                : notification.type === 'error'
                ? 'bg-[#FAF6F0] text-[#8A3A3A] border-[#F2D7D7]'
                : 'bg-[#FAF6F0] text-[#251B14] border-[#E5DACB]'
            }`}
          >
            {notification.type === 'success' && <CheckCircle2 size={16} className="shrink-0 text-[#246132]" />}
            {notification.type === 'error' && <AlertCircle size={16} className="shrink-0 text-[#8A3A3A]" />}
            {notification.type === 'info' && <Info size={16} className="shrink-0 text-[#8C735F]" />}

            <span className="flex-1 font-medium">{notification.message}</span>

            <button
              onClick={clearNotification}
              className="p-1 hover:bg-black/5 rounded-full transition-colors"
              aria-label="Dismiss notification"
            >
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Navbar with dynamic Auth status and active page navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenBooking={() => handleOpenBooking()}
        onOpenAuth={(mode) => handleOpenAuth(mode)}
        onOpenAccount={handleOpenAccount}
      />

      {/* Main Dynamic View Area */}
      <main className="transition-opacity duration-300">
        {/* 1. HOME SANCTUARY VIEW */}
        {currentPage === 'home' && (
          <>
            <Hero
              onOpenBooking={() => handleOpenBooking()}
              onExploreMenu={() => handleNavigate('menu')}
            />
            <MenuPedestals
              onSelectDish={(dish) => setSelectedDish(dish)}
              onOpenBooking={() => handleOpenBooking()}
              onViewFullMenu={() => handleNavigate('menu')}
            />
            <AboutSection
              onOpenBooking={() => handleOpenBooking()}
              onViewFullAbout={() => handleNavigate('about')}
            />
            <Experiences onOpenBooking={() => handleOpenBooking()} />
            <Reviews onViewAllReviews={() => handleNavigate('reviews')} />
            <GallerySection onViewFullGallery={() => handleNavigate('gallery')} />
            <ReservationSection onOpenAccount={handleOpenAccount} />
            <ContactLocation />
          </>
        )}

        {/* 2. DEDICATED MENU PAGE */}
        {currentPage === 'menu' && (
          <MenuPage
            onSelectDish={(dish) => setSelectedDish(dish)}
            onBookDish={(dish) => handleOpenBooking(dish)}
            onOpenBooking={() => handleOpenBooking()}
            onBackToHome={() => handleNavigate('home')}
          />
        )}

        {/* 3. DEDICATED ABOUT PAGE */}
        {currentPage === 'about' && (
          <AboutPage
            onBackToHome={() => handleNavigate('home')}
            onOpenBooking={() => handleOpenBooking()}
          />
        )}

        {/* 4. DEDICATED EXPERIENCES PAGE */}
        {currentPage === 'experiences' && (
          <ExperiencesPage
            onBackToHome={() => handleNavigate('home')}
            onOpenBooking={() => handleOpenBooking()}
            onBookExperience={(_exp) => handleOpenBooking()}
          />
        )}

        {/* 5. DEDICATED REVIEWS PAGE */}
        {currentPage === 'reviews' && (
          <ReviewsPage
            onBackToHome={() => handleNavigate('home')}
            onOpenBooking={() => handleOpenBooking()}
          />
        )}

        {/* 6. DEDICATED GALLERY PAGE */}
        {currentPage === 'gallery' && (
          <GalleryPage
            onBackToHome={() => handleNavigate('home')}
            onOpenBooking={() => handleOpenBooking()}
          />
        )}

        {/* 7. DEDICATED RESERVATION PAGE */}
        {currentPage === 'reservation' && (
          <ReservationPage
            onBackToHome={() => handleNavigate('home')}
            onOpenAccount={handleOpenAccount}
          />
        )}

        {/* 8. DEDICATED CONTACT & LOCATION PAGE */}
        {currentPage === 'contact' && (
          <ContactPage
            onBackToHome={() => handleNavigate('home')}
          />
        )}
      </main>

      {/* Luxury Footer with seamless page links */}
      <Footer onNavigate={handleNavigate} />

      {/* Interactive Dish Inspection Modal */}
      <DishModal
        dish={selectedDish}
        onClose={() => setSelectedDish(null)}
        onBookDish={(dish) => handleOpenBooking(dish)}
      />

      {/* Quick Booking Modal */}
      <ReservationModal
        isOpen={bookingModalOpen}
        onClose={() => {
          setBookingModalOpen(false);
          setBookingDishTarget(null);
        }}
        selectedDish={bookingDishTarget}
        onOpenAccount={handleOpenAccount}
      />

      {/* Supabase Authentication Modal (Login / Sign Up / Forgot Password) */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
        onSuccess={handleAuthSuccess}
      />

      {/* Protected User Area: My Account & Reservations Modal */}
      <MyAccountModal
        isOpen={accountModalOpen}
        onClose={() => setAccountModalOpen(false)}
        onBookNewTable={() => handleOpenBooking()}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainAppContent />
    </AuthProvider>
  );
}
