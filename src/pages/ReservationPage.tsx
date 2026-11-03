import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { ReservationSection } from '../components/ReservationSection';

interface ReservationPageProps {
  onBackToHome: () => void;
  onOpenAccount: () => void;
}

export const ReservationPage: React.FC<ReservationPageProps> = ({
  onBackToHome,
  onOpenAccount,
}) => {
  return (
    <div className="pt-28 pb-24 px-4 sm:px-6 md:px-10 max-w-7xl mx-auto min-h-screen">
      {/* Breadcrumb & Back button */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#E8DECE]">
        <button
          onClick={onBackToHome}
          className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#8C735F] hover:text-[#251B14] transition-colors group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          <span>Return to Sanctuary Home</span>
        </button>

        <span className="text-[11px] uppercase tracking-[0.25em] text-[#8C735F] font-semibold hidden sm:inline-block">
          Bookings & Tasting Allocations
        </span>
      </div>

      {/* Embedded Complete Reservation Engine */}
      <ReservationSection onOpenAccount={onOpenAccount} />

      {/* Reservation Guidelines / FAQ */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-6 rounded-3xl bg-[#FAF6F0] border border-[#E8DEC0]">
          <h4 className="font-serif text-lg text-[#251B14] font-semibold mb-2">Advance Bookings</h4>
          <p className="text-xs text-[#6B5A4E] leading-relaxed font-light">
            Reservations are released 30 days in advance at midnight CET. For Chef's Counter reservations of 6 or more, advance concierge confirmation is required.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-[#FAF6F0] border border-[#E8DEC0]">
          <h4 className="font-serif text-lg text-[#251B14] font-semibold mb-2">Dietary Accommodations</h4>
          <p className="text-xs text-[#6B5A4E] leading-relaxed font-light">
            We happily accommodate pescatarian, vegetarian, celiac, and nut allergy requirements with 24 hours notice prior to your scheduled service.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-[#FAF6F0] border border-[#E8DEC0]">
          <h4 className="font-serif text-lg text-[#251B14] font-semibold mb-2">Dress Code & Etiquette</h4>
          <p className="text-xs text-[#6B5A4E] leading-relaxed font-light">
            Smart elegant attire is requested. We respectfully request gentlemen wear collared shirts and tailored trousers. Athletic wear is not permitted.
          </p>
        </div>
      </div>
    </div>
  );
};
