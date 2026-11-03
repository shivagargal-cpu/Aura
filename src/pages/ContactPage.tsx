import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { ContactLocation } from '../components/ContactLocation';

interface ContactPageProps {
  onBackToHome: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onBackToHome }) => {
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
          Concierge, Location & Inquiries
        </span>
      </div>

      {/* Embedded Complete Contact & Location Module */}
      <ContactLocation />
    </div>
  );
};
