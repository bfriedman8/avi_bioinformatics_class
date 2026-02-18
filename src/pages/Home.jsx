import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import MoonVisual from '@/components/moon/MoonVisual';
import PhaseInfo from '@/components/moon/PhaseInfo';
import MoonCalendar, { getMoonPhaseForDate } from '@/components/moon/MoonCalendar';
import UpcomingEvents from '@/components/moon/UpcomingEvents';
import StarField from '@/components/moon/StarField';

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [currentPhase, setCurrentPhase] = useState('full_moon');

  useEffect(() => {
    const phase = getMoonPhaseForDate(selectedDate);
    setCurrentPhase(phase);
  }, [selectedDate]);

  const isToday = format(selectedDate, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative">
      <StarField />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-extralight text-white tracking-widest mb-2">
            LUNAR
          </h1>
          <p className="text-slate-500 text-sm tracking-[0.3em] uppercase">
            Moon Cycle Tracker
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Moon Display */}
          <div className="space-y-8">
            {/* Selected Date */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center"
            >
              <p className="text-slate-400 text-sm tracking-wider mb-1">
                {isToday ? "TODAY" : "SELECTED DATE"}
              </p>
              <p className="text-white text-xl font-light">
                {format(selectedDate, 'EEEE, MMMM d, yyyy')}
              </p>
            </motion.div>

            {/* Moon Visual */}
            <div className="flex justify-center py-8">
              <MoonVisual phase={currentPhase} size={280} key={currentPhase} />
            </div>

            {/* Phase Info */}
            <div className="bg-slate-900/30 backdrop-blur-sm rounded-2xl border border-slate-800/30 p-6 sm:p-8">
              <PhaseInfo phase={currentPhase} />
            </div>
          </div>

          {/* Right Column - Calendar & Events */}
          <div className="space-y-6">
            <MoonCalendar
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
              currentMonth={currentMonth}
              onMonthChange={setCurrentMonth}
            />
            <UpcomingEvents />
          </div>
        </div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-16 text-center"
        >
          <p className="text-slate-600 text-xs tracking-wider">
            Track the celestial dance of our moon
          </p>
        </motion.footer>
      </div>
    </div>
  );
}