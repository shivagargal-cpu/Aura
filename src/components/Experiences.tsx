import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { EXPERIENCES } from '../data/restaurantData';
import { Experience } from '../types';
import { Clock, Sparkles, Check, ChevronRight } from 'lucide-react';

interface ExperiencesProps {
  onOpenBooking: () => void;
}

export const Experiences: React.FC<ExperiencesProps> = ({ onOpenBooking }) => {
  const [selectedExp, setSelectedExp] = useState<Experience>(EXPERIENCES[0]);

  return (
    <section id="experiences" className="relative py-20 md:py-28 px-4 sm:px-6 md:px-10 max-w-7xl mx-auto">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-[#ECDCCB]/30 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7 }}
        className="mb-14 text-center md:text-left"
      >
        <span className="text-xs uppercase tracking-[0.25em] text-[#8C735F] font-semibold block mb-2">
          Curated Dining Encounters
        </span>
        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#251B14] font-normal tracking-tight">
          Special Experiences
        </h2>
      </motion.div>

      {/* Asymmetrical Layout: Interactive Selector Left (horizontal slide cards), Cinematic Stage Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Column: Interactive Experience Cards with staggered horizontal entry */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          {EXPERIENCES.map((exp, index) => {
            const isSelected = selectedExp.id === exp.id;
            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setSelectedExp(exp)}
                whileHover={{ x: 6 }}
                whileTap={{ scale: 0.98 }}
                className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 border ${
                  isSelected
                    ? 'bg-[#251B14] text-[#FAF6F0] border-[#251B14] shadow-xl'
                    : 'bg-[#FAF6F0] text-[#251B14] border-[#E8DEC0] hover:border-[#D0C0AC]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-[11px] uppercase tracking-[0.2em] font-semibold ${
                      isSelected ? 'text-[#D8C7B5]' : 'text-[#8C735F]'
                    }`}
                  >
                    {exp.badge || 'Experience'}
                  </span>
                  <span
                    className={`text-sm font-serif font-bold tabular-nums ${
                      isSelected ? 'text-[#F6EFE6]' : 'text-[#251B14]'
                    }`}
                  >
                    {exp.pricePerPerson} <span className="text-xs font-normal">/ guest</span>
                  </span>
                </div>

                <h3 className="font-serif text-2xl font-normal mb-1">{exp.title}</h3>
                <p
                  className={`text-xs line-clamp-2 font-light leading-relaxed mb-3 ${
                    isSelected ? 'text-[#D8C7B5]' : 'text-[#6C5D51]'
                  }`}
                >
                  {exp.subtitle}
                </p>

                <div
                  className={`flex items-center justify-between text-[11px] font-medium pt-3 border-t ${
                    isSelected ? 'border-white/15 text-[#D8C7B5]' : 'border-[#EAE0D2] text-[#8C735F]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Sparkles size={12} /> {exp.courses}
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {exp.duration}
                    </span>
                  </div>
                  <ChevronRight
                    size={14}
                    className={`transition-transform ${isSelected ? 'translate-x-1 text-[#F6EFE6]' : ''}`}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Right Column: Heroic Showcase of Selected Experience with Crossfade */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-full min-h-[460px] rounded-[2.5rem] overflow-hidden border border-[#E3D7C6] shadow-[0_20px_45px_rgba(40,28,18,0.18)] flex flex-col justify-end p-8 sm:p-12 text-[#FAF6F0] group"
          >
            {/* Background Image with crossfade */}
            <AnimatePresence mode="wait">
              <motion.img
                key={selectedExp.image}
                src={selectedExp.image}
                alt={selectedExp.title}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.7 }}
                className="absolute inset-0 w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </AnimatePresence>

            {/* Scrim Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1F1712]/95 via-[#1F1712]/55 to-[#1F1712]/20" />

            {/* Content Details */}
            <div className="relative z-10 max-w-xl">
              <span className="px-3.5 py-1 rounded-full bg-[#FAF6F0]/20 backdrop-blur-md border border-[#FAF6F0]/30 text-white text-[11px] uppercase tracking-[0.2em] font-medium inline-block mb-3">
                {selectedExp.badge}
              </span>

              <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-white mb-3">
                {selectedExp.title}
              </h3>

              <p className="text-sm text-[#D8C7B5] font-light leading-relaxed mb-6 font-sans">
                {selectedExp.description}
              </p>

              {/* Feature bullet list with stagger */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
                {selectedExp.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-[#FAF6F0]/90">
                    <div className="w-4 h-4 rounded-full bg-[#8C735F] text-[#FAF6F0] flex items-center justify-center shrink-0">
                      <Check size={10} />
                    </div>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={onOpenBooking}
                  className="animate-shimmer px-7 py-3 rounded-full bg-[#FAF6F0] text-[#251B14] text-xs font-semibold uppercase tracking-[0.18em] hover:bg-[#EBE2D3] transition-all duration-300 shadow-md"
                >
                  Reserve This Experience
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
