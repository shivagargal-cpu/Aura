import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, Users, CheckCircle2 } from 'lucide-react';
import { MenuItem } from '../types';
import { useAuth } from '../context/AuthContext';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDish?: MenuItem | null;
  onOpenAccount?: () => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  onClose,
  selectedDish,
  onOpenAccount,
}) => {
  const { user, profile, createReservation } = useAuth();

  const [date, setDate] = useState(
    new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0]
  );
  const [time, setTime] = useState('7:30 PM');
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState(
    selectedDish ? `Special interest in: ${selectedDish.name}` : ''
  );
  const [submitted, setSubmitted] = useState(false);
  const [bookingCode, setBookingCode] = useState('');

  useEffect(() => {
    if (user) {
      setName(profile?.full_name || user.user_metadata?.full_name || '');
      setEmail(user.email || '');
      setPhone(profile?.phone || '');
    }
  }, [user, profile]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    const res = await createReservation({
      date,
      time,
      guests,
      seatingArea: "Chef Julian's Atelier & Main Salon",
      name,
      email,
      phone,
      specialRequests: notes,
    });

    setBookingCode(res.bookingRef || `AURA-${Math.floor(100000 + Math.random() * 900000)}`);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
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

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative z-10 w-full max-w-lg bg-[#FAF6F0] rounded-3xl overflow-hidden border border-[#E3D4C0] shadow-2xl text-[#251B14] p-6 sm:p-8 my-8"
        >
          <button
            onClick={onClose}
            aria-label="Close booking modal"
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#EFE4D6] hover:bg-[#E2D5C3] text-[#251B14] flex items-center justify-center transition-colors"
          >
            <X size={18} />
          </button>

          {!submitted ? (
            <div>
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#8C735F] font-semibold block mb-1">
                Concierge Booking
              </span>
              <h3 className="font-serif text-3xl text-[#251B14] font-normal mb-2">
                Book A Table
              </h3>
              <p className="text-xs text-[#6B5A4E] mb-6">
                Direct booking for the main dining room and chef's atelier.
              </p>

              {selectedDish && (
                <div className="mb-4 p-3 rounded-xl bg-[#EFE4D6]/70 border border-[#DFCFC0] text-xs flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0">
                    <img
                      src={selectedDish.image}
                      alt={selectedDish.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <span className="font-semibold block">{selectedDish.name}</span>
                    <span className="text-[#8C735F] text-[11px]">{selectedDish.price} · Tasting Request</span>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#6E5D50] mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      required
                      value={date}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-white border border-[#DDD0BF] rounded-xl px-3 py-2 text-xs text-[#251B14] focus:outline-none focus:border-[#8C735F]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#6E5D50] mb-1">
                      Time
                    </label>
                    <select
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full bg-white border border-[#DDD0BF] rounded-xl px-3 py-2 text-xs text-[#251B14] focus:outline-none focus:border-[#8C735F]"
                    >
                      <option value="12:30 PM">12:30 PM (Lunch)</option>
                      <option value="1:15 PM">1:15 PM (Lunch)</option>
                      <option value="6:00 PM">6:00 PM (Dinner)</option>
                      <option value="6:45 PM">6:45 PM (Dinner)</option>
                      <option value="7:30 PM">7:30 PM (Dinner)</option>
                      <option value="8:15 PM">8:15 PM (Dinner)</option>
                      <option value="9:00 PM">9:00 PM (Dinner)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#6E5D50] mb-1">
                    Number of Guests
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5, 6, 8].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setGuests(num)}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-semibold tabular-nums border transition-colors ${
                          guests === num
                            ? 'bg-[#251B14] text-white border-[#251B14]'
                            : 'bg-white text-[#6E5D50] border-[#DDD0BF] hover:border-[#8C735F]'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white border border-[#DDD0BF] rounded-xl px-3 py-2 text-xs text-[#251B14] focus:outline-none focus:border-[#8C735F]"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white border border-[#DDD0BF] rounded-xl px-3 py-2 text-xs text-[#251B14] focus:outline-none focus:border-[#8C735F]"
                  />
                  <input
                    type="tel"
                    placeholder="Phone (optional)"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-white border border-[#DDD0BF] rounded-xl px-3 py-2 text-xs text-[#251B14] focus:outline-none focus:border-[#8C735F]"
                  />
                  <input
                    type="text"
                    placeholder="Dietary requirements or special occasion"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-white border border-[#DDD0BF] rounded-xl px-3 py-2 text-xs text-[#251B14] focus:outline-none focus:border-[#8C735F]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-4 py-3 rounded-full bg-[#251B14] text-[#FAF6F0] text-xs uppercase tracking-[0.18em] font-semibold hover:bg-[#433429] transition-colors shadow-lg"
                >
                  Confirm Table Request
                </button>
              </form>
            </div>
          ) : (
            <div className="text-center py-4">
              <div className="w-14 h-14 rounded-full bg-[#EFE4D6] text-[#8C735F] mx-auto flex items-center justify-center mb-4">
                <CheckCircle2 size={28} />
              </div>
              <h4 className="font-serif text-2xl text-[#251B14] mb-2">
                Table Reserved
              </h4>
              <p className="text-xs text-[#6B5A4E] mb-4">
                We have confirmed your reservation for <span className="font-semibold">{guests} guests</span> on <span className="font-semibold">{date} at {time}</span>.
              </p>
              <div className="p-3 bg-[#EFE4D6] rounded-xl text-xs font-mono font-bold tracking-wider mb-6">
                CODE: {bookingCode}
              </div>
              <button
                onClick={handleReset}
                className="px-6 py-2 rounded-full bg-[#251B14] text-white text-xs uppercase tracking-wider font-semibold"
              >
                Close
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
