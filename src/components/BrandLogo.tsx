import React from 'react';

interface BrandLogoProps {
  size?: 'hero' | 'footer';
  showWordmark?: boolean;
  className?: string;
}

/**
 * Original geometric brand mark for My Family Plus (M+).
 * Fixed aspect ratio and official orange + warm-white palette.
 */
export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'hero',
  showWordmark = true,
  className = '',
}) => {
  const isHero = size === 'hero';

  return (
    <div
      className={`inline-flex items-center gap-3.5 select-none ${className}`}
      aria-label="My Family Plus M+"
    >
      <svg
        width={isHero ? 56 : 42}
        height={isHero ? 56 : 42}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 drop-shadow-[0_10px_24px_rgba(132,32,0,0.65)]"
        role="img"
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            id={`mfp-badge-grad-${size}`}
            x1="8"
            y1="4"
            x2="58"
            y2="60"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#FF790E" />
            <stop offset="52%" stopColor="#FF5A00" />
            <stop offset="100%" stopColor="#C83200" />
          </linearGradient>
          <linearGradient
            id={`mfp-rim-grad-${size}`}
            x1="4"
            y1="4"
            x2="60"
            y2="60"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#FFF8F2" stopOpacity="0.82" />
            <stop offset="45%" stopColor="#FF790E" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#842000" stopOpacity="0.85" />
          </linearGradient>
        </defs>

        {/* Rounded squircle emblem */}
        <rect
          x="2"
          y="2"
          width="60"
          height="60"
          rx="16"
          fill={`url(#mfp-badge-grad-${size})`}
          stroke={`url(#mfp-rim-grad-${size})`}
          strokeWidth="2.2"
        />

        {/* Subtle inner upper specular highlight */}
        <path
          d="M16 5.5H48C53.8 5.5 58.5 10.2 58.5 16V18.5C52 13 42.5 10 32 10C21.5 10 12 13 5.5 18.5V16C5.5 10.2 10.2 5.5 16 5.5Z"
          fill="#FFF8F2"
          fillOpacity="0.18"
        />

        {/* Geometric M letterform */}
        <path
          d="M12.5 44.5V20.5H19.4L26.5 33.4L33.6 20.5H40.5V44.5H34.7V29.8L28.4 41.1H24.6L18.3 29.8V44.5H12.5Z"
          fill="#FFF8F2"
        />

        {/* Crisp Plus (+) emblem */}
        <path
          d="M48.5 23.5H52.5V28.5H57.5V32.5H52.5V37.5H48.5V32.5H43.5V28.5H48.5V23.5Z"
          fill="#FFF8F2"
        />
      </svg>

      {showWordmark && (
        <div className="flex flex-col leading-none">
          <span
            className={`font-display font-extrabold tracking-tight text-[#FFF8F2] whitespace-nowrap ${
              isHero ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl'
            }`}
          >
            My Family <span className="text-[#FFF8F2]/90">Plus</span>
          </span>
        </div>
      )}
    </div>
  );
};
