'use client';

import { SVGProps } from 'react';

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
}

// Consistent icon system with better accessibility
export function BombIcon({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`bomb-icon ${className}`}
      role="img"
      aria-label="Bomb icon"
      {...props}
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 6L14 9.5 9.5 8 8 12.5l4.5 1.5 1.5-4.5L15.5 8z"/>
      <circle cx="18" cy="6" r="2" fill="currentColor"/>
      <path d="M16.5 4.5L17.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export function GameIcon({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`game-icon ${className}`}
      role="img"
      aria-label="Game controller icon"
      {...props}
    >
      <path d="M17.5 7c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2s2-.9 2-2V9c0-1.1-.9-2-2-2zM6.5 7c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2s2-.9 2-2V9c0-1.1-.9-2-2-2zM12 4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2s2-.9 2-2V6c0-1.1-.9-2-2-2z"/>
    </svg>
  );
}

export function PartyIcon({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`party-icon ${className}`}
      role="img"
      aria-label="Party celebration icon"
      {...props}
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.77 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z"/>
      <circle cx="7" cy="7" r="2" fill="currentColor" opacity="0.6"/>
      <circle cx="17" cy="7" r="2" fill="currentColor" opacity="0.6"/>
      <circle cx="7" cy="17" r="2" fill="currentColor" opacity="0.6"/>
      <circle cx="17" cy="17" r="2" fill="currentColor" opacity="0.6"/>
    </svg>
  );
}

export function UsersIcon({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`users-icon ${className}`}
      role="img"
      aria-label="Users icon"
      {...props}
    >
      <path d="M16 7c0-2.21-1.79-4-4-4S8 4.79 8 7s1.79 4 4 4 4-1.79 4-4zM12 13c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z"/>
      <path d="M18 8c.83 0 1.5-.67 1.5-1.5S18.83 5 18 5s-1.5.67-1.5 1.5S17.17 8 18 8zM6 8c.83 0 1.5-.67 1.5-1.5S6.83 5 6 5s-1.5.67-1.5 1.5S5.17 8 6 8z" opacity="0.6"/>
    </svg>
  );
}

export function HeartIcon({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`heart-icon ${className}`}
      role="img"
      aria-label="Heart icon"
      {...props}
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
  );
}

export function TrophyIcon({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`trophy-icon ${className}`}
      role="img"
      aria-label="Trophy icon"
      {...props}
    >
      <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V8C19 10.76 16.76 13 14 13H10C7.24 13 5 10.76 5 8V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM5 8C5 9.66 6.34 11 8 11H10C11.66 11 13 9.66 13 8V6H5V8ZM9 14H15L16 18H8L9 14ZM7 19H17V21H7V19Z"/>
    </svg>
  );
}

export function FireIcon({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`fire-icon ${className}`}
      role="img"
      aria-label="Fire icon"
      {...props}
    >
      <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.28 2.67-.25 3.85-.72 1.59-2.03 2.99-3.96 4.99z"/>
    </svg>
  );
}

export function SparkleIcon({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`sparkle-icon ${className}`}
      role="img"
      aria-label="Sparkle icon"
      {...props}
    >
      <path d="M12 0l1.09 3.26L16 2l-1.09 3.26L18 4l-1.91 1.94L18 8l-3 .74L16 12l-3.26-1.09L12 14l-1.09-3.26L8 12l1.09-3.26L6 8l1.91-1.94L6 4l3-.74L8 0l1.09 2.26L12 0z"/>
      <circle cx="6" cy="19" r="2" fill="currentColor" opacity="0.7"/>
      <circle cx="18" cy="19" r="1.5" fill="currentColor" opacity="0.5"/>
      <circle cx="21" cy="15" r="1" fill="currentColor" opacity="0.6"/>
    </svg>
  );
}

export function RocketIcon({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`rocket-icon ${className}`}
      role="img"
      aria-label="Rocket icon"
      {...props}
    >
      <path d="M12 2c-4 0-8 4-8 8 0 1.5.5 3 1.3 4.2L2 17.5l3.5-3.3C7 15.5 8.5 16 10 16c4 0 8-4 8-8s-4-8-6-8z"/>
      <circle cx="14" cy="8" r="2" fill="white" opacity="0.8"/>
      <path d="M7 19L9 21L15 15L13 13L7 19Z" opacity="0.6"/>
    </svg>
  );
}

export function SearchIcon({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      className={`search-icon ${className}`}
      role="img"
      aria-label="Search icon"
      {...props}
    >
      <circle cx="11" cy="11" r="7" strokeWidth="2" />
      <line x1="16.65" y1="16.65" x2="21" y2="21" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function ShareIcon({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      className={`share-icon ${className}`}
      role="img"
      aria-label="Share icon"
      {...props}
    >
      <circle cx="18" cy="5" r="3" strokeWidth="2" />
      <circle cx="6" cy="12" r="3" strokeWidth="2" />
      <circle cx="18" cy="19" r="3" strokeWidth="2" />
      <line x1="8.59" y1="10.59" x2="15.41" y2="6.41" strokeWidth="2" strokeLinecap="round" />
      <line x1="8.59" y1="13.41" x2="15.41" y2="17.59" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// Star icon used for ratings, supports filled / outline states
interface StarIconProps extends IconProps {
  filled?: boolean;
}

export function StarIcon({ size = 24, className = '', filled = true, ...props }: StarIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      className={`star-icon ${className}`}
      role="img"
      aria-label={filled ? 'Filled star icon' : 'Outlined star icon'}
      {...props}
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.77 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z" strokeWidth={filled ? 0 : 1.5} />
    </svg>
  );
}

// Icon Wrapper for consistent styling
interface IconWrapperProps {
  children: React.ReactNode;
  variant?: 'default' | 'highlighted' | 'animated' | 'interactive';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function IconWrapper({ 
  children, 
  variant = 'default', 
  size = 'md', 
  className = '' 
}: IconWrapperProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case 'highlighted':
        return 'bg-gradient-to-r from-yellow-400 to-orange-500 p-2 rounded-lg shadow-lg';
      case 'animated':
        return 'animate-float-gentle hover:scale-110 transition-transform duration-300';
      case 'interactive':
        return 'hover:bg-white/10 p-2 rounded-lg transition-all duration-200 cursor-pointer';
      default:
        return '';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'w-4 h-4';
      case 'lg':
        return 'w-8 h-8';
      case 'xl':
        return 'w-12 h-12';
      default:
        return 'w-6 h-6';
    }
  };

  return (
    <div className={`icon-wrapper ${getVariantClasses()} ${getSizeClasses()} ${className}`}>
      {children}
    </div>
  );
}

// Icon Grid for showcasing all icons
export function IconShowcase() {
  const icons = [
    { Component: BombIcon, name: 'Bomb' },
    { Component: GameIcon, name: 'Game' },
    { Component: PartyIcon, name: 'Party' },
    { Component: UsersIcon, name: 'Users' },
    { Component: HeartIcon, name: 'Heart' },
    { Component: TrophyIcon, name: 'Trophy' },
    { Component: FireIcon, name: 'Fire' },
    { Component: SparkleIcon, name: 'Sparkle' },
    { Component: RocketIcon, name: 'Rocket' },
  ];

  return (
    <div className="icon-showcase grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-9 gap-4 p-8">
      {icons.map(({ Component, name }) => (
        <div key={name} className="text-center">
          <IconWrapper variant="highlighted" size="lg">
            <Component size={24} className="text-white" />
          </IconWrapper>
          <p className="text-xs mt-2 text-white/70">{name}</p>
        </div>
      ))}
    </div>
  );
}