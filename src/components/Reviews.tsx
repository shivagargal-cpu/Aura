import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { REVIEWS } from '../data/restaurantData';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface ReviewsProps {
  onViewAllReviews?: () => void;
}

export const Reviews: React.FC<ReviewsProps> = ({ onViewAllReviews }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? REVIEWS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % REVIEWS.length);
  };

  const review = REVIEWS[currentIndex];

  return (
    <section id="reviews" className="relative py-20 md:py-28 px-4 sm:px-6 md:px-10 max-w-7xl mx-auto">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-10 w-72 h-72 bg-[#ECDCCB]/30 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7 }}
        className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6"
      >
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-[#8C735F] font-semibold block mb-2">
            Discerning Voices
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#251B14] font-normal tracking-tight">
            Customer Reviews
          </h2>
        </div>

        {/* Carousel Controls with micro-interactions */}
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={handlePrev}
            aria-label="Previous review"
            className="w-11 h-11 rounded-full border border-[#D5C6B3] bg-[#FAF6F0] text-[#251B14] flex items-center justify-center hover:bg-[#251B14] hover:text-[#FAF6F0] transition-colors shadow-sm"
          >
            <ChevronLeft size={18} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={handleNext}
            aria-label="Next review"
            className="w-11 h-11 rounded-full border border-[#D5C6B3] bg-[#FAF6F0] text-[#251B14] flex items-center justify-center hover:bg-[#251B14] hover:text-[#FAF6F0] transition-colors shadow-sm"
          >
            <ChevronRight size={18} />
          </motion.button>
        </div>
      </motion.div>

      {/* Testimonial Card with 3D shadow & directional sliding */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative bg-[#FAF6F0] rounded-[2.5rem] border border-[#E8DEC0] p-8 sm:p-12 md:p-16 shadow-[0_20px_45px_rgba(40,28,18,0.1)] overflow-hidden"
      >
        <Quote className="w-16 h-16 text-[#E0D2C0]/60 absolute top-8 right-8 sm:top-12 sm:right-12 pointer-events-none" />

        <div className="relative min-h-[220px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={review.id}
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -40 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-3xl"
            >
              {/* Stars */}
              <div className="flex items-center gap-1.5 mb-6">
                {[...Array(review.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="fill-[#B68B5E] text-[#B68B5E]"
                  />
                ))}
                <span className="text-xs uppercase tracking-widest text-[#8C735F] ml-2 font-medium">
                  Verified Gastronomy Guest
                </span>
              </div>

              {/* Comment */}
              <p className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#251B14] font-normal leading-relaxed italic mb-8">
                "{review.comment}"
              </p>

              {/* Author details */}
              <div className="flex items-center gap-4 pt-6 border-t border-[#EAE0D2]">
                <div className="w-12 h-12 rounded-full bg-[#E5D7C5] flex items-center justify-center font-serif text-lg font-bold text-[#3B2C21] shrink-0 border border-[#D9C8B5]">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-serif text-lg text-[#251B14] font-semibold">
                    {review.name}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-[#6E5E52] mt-0.5">
                    <span>{review.role}</span>
                    <span>·</span>
                    <span className="text-[#8C735F]">Favorite: {review.favoriteDish}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Step dots & View All Reviews Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-8 pt-4 border-t border-[#EAE0D2]">
          <div className="flex items-center gap-2">
            {REVIEWS.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > currentIndex ? 1 : -1);
                  setCurrentIndex(i);
                }}
                aria-label={`Review ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentIndex === i ? 'w-8 bg-[#251B14]' : 'w-2 bg-[#D9CBB7]'
                }`}
              />
            ))}
          </div>

          {onViewAllReviews && (
            <button
              onClick={onViewAllReviews}
              className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8C735F] hover:text-[#251B14] transition-colors flex items-center gap-2 self-start sm:self-auto group"
            >
              <span>View All 12+ Reflections & Share Your Review</span>
              <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
            </button>
          )}
        </div>
      </motion.div>
    </section>
  );
};
