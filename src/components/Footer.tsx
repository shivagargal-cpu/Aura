import React, { useState } from 'react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { ArrowUp, Instagram, Facebook, Globe, Check } from 'lucide-react';

interface FooterProps {
  onNavigate?: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNav = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="pt-20 pb-12 border-t border-[#E5DACB] bg-[#EFE6DA]/60">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-[#E0D3C2]">
          {/* Brand Info */}
          <div className="lg:col-span-4">
            <button
              onClick={() => handleNav('home')}
              className="flex items-center gap-3 mb-4 text-left"
            >
              <div className="w-10 h-10 rounded-full border border-[#8C735F] flex items-center justify-center bg-[#FAF6F0]/60">
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
              </div>
              <span className="font-serif text-2xl tracking-[0.2em] font-normal text-[#251B14] uppercase">
                AURA
              </span>
            </button>

            <p className="text-xs text-[#6B5C50] leading-relaxed max-w-sm mb-6 font-light">
              An architectural exploration of contemporary haute cuisine. Guided by
              seasonal nature, refined by French classical discipline, orchestrated for
              the modern sensory wanderer.
            </p>

            <div className="text-[11px] uppercase tracking-widest text-[#8C735F] font-semibold">
              Michelin Guide Two Stars · 2026
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#251B14] font-semibold mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-[#6B5C50]">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-[#251B14] transition-colors text-left"
                >
                  Home Sanctuary
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('menu')}
                  className="hover:text-[#251B14] transition-colors text-left"
                >
                  Seasonal Menu
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-[#251B14] transition-colors text-left"
                >
                  The Atelier & Chef
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('experiences')}
                  className="hover:text-[#251B14] transition-colors text-left"
                >
                  Special Experiences
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('reviews')}
                  className="hover:text-[#251B14] transition-colors text-left"
                >
                  Guest Reviews
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('gallery')}
                  className="hover:text-[#251B14] transition-colors text-left"
                >
                  Visual Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('reservation')}
                  className="hover:text-[#251B14] transition-colors text-left"
                >
                  Reserve Table
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-[#251B14] transition-colors text-left"
                >
                  Contact & Concierge
                </button>
              </li>
            </ul>
          </div>

          {/* Dining Policies & Hours */}
          <div className="lg:col-span-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#251B14] font-semibold mb-4">
              Service & Etiquette
            </h4>
            <div className="space-y-2.5 text-xs text-[#6B5C50]">
              <p>
                <strong className="text-[#251B14] font-medium">Dress Code:</strong> Smart Elegant. Tailored attire is requested.
              </p>
              <p>
                <strong className="text-[#251B14] font-medium">Children:</strong> Welcomed above 8 years of age.
              </p>
              <p>
                <strong className="text-[#251B14] font-medium">Corkage:</strong> One personal vintage allowed per table ($95).
              </p>
              <p>
                <strong className="text-[#251B14] font-medium">Cellar Inquiries:</strong> sommelier@aura-dining.com
              </p>
            </div>
          </div>

          {/* Private Newsletter */}
          <div className="lg:col-span-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#251B14] font-semibold mb-4">
              Seasonal Dispatch
            </h4>
            <p className="text-xs text-[#6B5C50] leading-relaxed mb-4 font-light">
              Receive private notifications when rare cellar allocations and seasonal tasting menus open for booking.
            </p>

            {subscribed ? (
              <div className="text-xs text-[#246132] bg-[#E5F0E5] p-3 rounded-xl flex items-center gap-2">
                <Check size={14} /> You have been invited to the private circle.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  required
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#FAF6F0] border border-[#D9CCBA] text-xs text-[#251B14] rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#8C735F]"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-[#251B14] text-[#FAF6F0] text-xs uppercase tracking-wider font-semibold hover:bg-[#3E2F23] transition-colors"
                >
                  Join Tasting Circle
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar matching reference */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7A6A5E]">
          <div>
            © {new Date().getFullYear()} AURA Restaurant & Culinary Lounge. All rights reserved.
          </div>

          {/* Social Icons & Back to Top */}
          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="w-8 h-8 rounded-full border border-[#D9CCBA] flex items-center justify-center hover:bg-[#251B14] hover:text-[#FAF6F0] transition-colors"
            >
              <Instagram size={14} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="w-8 h-8 rounded-full border border-[#D9CCBA] flex items-center justify-center hover:bg-[#251B14] hover:text-[#FAF6F0] transition-colors"
            >
              <Facebook size={14} />
            </a>
            <a
              href="https://guide.michelin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Michelin Guide"
              className="w-8 h-8 rounded-full border border-[#D9CCBA] flex items-center justify-center hover:bg-[#251B14] hover:text-[#FAF6F0] transition-colors font-serif font-bold text-xs"
            >
              M
            </a>
            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="w-8 h-8 rounded-full bg-[#FAF6F0] border border-[#D9CCBA] flex items-center justify-center hover:bg-[#251B14] hover:text-[#FAF6F0] transition-colors ml-2"
            >
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
