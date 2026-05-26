import { motion } from 'framer-motion';

interface NIXMascotProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
  variant?: 'badge' | 'simple';
}

export function NIXMascot({ className = '', size = 'md', animated = true, variant = 'badge' }: NIXMascotProps) {
  const sizes = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-40 h-40',
    xl: 'w-56 h-56',
  };

  if (variant === 'badge') {
    return (
      <motion.div
        className={`relative ${sizes[size]} ${className}`}
        initial={animated ? { opacity: 0, scale: 0.9 } : {}}
        animate={animated ? { opacity: 1, scale: 1, y: [0, -4, 0] } : {}}
        transition={animated ? {
          opacity: { duration: 0.6 },
          scale: { duration: 0.6 },
          y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
        } : {}}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Outer circle border */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
            <defs>
              <linearGradient id="redGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#B61F1F" />
                <stop offset="100%" stopColor="#A01818" />
              </linearGradient>
              <filter id="shadow">
                <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000000" floodOpacity="0.15" />
              </filter>
            </defs>

            {/* Outer ring */}
            <circle cx="100" cy="100" r="95" fill="none" stroke="url(#redGrad)" strokeWidth="6" />

            {/* Stars positions - 4 stars */}
            <g stroke="url(#redGrad)" fill="url(#redGrad)">
              {/* Top star */}
              <g transform="translate(100, 20)">
                <polygon points="0,-4 1.2,-1.3 4.5,-1.3 1.6,1 2.8,3.8 0,2 -2.8,3.8 -1.6,1 -4.5,-1.3 -1.2,-1.3" />
              </g>
              {/* Right star */}
              <g transform="translate(170, 100)">
                <polygon points="0,-4 1.2,-1.3 4.5,-1.3 1.6,1 2.8,3.8 0,2 -2.8,3.8 -1.6,1 -4.5,-1.3 -1.2,-1.3" />
              </g>
              {/* Bottom star */}
              <g transform="translate(100, 180)">
                <polygon points="0,-4 1.2,-1.3 4.5,-1.3 1.6,1 2.8,3.8 0,2 -2.8,3.8 -1.6,1 -4.5,-1.3 -1.2,-1.3" />
              </g>
              {/* Left star */}
              <g transform="translate(30, 100)">
                <polygon points="0,-4 1.2,-1.3 4.5,-1.3 1.6,1 2.8,3.8 0,2 -2.8,3.8 -1.6,1 -4.5,-1.3 -1.2,-1.3" />
              </g>
            </g>

            {/* Laurel wreath left */}
            <path
              d="M 40 80 Q 50 70 60 80 Q 55 85 50 90 Q 45 85 40 80"
              fill="none"
              stroke="#B61F1F"
              strokeWidth="2"
              opacity="0.6"
            />

            {/* Laurel wreath right */}
            <path
              d="M 160 80 Q 150 70 140 80 Q 145 85 150 90 Q 155 85 160 80"
              fill="none"
              stroke="#B61F1F"
              strokeWidth="2"
              opacity="0.6"
            />
          </svg>

          {/* Eagle illustration */}
          <svg className="relative z-10 w-3/5 h-3/5" viewBox="0 0 100 100" filter="url(#shadow)">
            <defs>
              <linearGradient id="eagleBody" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C92A2A" />
                <stop offset="100%" stopColor="#B61F1F" />
              </linearGradient>
            </defs>

            {/* Body */}
            <ellipse cx="50" cy="65" rx="18" ry="20" fill="url(#eagleBody)" />

            {/* Head */}
            <circle cx="50" cy="40" r="14" fill="url(#eagleBody)" />

            {/* Left wing */}
            <path
              d="M 35 60 Q 20 50 15 65 Q 20 70 35 65 Z"
              fill="url(#eagleBody)"
            />

            {/* Right wing */}
            <path
              d="M 65 60 Q 80 50 85 65 Q 80 70 65 65 Z"
              fill="url(#eagleBody)"
            />

            {/* Beak */}
            <path
              d="M 50 35 L 42 38 L 48 40 Z"
              fill="#D4A574"
            />

            {/* Eye */}
            <circle cx="48" cy="38" r="2.5" fill="#2C2C2C" />
            <circle cx="47.5" cy="37.5" r="0.8" fill="#FFFFFF" opacity="0.8" />

            {/* Tail feathers */}
            <path
              d="M 45 82 Q 50 95 55 82"
              fill="url(#eagleBody)"
              opacity="0.8"
            />

            {/* Wing detail lines */}
            <path
              d="M 20 65 L 25 70 M 25 62 L 30 68"
              stroke="#B61F1F"
              strokeWidth="0.5"
              opacity="0.5"
            />
          </svg>
        </div>

        {/* Text below badge */}
        <motion.div
          className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-center whitespace-nowrap"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-sm font-bold serif-heading text-nexo-red">NEXO</p>
          <p className="text-xs font-semibold text-nexo-text-secondary">ACADEMY</p>
        </motion.div>
      </motion.div>
    );
  }

  // Simple variant for smaller displays
  return (
    <motion.svg
      className={`${sizes[size]} ${className}`}
      viewBox="0 0 200 200"
      initial={animated ? { opacity: 0, scale: 0.9 } : {}}
      animate={animated ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6 }}
    >
      <defs>
        <linearGradient id="eagleSimple" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C92A2A" />
          <stop offset="100%" stopColor="#B61F1F" />
        </linearGradient>
      </defs>

      {/* Simple eagle head */}
      <circle cx="100" cy="80" r="35" fill="url(#eagleSimple)" />
      <path d="M 85 75 Q 70 70 65 80 Q 70 85 85 80 Z" fill="url(#eagleSimple)" />
      <path d="M 115 75 Q 130 70 135 80 Q 130 85 115 80 Z" fill="url(#eagleSimple)" />

      {/* Beak */}
      <path d="M 100 80 L 95 88 L 100 90 L 105 88 Z" fill="#D4A574" />

      {/* Eyes */}
      <circle cx="95" cy="75" r="3" fill="#2C2C2C" />
      <circle cx="105" cy="75" r="3" fill="#2C2C2C" />
    </motion.svg>
  );
}
