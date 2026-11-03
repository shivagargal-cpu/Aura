import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { REVIEWS } from '../data/restaurantData';
import { Review } from '../types';
import { ArrowLeft, Star, Quote, Send, CheckCircle2, MessageSquarePlus } from 'lucide-react';

interface ReviewsPageProps {
  onBackToHome: () => void;
  onOpenBooking: () => void;
}

export const ReviewsPage: React.FC<ReviewsPageProps> = ({ onBackToHome, onOpenBooking }) => {
  const [reviewsList, setReviewsList] = useState<Review[]>(REVIEWS);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [favoriteDish, setFavoriteDish] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !comment) return;

    const newRev: Review = {
      id: `rev_${Date.now()}`,
      name: name.trim(),
      role: role.trim() || 'Gastronomy Guest',
      rating,
      date: 'Just now',
      comment: comment.trim(),
      favoriteDish: favoriteDish.trim() || "Chef's Tasting Journey",
    };

    setReviewsList([newRev, ...reviewsList]);
    setSubmitted(true);
    setTimeout(() => {
      setShowReviewForm(false);
      setSubmitted(false);
      setName('');
      setComment('');
      setFavoriteDish('');
    }, 2000);
  };

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
          Critic Acclaim & Guest Reflections
        </span>
      </div>

      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="text-xs uppercase tracking-[0.3em] text-[#8C735F] font-semibold block mb-2">
          Discerning Voices
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#251B14] font-normal tracking-tight mb-4">
          Reviews & Reflections
        </h1>
        <p className="text-sm sm:text-base text-[#6B5C50] font-light leading-relaxed font-sans mb-8">
          Read what esteemed food writers, Michelin guide inspectors, and private
          patrons say about their sensory journeys at AURA.
        </p>

        {/* Aggregate score */}
        <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full bg-[#FAF6F0] border border-[#E8DEC0] shadow-xs">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} className="fill-[#8C735F] text-[#8C735F]" />
            ))}
          </div>
          <span className="font-serif text-lg font-bold text-[#251B14]">5.0 / 5.0</span>
          <span className="text-xs text-[#7A695B]">· Verified Patron Consensus</span>
        </div>
      </div>

      {/* Write a review toggle */}
      <div className="flex justify-end mb-8">
        <button
          onClick={() => setShowReviewForm(!showReviewForm)}
          className="px-5 py-2.5 rounded-full border border-[#8C735F] text-xs uppercase tracking-wider font-semibold text-[#251B14] hover:bg-[#8C735F] hover:text-white transition-all flex items-center gap-2"
        >
          <MessageSquarePlus size={15} />
          <span>{showReviewForm ? 'Close Form' : 'Share Dining Review'}</span>
        </button>
      </div>

      {/* Submit Review Form */}
      <AnimatePresence>
        {showReviewForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-12 bg-[#FAF6F0] rounded-3xl p-6 sm:p-8 border border-[#E8DEC0] shadow-sm overflow-hidden"
          >
            <h3 className="font-serif text-2xl text-[#251B14] mb-2">Leave Your Reflection</h3>
            <p className="text-xs text-[#6B5A4E] mb-6">
              Share your dining feedback, favorite dishes, and wine pairing experiences.
            </p>

            {submitted ? (
              <div className="p-4 rounded-2xl bg-[#E8F3E9] text-[#246132] text-xs flex items-center gap-2">
                <CheckCircle2 size={16} />
                <span>Thank you. Your review has been added to our guest chronicle.</span>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#6E5D50] mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Countess Isabelle"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-white border border-[#DDD0BF] rounded-xl px-3.5 py-2.5 text-xs text-[#251B14] focus:outline-none focus:border-[#8C735F]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#6E5D50] mb-1">
                      Profession / Location
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Architect, Milan"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full bg-white border border-[#DDD0BF] rounded-xl px-3.5 py-2.5 text-xs text-[#251B14] focus:outline-none focus:border-[#8C735F]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#6E5D50] mb-1">
                      Favorite Dish
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Brittany Sea Bass & Saffron"
                      value={favoriteDish}
                      onChange={(e) => setFavoriteDish(e.target.value)}
                      className="w-full bg-white border border-[#DDD0BF] rounded-xl px-3.5 py-2.5 text-xs text-[#251B14] focus:outline-none focus:border-[#8C735F]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#6E5D50] mb-1">
                    Rating
                  </label>
                  <div className="flex gap-2">
                    {[5, 4, 3, 2, 1].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setRating(num)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 ${
                          rating === num
                            ? 'bg-[#251B14] text-white'
                            : 'bg-white text-[#6E5D50] border border-[#DDD0BF]'
                        }`}
                      >
                        <Star size={12} className={rating === num ? 'fill-white' : 'fill-amber-400 text-amber-400'} />
                        <span>{num} Star{num > 1 ? 's' : ''}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#6E5D50] mb-1">
                    Your Review *
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Describe the harmony of flavors, atmosphere, and service..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full bg-white border border-[#DDD0BF] rounded-xl px-3.5 py-2.5 text-xs text-[#251B14] focus:outline-none focus:border-[#8C735F]"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-[#251B14] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#433429] transition-colors"
                >
                  Publish Review
                </button>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {reviewsList.map((rev) => (
          <div
            key={rev.id}
            className="p-8 rounded-3xl bg-[#FAF6F0] border border-[#E8DEC0] shadow-xs hover:border-[#D0C0AC] hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Stars & Date */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#EAE0D2]">
                <div className="flex items-center gap-1">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} size={14} className="fill-[#8C735F] text-[#8C735F]" />
                  ))}
                </div>
                <span className="text-[11px] text-[#8A796A] font-mono">{rev.date}</span>
              </div>

              {/* Review Text */}
              <p className="font-serif text-lg text-[#251B14] italic leading-relaxed mb-6">
                "{rev.comment}"
              </p>
            </div>

            {/* Author */}
            <div className="pt-4 border-t border-[#EAE0D2] flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#E5D7C5] flex items-center justify-center font-serif font-bold text-sm text-[#251B14]">
                {rev.name.charAt(0)}
              </div>
              <div>
                <h4 className="font-serif font-semibold text-sm text-[#251B14]">{rev.name}</h4>
                <div className="text-[11px] text-[#7A695B]">
                  <span>{rev.role}</span>
                  {rev.favoriteDish && (
                    <span className="block text-[#8C735F] font-medium">Favorite: {rev.favoriteDish}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Book table CTA */}
      <div className="p-8 sm:p-12 rounded-3xl bg-[#251B14] text-[#FAF6F0] flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-[#D8C7B5] font-semibold block mb-2">
            Experience It Yourself
          </span>
          <h3 className="font-serif text-3xl sm:text-4xl text-white">
            Ready to Join the Chronicle?
          </h3>
          <p className="text-xs sm:text-sm text-[#D8C7B5] mt-1 font-light max-w-xl">
            Reserve your seat at Chef Vance's atelier and create your own unforgettable gastronomic memories.
          </p>
        </div>
        <button
          onClick={onOpenBooking}
          className="px-8 py-3.5 rounded-full bg-[#FAF6F0] text-[#251B14] text-xs font-semibold uppercase tracking-[0.18em] hover:bg-[#EBE2D3] transition-colors whitespace-nowrap shrink-0 shadow-lg"
        >
          Reserve a Table
        </button>
      </div>
    </div>
  );
};
