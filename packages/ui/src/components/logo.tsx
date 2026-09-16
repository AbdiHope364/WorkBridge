import React, { useId } from "react";

export interface LogoProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  theme?: "light" | "dark";
  showTagline?: boolean;
}

/**
 * WorkBridge Brand Full Logo
 * Features dynamic suspension bridge W mark with tech wordmark
 */
export function WorkBridgeLogo({
  className = "h-10 w-auto",
  theme = "light",
  showTagline = true,
  ...props
}: LogoProps) {
  const rawId = useId();
  const id = rawId.replace(/:/g, "_");

  const leftGradId = `leftGrad_${id}`;
  const rightGradId = `rightGrad_${id}`;
  const archGradId = `archGrad_${id}`;
  const amberGradId = `amberGrad_${id}`;
  const softShadowId = `softShadow_${id}`;

  const textColor = theme === "dark" ? "#FFFFFF" : "#0F172A";
  const taglineColor = theme === "dark" ? "#94A3B8" : "#64748B";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 850 240"
      width="100%"
      height="100%"
      className={className}
      {...props}
    >
      <defs>
        {/* Left Pillar Gradient (Navy) */}
        <linearGradient id={leftGradId} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0F172A" />
          <stop offset="100%" stopColor="#2563EB" />
        </linearGradient>

        {/* Right Pillar Gradient (Teal/Cyan) */}
        <linearGradient id={rightGradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06B6D4" />
          <stop offset="100%" stopColor="#0D9488" />
        </linearGradient>

        {/* Dynamic Arch Gradient (The Bridge Connector) */}
        <linearGradient id={archGradId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="50%" stopColor="#0EA5E9" />
          <stop offset="100%" stopColor="#14B8A6" />
        </linearGradient>

        {/* Energy Amber Dot Gradient */}
        <linearGradient id={amberGradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>

        {/* Drop Shadow for floating depth */}
        <filter id={softShadowId} x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#0F172A" floodOpacity="0.12" />
        </filter>
      </defs>

      {/* ==================== LOGOMARK ==================== */}
      <g transform="translate(15, 0)" filter={`url(#${softShadowId})`}>
        {/* Base Foundation Line */}
        <line x1="45" y1="185" x2="195" y2="185" stroke="#CBD5E1" strokeWidth="4" strokeLinecap="round" />

        {/* Left Pillar (First W Stroke) */}
        <path
          d="M 50 70 C 50 60, 62 55, 70 62 L 88 155 C 90 165, 102 165, 105 155 L 115 105 C 112 115, 96 178, 85 178 C 75 178, 50 85, 50 70 Z"
          fill={`url(#${leftGradId})`}
        />

        {/* Right Pillar (Final W Stroke) */}
        <path
          d="M 190 70 C 190 60, 178 55, 170 62 L 152 155 C 150 165, 138 165, 135 155 L 125 105 C 128 115, 144 178, 155 178 C 165 178, 190 85, 190 70 Z"
          fill={`url(#${rightGradId})`}
        />

        {/* Upward Golden Keystone Node (The Center Pinnacle) */}
        <circle cx="120" cy="118" r="7.5" fill={`url(#${amberGradId})`} />

        {/* Connecting Suspension Bridge Arch (Forming the central W truss) */}
        <path
          d="M 68 128 Q 120 40, 172 128"
          fill="none"
          stroke={`url(#${archGradId})`}
          strokeWidth="12"
          strokeLinecap="round"
        />

        {/* Subtle Arch Roadway Deck */}
        <path
          d="M 78 134 Q 120 62, 162 134"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="2.5"
          strokeDasharray="5 4"
          strokeLinecap="round"
          opacity="0.9"
        />
      </g>

      {/* ==================== WORDMARK ==================== */}
      <g transform="translate(240, 0)">
        {/* Primary Brand Name: WORK (Solid Slate Navy / White) */}
        <text
          x="0"
          y="125"
          fontFamily="system-ui, -apple-system, 'Inter', 'Segoe UI', sans-serif"
          fontSize="64"
          fontWeight="900"
          letterSpacing="-1.5"
          fill={textColor}
        >
          WORK
        </text>

        {/* Primary Brand Name: BRIDGE (Tech Cerulean Blue) */}
        <text
          x="215"
          y="125"
          fontFamily="system-ui, -apple-system, 'Inter', 'Segoe UI', sans-serif"
          fontSize="64"
          fontWeight="400"
          letterSpacing="-0.5"
          fill="#0284C7"
        >
          BRIDGE
        </text>

        {/* Accent Node Dot on the E */}
        <circle cx="478" cy="85" r="4.5" fill="#F59E0B" />

        {showTagline && (
          <>
            {/* Subtitle / Tagline */}
            <text
              x="3"
              y="162"
              fontFamily="system-ui, -apple-system, 'Inter', 'Segoe UI', sans-serif"
              fontSize="14.5"
              fontWeight="700"
              letterSpacing="4.5"
              fill={taglineColor}
            >
              SKILLED LABOR MARKETPLACE
            </text>

            {/* Decorative Highlight Rule */}
            <rect x="3" y="176" width="62" height="3.5" rx="1.75" fill="#0284C7" />
          </>
        )}
      </g>
    </svg>
  );
}

/**
 * Isolated WorkBridge Logomark (Icon Symbol)
 * Ideal for Favicons, Avatar Placeholders, Mobile Badges, Collapsed Bars
 */
export function WorkBridgeLogomark({
  className = "h-8 w-8",
  ...props
}: React.SVGProps<SVGSVGElement>) {
  const rawId = useId();
  const id = rawId.replace(/:/g, "_");

  const leftGradId = `markLeftGrad_${id}`;
  const rightGradId = `markRightGrad_${id}`;
  const archGradId = `markArchGrad_${id}`;
  const amberGradId = `markAmberGrad_${id}`;
  const softShadowId = `markSoftShadow_${id}`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="40 45 160 150"
      width="100%"
      height="100%"
      className={className}
      {...props}
    >
      <defs>
        <linearGradient id={leftGradId} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0F172A" />
          <stop offset="100%" stopColor="#2563EB" />
        </linearGradient>

        <linearGradient id={rightGradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06B6D4" />
          <stop offset="100%" stopColor="#0D9488" />
        </linearGradient>

        <linearGradient id={archGradId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="50%" stopColor="#0EA5E9" />
          <stop offset="100%" stopColor="#14B8A6" />
        </linearGradient>

        <linearGradient id={amberGradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>

        <filter id={softShadowId} x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#0F172A" floodOpacity="0.15" />
        </filter>
      </defs>

      <g filter={`url(#${softShadowId})`}>
        {/* Base Foundation Line */}
        <line x1="45" y1="185" x2="195" y2="185" stroke="#CBD5E1" strokeWidth="4" strokeLinecap="round" />

        {/* Left Pillar */}
        <path
          d="M 50 70 C 50 60, 62 55, 70 62 L 88 155 C 90 165, 102 165, 105 155 L 115 105 C 112 115, 96 178, 85 178 C 75 178, 50 85, 50 70 Z"
          fill={`url(#${leftGradId})`}
        />

        {/* Right Pillar */}
        <path
          d="M 190 70 C 190 60, 178 55, 170 62 L 152 155 C 150 165, 138 165, 135 155 L 125 105 C 128 115, 144 178, 155 178 C 165 178, 190 85, 190 70 Z"
          fill={`url(#${rightGradId})`}
        />

        {/* Golden Keystone Node */}
        <circle cx="120" cy="118" r="7.5" fill={`url(#${amberGradId})`} />

        {/* Suspension Arch */}
        <path
          d="M 68 128 Q 120 40, 172 128"
          fill="none"
          stroke={`url(#${archGradId})`}
          strokeWidth="12"
          strokeLinecap="round"
        />

        {/* Roadway Deck */}
        <path
          d="M 78 134 Q 120 62, 162 134"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="2.5"
          strokeDasharray="5 4"
          strokeLinecap="round"
          opacity="0.9"
        />
      </g>
    </svg>
  );
}

