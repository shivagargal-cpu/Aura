import React, { useState } from 'react';
import { motion } from 'motion/react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { IMAGES } from '../assets/images';
import { ArrowLeft, Award, Sparkles, Check, Users, HeartHandshake, ShieldCheck } from 'lucide-react';

interface AboutPageProps {
  onBackToHome: () => void;
  onOpenBooking: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onBackToHome, onOpenBooking }) => {
  const [activeTab, setActiveTab] = useState<'philosophy' | 'brigade' | 'partnerships'>('philosophy');

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
          Heritage & Culinary Atelier
        </span>
      </div>

      {/* Hero Composition */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-20">
        <div className="lg:col-span-6">
          <span className="text-xs uppercase tracking-[0.3em] text-[#8C735F] font-semibold block mb-2">
            The Origin & Craft
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#251B14] font-normal tracking-tight mb-6 leading-tight">
            An Atelier Born from <br />
            <span className="italic text-[#8C735F]">Earth & Precision</span>
          </h1>
          <p className="text-sm sm:text-base text-[#6B5C50] font-light leading-relaxed mb-6 font-sans">
            Founded in 2011 on Avenue Montaigne by Executive Chef Julian Vance,
            AURA began as an architectural experiment: what happens when hyper-local
            biodynamic agriculture is refined through the exacting lens of classical French
            gastronomy?
          </p>
          <p className="text-sm text-[#736355] font-light leading-relaxed mb-8">
            Every element—from our hand-cast travertine plinths to our temperature-regulated
            subterranean cellar—is designed to create complete sensory stillness.
          </p>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-[#FAF6F0] border border-[#E8DEC0]">
            {RESTAURANT_INFO.stats.map((stat, i) => (
              <div key={i} className="text-center sm:text-left">
                <div className="font-serif text-2xl sm:text-3xl font-bold text-[#251B14]">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-[10px] uppercase tracking-wider text-[#8C735F] font-medium mt-0.5">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-[#E3D7C6]">
            <img
              src={IMAGES.chefPortrait}
              alt="Executive Chef Julian Vance"
              className="w-full h-[480px] object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1F1712]/80 via-transparent to-transparent flex flex-col justify-end p-8 text-white">
              <span className="text-xs uppercase tracking-[0.25em] text-[#D8C7B5] font-semibold">
                Executive Chef & Founder
              </span>
              <h3 className="font-serif text-3xl font-medium">Julian Vance</h3>
              <p className="text-xs text-[#E8DCC8] mt-1 font-light">
                Two Michelin Stars · Former Chef de Cuisine at Le Gabriel & L'Arpège
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section: Philosophy, Brigade, Partnerships */}
      <div className="mb-20">
        <div className="flex border-b border-[#E0D2C0] mb-10 gap-8 justify-center">
          {[
            { id: 'philosophy', label: 'Culinary Philosophy' },
            { id: 'brigade', label: 'The Brigade & Atelier' },
            { id: 'partnerships', label: 'Biodynamic Partnerships' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-4 text-xs uppercase tracking-[0.2em] font-semibold transition-all relative ${
                activeTab === tab.id
                  ? 'text-[#251B14] border-b-2 border-[#8C735F]'
                  : 'text-[#7D6B5D] hover:text-[#251B14]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'philosophy' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-[#FAF6F0] border border-[#E8DEC0]">
              <span className="font-serif text-3xl text-[#8C735F] mb-3 block">01</span>
              <h3 className="font-serif text-2xl text-[#251B14] mb-3">Temporal Equilibrium</h3>
              <p className="text-xs text-[#6B5A4E] leading-relaxed font-light">
                We believe a seasonal tasting menu must reflect the exact climatic inflection of the week. Ingredients harvested at 6:00 AM are served on our plinths that evening.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#FAF6F0] border border-[#E8DEC0]">
              <span className="font-serif text-3xl text-[#8C735F] mb-3 block">02</span>
              <h3 className="font-serif text-2xl text-[#251B14] mb-3">Zero Ornamental Waste</h3>
              <p className="text-xs text-[#6B5A4E] leading-relaxed font-light">
                No component on the plate exists merely for color or garnishing. Every edible bloom, cold emulsion, and reduction balances acidity, texture, and aroma.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#FAF6F0] border border-[#E8DEC0]">
              <span className="font-serif text-3xl text-[#8C735F] mb-3 block">03</span>
              <h3 className="font-serif text-2xl text-[#251B14] mb-3">Architectural Harmony</h3>
              <p className="text-xs text-[#6B5A4E] leading-relaxed font-light">
                Plates are handcrafted by ceramic masters in Burgundy. The curvature of each vessel is calculated to concentrate steam and aromatics as the dish is served.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'brigade' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-3xl bg-[#FAF6F0] border border-[#E8DEC0] text-center">
              <div className="w-20 h-20 rounded-full bg-[#E5D7C5] mx-auto mb-4 flex items-center justify-center font-serif text-2xl font-bold text-[#251B14]">
                JV
              </div>
              <h4 className="font-serif text-xl text-[#251B14] font-semibold">Julian Vance</h4>
              <span className="text-[11px] uppercase tracking-wider text-[#8C735F] block mb-3">Chef Patron</span>
              <p className="text-xs text-[#6B5A4E] font-light">Directs culinary philosophy and seasonal composition across all atelier menus.</p>
            </div>

            <div className="p-6 rounded-3xl bg-[#FAF6F0] border border-[#E8DEC0] text-center">
              <div className="w-20 h-20 rounded-full bg-[#E5D7C5] mx-auto mb-4 flex items-center justify-center font-serif text-2xl font-bold text-[#251B14]">
                CL
              </div>
              <h4 className="font-serif text-xl text-[#251B14] font-semibold">Claire Laurent</h4>
              <span className="text-[11px] uppercase tracking-wider text-[#8C735F] block mb-3">Head Sommelier</span>
              <p className="text-xs text-[#6B5A4E] font-light">Curates 3,200 allocations across Bordeaux, Burgundy, Piedmont, and biodynamic estates.</p>
            </div>

            <div className="p-6 rounded-3xl bg-[#FAF6F0] border border-[#E8DEC0] text-center">
              <div className="w-20 h-20 rounded-full bg-[#E5D7C5] mx-auto mb-4 flex items-center justify-center font-serif text-2xl font-bold text-[#251B14]">
                MR
              </div>
              <h4 className="font-serif text-xl text-[#251B14] font-semibold">Marc Rousseau</h4>
              <span className="text-[11px] uppercase tracking-wider text-[#8C735F] block mb-3">Chef Pâtissier</span>
              <p className="text-xs text-[#6B5A4E] font-light">Sculpts structural desserts combining single-origin cacao, botanical infusions, and gold leaf.</p>
            </div>
          </div>
        )}

        {activeTab === 'partnerships' && (
          <div className="p-8 rounded-3xl bg-[#FAF6F0] border border-[#E8DEC0] space-y-4">
            <h3 className="font-serif text-2xl text-[#251B14] mb-2">Our 14 Biodynamic Cultivators</h3>
            <p className="text-xs sm:text-sm text-[#6B5A4E] leading-relaxed font-light">
              We maintain direct exclusivity with heritage growers in Chevreuse and the Loire Valley. Heritage tomatoes, wild foraged truffles, mountain elderflowers, and Brittany day-boat seafood arrive daily at dawn without middlemen.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-[#EAE0D2]">
              <div className="flex items-center gap-2 text-xs text-[#251B14]">
                <Check size={14} className="text-[#8C735F]" />
                <span>100% Certified Organic & Biodynamic Produce</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#251B14]">
                <Check size={14} className="text-[#8C735F]" />
                <span>Line-caught Atlantic seafood from sustainable day-boats</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#251B14]">
                <Check size={14} className="text-[#8C735F]" />
                <span>Single-origin Criollo cocoa directly traded from Venezuela</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#251B14]">
                <Check size={14} className="text-[#8C735F]" />
                <span>Fresh Périgord black winter truffles unwashed and whole</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Accolades & Press */}
      <div className="p-8 sm:p-12 rounded-3xl bg-[#251B14] text-[#FAF6F0] flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-[#D8C7B5] font-semibold block mb-2">
            International Distinction
          </span>
          <h3 className="font-serif text-3xl sm:text-4xl text-white">
            Honored with Two Michelin Stars
          </h3>
          <p className="text-xs sm:text-sm text-[#D8C7B5] mt-1 font-light max-w-xl">
            "A masterclass in restraint, texture, and emotional equilibrium." — Guide Michelin
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
