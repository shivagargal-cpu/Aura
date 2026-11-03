import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import {
  X,
  User,
  Calendar,
  LogOut,
  Shield,
  UtensilsCrossed,
  Clock,
  MapPin,
  Check,
  AlertCircle,
  KeyRound,
  ExternalLink,
} from 'lucide-react';

interface MyAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookNewTable?: () => void;
}

export const MyAccountModal: React.FC<MyAccountModalProps> = ({
  isOpen,
  onClose,
  onBookNewTable,
}) => {
  const { user, profile, reservations, signOut, updateProfileData, updatePassword } = useAuth();
  const [activeTab, setActiveTab] = useState<'reservations' | 'profile' | 'security'>('reservations');

  // Edit profile state
  const [fullName, setFullName] = useState(profile?.full_name || '');
  const [phone, setPhone] = useState(profile?.phone || '');
  const [dietary, setDietary] = useState(profile?.dietary_preferences || '');
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);

  // Security state
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [securityMessage, setSecurityMessage] = useState<string | null>(null);

  if (!isOpen || !user) return null;

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdatingProfile(true);
    await updateProfileData({
      full_name: fullName.trim(),
      phone: phone.trim(),
      dietary_preferences: dietary.trim(),
    });
    setIsUpdatingProfile(false);
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      setSecurityMessage('Password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setSecurityMessage('Passwords do not match.');
      return;
    }

    const res = await updatePassword(newPassword);
    if (!res.error) {
      setNewPassword('');
      setConfirmPassword('');
      setSecurityMessage('Password changed successfully.');
    } else {
      setSecurityMessage(res.error);
    }
  };

  const handleLogout = async () => {
    await signOut();
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

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative z-10 w-full max-w-3xl bg-[#FAF6F0] rounded-3xl overflow-hidden border border-[#E3D4C0] shadow-2xl text-[#251B14] my-8 flex flex-col md:flex-row min-h-[520px]"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close account modal"
            className="absolute top-5 right-5 z-20 w-9 h-9 rounded-full bg-[#EFE4D6] hover:bg-[#E2D5C3] text-[#251B14] flex items-center justify-center transition-colors"
          >
            <X size={18} />
          </button>

          {/* Left Sidebar Profile Badge & Tabs */}
          <div className="w-full md:w-64 bg-[#F2E8DC] p-6 border-b md:border-b-0 md:border-r border-[#E0D2C0] flex flex-col justify-between">
            <div>
              {/* User Avatar & Name */}
              <div className="flex items-center gap-3.5 mb-6">
                <div className="w-12 h-12 rounded-full bg-[#251B14] text-[#FAF6F0] flex items-center justify-center font-serif text-lg font-bold shadow-sm shrink-0">
                  {profile?.avatar_url ? (
                    <img
                      src={profile.avatar_url}
                      alt={profile.full_name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    profile?.full_name?.charAt(0).toUpperCase() || 'P'
                  )}
                </div>
                <div className="min-w-0">
                  <h4 className="font-serif text-lg font-bold text-[#251B14] truncate">
                    {profile?.full_name || 'Valued Guest'}
                  </h4>
                  <span className="text-[10px] uppercase tracking-wider text-[#8C735F] font-semibold block">
                    Patron Circle Member
                  </span>
                </div>
              </div>

              {/* Navigation Tabs */}
              <nav className="space-y-1.5">
                <button
                  onClick={() => setActiveTab('reservations')}
                  className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all ${
                    activeTab === 'reservations'
                      ? 'bg-[#251B14] text-[#FAF6F0] shadow-sm'
                      : 'text-[#615144] hover:bg-[#E7DACB]'
                  }`}
                >
                  <Calendar size={15} />
                  <span>My Reservations</span>
                </button>

                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all ${
                    activeTab === 'profile'
                      ? 'bg-[#251B14] text-[#FAF6F0] shadow-sm'
                      : 'text-[#615144] hover:bg-[#E7DACB]'
                  }`}
                >
                  <User size={15} />
                  <span>Profile & Notes</span>
                </button>

                <button
                  onClick={() => setActiveTab('security')}
                  className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all ${
                    activeTab === 'security'
                      ? 'bg-[#251B14] text-[#FAF6F0] shadow-sm'
                      : 'text-[#615144] hover:bg-[#E7DACB]'
                  }`}
                >
                  <Shield size={15} />
                  <span>Security</span>
                </button>
              </nav>
            </div>

            {/* Logout button at bottom */}
            <div className="pt-6 border-t border-[#DFD1BF] mt-6 md:mt-0">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-[#8A3A3A] hover:bg-[#FBEAEA] rounded-lg transition-colors font-medium"
              >
                <LogOut size={14} />
                <span>Sign Out</span>
              </button>
            </div>
          </div>

          {/* Right Main Content Pane */}
          <div className="flex-1 p-6 sm:p-8 overflow-y-auto">
            {/* Tab 1: Reservations */}
            {activeTab === 'reservations' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-serif text-2xl text-[#251B14]">
                      Dining Reservations
                    </h3>
                    <p className="text-xs text-[#736355]">
                      Review confirmed table bookings and upcoming services.
                    </p>
                  </div>
                  {onBookNewTable && (
                    <button
                      onClick={() => {
                        onClose();
                        onBookNewTable();
                      }}
                      className="px-4 py-2 rounded-full bg-[#251B14] text-[#FAF6F0] text-xs uppercase tracking-wider font-semibold hover:bg-[#433429] transition-colors"
                    >
                      Book Table
                    </button>
                  )}
                </div>

                {reservations.length === 0 ? (
                  <div className="text-center py-12 px-4 rounded-2xl bg-[#F6EEE4] border border-[#E8DEC0]">
                    <UtensilsCrossed className="w-10 h-10 text-[#C4B5A5] mx-auto mb-3" />
                    <h4 className="font-serif text-lg text-[#251B14] mb-1">
                      No Active Reservations
                    </h4>
                    <p className="text-xs text-[#7A695B] max-w-sm mx-auto mb-5">
                      You do not have any confirmed dining allocations yet. Reserve a table for our seasonal tasting journey.
                    </p>
                    {onBookNewTable && (
                      <button
                        onClick={() => {
                          onClose();
                          onBookNewTable();
                        }}
                        className="px-6 py-2.5 rounded-full bg-[#251B14] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#3D2E24] transition-colors"
                      >
                        Reserve Table Now
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {reservations.map((res) => (
                      <div
                        key={res.id}
                        className="p-5 rounded-2xl bg-white border border-[#E5DACB] shadow-xs hover:border-[#8C735F] transition-all"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-2.5 border-b border-[#F0E7DC]">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-[#8C735F] tracking-wider">
                              {res.booking_ref}
                            </span>
                            <span className="px-2.5 py-0.5 rounded-full bg-[#E8F3E9] text-[#246132] text-[10px] font-semibold uppercase tracking-wider">
                              {res.status}
                            </span>
                          </div>
                          <span className="text-xs text-[#8A796A]">
                            Party of {res.guests} {res.guests === 1 ? 'Guest' : 'Guests'}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#4F4137] mb-3">
                          <div className="flex items-center gap-2">
                            <Calendar size={14} className="text-[#8C735F]" />
                            <span>{res.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock size={14} className="text-[#8C735F]" />
                            <span>{res.time}</span>
                          </div>
                          <div className="flex items-center gap-2 col-span-2">
                            <MapPin size={14} className="text-[#8C735F]" />
                            <span>{res.seatingArea}</span>
                          </div>
                        </div>

                        {res.specialRequests && (
                          <div className="text-[11px] text-[#736355] bg-[#FAF6F0] p-2 rounded-lg italic">
                            Notes: "{res.specialRequests}"
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Tab 2: Profile Settings */}
            {activeTab === 'profile' && (
              <div>
                <h3 className="font-serif text-2xl text-[#251B14] mb-1">
                  Profile & Preferences
                </h3>
                <p className="text-xs text-[#736355] mb-6">
                  Manage your contact details and dining preferences for your upcoming visits.
                </p>

                <form onSubmit={handleProfileSave} className="space-y-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#6E5D50] mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-white border border-[#DDD0BF] rounded-xl px-3.5 py-2.5 text-xs text-[#251B14] focus:outline-none focus:border-[#8C735F]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#6E5D50] mb-1">
                      Email Address (Locked)
                    </label>
                    <input
                      type="email"
                      disabled
                      value={user.email}
                      className="w-full bg-[#EFE7DC] border border-[#DDD0BF] rounded-xl px-3.5 py-2.5 text-xs text-[#6B5A4E] cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#6E5D50] mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-white border border-[#DDD0BF] rounded-xl px-3.5 py-2.5 text-xs text-[#251B14] focus:outline-none focus:border-[#8C735F]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#6E5D50] mb-1">
                      Dietary Preferences & Allergies
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Pescatarian, prefer champagne pairings, shellfish allergy"
                      value={dietary}
                      onChange={(e) => setDietary(e.target.value)}
                      className="w-full bg-white border border-[#DDD0BF] rounded-xl px-3.5 py-2.5 text-xs text-[#251B14] focus:outline-none focus:border-[#8C735F]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isUpdatingProfile}
                    className="px-6 py-2.5 rounded-full bg-[#251B14] text-[#FAF6F0] text-xs uppercase tracking-wider font-semibold hover:bg-[#433429] transition-colors"
                  >
                    {isUpdatingProfile ? 'Saving...' : 'Save Changes'}
                  </button>
                </form>
              </div>
            )}

            {/* Tab 3: Security & Passwords */}
            {activeTab === 'security' && (
              <div>
                <h3 className="font-serif text-2xl text-[#251B14] mb-1">
                  Security & Access
                </h3>
                <p className="text-xs text-[#736355] mb-6">
                  Update your authentication password and account protection.
                </p>

                {securityMessage && (
                  <div className="mb-4 p-3 rounded-xl bg-[#F6EEE4] border border-[#E3D7C5] text-xs text-[#251B14]">
                    {securityMessage}
                  </div>
                )}

                <form onSubmit={handlePasswordUpdate} className="space-y-4 max-w-sm">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#6E5D50] mb-1">
                      New Password
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="Minimum 6 characters"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full bg-white border border-[#DDD0BF] rounded-xl px-3.5 py-2.5 text-xs text-[#251B14] focus:outline-none focus:border-[#8C735F]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#6E5D50] mb-1">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="Re-type new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full bg-white border border-[#DDD0BF] rounded-xl px-3.5 py-2.5 text-xs text-[#251B14] focus:outline-none focus:border-[#8C735F]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-[#251B14] text-[#FAF6F0] text-xs uppercase tracking-wider font-semibold hover:bg-[#433429] transition-colors"
                  >
                    Update Password
                  </button>
                </form>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
