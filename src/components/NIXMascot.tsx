import { motion } from 'framer-motion';

interface NIXMascotProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
}

export function NIXMascot({ className = '', size = 'md', animated = true }: NIXMascotProps) {
  const sizes = {
    sm: 'w-16 h-16',
    md: 'w-28 h-28',
    lg: 'w-48 h-48',
    xl: 'w-64 h-64',
  };

  return (
    <motion.div
      className={`relative ${sizes[size]} ${className}`}
      initial={animated ? { opacity: 0, scale: 0.95 } : {}}
      animate={animated ? {
        opacity: 1,
        scale: 1,
        y: [0, -6, 0],
      } : {}}
      transition={animated ? {
        opacity: { duration: 0.6 },
        scale: { duration: 0.6 },
        y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
      } : {}}
    >
      <div className="relative w-full h-full">
        {/* Subtle glow background */}
        <div className="absolute inset-0 bg-nexo-gold/10 rounded-full blur-2xl" />

        {/* Realistic Eagle Illustration */}
        <svg viewBox="0 0 200 200" className="w-full h-full relative z-10">
          <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D4B978" />
              <stop offset="50%" stopColor="#C9A962" />
              <stop offset="100%" stopColor="#B8943D" />
            </linearGradient>
            <linearGradient id="navyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1E3A5F" />
              <stop offset="100%" stopColor="#132238" />
            </linearGradient>
            <linearGradient id="eyeGlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#D4B978" stopOpacity="0" />
              <stop offset="50%" stopColor="#D4B978" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#D4B978" stopOpacity="0" />
            </linearGradient>
            <filter id="subtleGlow">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="softShadow">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000000" floodOpacity="0.2" />
            </filter>
          </defs>

          {/* Background circle for elegance */}
          <circle cx="100" cy="100" r="95" fill="#0D1220" opacity="0.5" />

          {/* Eagle Body - Detailed and elegant */}
          <g filter="url(#softShadow)">
            {/* Main body shape */}
            <ellipse cx="100" cy="130" rx="45" ry="35" fill="url(#navyGradient)" />

            {/* Chest feathers pattern */}
            <path
              d="M70 130 Q100 145 130 130 M75 125 Q100 138 125 125 M80 120 Q100 130 120 120"
              stroke="#2D5A8B"
              strokeWidth="1"
              fill="none"
              opacity="0.4"
            />

            {/* Left Wing - spread majestically */}
            <path
              d="M55 120 Q30 100 20 85 Q25 90 35 95 Q30 105 55 120"
              fill="url(#navyGradient)"
            />
            <path
              d="M55 120 Q25 95 15 80 Q20 88 35 96 Q30 102 55 120"
              fill="#1E3A5F"
              opacity="0.8"
            />
            {/* Wing feathers detail */}
            <path
              d="M20 88 L25 92 M25 85 L30 90 M32 84 L36 89"
              stroke="#C9A962"
              strokeWidth="0.5"
              fill="none"
              opacity="0.5"
            />

            {/* Right Wing - spread majestically */}
            <path
              d="M145 120 Q170 100 180 85 Q175 90 165 95 Q170 105 145 120"
              fill="url(#navyGradient)"
            />
            <path
              d="M145 120 Q175 95 185 80 Q180 88 165 96 Q170 102 145 120"
              fill="#1E3A5F"
              opacity="0.8"
            />
            {/* Wing feathers detail */}
            <path
              d="M180 88 L175 92 M175 85 L170 90 M168 84 L164 89"
              stroke="#C9A962"
              strokeWidth="0.5"
              fill="none"
              opacity="0.5"
            />

            {/* Neck and head */}
            <ellipse cx="100" cy="95" rx="20" ry="22" fill="url(#navyGradient)" />

            {/* Head profile - majestic eagle head */}
            <path
              d="M100 75 Q90 70 88 82 Q85 90 90 95 L100 100 L110 95 Q115 90 112 82 Q110 70 100 75"
              fill="#1E3A5F"
              filter="url(#softShadow)"
            />

            {/* Beak - strong and golden */}
            <path
              d="M100 95 L94 102 L96 107 L100 108 L104 107 L106 102 L100 95"
              fill="url(#goldGradient)"
            />
            <path
              d="M96 102 L100 104 L104 102"
              stroke="#B8943D"
              strokeWidth="0.5"
              fill="none"
            />

            {/* Eye ring - golden accent */}
            <ellipse cx="92" cy="88" rx="4" ry="3.5" fill="none" stroke="#C9A962" strokeWidth="1" filter="url(#subtleGlow)" />
            <ellipse cx="108" cy="88" rx="4" ry="3.5" fill="none" stroke="#C9A962" strokeWidth="1" filter="url(#subtleGlow)" />

            {/* Eyes - wise and piercing */}
            <ellipse cx="92" cy="88" rx="2.5" ry="2" fill="#0A0E1A" />
            <ellipse cx="108" cy="88" rx="2.5" ry="2" fill="#0A0E1A" />

            {/* Eye highlights - showing wisdom */}
            <circle cx="91" cy="87" r="0.8" fill="#D4B978" />
            <circle cx="107" cy="87" r="0.8" fill="#D4B978" />

            {/* Brow ridge - stern and wise */}
            <path
              d="M86 84 Q92 82 96 85"
              stroke="#0D1220"
              strokeWidth="2"
              fill="none"
              opacity="0.6"
            />
            <path
              d="M114 84 Q108 82 104 85"
              stroke="#0D1220"
              strokeWidth="2"
              fill="none"
              opacity="0.6"
            />

            {/* Head feathers/crest */}
            <path
              d="M100 75 Q95 68 100 65 Q105 68 100 75"
              fill="#1E3A5F"
            />

            {/* Tail feathers */}
            <path
              d="M85 160 Q100 175 115 160 Q100 170 85 160"
              fill="url(#navyGradient)"
              opacity="0.9"
            />

            {/* Subtle golden accent lines */}
            <path
              d="M85 155 L95 165 M100 160 L100 172 M115 155 L105 165"
              stroke="#C9A962"
              strokeWidth="0.5"
              fill="none"
              opacity="0.3"
            />
          </g>

          {/* AI Indicator - subtle and elegant */}
          <g>
            <circle cx="100" cy="110" r="3" fill="none" stroke="#C9A962" strokeWidth="0.5" opacity="0.3" />
            <circle cx="100" cy="110" r="1.5" fill="#C9A962" opacity="0.5">
              <animate attributeName="opacity" values="0.3;0.7;0.3" dur="3s" repeatCount="indefinite" />
            </circle>
          </g>
        </svg>

        {/* Subtle ambient particles */}
        {animated && (
          <>
            <motion.div
              className="absolute -top-2 left-1/3 w-0.5 h-0.5 bg-nexo-gold/40 rounded-full"
              animate={{
                y: [-10, -20, -10],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute top-1/4 -right-2 w-0.5 h-0.5 bg-nexo-gold/30 rounded-full"
              animate={{
                x: [10, 20, 10],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />
          </>
        )}
      </div>
    </motion.div>
  );
}
