import React from 'react';
import { Film, Eye, Sparkles, Volume2 } from 'lucide-react';

export const ExperiencesView: React.FC<{ onBookBlockbuster: () => void }> = ({ onBookBlockbuster }) => {
  const experiences = [
    {
      title: 'IMAX with Laser',
      badge: 'Unmatched Scale',
      desc: 'Next-generation 4K laser projection delivering crystal-clear images, deeper contrast, and customized commercial stadium seating.',
      specs: '1.43:1 Aspect Ratio · 12-Channel Immersive Sound',
    },
    {
      title: '4DX Dynamic Motion',
      badge: 'Sensory Immersion',
      desc: 'Synchronized motion seats, atmospheric wind, fog, lightning, rain, and scent effects that pull you directly into the film.',
      specs: 'Multi-Axis Roll & Pitch · Environmental Simulators',
    },
    {
      title: 'Dolby Atmos & Vision',
      badge: 'Acoustic Precision',
      desc: 'Individual audio objects that flow in three-dimensional space around and above you with breathtaking tonal clarity.',
      specs: '64 Independent Audio Channels · Dual 4K HDR',
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="border-b border-white/10 pb-6 mb-8">
        <h2 className="font-['Syne',sans-serif] text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Cinematic Formats & Formats
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Select premium formats engineered for monumental storytelling.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {experiences.map((exp) => (
          <div
            key={exp.title}
            className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#12141e] p-6 transition hover:border-white/20"
          >
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400">
                {exp.badge}
              </span>
              <h3 className="mt-2 font-['Syne',sans-serif] text-xl font-bold text-white">
                {exp.title}
              </h3>
              <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                {exp.desc}
              </p>
              <div className="mt-4 rounded-lg bg-white/5 p-2.5 text-[11px] font-mono text-slate-400 border border-white/5">
                {exp.specs}
              </div>
            </div>

            <button
              onClick={onBookBlockbuster}
              className="mt-6 rounded-xl bg-white/10 py-2.5 text-xs font-bold text-white transition hover:bg-rose-600 hover:text-white"
            >
              Book Premium Shows
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
