import React, { useState } from 'react';
import { motion } from 'motion/react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { MapPin, Phone, Clock, Send, Check, ExternalLink } from 'lucide-react';

export const ContactLocation: React.FC = () => {
  const [inquirySent, setInquirySent] = useState(false);
  const [inquiryText, setInquiryText] = useState({ name: '', email: '', message: '' });

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryText.name || !inquiryText.email) return;
    setInquirySent(true);
  };

  return (
    <section id="contact" className="relative py-20 md:py-28 px-4 sm:px-6 md:px-10 max-w-7xl mx-auto">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-10 w-80 h-80 bg-[#ECDCCB]/25 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7 }}
        className="mb-14 text-center md:text-left"
      >
        <span className="text-xs uppercase tracking-[0.25em] text-[#8C735F] font-semibold block mb-2">
          Concierge & Location
        </span>
        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#251B14] font-normal tracking-tight">
          Find & Connect
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Contact details & Opening Hours */}
        <div className="lg:col-span-6 space-y-8">
          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -4 }}
              className="p-6 rounded-2xl bg-[#FAF6F0] border border-[#E8DEC0] shadow-xs"
            >
              <div className="w-9 h-9 rounded-full bg-[#EFE4D6] text-[#8C735F] flex items-center justify-center mb-4">
                <MapPin size={18} />
              </div>
              <h3 className="font-serif text-lg text-[#251B14] font-semibold mb-1">
                Sanctuary Address
              </h3>
              <p className="text-xs text-[#6C5D51] leading-relaxed">
                {RESTAURANT_INFO.address}<br />
                {RESTAURANT_INFO.city}
              </p>
              <div className="mt-3 text-[11px] text-[#8C735F] font-semibold uppercase tracking-wider">
                Valet Parking Available
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -4 }}
              className="p-6 rounded-2xl bg-[#FAF6F0] border border-[#E8DEC0] shadow-xs"
            >
              <div className="w-9 h-9 rounded-full bg-[#EFE4D6] text-[#8C735F] flex items-center justify-center mb-4">
                <Phone size={18} />
              </div>
              <h3 className="font-serif text-lg text-[#251B14] font-semibold mb-1">
                Concierge Line
              </h3>
              <p className="text-xs text-[#6C5D51] leading-relaxed">
                {RESTAURANT_INFO.phone}<br />
                {RESTAURANT_INFO.email}
              </p>
              <div className="mt-3 text-[11px] text-[#8C735F] font-semibold uppercase tracking-wider">
                Daily 10:00 AM – 11:00 PM
              </div>
            </motion.div>
          </div>

          {/* Opening Hours Schedule */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="p-8 rounded-3xl bg-[#FAF6F0] border border-[#E8DEC0] shadow-xs"
          >
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#E9DFD0]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#EFE4D6] text-[#8C735F] flex items-center justify-center">
                  <Clock size={16} />
                </div>
                <h3 className="font-serif text-xl text-[#251B14] font-semibold">
                  Service Hours
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#E7F3E8] text-[#246132] text-[11px] font-semibold tracking-wider uppercase border border-[#CFE8D0]">
                Open Tonight
              </span>
            </div>

            <div className="space-y-4">
              {RESTAURANT_INFO.hours.map((h, i) => (
                <div
                  key={i}
                  className="flex flex-col sm:flex-row sm:justify-between text-xs pb-3 border-b border-[#EFE7DC] last:border-b-0"
                >
                  <span className="font-semibold text-[#251B14] mb-1 sm:mb-0">
                    {h.days}
                  </span>
                  <div className="text-[#6C5D51] flex gap-4">
                    <span>Lunch: {h.lunch}</span>
                    <span className="text-[#B3A18E]">|</span>
                    <span>Dinner: {h.dinner}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Private Inquiries Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-8 rounded-3xl bg-[#FAF6F0] border border-[#E8DEC0] shadow-xs"
          >
            <h3 className="font-serif text-xl text-[#251B14] font-semibold mb-1">
              Private Dining & Special Inquiries
            </h3>
            <p className="text-xs text-[#6C5D51] mb-5 font-light">
              For buyout ceremonies, wine tastings, or dietary inquiries, our Head Concierge replies within 4 hours.
            </p>

            {inquirySent ? (
              <div className="p-4 rounded-xl bg-[#EFE8DC] text-[#251B14] text-xs flex items-center gap-2">
                <Check className="text-[#246132]" size={16} />
                <span>Thank you. Your inquiry has been forwarded to Head Concierge Édouard.</span>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={inquiryText.name}
                    onChange={(e) => setInquiryText({ ...inquiryText, name: e.target.value })}
                    className="w-full bg-white border border-[#E3D7C5] rounded-xl px-3.5 py-2.5 text-xs text-[#251B14] focus:outline-none focus:border-[#8C735F]"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Email Address"
                    value={inquiryText.email}
                    onChange={(e) => setInquiryText({ ...inquiryText, email: e.target.value })}
                    className="w-full bg-white border border-[#E3D7C5] rounded-xl px-3.5 py-2.5 text-xs text-[#251B14] focus:outline-none focus:border-[#8C735F]"
                  />
                </div>
                <textarea
                  rows={2}
                  placeholder="Tell us about your event, date, or party size..."
                  value={inquiryText.message}
                  onChange={(e) => setInquiryText({ ...inquiryText, message: e.target.value })}
                  className="w-full bg-white border border-[#E3D7C5] rounded-xl px-3.5 py-2.5 text-xs text-[#251B14] focus:outline-none focus:border-[#8C735F]"
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="animate-shimmer px-6 py-2.5 rounded-full bg-[#251B14] text-[#FAF6F0] text-xs uppercase tracking-wider font-semibold hover:bg-[#3E2F23] transition-colors flex items-center gap-2"
                >
                  <Send size={12} /> Send Inquiry
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>

        {/* Right Column: Stylized Vector Map Widget with interactive details */}
        <div className="lg:col-span-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rounded-[2.5rem] overflow-hidden bg-[#FAF6F0] border border-[#E8DEC0] shadow-[0_15px_35px_rgba(40,28,18,0.08)] p-6"
          >
            <div className="flex items-center justify-between mb-4 px-2">
              <div>
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#8C735F] font-semibold">
                  Location Matrix
                </span>
                <h3 className="font-serif text-xl text-[#251B14] font-medium">
                  Mayfair / Avenue Montaigne Enclave
                </h3>
              </div>
              <span className="text-xs text-[#6C5D51]">GPS 48.8661° N, 2.3082° E</span>
            </div>

            {/* Styled Map Canvas View with animated pin */}
            <div className="relative w-full h-[400px] sm:h-[480px] rounded-2xl overflow-hidden border border-[#E3D7C5] bg-[#EFE7DC]">
              {/* Stylized vector map grid background */}
              <div className="absolute inset-0 opacity-80 bg-[radial-gradient(#D5C5B2_1px,transparent_1px)] [background-size:18px_18px]" />

              {/* Vector street lines representation */}
              <svg className="absolute inset-0 w-full h-full text-[#DFD1BF]" stroke="currentColor" fill="none">
                <path d="M-50,150 L550,120" strokeWidth="18" stroke="#E6D9C8" />
                <path d="M220,-20 L260,520" strokeWidth="22" stroke="#E6D9C8" />
                <path d="M100,280 L480,380" strokeWidth="14" stroke="#E6D9C8" />
                <path d="M40,40 L380,480" strokeWidth="10" stroke="#E1D2BF" />
                <path d="M-20,380 L520,240" strokeWidth="12" stroke="#E1D2BF" />
                {/* River curve */}
                <path d="M-10,420 Q 200,320 520,460" strokeWidth="36" stroke="#D3C3B0" strokeLinecap="round" />
              </svg>

              {/* Surrounding Landmark Labels */}
              <div className="absolute top-16 left-10 text-[10px] uppercase tracking-wider text-[#8A796A] font-semibold bg-[#FAF6F0]/80 px-2 py-0.5 rounded shadow-xs">
                Palais Galliera
              </div>
              <div className="absolute bottom-20 left-14 text-[10px] uppercase tracking-wider text-[#8A796A] font-semibold bg-[#FAF6F0]/80 px-2 py-0.5 rounded shadow-xs">
                Seine Promenade
              </div>
              <div className="absolute top-28 right-12 text-[10px] uppercase tracking-wider text-[#8A796A] font-semibold bg-[#FAF6F0]/80 px-2 py-0.5 rounded shadow-xs">
                Grand Palais
              </div>

              {/* Central Glowing Restaurant Marker */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="relative">
                  {/* Pulse ring */}
                  <div className="w-16 h-16 rounded-full bg-[#8C735F]/25 animate-ping absolute -inset-2 pointer-events-none" />
                  {/* Pin button */}
                  <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                    className="relative z-10 w-12 h-12 rounded-full bg-[#251B14] text-[#FAF6F0] flex items-center justify-center shadow-xl border-2 border-white"
                  >
                    <span className="font-serif text-sm font-bold">A</span>
                  </motion.div>
                </div>

                {/* Popover Callout */}
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 bg-[#251B14] text-[#FAF6F0] px-4 py-2 rounded-xl text-center shadow-xl border border-[#48372A]"
                >
                  <span className="font-serif text-sm font-semibold block">AURA Restaurant</span>
                  <span className="text-[10px] text-[#D8C7B5] block">48 Avenue Montaigne</span>
                </motion.div>
              </div>

              {/* Map Controls */}
              <div className="absolute bottom-4 right-4 flex flex-col gap-1.5 z-10">
                <button
                  type="button"
                  className="w-8 h-8 rounded-lg bg-white/90 backdrop-blur-xs text-[#251B14] text-sm font-bold shadow-md hover:bg-white flex items-center justify-center border border-[#DFD3C2] active:scale-95 transition-transform"
                >
                  +
                </button>
                <button
                  type="button"
                  className="w-8 h-8 rounded-lg bg-white/90 backdrop-blur-xs text-[#251B14] text-sm font-bold shadow-md hover:bg-white flex items-center justify-center border border-[#DFD3C2] active:scale-95 transition-transform"
                >
                  -
                </button>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-[#6C5D51] px-2">
              <span>Subway: Alma-Marceau (Line 9) or Franklin D. Roosevelt</span>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="text-[#8C735F] hover:text-[#251B14] font-semibold flex items-center gap-1 group"
              >
                <span>Open Google Maps</span>
                <ExternalLink size={12} className="group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
