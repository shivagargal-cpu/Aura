import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MenuItem } from '../types';
import { X, Wine, Sparkles, AlertCircle, Calendar } from 'lucide-react';

interface DishModalProps {
  dish: MenuItem | null;
  onClose: () => void;
  onBookDish: (dish: MenuItem) => void;
}

export const DishModal: React.FC<DishModalProps> = ({
  dish,
  onClose,
  onBookDish,
}) => {
  if (!dish) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#140D08]/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative z-10 w-full max-w-2xl bg-[#FAF6F0] rounded-3xl overflow-hidden border border-[#E3D4C0] shadow-2xl text-[#251B14] my-8"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close dish modal"
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#140D08]/60 hover:bg-[#140D08]/80 text-white flex items-center justify-center backdrop-blur-xs transition-colors"
          >
            <X size={18} />
          </button>

          {/* Dish Image Banner */}
          <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-[#ECE1D2]">
            <img
              src={dish.image}
              alt={dish.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#FAF6F0] via-transparent to-black/30" />
            
            <div className="absolute bottom-4 left-6 right-6">
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#8C735F] font-semibold bg-[#FAF6F0]/90 px-3 py-1 rounded-full shadow-xs">
                {dish.category}
              </span>
            </div>
          </div>

          {/* Content Body */}
          <div className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-4">
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#251B14] font-medium leading-tight">
                  {dish.name}
                </h3>
                {dish.frenchName && (
                  <p className="font-serif italic text-sm text-[#7D6B5D] mt-0.5">
                    {dish.frenchName}
                  </p>
                )}
              </div>
              <span className="font-serif text-2xl sm:text-3xl font-bold text-[#251B14] tabular-nums shrink-0">
                {dish.price}
              </span>
            </div>

            <p className="text-sm text-[#5C4C40] leading-relaxed font-light mb-6">
              {dish.description}
            </p>

            {/* Ingredients composition */}
            <div className="mb-6 pb-6 border-b border-[#E8DDCF]">
              <span className="text-xs uppercase tracking-wider text-[#8C735F] font-semibold block mb-2">
                Hand-Selected Ingredients
              </span>
              <div className="flex flex-wrap gap-1.5">
                {dish.ingredients.map((ing, i) => (
                  <span
                    key={i}
                    className="text-xs text-[#524337] bg-[#EFE7DC] px-2.5 py-1 rounded-md"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            {/* Sommelier Pairing */}
            <div className="p-4 rounded-2xl bg-[#F2E9DD] border border-[#E0D3C2] flex items-start gap-3 mb-6">
              <Wine className="w-5 h-5 text-[#8C735F] shrink-0 mt-0.5" />
              <div>
                <span className="text-xs uppercase tracking-wider text-[#8C735F] font-semibold block">
                  Sommelier Cellar Recommendation
                </span>
                <p className="text-xs text-[#251B14] font-medium mt-0.5">
                  {dish.winePairing}
                </p>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-between gap-4 pt-2">
              <div className="text-xs text-[#7A695B]">
                {dish.dietary && dish.dietary.join(' · ')}
              </div>
              <button
                onClick={() => {
                  onClose();
                  onBookDish(dish);
                }}
                className="px-6 py-3 rounded-full bg-[#251B14] text-[#FAF6F0] text-xs uppercase tracking-wider font-semibold hover:bg-[#433429] transition-all flex items-center gap-2"
              >
                <Calendar size={14} /> Reserve Table for this Dish
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
