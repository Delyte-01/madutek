import React from "react";

const Logo = () => {
  return (
    <svg
      width="250"
      height="80"
      viewBox="0 0 450 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Main gradients */}
        <linearGradient id="mGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="50%" stopColor="#EA580C" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>

        <linearGradient id="orbitGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>

        {/* Glow */}
        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background circle */}
      <circle cx="70" cy="70" r="50" fill="#050816" />

      {/* Orbit */}
      <ellipse
        cx="70"
        cy="70"
        rx="58"
        ry="28"
        stroke="url(#orbitGradient)"
        strokeWidth="5"
        transform="rotate(-20 70 70)"
        filter="url(#glow)"
      />

      {/* M Symbol */}
      <path
        d="M40 95V45L70 75L100 45V95"
        stroke="url(#mGradient)"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#glow)"
      />

      {/* Rocket point */}
      <circle cx="112" cy="53" r="7" fill="#F59E0B" filter="url(#glow)" />

      {/* Text */}
      <text
        x="145"
        y="68"
        fontFamily="Poppins, Arial"
        fontSize="34"
        fontWeight="700"
        fill="currentColor"
        className="text-foreground"
      >
        Madu<tspan fill="#F59E0B">Tek</tspan>
      </text>

      <text
        x="145"
        y="95"
        fontFamily="Poppins, Arial"
        fontSize="14"
        fill="currentColor"
        className="text-muted-foreground"
      >
        Tech Solutions Redefined
      </text>
    </svg>
  );
};

export default Logo;
