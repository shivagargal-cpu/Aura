import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MENU_ITEMS } from '../data/restaurantData';
import { MenuItem } from '../types';
import { TiltCard } from './TiltCard';
import { Eye, ArrowUpRight, Sparkles } from 'lucide-react';

interface MenuPedestalsProps {
  onSelectDish: (dish: MenuItem) => void;
  onOpenBooking: () => void;
  onViewFullMenu?: () => void;
}

export const MenuPedestals: React.FC<MenuPedestalsProps> = ({
  onSelectDish,
  onOpenBooking,
  onViewFullMenu,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredDishes =
    activeCategory === 'all'
      ? MENU_ITEMS
      : MENU_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section id="menu" className="relative py-20 md:py-28 px-4 sm:px-6 md:px-10 max-w-7xl mx-auto">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-10 w-80 h-80 bg-[#ECDCCB]/30 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header with slide-up reveal */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
      >
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-[#8C735F] font-semibold block mb-2">
            Artisanal Culinary Atelier
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#251B14] font-normal tracking-tight">
            Our Menu
          </h2>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#ECE3D6]/70 rounded-full border border-[#DFD3C2]/70 self-start md:self-auto">
          {[
            { id: 'all', label: 'All Curations' },
            { id: 'starters', label: 'Starters' },
            { id: 'mains', label: 'Main Courses' },
            { id: 'desserts', label: 'Desserts' },
            { id: 'tasting', label: 'Tasting Journey' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs uppercase tracking-[0.15em] font-medium transition-all duration-300 relative ${
                activeCategory === cat.id
                  ? 'bg-[#2B211A] text-[#FAF6F0] shadow-sm'
                  : 'text-[#615144] hover:text-[#251B14] hover:bg-[#FAF6F0]/60'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Signature 3D Pedestal Architectural Showcase */}
      <div className="relative mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center md:text-left mb-10 max-w-md"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-[#8C735F] font-semibold">
            Signature Plinths
          </span>
          <p className="text-sm text-[#66574B] mt-1 font-light">
            Each creation is presented as a sculptural masterwork. Select any dish to inspect its sensory notes and sommelier vintage pairing.
          </p>
        </motion.div>

        {/* Asymmetrical Plinth Composition like the Reference Image */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 lg:gap-12 items-start">
          <AnimatePresence mode="popLayout">
            {filteredDishes.slice(0, 3).map((dish, index) => {
              const offsetClasses =
                index === 0
                  ? 'md:mt-0'
                  : index === 1
                  ? 'md:mt-16'
                  : 'md:mt-32';

              return (
                <motion.div
                  key={dish.id}
                  layout
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.7, delay: index * 0.18, ease: [0.16, 1, 0.3, 1] }}
                  className={`flex flex-col items-center text-center ${offsetClasses}`}
                >
                  {/* Wrap with interactive 3D TiltCard */}
                  <TiltCard
                    maxTilt={5}
                    onClick={() => onSelectDish(dish)}
                    className="w-full max-w-[320px] sm:max-w-[340px] group rounded-3xl"
                  >
                    {/* Floating Plate / Dish with Image */}
                    <div className="relative z-20 w-48 h-48 sm:w-56 sm:h-56 mx-auto -mb-10 transition-transform duration-500 group-hover:scale-106">
                      <div className="w-full h-full rounded-full p-2 bg-[#FAF6F0] shadow-[0_15px_32px_rgba(40,28,18,0.22)] border border-[#ECE2D2] overflow-hidden">
                        <img
                          src={dish.image}
                          alt={dish.name}
                          className="w-full h-full object-cover rounded-full transition-transform duration-700 group-hover:scale-108"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      {/* View Details hover badge */}
                      <div className="absolute inset-0 rounded-full bg-[#271E18]/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="px-3.5 py-1.5 rounded-full bg-[#FAF6F0] text-[#251B14] text-[11px] font-semibold tracking-wider uppercase flex items-center gap-1 shadow-md">
                          <Eye size={12} />
                          View Notes
                        </span>
                      </div>
                    </div>

                    {/* The Physical 3D Pedestal / Plinth Block */}
                    <div className="relative z-10 w-full pt-12 pb-6 px-6 bg-gradient-to-b from-[#FFFFFF] via-[#FAF6F0] to-[#EFE7DC] rounded-2xl border border-white/90 pedestal-edge">
                      {/* Top plinth surface highlight line */}
                      <div className="w-12 h-1 bg-[#D3C2AF] rounded-full mx-auto mb-4 opacity-50" />

                      <div className="text-xs uppercase tracking-[0.2em] text-[#8C735F] font-medium mb-1">
                        {dish.category}
                      </div>

                      <h3 className="font-serif text-xl sm:text-2xl text-[#251B14] font-medium tracking-tight mb-2 line-clamp-1 group-hover:text-[#8C735F] transition-colors">
                        {dish.name}
                      </h3>

                      <p className="text-xs text-[#6E5E52] leading-relaxed line-clamp-2 mb-4 font-light">
                        {dish.description}
                      </p>

                      <div className="flex items-center justify-between pt-3 border-t border-[#E8DEC0]/80">
                        <span className="text-sm font-serif font-bold text-[#251B14] tracking-wider tabular-nums">
                          {dish.price}
                        </span>
                        <span className="text-[11px] text-[#8C735F] uppercase tracking-wider font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                          Tasting Note <ArrowUpRight size={13} />
                        </span>
                      </div>
                    </div>
                  </TiltCard>

                  {/* Ground Cast Shadow */}
                  <div className="w-3/4 h-5 mx-auto rounded-full bg-[#352519]/15 blur-md -mt-2 transition-all duration-500" />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Expanded Menu Catalog with staggered reveal */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.7 }}
        className="mt-20 pt-16 border-t border-[#E5DACB]"
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#251B14]">
              Complete Seasonal Repertoire
            </h3>
            <p className="text-xs text-[#736355] mt-1 uppercase tracking-wider">
              {filteredDishes.length} Handcrafted Dishes Available
            </p>
          </div>
          <button
            onClick={onOpenBooking}
            className="text-xs font-semibold uppercase tracking-[0.18em] text-[#251B14] border-b border-[#251B14] pb-0.5 hover:text-[#8C735F] hover:border-[#8C735F] transition-colors group flex items-center gap-1"
          >
            <span>Reserve for Menu</span>
            <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDishes.map((dish, i) => (
            <motion.div
              key={dish.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -5, boxShadow: '0 12px 30px rgba(40,28,18,0.12)' }}
              onClick={() => onSelectDish(dish)}
              className="bg-[#FAF6F0]/80 hover:bg-[#FAF6F0] rounded-2xl p-5 border border-[#E9DFD0] hover:border-[#D9CBB7] shadow-sm transition-all duration-300 cursor-pointer flex gap-4 items-center group"
            >
              <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-[#E4D8C8]">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-serif text-lg text-[#251B14] font-medium truncate group-hover:text-[#8C735F] transition-colors">
                    {dish.name}
                  </h4>
                  <span className="font-serif font-bold text-sm text-[#251B14] tabular-nums shrink-0">
                    {dish.price}
                  </span>
                </div>
                <p className="text-xs text-[#6B5C4F] line-clamp-1 mt-0.5 font-light">
                  {dish.description}
                </p>
                <div className="flex items-center gap-2 mt-2 text-[11px] text-[#8C735F]">
                  <span className="uppercase tracking-wider font-medium">{dish.category}</span>
                  <span>·</span>
                  <span className="text-[#847466] truncate">{dish.winePairing.split(' ')[0]} Pairing</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {onViewFullMenu && (
          <div className="mt-12 text-center">
            <button
              onClick={onViewFullMenu}
              className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-[#251B14] text-[#FAF6F0] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#3D2E23] hover:shadow-lg transition-all duration-300 transform active:scale-95"
            >
              <span>Explore Full Dedicated Menu & Dietary Filters</span>
              <ArrowUpRight size={15} />
            </button>
          </div>
        )}
      </motion.div>
    </section>
  );
};
