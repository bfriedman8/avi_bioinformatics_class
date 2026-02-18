import React from 'react';
import { motion } from 'framer-motion';
import { Droplets, Sun, Moon, Sparkles } from 'lucide-react';

const phaseDetails = {
  'new_moon': {
    name: 'New Moon',
    description: 'The moon is between Earth and the Sun, invisible to us.',
    energy: 'New beginnings, setting intentions, planting seeds',
    illumination: 0,
    icon: Moon,
  },
  'waxing_crescent': {
    name: 'Waxing Crescent',
    description: 'A sliver of light appears as the moon begins its journey.',
    energy: 'Hope, intentions, wishes, vulnerability',
    illumination: 25,
    icon: Sparkles,
  },
  'first_quarter': {
    name: 'First Quarter',
    description: 'Half illuminated, marking the moon\'s first milestone.',
    energy: 'Decision making, taking action, commitment',
    illumination: 50,
    icon: Sun,
  },
  'waxing_gibbous': {
    name: 'Waxing Gibbous',
    description: 'Almost full, building towards peak illumination.',
    energy: 'Refine, adjust, patience, development',
    illumination: 75,
    icon: Sparkles,
  },
  'full_moon': {
    name: 'Full Moon',
    description: 'The moon is fully illuminated, at peak brightness.',
    energy: 'Harvest, celebration, heightened emotions, clarity',
    illumination: 100,
    icon: Sun,
  },
  'waning_gibbous': {
    name: 'Waning Gibbous',
    description: 'Light begins to recede after the full moon.',
    energy: 'Gratitude, sharing, introspection',
    illumination: 75,
    icon: Droplets,
  },
  'last_quarter': {
    name: 'Last Quarter',
    description: 'Half illuminated on the opposite side.',
    energy: 'Release, forgiveness, letting go',
    illumination: 50,
    icon: Moon,
  },
  'waning_crescent': {
    name: 'Waning Crescent',
    description: 'The final sliver before the new moon.',
    energy: 'Surrender, rest, reflection, recuperation',
    illumination: 25,
    icon: Moon,
  },
};

export default function PhaseInfo({ phase = 'full_moon' }) {
  const info = phaseDetails[phase] || phaseDetails.full_moon;
  const Icon = info.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-slate-800/50 border border-slate-700/50">
          <Icon className="w-5 h-5 text-amber-200" />
        </div>
        <h2 className="text-3xl font-light text-white tracking-wide">{info.name}</h2>
      </div>
      
      <p className="text-slate-400 text-lg leading-relaxed font-light">
        {info.description}
      </p>

      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <span className="text-slate-500 text-sm uppercase tracking-wider">Illumination</span>
          <span className="text-white font-medium">{info.illumination}%</span>
        </div>
        <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${info.illumination}%` }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
            className="h-full bg-gradient-to-r from-amber-200/60 to-amber-100 rounded-full"
          />
        </div>
      </div>

      <div className="pt-4 border-t border-slate-800">
        <span className="text-slate-500 text-sm uppercase tracking-wider">Energy & Themes</span>
        <p className="text-slate-300 mt-2 font-light">{info.energy}</p>
      </div>
    </motion.div>
  );
}