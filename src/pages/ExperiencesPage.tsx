import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { EXPERIENCES } from '../data/restaurantData';
import { Experience } from '../types';
import { ArrowLeft, Clock, Sparkles, Check, Calendar, Wine, Users } from 'lucide-react';

interface ExperiencesPageProps {
  onBackToHome: () => void;
  onOpenBooking: () => void;
  onBookExperience?: (exp: Experience) => void;
}

export const ExperiencesPage: React.FC<ExperiencesPageProps> = ({
  onBackToHome,
  onOpenBooking,
  onBookExperience,
}) => {
  const [activeExp, setActiveExp] = useState<Experience>(EXPERIENCES[0]);

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
          Curated Dining Encounters
        </span>
      </div>

      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="text-xs uppercase tracking-[0.3em] text-[#8C735F] font-semibold block mb-2">
          Distinct Salon Formats
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#251B14] font-normal tracking-tight mb-4">
          Special Experiences
        </h1>
        <p className="text-sm sm:text-base text-[#6B5C50] font-light leading-relaxed font-sans">
          Beyond our main dining room, AURA offers three distinct gastronomic
          journeys—from front-row counter seating directly across from Chef Vance
          to private candlelit dining inside our subterranean historic cellar.
        </p>
      </div>

      {/* Main Experience Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-20">
        {/* Experience Selector List */}
        <div className="lg:col-span-5 space-y-4">
          {EXPERIENCES.map((exp) => {
            const isSelected = activeExp.id === exp.id;
            return (
              <div
                key={exp.id}
                onClick={() => setActiveExp(exp)}
                className={`p-6 rounded-3xl cursor-pointer transition-all duration-300 border ${
                  isSelected
                    ? 'bg-[#251B14] text-[#FAF6F0] border-[#251B14] shadow-xl'
                    : 'bg-[#FAF6F0] text-[#251B14] border-[#E8DEC0] hover:border-[#8C735F]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-[11px] uppercase tracking-[0.2em] font-semibold ${
                      isSelected ? 'text-[#D8C7B5]' : 'text-[#8C735F]'
                    }`}
                  >
                    {exp.badge}
                  </span>
                  <span
                    className={`font-serif text-lg font-bold tabular-nums ${
                      isSelected ? 'text-[#F6EFE6]' : 'text-[#251B14]'
                    }`}
                  >
                    {exp.pricePerPerson} <span className="text-xs font-normal">/ guest</span>
                  </span>
                </div>

                <h3 className="font-serif text-2xl font-normal mb-1">{exp.title}</h3>
                <p
                  className={`text-xs line-clamp-2 font-light leading-relaxed mb-4 ${
                    isSelected ? 'text-[#D8C7B5]' : 'text-[#6C5D51]'
                  }`}
                >
                  {exp.subtitle}
                </p>

                <div
                  className={`flex items-center gap-4 text-[11px] font-medium pt-3 border-t ${
                    isSelected ? 'border-white/15 text-[#D8C7B5]' : 'border-[#EAE0D2] text-[#8C735F]'
                  }`}
                >
                  <span className="flex items-center gap-1">
                    <Sparkles size={12} /> {exp.courses}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> {exp.duration}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Experience Big Feature Stage */}
        <div className="lg:col-span-7">
          <div className="relative h-full min-h-[500px] rounded-[2.5rem] overflow-hidden border border-[#E3D7C6] shadow-2xl flex flex-col justify-end p-8 sm:p-12 text-[#FAF6F0] group">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeExp.image}
                src={activeExp.image}
                alt={activeExp.title}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-[#1F1712]/95 via-[#1F1712]/50 to-[#1F1712]/20" />

            <div className="relative z-10 max-w-xl">
              <span className="px-3.5 py-1 rounded-full bg-[#FAF6F0]/20 backdrop-blur-md border border-[#FAF6F0]/30 text-white text-[11px] uppercase tracking-[0.2em] font-medium inline-block mb-3">
                {activeExp.badge}
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-white mb-3">
                {activeExp.title}
              </h2>

              <p className="text-xs sm:text-sm text-[#D8C7B5] font-light leading-relaxed mb-6 font-sans">
                {activeExp.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
                {activeExp.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-[#FAF6F0]/90">
                    <div className="w-4 h-4 rounded-full bg-[#8C735F] text-[#FAF6F0] flex items-center justify-center shrink-0">
                      <Check size={10} />
                    </div>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => {
                    if (onBookExperience) {
                      onBookExperience(activeExp);
                    } else {
                      onOpenBooking();
                    }
                  }}
                  className="px-8 py-3.5 rounded-full bg-[#FAF6F0] text-[#251B14] text-xs font-semibold uppercase tracking-[0.18em] hover:bg-[#EBE2D3] transition-colors shadow-lg flex items-center gap-2"
                >
                  <Calendar size={14} />
                  <span>Reserve {activeExp.title}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Private Dining / Salon Buyout Inquiry */}
      <div className="p-8 sm:p-12 rounded-3xl bg-[#FAF6F0] border border-[#E8DEC0] shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8">
            <span className="text-xs uppercase tracking-[0.25em] text-[#8C735F] font-semibold block mb-2">
              Bespoke Event Salons
            </span>
            <h3 className="font-serif text-3xl text-[#251B14] mb-2">
              Full Restaurant & Cellar Buyouts
            </h3>
            <p className="text-xs sm:text-sm text-[#6B5A4E] leading-relaxed font-light">
              For diplomatic dinners, intimate weddings, and milestone anniversaries, AURA accommodates seated parties of up to 45 guests. Includes custom menu curation by Chef Vance and personalized cellar allocation pours.
            </p>
          </div>
          <div className="md:col-span-4 flex justify-start md:justify-end">
            <button
              onClick={onOpenBooking}
              className="px-7 py-3 rounded-full bg-[#251B14] text-[#FAF6F0] text-xs uppercase tracking-wider font-semibold hover:bg-[#433429] transition-colors shadow-md"
            >
              Inquire for Private Salon
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
