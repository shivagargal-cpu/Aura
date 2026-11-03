import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, User, Calendar as CalendarIcon } from 'lucide-react';
import { ReservationData } from '../types';
import { useAuth } from '../context/AuthContext';

const TIME_SLOTS = [
  '12:30 PM',
  '1:15 PM',
  '6:00 PM',
  '6:45 PM',
  '7:30 PM',
  '8:15 PM',
  '9:00 PM',
];

const SEATING_OPTIONS = [
  { id: 'main', name: 'Main Dining Salon', desc: 'Sculptural lighting & acoustic privacy' },
  { id: 'chef', name: "Chef Julian's Counter", desc: 'Interactive view of culinary atelier' },
  { id: 'cellar', name: 'Vintage Wine Vault', desc: 'Private subterranean historic cellar' },
  { id: 'terrace', name: 'Veranda Atrium', desc: 'Starlit greenhouse garden atmosphere' },
];

interface ReservationSectionProps {
  onOpenAccount?: () => void;
}

export const ReservationSection: React.FC<ReservationSectionProps> = ({ onOpenAccount }) => {
  const { user, profile, createReservation } = useAuth();

  const [formData, setFormData] = useState<ReservationData>({
    date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    time: '7:30 PM',
    guests: 2,
    seatingArea: 'Main Dining Salon',
    name: '',
    email: '',
    phone: '',
    specialRequests: '',
    dietaryRestrictions: '',
  });

  // Pre-fill user profile info when available
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: prev.name || profile?.full_name || user.user_metadata?.full_name || '',
        email: prev.email || user.email || '',
        phone: prev.phone || profile?.phone || '',
        dietaryRestrictions: prev.dietaryRestrictions || profile?.dietary_preferences || '',
      }));
    }
  }, [user, profile]);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    // Use AuthContext createReservation to associate with Supabase user
    const res = await createReservation(formData);
    setBookingRef(res.bookingRef || `AURA-${Math.floor(100000 + Math.random() * 900000)}`);
    setIsSubmitted(true);
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setFormData({
      date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
      time: '7:30 PM',
      guests: 2,
      seatingArea: 'Main Dining Salon',
      name: profile?.full_name || user?.email || '',
      email: user?.email || '',
      phone: profile?.phone || '',
      specialRequests: '',
      dietaryRestrictions: profile?.dietary_preferences || '',
    });
  };

  return (
    <section id="reservation" className="relative py-20 md:py-28 px-4 sm:px-6 md:px-10 max-w-7xl mx-auto">
      {/* Background container with moving light & gradient */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative rounded-[2.5rem] md:rounded-[3rem] overflow-hidden bg-gradient-to-br from-[#271E18] via-[#2E231C] to-[#1E1611] p-8 sm:p-12 md:p-16 border border-[#524134] shadow-[0_25px_60px_rgba(20,14,10,0.35)] text-[#FAF6F0]"
      >
        {/* Subtle moving ambient light glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#8C735F]/20 rounded-full blur-3xl pointer-events-none animate-ambient-glow" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#C49B71]/15 rounded-full blur-3xl pointer-events-none animate-ambient-glow" />

        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-[0.25em] text-[#D8C7B5] font-semibold block mb-3">
              Table Bookings & Tasting Allocations
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#FAF6F0] font-normal tracking-tight">
              Reserve Your Table
            </h2>
            <p className="text-sm text-[#D8C7B5]/80 max-w-md mx-auto mt-3 font-light">
              We release reservations 30 days in advance. Please let us know in advance of any allergies or anniversary celebrations.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                onSubmit={handleSubmit}
                className="space-y-8"
              >
                {/* Step 1: Party Size & Seating */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Date Picker */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#D8C7B5] font-semibold mb-2">
                      Reservation Date
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) =>
                        setFormData({ ...formData, date: e.target.value })
                      }
                      className="w-full bg-[#3B2C21] border border-[#5E4B3D] text-[#FAF6F0] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C49B71] transition-colors"
                    />
                  </div>

                  {/* Guests Stepper */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#D8C7B5] font-semibold mb-2">
                      Party Size
                    </label>
                    <div className="flex items-center bg-[#3B2C21] border border-[#5E4B3D] rounded-xl px-4 py-2 justify-between">
                      <span className="text-sm font-serif font-bold tabular-nums">
                        {formData.guests} {formData.guests === 1 ? 'Guest' : 'Guests'}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() =>
                            setFormData({
                              ...formData,
                              guests: Math.max(1, formData.guests - 1),
                            })
                          }
                          className="w-8 h-8 rounded-lg bg-[#271E18] text-[#D8C7B5] hover:text-white flex items-center justify-center font-bold active:scale-90 transition-transform"
                        >
                          -
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setFormData({
                              ...formData,
                              guests: Math.min(12, formData.guests + 1),
                            })
                          }
                          className="w-8 h-8 rounded-lg bg-[#271E18] text-[#D8C7B5] hover:text-white flex items-center justify-center font-bold active:scale-90 transition-transform"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Seating Salon */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#D8C7B5] font-semibold mb-2">
                      Atmosphere / Salon
                    </label>
                    <select
                      value={formData.seatingArea}
                      onChange={(e) =>
                        setFormData({ ...formData, seatingArea: e.target.value })
                      }
                      className="w-full bg-[#3B2C21] border border-[#5E4B3D] text-[#FAF6F0] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C49B71]"
                    >
                      {SEATING_OPTIONS.map((opt) => (
                        <option key={opt.id} value={opt.name}>
                          {opt.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Step 2: Time Slot Buttons */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#D8C7B5] font-semibold mb-3">
                    Preferred Service Time
                  </label>
                  <div className="flex flex-wrap gap-2.5">
                    {TIME_SLOTS.map((slot) => (
                      <motion.button
                        key={slot}
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        type="button"
                        onClick={() => setFormData({ ...formData, time: slot })}
                        className={`px-4 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-all duration-300 ${
                          formData.time === slot
                            ? 'bg-[#FAF6F0] text-[#251B14] shadow-md scale-105'
                            : 'bg-[#3B2C21] text-[#D8C7B5] hover:text-white hover:bg-[#48372A] border border-[#5E4B3D]'
                        }`}
                      >
                        {slot}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Step 3: Guest Contact */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-[#4A3B30]">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#D8C7B5] font-semibold mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Eleanor de Montferrat"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full bg-[#3B2C21] border border-[#5E4B3D] text-[#FAF6F0] placeholder-[#8F7C6E] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C49B71]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#D8C7B5] font-semibold mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. eleanor@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full bg-[#3B2C21] border border-[#5E4B3D] text-[#FAF6F0] placeholder-[#8F7C6E] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C49B71]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#D8C7B5] font-semibold mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full bg-[#3B2C21] border border-[#5E4B3D] text-[#FAF6F0] placeholder-[#8F7C6E] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C49B71]"
                    />
                  </div>
                </div>

                {/* Dietary requirements & special requests */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#D8C7B5] font-semibold mb-2">
                    Dietary Allergies or Milestone Requests (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Pescatarian, celebration of 10th anniversary, gluten allergy"
                    value={formData.specialRequests}
                    onChange={(e) =>
                      setFormData({ ...formData, specialRequests: e.target.value })
                    }
                    className="w-full bg-[#3B2C21] border border-[#5E4B3D] text-[#FAF6F0] placeholder-[#8F7C6E] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C49B71]"
                  />
                </div>

                {/* Submit CTA */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#4A3B30]">
                  <p className="text-xs text-[#BFAEA0] font-light">
                    * Cancellation without fee is available up to 24 hours prior to service.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    className="animate-shimmer w-full sm:w-auto px-10 py-4 rounded-full bg-[#FAF6F0] text-[#251B14] font-semibold uppercase tracking-[0.2em] text-xs hover:bg-[#EBE2D3] hover:shadow-2xl transition-all duration-300"
                  >
                    Confirm Reservation
                  </motion.button>
                </div>
              </motion.form>
            ) : (
              /* Confirmed Booking Voucher */
              <motion.div
                key="voucher"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#FAF6F0] text-[#251B14] rounded-3xl p-8 sm:p-12 border border-[#DECDBB] shadow-2xl max-w-xl mx-auto text-center"
              >
                <div className="w-16 h-16 rounded-full bg-[#EFE4D6] text-[#8C735F] mx-auto flex items-center justify-center mb-6">
                  <CheckCircle2 size={32} />
                </div>

                <span className="text-xs uppercase tracking-[0.25em] text-[#8C735F] font-semibold block mb-2">
                  Reservation Confirmed
                </span>

                <h3 className="font-serif text-3xl sm:text-4xl font-normal text-[#251B14] mb-3">
                  We look forward to hosting you, {formData.name}
                </h3>

                <p className="text-xs text-[#6B5A4E] mb-6">
                  A confirmation summary and calendar invitation have been sent to{' '}
                  <span className="font-semibold text-[#251B14]">{formData.email}</span>.
                </p>

                {/* Booking summary ticket */}
                <div className="bg-[#F3EADB] rounded-2xl p-6 border border-[#E3D4C0] text-left space-y-3 mb-8">
                  <div className="flex justify-between text-xs pb-2 border-b border-[#E3D4C0]">
                    <span className="text-[#7A695B] uppercase tracking-wider">Booking Reference</span>
                    <span className="font-mono font-bold tracking-wider">{bookingRef}</span>
                  </div>
                  <div className="flex justify-between text-xs pb-2 border-b border-[#E3D4C0]">
                    <span className="text-[#7A695B] uppercase tracking-wider">Date & Time</span>
                    <span className="font-semibold">{formData.date} at {formData.time}</span>
                  </div>
                  <div className="flex justify-between text-xs pb-2 border-b border-[#E3D4C0]">
                    <span className="text-[#7A695B] uppercase tracking-wider">Party Size</span>
                    <span className="font-semibold">{formData.guests} Guests</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-[#7A695B] uppercase tracking-wider">Salon</span>
                    <span className="font-semibold">{formData.seatingArea}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  {onOpenAccount && user && (
                    <button
                      onClick={onOpenAccount}
                      className="px-6 py-2.5 rounded-full bg-[#8C735F] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#735A47] transition-colors"
                    >
                      View in My Reservations
                    </button>
                  )}
                  <button
                    onClick={resetForm}
                    className="px-6 py-2.5 rounded-full border border-[#8C735F] text-xs uppercase tracking-wider text-[#251B14] hover:bg-[#8C735F] hover:text-white transition-colors"
                  >
                    Make Another Booking
                  </button>
                  <a
                    href="#menu"
                    className="px-6 py-2.5 rounded-full bg-[#251B14] text-[#FAF6F0] text-xs uppercase tracking-wider hover:bg-[#3B2C21] transition-colors"
                  >
                    Review Menu Pairings
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
};
