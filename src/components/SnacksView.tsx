import React from 'react';
import { Sparkles, Utensils, Coffee, Popcorn } from 'lucide-react';
import { SNACK_ITEMS } from '../data/mockData';

export const SnacksView: React.FC = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="border-b border-white/10 pb-6 mb-8">
        <h2 className="font-['Syne',sans-serif] text-2xl font-bold tracking-tight text-white sm:text-3xl">
          CinePass Gourmet Concessions
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Chef-crafted snacks, artisanal butter popcorn, and chilled brews delivered directly to your recliner seat.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SNACK_ITEMS.map((item) => (
          <div
            key={item.id}
            className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#12141e] p-5 transition hover:border-white/20"
          >
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400">
                  {item.category}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">{item.calories}</span>
              </div>

              <h3 className="mt-2 font-['Syne',sans-serif] text-base font-bold text-white">
                {item.name}
              </h3>

              <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between">
              <span className="text-base font-extrabold text-white tabular-nums">
                ₹{item.price}
              </span>
              <span className="text-[11px] text-slate-400">
                Order during seat checkout
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
