import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GALLERY_ITEMS } from '../data/restaurantData';
import { GalleryItem } from '../types';
import { ArrowLeft, Maximize2, X } from 'lucide-react';

interface GalleryPageProps {
  onBackToHome: () => void;
  onOpenBooking: () => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ onBackToHome, onOpenBooking }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const categories = ['all', 'Gastronomy', 'Craftsmanship', 'Plating', 'Signature Dishes', 'Tasting Menu', 'Dessert Art'];

  const filteredItems = activeCategory === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

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
          Visual Aesthetics & Culinary Art
        </span>
      </div>

      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="text-xs uppercase tracking-[0.3em] text-[#8C735F] font-semibold block mb-2">
          Visual Symphony
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#251B14] font-normal tracking-tight mb-4">
          The Photographic Archive
        </h1>
        <p className="text-sm sm:text-base text-[#6B5C50] font-light leading-relaxed font-sans mb-8">
          A high-resolution chronicle of seasonal culinary masterworks, table compositions,
          and the intimate ambiance of dining at AURA. Click any image to view in full resolution.
        </p>

        {/* Category Filter Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-[#251B14] text-white shadow-sm'
                  : 'bg-[#FAF6F0] text-[#615144] border border-[#E8DEC0] hover:bg-[#EFE7DC]'
              }`}
            >
              {cat === 'all' ? 'All Archival Works' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Masonry / Grid Display */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px] mb-20">
        {filteredItems.map((item, index) => {
          const spanClass =
            index === 0
              ? 'sm:col-span-2 row-span-1 lg:row-span-2'
              : index === 4
              ? 'sm:col-span-2 lg:col-span-2 row-span-1'
              : 'col-span-1 row-span-1';

          return (
            <motion.div
              key={item.id}
              whileHover={{ y: -6 }}
              onClick={() => setActiveItem(item)}
              className={`relative rounded-3xl overflow-hidden cursor-pointer group border border-[#E5DACB] shadow-sm hover:shadow-2xl transition-all duration-500 ${spanClass}`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                referrerPolicy="no-referrer"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#1F1712]/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white" />

              <div className="absolute inset-0 p-6 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex justify-end">
                  <span className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center border border-white/30">
                    <Maximize2 size={16} />
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#D8C7B5] font-semibold">
                    {item.category}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl text-white font-medium">
                    {item.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#160F0A]/95 backdrop-blur-lg flex items-center justify-center p-4 sm:p-8"
            onClick={() => setActiveItem(null)}
          >
            <button
              onClick={() => setActiveItem(null)}
              aria-label="Close fullscreen gallery preview"
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors border border-white/20"
            >
              <X size={20} />
            </button>

            <div
              className="max-w-5xl max-h-[85vh] w-full flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="rounded-2xl overflow-hidden border border-white/20 shadow-2xl max-h-[75vh]">
                <img
                  src={activeItem.image}
                  alt={activeItem.title}
                  className="w-full h-full object-contain max-h-[75vh]"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="mt-4 text-center text-white">
                <span className="text-xs uppercase tracking-[0.25em] text-[#C4B5A5]">
                  {activeItem.category}
                </span>
                <h4 className="font-serif text-2xl mt-1 text-[#F6EFE6]">
                  {activeItem.title}
                </h4>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
