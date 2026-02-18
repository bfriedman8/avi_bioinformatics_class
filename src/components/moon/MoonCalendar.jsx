import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, addMonths, subMonths, getDay } from 'date-fns';

// Simplified moon phase calculation based on lunar cycle
const getMoonPhaseForDate = (date) => {
  const knownNewMoon = new Date('2024-01-11');
  const lunarCycle = 29.53059;
  const daysSinceKnown = (date - knownNewMoon) / (1000 * 60 * 60 * 24);
  const currentCycleDay = ((daysSinceKnown % lunarCycle) + lunarCycle) % lunarCycle;
  
  if (currentCycleDay < 1.85) return 'new_moon';
  if (currentCycleDay < 7.38) return 'waxing_crescent';
  if (currentCycleDay < 9.23) return 'first_quarter';
  if (currentCycleDay < 14.77) return 'waxing_gibbous';
  if (currentCycleDay < 16.61) return 'full_moon';
  if (currentCycleDay < 22.15) return 'waning_gibbous';
  if (currentCycleDay < 24) return 'last_quarter';
  return 'waning_crescent';
};

const MiniMoon = ({ phase, isToday, isSelected }) => {
  const getBackground = () => {
    switch (phase) {
      case 'new_moon':
        return 'bg-slate-700 border border-slate-600';
      case 'waxing_crescent':
        return 'bg-gradient-to-r from-amber-100/80 from-20% to-slate-700 to-35%';
      case 'first_quarter':
        return 'bg-gradient-to-r from-amber-100/80 to-slate-700';
      case 'waxing_gibbous':
        return 'bg-gradient-to-r from-amber-100/80 from-70% to-slate-700';
      case 'full_moon':
        return 'bg-amber-100';
      case 'waning_gibbous':
        return 'bg-gradient-to-l from-amber-100/80 from-70% to-slate-700';
      case 'last_quarter':
        return 'bg-gradient-to-l from-amber-100/80 to-slate-700';
      case 'waning_crescent':
        return 'bg-gradient-to-l from-amber-100/80 from-20% to-slate-700 to-35%';
      default:
        return 'bg-slate-700';
    }
  };

  return (
    <div
      className={`w-3 h-3 rounded-full ${getBackground()} ${isToday ? 'ring-2 ring-amber-400 ring-offset-2 ring-offset-slate-900' : ''}`}
    />
  );
};

export default function MoonCalendar({ selectedDate, onDateSelect, currentMonth, onMonthChange }) {
  const today = new Date();
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const startDayOfWeek = getDay(monthStart);

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-800/50 p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-light text-white tracking-wide">
          {format(currentMonth, 'MMMM yyyy')}
        </h3>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onMonthChange(subMonths(currentMonth, 1))}
            className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onMonthChange(addMonths(currentMonth, 1))}
            className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Week days header */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day) => (
          <div key={day} className="text-center text-xs text-slate-500 uppercase tracking-wider py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Empty cells for days before month starts */}
        {Array.from({ length: startDayOfWeek }).map((_, i) => (
          <div key={`empty-${i}`} className="aspect-square" />
        ))}
        
        {/* Day cells */}
        {days.map((day, index) => {
          const phase = getMoonPhaseForDate(day);
          const isToday = isSameDay(day, today);
          const isSelected = isSameDay(day, selectedDate);

          return (
            <motion.button
              key={day.toISOString()}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.01 }}
              onClick={() => onDateSelect(day)}
              className={`
                aspect-square rounded-xl flex flex-col items-center justify-center gap-1 transition-all
                ${isSelected 
                  ? 'bg-slate-700/80 ring-1 ring-amber-400/50' 
                  : 'hover:bg-slate-800/50'
                }
              `}
            >
              <span className={`text-sm ${isToday ? 'text-amber-400 font-medium' : 'text-slate-400'}`}>
                {format(day, 'd')}
              </span>
              <MiniMoon phase={phase} isToday={isToday} isSelected={isSelected} />
            </motion.button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-slate-800 flex flex-wrap gap-4 justify-center">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-slate-700 border border-slate-600" />
          <span className="text-xs text-slate-500">New</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-amber-100/80 to-slate-700" />
          <span className="text-xs text-slate-500">Quarter</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-amber-100" />
          <span className="text-xs text-slate-500">Full</span>
        </div>
      </div>
    </motion.div>
  );
}

export { getMoonPhaseForDate };