import React from 'react';
import { motion } from 'framer-motion';

const moonPhases = {
  'new_moon': { illumination: 0, shadow: 'full' },
  'waxing_crescent': { illumination: 25, shadow: 'right' },
  'first_quarter': { illumination: 50, shadow: 'right' },
  'waxing_gibbous': { illumination: 75, shadow: 'right' },
  'full_moon': { illumination: 100, shadow: 'none' },
  'waning_gibbous': { illumination: 75, shadow: 'left' },
  'last_quarter': { illumination: 50, shadow: 'left' },
  'waning_crescent': { illumination: 25, shadow: 'left' },
};

export default function MoonVisual({ phase = 'full_moon', size = 200, animate = true }) {
  const phaseData = moonPhases[phase] || moonPhases.full_moon;
  
  const getMoonGradient = () => {
    const { illumination, shadow } = phaseData;
    
    if (illumination === 100) {
      return 'radial-gradient(circle, #fefcd7 0%, #f5f0c4 40%, #e8e0a8 100%)';
    }
    
    if (illumination === 0) {
      return 'radial-gradient(circle, #2a2a3e 0%, #1a1a2e 100%)';
    }
    
    if (shadow === 'right') {
      if (illumination === 25) {
        return 'linear-gradient(90deg, #fefcd7 0%, #fefcd7 25%, #1a1a2e 35%, #1a1a2e 100%)';
      }
      if (illumination === 50) {
        return 'linear-gradient(90deg, #fefcd7 0%, #fefcd7 48%, #1a1a2e 52%, #1a1a2e 100%)';
      }
      if (illumination === 75) {
        return 'linear-gradient(90deg, #fefcd7 0%, #fefcd7 72%, #1a1a2e 78%, #1a1a2e 100%)';
      }
    }
    
    if (shadow === 'left') {
      if (illumination === 25) {
        return 'linear-gradient(90deg, #1a1a2e 0%, #1a1a2e 65%, #fefcd7 75%, #fefcd7 100%)';
      }
      if (illumination === 50) {
        return 'linear-gradient(90deg, #1a1a2e 0%, #1a1a2e 48%, #fefcd7 52%, #fefcd7 100%)';
      }
      if (illumination === 75) {
        return 'linear-gradient(90deg, #1a1a2e 0%, #1a1a2e 22%, #fefcd7 28%, #fefcd7 100%)';
      }
    }
    
    return 'radial-gradient(circle, #fefcd7 0%, #e8e0a8 100%)';
  };

  return (
    <motion.div
      initial={animate ? { scale: 0.8, opacity: 0 } : false}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative"
      style={{ width: size, height: size }}
    >
      {/* Outer glow */}
      <div 
        className="absolute inset-0 rounded-full blur-2xl opacity-30"
        style={{ 
          background: phaseData.illumination > 50 
            ? 'radial-gradient(circle, #fefcd7 0%, transparent 70%)' 
            : 'radial-gradient(circle, #4a5568 0%, transparent 70%)',
          transform: 'scale(1.3)'
        }}
      />
      
      {/* Moon surface */}
      <motion.div
        className="relative w-full h-full rounded-full overflow-hidden"
        style={{
          background: getMoonGradient(),
          boxShadow: phaseData.illumination > 30 
            ? `0 0 60px rgba(254, 252, 215, 0.4), inset 0 0 30px rgba(0,0,0,0.1)`
            : `0 0 30px rgba(100, 100, 120, 0.2)`,
        }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        {/* Crater details */}
        <div className="absolute inset-0 opacity-20">
          <div 
            className="absolute rounded-full bg-gray-400"
            style={{ width: '15%', height: '15%', top: '20%', left: '30%' }}
          />
          <div 
            className="absolute rounded-full bg-gray-400"
            style={{ width: '10%', height: '10%', top: '60%', left: '50%' }}
          />
          <div 
            className="absolute rounded-full bg-gray-400"
            style={{ width: '20%', height: '20%', top: '35%', left: '60%' }}
          />
          <div 
            className="absolute rounded-full bg-gray-500"
            style={{ width: '8%', height: '8%', top: '70%', left: '25%' }}
          />
          <div 
            className="absolute rounded-full bg-gray-400"
            style={{ width: '12%', height: '12%', top: '15%', left: '65%' }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}