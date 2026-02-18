import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Moon, Sun, Sparkles } from 'lucide-react';
import { format, addDays } from 'date-fns';

// Calculate next occurrence of specific moon phases
const getNextMoonEvents = (fromDate) => {
  const knownNewMoon = new Date('2024-01-11');
  const lunarCycle = 29.53059;
  
  const getPhaseDay = (phase) => {
    switch (phase) {
      case 'new_moon': return 0;
      case 'first_quarter': return 7.38;
      case 'full_moon': return 14.77;
      case 'last_quarter': return 22.15;
      default: return 0;
    }
  };

  const getNextPhase = (phase) => {
    const phaseDay = getPhaseDay(phase);
    const daysSinceKnown = (fromDate - knownNewMoon) / (1000 * 60 * 60 * 24);
    const currentCycleDay = ((daysSinceKnown % lunarCycle) + lunarCycle) % lunarCycle;
    
    let daysUntilPhase = phaseDay - currentCycleDay;
    if (daysUntilPhase <= 0) {
      daysUntilPhase += lunarCycle;
    }
    
    return addDays(fromDate, Math.round(daysUntilPhase));
  };

  const events = [
    { phase: 'new_moon', date: getNextPhase('new_moon'), name: 'New Moon', icon: Moon },
    { phase: 'first_quarter', date: getNextPhase('first_quarter'), name: 'First Quarter', icon: Sparkles },
    { phase: 'full_moon', date: getNextPhase('full_moon'), name: 'Full Moon', icon: Sun },
    { phase: 'last_quarter', date: getNextPhase('last_quarter'), name: 'Last Quarter', icon: Moon },
  ];

  return events.sort((a, b) => a.date - b.date).slice(0, 4);
};

export default function UpcomingEvents() {
  const events = getNextMoonEvents(new Date());

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-800/50 p-6"
    >
      <div className="flex items-center gap-2 mb-6">
        <Calendar className="w-5 h-5 text-slate-400" />
        <h3 className="text-lg font-light text-white tracking-wide">Upcoming Events</h3>
      </div>

      <div className="space-y-3">
        {events.map((event, index) => {
          const Icon = event.icon;
          const daysUntil = Math.round((event.date - new Date()) / (1000 * 60 * 60 * 24));
          
          return (
            <motion.div
              key={event.phase}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="flex items-center justify-between p-3 rounded-xl bg-slate-800/30 hover:bg-slate-800/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`
                  p-2 rounded-lg
                  ${event.phase === 'full_moon' ? 'bg-amber-500/20' : 'bg-slate-700/50'}
                `}>
                  <Icon className={`w-4 h-4 ${event.phase === 'full_moon' ? 'text-amber-300' : 'text-slate-400'}`} />
                </div>
                <div>
                  <p className="text-white font-medium text-sm">{event.name}</p>
                  <p className="text-slate-500 text-xs">{format(event.date, 'EEEE, MMM d')}</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`
                  text-xs px-2 py-1 rounded-full
                  ${daysUntil <= 3 ? 'bg-amber-500/20 text-amber-300' : 'bg-slate-700/50 text-slate-400'}
                `}>
                  {daysUntil === 0 ? 'Today' : daysUntil === 1 ? 'Tomorrow' : `${daysUntil} days`}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}