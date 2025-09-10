'use client';

import React from 'react';

interface IconProps {
  size?: number;
  className?: string;
  color?: string;
}

// 🔥 Bomb Icon - Enhanced
export function BombIcon({ size = 24, className = '', color = 'currentColor' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={`bomb-icon ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="bombGradient" cx="0.3" cy="0.3" r="0.7">
          <stop offset="0%" stopColor="#FCD34D" />
          <stop offset="50%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </radialGradient>
        <filter id="bombGlow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Fuse */}
      <path
        d="M14 4l2-2 1 1-2 2M16 6l1-1"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        className="animate-pulse"
      />
      
      {/* Bomb Body */}
      <circle
        cx="11"
        cy="13"
        r="8"
        fill="url(#bombGradient)"
        filter="url(#bombGlow)"
        className="drop-shadow-lg"
      />
      
      {/* Highlight */}
      <ellipse
        cx="9"
        cy="10"
        rx="2.5"
        ry="3"
        fill="rgba(255, 255, 255, 0.3)"
        className="animate-pulse"
      />
      
      {/* Spark */}
      <circle
        cx="15"
        cy="5"
        r="1"
        fill="#FCD34D"
        className="animate-ping"
      />
    </svg>
  );
}

// 🎮 Game Icon - Enhanced
export function GameIcon({ size = 24, className = '', color = 'currentColor' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={`game-icon ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="gameGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EC4899" />
          <stop offset="50%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#10B981" />
        </linearGradient>
      </defs>
      
      {/* Controller Body */}
      <path
        d="M7 12h10l2 6H5l2-6z"
        fill="url(#gameGradient)"
        className="drop-shadow-md"
      />
      
      {/* D-Pad */}
      <rect x="8" y="14" width="1" height="3" fill="white" rx="0.5" />
      <rect x="7" y="15" width="3" height="1" fill="white" rx="0.5" />
      
      {/* Action Buttons */}
      <circle cx="15" cy="14.5" r="0.8" fill="white" opacity="0.9" />
      <circle cx="16.5" cy="16" r="0.8" fill="white" opacity="0.7" />
      
      {/* Screen */}
      <rect
        x="8"
        y="7"
        width="8"
        height="5"
        rx="1"
        fill="rgba(0, 0, 0, 0.8)"
        stroke={color}
        strokeWidth="1"
      />
      
      {/* Screen Content */}
      <rect x="9" y="8" width="6" height="1" fill="#10B981" rx="0.5" />
      <rect x="9" y="9.5" width="4" height="1" fill="#F59E0B" rx="0.5" />
      <rect x="9" y="11" width="5" height="1" fill="#EC4899" rx="0.5" />
    </svg>
  );
}

// ⭐ Star Rating - Enhanced
export function StarIcon({ size = 20, className = '', filled = false }: IconProps & { filled?: boolean }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={`star-icon ${className} ${filled ? 'star-filled' : 'star-empty'}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FCD34D" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
        <filter id="starGlow">
          <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      <path
        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
        fill={filled ? "url(#starGradient)" : "none"}
        stroke={filled ? "none" : "#FCD34D"}
        strokeWidth="2"
        filter={filled ? "url(#starGlow)" : "none"}
        className={filled ? "animate-pulse" : ""}
      />
    </svg>
  );
}

// 🔍 Search Icon - Enhanced
export function SearchIcon({ size = 24, className = '', color = 'currentColor' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={`search-icon ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="searchGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
      </defs>
      
      {/* Magnifying Glass */}
      <circle
        cx="11"
        cy="11"
        r="8"
        stroke="url(#searchGradient)"
        strokeWidth="2"
        fill="none"
        className="animate-pulse"
      />
      
      {/* Handle */}
      <path
        d="M21 21l-4.35-4.35"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        className="animate-pulse"
      />
      
      {/* Inner Glow */}
      <circle
        cx="11"
        cy="11"
        r="4"
        fill="none"
        stroke="rgba(96, 165, 250, 0.3)"
        strokeWidth="1"
        className="animate-ping"
      />
    </svg>
  );
}

// 👥 Users Icon - Enhanced  
export function UsersIcon({ size = 24, className = '', color = 'currentColor' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={`users-icon ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="usersGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
      </defs>
      
      {/* User 1 */}
      <circle cx="9" cy="7" r="4" fill="url(#usersGradient)" className="animate-pulse" />
      <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" stroke={color} strokeWidth="2" fill="none" />
      
      {/* User 2 */}
      <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      <path d="M21 21v-2a4 4 0 0 0-3-3.85" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}

// 📤 Share Icon - Enhanced
export function ShareIcon({ size = 24, className = '', color = 'currentColor' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={`share-icon ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="shareGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="50%" stopColor="#EC4899" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
      
      {/* Nodes */}
      <circle cx="18" cy="5" r="3" fill="url(#shareGradient)" className="animate-pulse" />
      <circle cx="6" cy="12" r="3" fill="url(#shareGradient)" className="animate-pulse" />
      <circle cx="18" cy="19" r="3" fill="url(#shareGradient)" className="animate-pulse" />
      
      {/* Connections */}
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" stroke={color} strokeWidth="2" className="animate-pulse" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" stroke={color} strokeWidth="2" className="animate-pulse" />
    </svg>
  );
}

// 🏆 Trophy Icon - Enhanced
export function TrophyIcon({ size = 24, className = '', color = 'currentColor' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={`trophy-icon ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="trophyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FCD34D" />
          <stop offset="50%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
        <filter id="trophyGlow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Trophy Cup */}
      <path
        d="M7 8h10l-1 8H8l-1-8z"
        fill="url(#trophyGradient)"
        filter="url(#trophyGlow)"
        className="animate-glow-pulse"
      />
      
      {/* Handles */}
      <path d="M17 8h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2" stroke={color} strokeWidth="2" fill="none" />
      <path d="M7 8H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2" stroke={color} strokeWidth="2" fill="none" />
      
      {/* Base */}
      <path d="M9 19h6" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M10 22h4" stroke={color} strokeWidth="2" strokeLinecap="round" />
      
      {/* Shine */}
      <ellipse cx="10" cy="11" rx="1" ry="2" fill="rgba(255, 255, 255, 0.4)" className="animate-pulse" />
    </svg>
  );
}
