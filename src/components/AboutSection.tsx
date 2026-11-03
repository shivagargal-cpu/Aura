import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { Award, Plus, CheckCircle2 } from 'lucide-react';
import { IMAGES } from '../assets/images';

interface AboutSectionProps {
  onOpenBooking: () => void;
  onViewFullAbout?: () => void;
}

// Smooth counting statistic item
const CounterItem: React.FC<{
  value: number;
  suffix: string;
  label: string;
}> = ({ value, suffix, label }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1600;
    const stepTime = 25;
    const steps = duration / stepTime;
    const increment = value / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-left">
      <div className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#251B14] tabular-nums tracking-tight">
        {count}
        <span className="text-[#8C735F] text-2xl sm:text-3xl ml-0.5">{suffix}</span>
      </div>
      <div className="text-xs uppercase tracking-[0.16em] text-[#695A4E] mt-1 font-medium">
        {label}
      </div>
    </div>
  );
};

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenBooking, onViewFullAbout }) => {
  const [storyOpen, setStoryOpen] = useState(false);

  return (
    <section id="about" className="relative py-20 md:py-28 px-4 sm:px-6 md:px-10 max-w-7xl mx-auto">
      {/* Background ambient lighting */}
      <div className="absolute -top-12 right-10 w-96 h-96 bg-[#ECDCCB]/25 rounded-full blur-3xl pointer-events-none" />

      {/* Composition: Text & Counters on left, Clip-Path Chef Image on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Story, Philosophy, and Animated Counters */}
        <div className="lg:col-span-5 order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs uppercase tracking-[0.25em] text-[#8C735F] font-semibold">
                Culinary Heritage
              </span>
              <span className="w-8 h-[1px] bg-[#8C735F]" />
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl text-[#251B14] font-normal leading-tight mb-6">
              Where Gastronomy <br />
              <span className="italic text-[#8C735F]">Meets Architecture</span>
            </h2>

            <p className="text-sm sm:text-base text-[#5A4B40] font-light leading-relaxed mb-6 font-sans">
              Founded in 2011 by Executive Chef Julian Vance, AURA was conceived
              not merely as a restaurant, but as a living gallery for sensory exploration.
              We reject the ordinary in pursuit of culinary equilibrium—pairing
              hyper-local biodynamic produce with classical French precision.
            </p>

            <p className="text-sm text-[#6C5D51] font-light leading-relaxed mb-8">
              "A dish must first satisfy the soul’s hunger for beauty, then awaken the palate with memories yet unwritten." — <span className="italic font-serif text-[#251B14]">Chef Julian Vance</span>
            </p>

            {/* Accolades List */}
            <div className="space-y-2.5 mb-10 pt-4 border-t border-[#E5DACB]">
              {RESTAURANT_INFO.awards.map((award, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex items-center gap-3 text-xs sm:text-sm text-[#43362C]"
                >
                  <Award className="w-4 h-4 text-[#8C735F] shrink-0" />
                  <span className="font-medium">{award}</span>
                </motion.div>
              ))}
            </div>

            {/* Statistics Counters */}
            <div className="grid grid-cols-2 gap-y-6 gap-x-8 pt-6 border-t border-[#E5DACB] mb-8">
              {RESTAURANT_INFO.stats.map((stat, i) => (
                <CounterItem
                  key={i}
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                />
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onViewFullAbout || onOpenBooking}
                className="animate-shimmer px-7 py-3 rounded-full bg-[#271E18] text-[#FAF6F0] text-xs font-semibold uppercase tracking-[0.18em] hover:bg-[#433429] hover:shadow-lg transition-all duration-300"
              >
                {onViewFullAbout ? "Read Full Atelier Story" : "Meet The Brigade"}
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onOpenBooking}
                className="px-6 py-3 rounded-full border border-[#D5C7B5] text-[#251B14] text-xs font-semibold uppercase tracking-[0.18em] hover:bg-[#FAF6F0] transition-all duration-300"
              >
                Reserve Table
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Clip-Path Mask Reveal Chef Image Container */}
        <div className="lg:col-span-7 order-1 lg:order-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-[0_25px_55px_rgba(40,28,18,0.2)] border border-[#E3D7C6] group"
          >
            {/* Chef Portrait Image */}
            <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden">
              <motion.img
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                src={IMAGES.chefPortrait}
                alt="Executive Chef Julian Vance"
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              {/* Luxury dark & warm gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1F1712]/85 via-[#1F1712]/30 to-transparent" />
            </div>

            {/* Reference Overlay Elements: "About Us" and Circle Button */}
            <div className="absolute top-8 left-8 sm:top-10 sm:left-10 z-10 flex items-center gap-4">
              {/* Circular Action Button with smooth hover spin */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setStoryOpen(!storyOpen)}
                aria-label="Expand story details"
                className="w-12 h-12 rounded-full bg-[#FAF6F0]/25 hover:bg-[#FAF6F0]/40 backdrop-blur-md border border-[#FAF6F0]/40 text-[#FAF6F0] flex items-center justify-center transition-colors shadow-md"
              >
                <Plus size={20} />
              </motion.button>

              <div className="text-white">
                <span className="font-serif text-3xl sm:text-4xl font-normal drop-shadow-sm">
                  About Us
                </span>
              </div>
            </div>

            {/* Bottom Caption within the Image */}
            <div className="absolute bottom-8 left-8 right-8 z-10 text-white flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-[11px] uppercase tracking-[0.25em] text-[#D8C7B5] font-semibold block mb-1">
                  Executive Chef & Founder
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight">
                  Julian Vance
                </h3>
              </div>
              <div className="text-right hidden sm:block">
                <span className="text-xs text-[#D8C7B5] font-light">
                  Directing 18 Artisanal Craftsmen
                </span>
              </div>
            </div>

            {/* Expandable Story Drawer */}
            {storyOpen && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 z-20 bg-[#1F1712]/92 backdrop-blur-md p-8 sm:p-12 text-[#FAF6F0] flex flex-col justify-center"
              >
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-serif text-2xl text-[#E8DCC8]">The Culinary Creed</h4>
                  <button
                    onClick={() => setStoryOpen(false)}
                    className="text-xs uppercase tracking-widest text-[#D3C2AF] hover:text-white"
                  >
                    Close [✕]
                  </button>
                </div>
                <p className="text-sm font-light text-[#D8C7B5] leading-relaxed mb-4">
                  Every morning at 5:30 AM, our brigade receives deliveries from 14 family-owned bio-farms in the Loire and Île-de-France. We forage wild chanterelles, samphire, and seasonal blossoms weekly.
                </p>
                <p className="text-sm font-light text-[#D8C7B5] leading-relaxed">
                  No flavor is added for decoration; every single petal, foam, and jus contributes to an intentional culinary equilibrium.
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
