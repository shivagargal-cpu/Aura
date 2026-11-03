import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Sparkles, Award } from 'lucide-react';
import { IMAGES } from '../assets/images';

interface HeroProps {
  onOpenBooking: () => void;
  onExploreMenu: () => void;
}

const HERO_SLIDES = [
  {
    id: 1,
    image: IMAGES.heroPlatter,
    kicker: 'AUTUMN CULINARY CHAPTER',
    wordsLine1: ['Experience'],
    wordsLine2: ['Fine', 'Dining'],
    subtitle: 'Where culinary art transcends taste. Savor seasonal creations orchestrated by Chef Julian Vance in an atmosphere of understated architectural elegance.',
    accent: 'Michelin Guide Two Stars',
  },
  {
    id: 2,
    image: IMAGES.heroWagyu,
    kicker: 'SIGNATURE ATELIER TASTING',
    wordsLine1: ['Poetry', 'on'],
    wordsLine2: ['Every', 'Plate'],
    subtitle: 'A5 Miyazaki Wagyu, Périgord winter truffles, and artisanal reductions crafted with laser precision for discerning palates.',
    accent: 'Hand-Selected Vintages',
  },
  {
    id: 3,
    image: IMAGES.galleryFeast,
    kicker: 'THE SENSORY JOURNEY',
    wordsLine1: ['Timeless'],
    wordsLine2: ['Hospitality'],
    subtitle: 'Step into an intimate sanctuary where warm ambient candlelight, bespoke ceramic ware, and gracious service convene.',
    accent: 'Cellar of 3,200 Allocations',
  },
];

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onExploreMenu }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-play carousel
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [isPaused]);

  // Mouse parallax tracking on desktop
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || window.innerWidth < 1024) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({ x: x * 20, y: y * 20 });
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
    setMouseOffset({ x: 0, y: 0 });
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section
      id="home"
      className="relative pt-24 pb-12 md:pt-28 md:pb-16 px-4 sm:px-6 md:px-10 max-w-7xl mx-auto"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {/* Decorative ambient background blur & glow */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-[#ECDCCB]/40 rounded-full blur-3xl pointer-events-none animate-ambient-glow" />
      <div className="absolute top-40 right-1/4 w-80 h-80 bg-[#DFCEBB]/30 rounded-full blur-3xl pointer-events-none animate-ambient-glow" />

      {/* Container with rounded corners & shadow matching reference image */}
      <div
        ref={containerRef}
        className="relative w-full h-[580px] sm:h-[640px] md:h-[720px] rounded-[2rem] sm:rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-[0_25px_60px_rgba(40,28,18,0.22)] border border-[#E4D8C8]"
      >
        {/* Background Image Carousel with smooth scaling & mouse parallax */}
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: mouseOffset.x * -0.5,
              y: mouseOffset.y * -0.5,
            }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={slide.image}
              alt={slide.kicker}
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
            {/* Measured warm luxury gradient scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A130E]/90 via-[#1A130E]/40 to-[#1A130E]/20" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(26,19,14,0.4)_100%)]" />
          </motion.div>
        </AnimatePresence>

        {/* Floating Decorative Badge (Top Right) */}
        <motion.div
          animate={{
            y: [0, -8, 0],
            x: mouseOffset.x * 0.8,
          }}
          transition={{
            y: { repeat: Infinity, duration: 4.5, ease: 'easeInOut' },
            x: { duration: 0.3 },
          }}
          className="absolute top-8 right-8 z-20 hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-[#FAF6F0]/20 backdrop-blur-md border border-[#FAF6F0]/30 text-[#FAF6F0] text-xs shadow-lg"
        >
          <Award className="w-3.5 h-3.5 text-[#E6C9A2]" />
          <span className="tracking-wider uppercase font-medium text-[11px]">
            {slide.accent}
          </span>
        </motion.div>

        {/* Previous / Next Arrow buttons on left and right sides */}
        <button
          onClick={handlePrev}
          aria-label="Previous slide"
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-13 md:h-13 rounded-full bg-[#FAF6F0]/20 backdrop-blur-md border border-[#FAF6F0]/40 text-[#FAF6F0] flex items-center justify-center hover:bg-[#FAF6F0]/50 hover:text-white transition-all duration-300 group shadow-md"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:-translate-x-0.5" />
        </button>
        <button
          onClick={handleNext}
          aria-label="Next slide"
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-13 md:h-13 rounded-full bg-[#FAF6F0]/20 backdrop-blur-md border border-[#FAF6F0]/40 text-[#FAF6F0] flex items-center justify-center hover:bg-[#FAF6F0]/50 hover:text-white transition-all duration-300 group shadow-md"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:translate-x-0.5" />
        </button>

        {/* Overlaid Hero Content */}
        <div className="relative z-10 w-full h-full flex flex-col justify-end p-8 sm:p-12 md:p-16 text-center md:text-left">
          <div className="max-w-2xl">
            {/* Top Kicker */}
            <motion.div
              key={`kicker-${currentSlide}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="flex items-center gap-2 justify-center md:justify-start mb-4 text-[#D8C7B5] text-xs uppercase tracking-[0.25em] font-medium"
            >
              <span>{slide.kicker}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8A27A]" />
              <span>{slide.accent}</span>
            </motion.div>

            {/* Editorial Serif Headline with word-by-word staggered reveal */}
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal text-[#FBF8F3] leading-[0.98] tracking-tight mb-5">
              {/* Line 1 */}
              <div className="overflow-hidden">
                <motion.div
                  key={`line1-${currentSlide}`}
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="italic flex items-center justify-center md:justify-start gap-3"
                >
                  {slide.wordsLine1.map((w, i) => (
                    <span key={i}>{w}</span>
                  ))}
                </motion.div>
              </div>

              {/* Line 2 */}
              <div className="overflow-hidden">
                <motion.div
                  key={`line2-${currentSlide}`}
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
                  className="font-medium flex items-center justify-center md:justify-start gap-3"
                >
                  {slide.wordsLine2.map((w, i) => (
                    <span key={i}>{w}</span>
                  ))}
                </motion.div>
              </div>
            </h1>

            {/* Subtitle with fade-up */}
            <motion.p
              key={`sub-${currentSlide}`}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="text-[#E8DEC0]/90 text-sm sm:text-base font-light leading-relaxed max-w-xl mb-8 font-sans"
            >
              {slide.subtitle}
            </motion.p>

            {/* Action buttons with hover shimmer and tap feedback */}
            <motion.div
              key={`actions-${currentSlide}`}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.58 }}
              className="flex flex-wrap items-center justify-center md:justify-start gap-4"
            >
              <button
                onClick={onOpenBooking}
                className="animate-shimmer px-8 py-3.5 rounded-full bg-[#FAF6F0] text-[#241A13] text-xs font-semibold uppercase tracking-[0.18em] hover:bg-[#EBE2D3] hover:shadow-2xl transition-all duration-300 transform active:scale-95"
              >
                Reserve Your Table
              </button>
              <button
                onClick={onExploreMenu}
                className="px-8 py-3.5 rounded-full bg-[#FAF6F0]/15 hover:bg-[#FAF6F0]/25 backdrop-blur-md border border-[#FAF6F0]/30 text-[#FAF6F0] text-xs font-medium uppercase tracking-[0.18em] transition-all duration-300 transform active:scale-95"
              >
                Explore The Menu
              </button>
            </motion.div>
          </div>

          {/* Carousel Slide Indicators */}
          <div className="mt-8 md:mt-0 md:absolute md:bottom-12 md:right-16 flex items-center justify-center gap-2">
            {HERO_SLIDES.map((s, index) => (
              <button
                key={s.id}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`transition-all duration-300 rounded-full h-1.5 ${
                  currentSlide === index
                    ? 'w-8 bg-[#FAF6F0]'
                    : 'w-2 bg-[#FAF6F0]/40 hover:bg-[#FAF6F0]/70'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
