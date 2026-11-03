import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MENU_ITEMS } from '../data/restaurantData';
import { MenuItem } from '../types';
import { TiltCard } from '../components/TiltCard';
import { Search, Sparkles, Eye, ArrowUpRight, ArrowLeft, Wine, Check, Calendar } from 'lucide-react';

interface MenuPageProps {
  onSelectDish: (dish: MenuItem) => void;
  onBookDish: (dish: MenuItem) => void;
  onOpenBooking: () => void;
  onBackToHome: () => void;
}

export const MenuPage: React.FC<MenuPageProps> = ({
  onSelectDish,
  onBookDish,
  onOpenBooking,
  onBackToHome,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDietary, setSelectedDietary] = useState<string>('all');

  const filteredDishes = useMemo(() => {
    return MENU_ITEMS.filter((dish) => {
      // Category filter
      const matchesCategory =
        activeCategory === 'all' || dish.category === activeCategory;

      // Search filter (name, description, ingredients, wine pairing)
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        dish.name.toLowerCase().includes(query) ||
        dish.description.toLowerCase().includes(query) ||
        dish.ingredients.some((ing) => ing.toLowerCase().includes(query)) ||
        dish.winePairing.toLowerCase().includes(query);

      // Dietary filter
      const matchesDietary =
        selectedDietary === 'all' ||
        (dish.dietary && dish.dietary.includes(selectedDietary));

      return matchesCategory && matchesSearch && matchesDietary;
    });
  }, [activeCategory, searchQuery, selectedDietary]);

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
          Autumn Culinary Chapter · 2026
        </span>
      </div>

      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="text-xs uppercase tracking-[0.3em] text-[#8C735F] font-semibold block mb-2">
          Seasonal Gastronomy Repertoire
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#251B14] font-normal tracking-tight mb-4">
          The Tasting Menu
        </h1>
        <p className="text-sm sm:text-base text-[#6B5C50] font-light leading-relaxed font-sans">
          Each dish is orchestrated by Executive Chef Julian Vance with architectural
          precision, using biodynamic harvests from our Loire Valley partner gardens
          and paired with allocations from our private cellar.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-[#FAF6F0] rounded-3xl p-6 border border-[#E8DEC0] shadow-sm mb-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Search Box */}
          <div className="md:col-span-5 relative">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8C735F]"
            />
            <input
              type="text"
              placeholder="Search dishes, ingredients (e.g. Wagyu, Truffle, Sea Bass)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white rounded-full border border-[#DDD0BF] text-xs text-[#251B14] placeholder-[#9C8B7E] focus:outline-none focus:border-[#8C735F] transition-colors"
            />
          </div>

          {/* Category Filter Tabs */}
          <div className="md:col-span-7 flex flex-wrap items-center gap-1.5 justify-start md:justify-end">
            {[
              { id: 'all', label: 'All Curations' },
              { id: 'starters', label: 'Starters' },
              { id: 'mains', label: 'Mains' },
              { id: 'desserts', label: 'Desserts' },
              { id: 'tasting', label: 'Tasting Journey' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-2 rounded-full text-xs uppercase tracking-wider font-semibold transition-all duration-300 ${
                  activeCategory === cat.id
                    ? 'bg-[#251B14] text-[#FAF6F0] shadow-sm'
                    : 'text-[#615144] hover:text-[#251B14] hover:bg-[#EFE7DC]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dietary Filters */}
        <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-[#EAE0D2]">
          <span className="text-[11px] uppercase tracking-wider text-[#8C735F] font-semibold mr-1">
            Dietary:
          </span>
          {['all', 'Vegetarian', 'Gluten-Free', 'Pescatarian', 'Vegan'].map((diet) => (
            <button
              key={diet}
              onClick={() => setSelectedDietary(diet)}
              className={`px-3 py-1 rounded-full text-[11px] font-medium transition-colors ${
                selectedDietary === diet
                  ? 'bg-[#8C735F] text-white'
                  : 'bg-[#EFE7DC] text-[#615144] hover:bg-[#E5D7C5]'
              }`}
            >
              {diet === 'all' ? 'All Dietary' : diet}
            </button>
          ))}
        </div>
      </div>

      {/* Signature Plinths Row (Reference Image aesthetic) */}
      {activeCategory === 'all' && !searchQuery && selectedDietary === 'all' && (
        <div className="mb-20">
          <div className="text-center md:text-left mb-10">
            <span className="text-xs uppercase tracking-[0.25em] text-[#8C735F] font-semibold">
              Signature Plinths Showcase
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#251B14] mt-1">
              Architectural Centerpieces
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 items-start">
            {MENU_ITEMS.slice(0, 3).map((dish, index) => {
              const offsetClass = index === 1 ? 'md:mt-12' : index === 2 ? 'md:mt-24' : '';
              return (
                <div key={dish.id} className={`flex flex-col items-center text-center ${offsetClass}`}>
                  <TiltCard
                    maxTilt={5}
                    onClick={() => onSelectDish(dish)}
                    className="w-full max-w-[320px] group rounded-3xl"
                  >
                    <div className="relative z-20 w-48 h-48 mx-auto -mb-10 transition-transform duration-500 group-hover:scale-106">
                      <div className="w-full h-full rounded-full p-2 bg-[#FAF6F0] shadow-xl border border-[#ECE2D2] overflow-hidden">
                        <img
                          src={dish.image}
                          alt={dish.name}
                          className="w-full h-full object-cover rounded-full"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="absolute inset-0 rounded-full bg-[#271E18]/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="px-3 py-1.5 rounded-full bg-[#FAF6F0] text-[#251B14] text-[10px] font-semibold tracking-wider uppercase flex items-center gap-1 shadow-md">
                          <Eye size={12} /> Inspect Notes
                        </span>
                      </div>
                    </div>

                    <div className="relative z-10 w-full pt-12 pb-6 px-6 bg-gradient-to-b from-[#FFFFFF] via-[#FAF6F0] to-[#EFE7DC] rounded-2xl border border-white/90 pedestal-edge">
                      <div className="w-12 h-1 bg-[#D3C2AF] rounded-full mx-auto mb-4 opacity-50" />
                      <div className="text-xs uppercase tracking-[0.2em] text-[#8C735F] font-medium mb-1">
                        {dish.category}
                      </div>
                      <h3 className="font-serif text-xl text-[#251B14] font-medium tracking-tight mb-2 line-clamp-1 group-hover:text-[#8C735F] transition-colors">
                        {dish.name}
                      </h3>
                      <p className="text-xs text-[#6E5E52] leading-relaxed line-clamp-2 mb-4 font-light">
                        {dish.description}
                      </p>
                      <div className="flex items-center justify-between pt-3 border-t border-[#E8DEC0]/80">
                        <span className="text-sm font-serif font-bold text-[#251B14] tabular-nums">
                          {dish.price}
                        </span>
                        <span className="text-[11px] text-[#8C735F] uppercase tracking-wider font-semibold flex items-center gap-1">
                          Tasting Note <ArrowUpRight size={13} />
                        </span>
                      </div>
                    </div>
                  </TiltCard>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Full Dishes Grid */}
      <div className="mt-12">
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-[#E5DACB]">
          <h2 className="font-serif text-2xl sm:text-3xl text-[#251B14]">
            {activeCategory === 'all' ? 'All Seasonal Dishes' : `${activeCategory.toUpperCase()} Selection`}
          </h2>
          <span className="text-xs text-[#7A695B] font-medium">
            Showing {filteredDishes.length} creations
          </span>
        </div>

        {filteredDishes.length === 0 ? (
          <div className="text-center py-16 bg-[#FAF6F0] rounded-3xl border border-[#E8DEC0]">
            <p className="text-sm text-[#736355] mb-4">No dishes found matching your current filter.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
                setSelectedDietary('all');
              }}
              className="px-6 py-2.5 rounded-full bg-[#251B14] text-white text-xs uppercase tracking-wider font-semibold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDishes.map((dish) => (
              <motion.div
                key={dish.id}
                whileHover={{ y: -6 }}
                className="bg-[#FAF6F0] rounded-3xl overflow-hidden border border-[#E9DFD0] hover:border-[#D0C0AC] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Dish Image */}
                <div
                  onClick={() => onSelectDish(dish)}
                  className="relative aspect-[16/11] overflow-hidden cursor-pointer bg-[#ECE1D2]"
                >
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#251B14]/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="px-3 py-1.5 rounded-full bg-[#FAF6F0] text-[#251B14] text-[10px] font-semibold uppercase tracking-wider flex items-center gap-1 shadow-md">
                      <Eye size={12} /> View Ingredients & Pairings
                    </span>
                  </div>
                  <div className="absolute top-3.5 right-3.5 px-3 py-1 rounded-full bg-[#FAF6F0]/90 backdrop-blur-xs text-[#251B14] font-serif font-bold text-sm tabular-nums border border-[#E0D2C0] shadow-xs">
                    {dish.price}
                  </div>
                </div>

                {/* Dish Details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#8C735F] font-semibold block mb-1">
                      {dish.category}
                    </span>
                    <h3
                      onClick={() => onSelectDish(dish)}
                      className="font-serif text-xl sm:text-2xl text-[#251B14] font-medium hover:text-[#8C735F] transition-colors cursor-pointer mb-1 line-clamp-1"
                    >
                      {dish.name}
                    </h3>
                    {dish.frenchName && (
                      <p className="font-serif italic text-xs text-[#7A695B] mb-2 line-clamp-1">
                        {dish.frenchName}
                      </p>
                    )}
                    <p className="text-xs text-[#6B5A4E] font-light leading-relaxed mb-4 line-clamp-2">
                      {dish.description}
                    </p>

                    {/* Wine Pairing */}
                    <div className="p-3 rounded-xl bg-[#F2E9DE] border border-[#E3D7C5] flex items-center gap-2 mb-4">
                      <Wine size={14} className="text-[#8C735F] shrink-0" />
                      <span className="text-[11px] text-[#251B14] font-medium truncate">
                        {dish.winePairing}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-3 border-t border-[#EAE0D2]">
                    <button
                      onClick={() => onSelectDish(dish)}
                      className="flex-1 py-2.5 rounded-full border border-[#D5C6B3] text-xs uppercase tracking-wider text-[#251B14] hover:bg-[#EFE7DC] transition-colors font-medium text-center"
                    >
                      Notes
                    </button>
                    <button
                      onClick={() => onBookDish(dish)}
                      className="flex-1 py-2.5 rounded-full bg-[#251B14] text-[#FAF6F0] text-xs uppercase tracking-wider hover:bg-[#433429] transition-colors font-medium text-center flex items-center justify-center gap-1"
                    >
                      <Calendar size={12} />
                      <span>Reserve</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom CTA Banner */}
      <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-[#251B14] text-[#FAF6F0] flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-[#D8C7B5] font-semibold block mb-2">
            Private Chef Allocations
          </span>
          <h3 className="font-serif text-3xl sm:text-4xl text-white">
            Looking for a Customized Tasting Journey?
          </h3>
          <p className="text-xs sm:text-sm text-[#D8C7B5] mt-1 font-light max-w-xl">
            Chef Julian Vance creates bespoke multi-course menus tailored to your private celebrations and wine cellar preferences.
          </p>
        </div>
        <button
          onClick={onOpenBooking}
          className="px-8 py-3.5 rounded-full bg-[#FAF6F0] text-[#251B14] text-xs font-semibold uppercase tracking-[0.18em] hover:bg-[#EBE2D3] transition-colors whitespace-nowrap shrink-0 shadow-lg"
        >
          Book Your Experience
        </button>
      </div>
    </div>
  );
};
