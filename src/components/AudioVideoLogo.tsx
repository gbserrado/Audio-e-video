/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

interface AudioVideoLogoProps {
  className?: string;
  height?: number | string;
}

export default function AudioVideoLogo({ className = "", height = 55 }: AudioVideoLogoProps) {
  return (
    <div 
      className={`relative inline-block select-none ${className}`}
      style={{ height: typeof height === "number" ? `${height}px` : height }}
    >
      <svg
        viewBox="0 0 340 185"
        className="h-full w-auto overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Definitions for gradients and drop shadow effects to recreate the 3D glossy feel of the sign */}
        <defs>
          <linearGradient id="blue-gloss" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3d4f9d" />
            <stop offset="50%" stopColor="#2b3b7a" />
            <stop offset="100%" stopColor="#19234f" />
          </linearGradient>
          <linearGradient id="red-gloss" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f34e48" />
            <stop offset="50%" stopColor="#e42f2f" />
            <stop offset="100%" stopColor="#b01616" />
          </linearGradient>
          <filter id="store-bevel" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="1.5" dy="1.5" stdDeviation="1" floodColor="#000" floodOpacity="0.3" />
          </filter>
          <filter id="bevel-red" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="1.5" dy="1.5" stdDeviation="1" floodColor="#000" floodOpacity="0.3" />
          </filter>
        </defs>

        {/* 1. Behind-the-text Crescent Sweep Orbit using blue glossy gradient */}
        <path
          d="M 120,40 
             C 65,30 25,75 35,115 
             C 45,155 110,180 175,170 
             C 215,165 242,145 252,132
             C 232,150 195,160 162,158
             C 102,154 58,124 54,95
             C 50,68 85,45 125,48 M 150,118 C 120,132 170,165 240,150 C 248,148 245,145 238,146 C 185,153 145,132 162,118"
          fill="url(#blue-gloss)"
          opacity="0.9"
        />

        {/* 2. Antenna Rays - slanted and glossy */}
        <g transform="skewX(-6)">
          {/* Ray 1: Near vertical / blue glossy */}
          <line
            x1="242"
            y1="50"
            x2="249"
            y2="18"
            stroke="url(#blue-gloss)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Ray 2: Upper red-ray */}
          <line
            x1="252"
            y1="56"
            x2="279"
            y2="34"
            stroke="url(#red-gloss)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Ray 3: Middle red-ray */}
          <line
            x1="255"
            y1="64"
            x2="291"
            y2="54"
            stroke="url(#red-gloss)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Ray 4: Lower red-ray */}
          <line
            x1="251"
            y1="72"
            x2="283"
            y2="76"
            stroke="url(#red-gloss)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </g>

        {/* 3. Text "audio" slanted with rounded/heavy feel */}
        <text
          x="38"
          y="93"
          fill="url(#blue-gloss)"
          fontFamily="'Ubuntu', 'Trebuchet MS', 'Inter', system-ui, sans-serif"
          fontWeight="900"
          fontSize="72"
          letterSpacing="-3.5"
          filter="url(#store-bevel)"
          transform="skewX(-6)"
        >
          audio
        </text>

        {/* 4. Text "&" */}
        <text
          x="32"
          y="152"
          fill="url(#blue-gloss)"
          fontFamily="'Ubuntu', 'Trebuchet MS', 'Inter', system-ui, sans-serif"
          fontWeight="900"
          fontSize="66"
          letterSpacing="-3"
          filter="url(#store-bevel)"
          transform="skewX(-6)"
        >
          &amp;
        </text>

        {/* 5. Text "vídeo" with glossy gradient and subtle drop shadow */}
        <text
          x="92"
          y="152"
          fill="url(#red-gloss)"
          fontFamily="'Ubuntu', 'Trebuchet MS', 'Inter', system-ui, sans-serif"
          fontWeight="900"
          fontSize="72"
          letterSpacing="-3.5"
          filter="url(#bevel-red)"
          transform="skewX(-6)"
        >
          vídeo
        </text>
      </svg>
    </div>
  );
}
