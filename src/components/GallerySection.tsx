import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GALLERY_ITEMS } from '../data/restaurantData';
import { GalleryItem } from '../types';
import { Maximize2, X } from 'lucide-react';

interface GallerySectionProps {
  onViewFullGallery?: () => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ onViewFullGallery }) => {
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  return (
    <section id="gallery" className="relative py-20 md:py-28 px-4 sm:px-6 md:px-10 max-w-7xl mx-auto">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-[#ECDCCB]/25 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7 }}
        className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6"
      >
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-[#8C735F] font-semibold block mb-2">
            Visual Harmony
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#251B14] font-normal tracking-tight">
            The Gallery
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-[#6C5D51] max-w-sm font-light">
          An intimate chronicle of seasonal creations, kitchen alchemy, and the poetic ambiance of dining at AURA.
        </p>
      </motion.div>

      {/* Masonry Layout with staggered reveals */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[280px]">
        {GALLERY_ITEMS.map((item, index) => {
          const spanClass =
            index === 0
              ? 'sm:col-span-2 row-span-1 lg:row-span-2'
              : index === 4
              ? 'sm:col-span-2 lg:col-span-2 row-span-1'
              : 'col-span-1 row-span-1';

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.94, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setActiveItem(item)}
              whileHover={{ y: -6 }}
              className={`relative rounded-3xl overflow-hidden cursor-pointer group border border-[#E5DACB] shadow-sm hover:shadow-2xl transition-all duration-500 ${spanClass}`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                referrerPolicy="no-referrer"
              />

              {/* Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1F1712]/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white" />

              <div className="absolute inset-0 p-6 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex justify-end">
                  <motion.span
                    whileHover={{ scale: 1.15 }}
                    className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center border border-white/30"
                  >
                    <Maximize2 size={16} />
                  </motion.span>
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

      {onViewFullGallery && (
        <div className="mt-12 text-center">
          <button
            onClick={onViewFullGallery}
            className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full border border-[#251B14] text-[#251B14] hover:bg-[#251B14] hover:text-[#FAF6F0] text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 transform active:scale-95"
          >
            <span>Explore Full Atelier Gallery & Culinary Works</span>
            <Maximize2 size={14} />
          </button>
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#160F0A]/95 backdrop-blur-lg flex items-center justify-center p-4 sm:p-8"
            onClick={() => setActiveItem(null)}
          >
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setActiveItem(null)}
              aria-label="Close fullscreen gallery preview"
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors border border-white/20"
            >
              <X size={20} />
            </motion.button>

            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.3 }}
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
