'use client';

interface SectionDividerProps {
  variant?: 'default' | 'gradient' | 'decorative' | 'minimal';
  className?: string;
  showIcon?: boolean;
  icon?: string;
}

export function SectionDivider({ 
  variant = 'default', 
  className = '',
  showIcon = false,
  icon = '⭐'
}: SectionDividerProps) {
  
  const getVariantClasses = () => {
    switch (variant) {
      case 'gradient':
        return 'py-16 relative overflow-hidden';
      case 'decorative':
        return 'py-20 relative';
      case 'minimal':
        return 'py-8';
      default:
        return 'py-12 relative';
    }
  };

  if (variant === 'minimal') {
    return (
      <div className={`${getVariantClasses()} ${className}`}>
        <div className="max-w-screen-lg mx-auto px-4">
          <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        </div>
      </div>
    );
  }

  if (variant === 'gradient') {
    return (
      <div className={`${getVariantClasses()} ${className}`}>
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent"></div>
        
        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-yellow-400/30 rounded-full animate-pulse"
              style={{
                left: `${20 + i * 15}%`,
                top: '50%',
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${2 + i * 0.3}s`,
              }}
            />
          ))}
        </div>

        <div className="relative max-w-screen-lg mx-auto px-4 flex items-center justify-center">
          {showIcon && (
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-3 rounded-full shadow-xl animate-float-gentle">
              <span className="text-2xl block" role="img" aria-label="Section divider icon">
                {icon}
              </span>
            </div>
          )}
        </div>

        {/* Bottom Line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent"></div>
      </div>
    );
  }

  if (variant === 'decorative') {
    return (
      <div className={`${getVariantClasses()} ${className}`}>
        {/* Complex Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/20 via-purple-900/20 to-pink-900/20 blur-3xl"></div>
          <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-400/10 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-blue-400/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-screen-lg mx-auto px-4">
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-8">
              {/* Left decorative line */}
              <div className="w-16 sm:w-24 lg:w-32 h-px bg-gradient-to-r from-transparent to-yellow-400/60"></div>
              
              {/* Center icon */}
              {showIcon && (
                <div className="relative">
                  <div className="absolute inset-0 bg-yellow-400/30 rounded-full blur-xl"></div>
                  <div className="relative bg-gradient-to-br from-yellow-400 to-orange-500 p-4 rounded-full shadow-2xl border-2 border-yellow-300/50">
                    <span className="text-3xl block animate-float-gentle" role="img" aria-label="Section divider icon">
                      {icon}
                    </span>
                  </div>
                </div>
              )}
              
              {/* Right decorative line */}
              <div className="w-16 sm:w-24 lg:w-32 h-px bg-gradient-to-l from-transparent to-yellow-400/60"></div>
            </div>
          </div>
          
          {/* Decorative dots */}
          <div className="flex justify-center mt-8">
            <div className="flex gap-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-yellow-400/40 rounded-full animate-pulse"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className={`${getVariantClasses()} ${className}`}>
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
      
      <div className="relative max-w-screen-lg mx-auto px-4 flex items-center justify-center">
        <div className="flex items-center gap-6">
          {/* Left line */}
          <div className="w-12 sm:w-20 lg:w-32 h-px bg-gradient-to-r from-transparent to-white/30"></div>
          
          {/* Center content */}
          {showIcon ? (
            <div className="bg-white/10 backdrop-blur-sm p-3 rounded-full border border-white/20">
              <span className="text-xl text-yellow-400" role="img" aria-label="Section divider icon">
                {icon}
              </span>
            </div>
          ) : (
            <div className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-lg"></div>
          )}
          
          {/* Right line */}
          <div className="w-12 sm:w-20 lg:w-32 h-px bg-gradient-to-l from-transparent to-white/30"></div>
        </div>
      </div>
    </div>
  );
}

// Enhanced Section Container with better visual hierarchy
interface SectionContainerProps {
  children: React.ReactNode;
  variant?: 'default' | 'highlight' | 'accent' | 'minimal';
  className?: string;
  id?: string;
}

export function SectionContainer({ 
  children, 
  variant = 'default', 
  className = '',
  id 
}: SectionContainerProps) {
  
  const getVariantClasses = () => {
    switch (variant) {
      case 'highlight':
        return 'py-20 relative bg-gradient-to-br from-purple-900/20 to-blue-900/20';
      case 'accent':
        return 'py-16 relative bg-gradient-to-r from-indigo-900/10 to-purple-900/10';
      case 'minimal':
        return 'py-12';
      default:
        return 'py-16 relative';
    }
  };

  return (
    <section id={id} className={`${getVariantClasses()} ${className}`}>
      {variant !== 'minimal' && (
        <>
          {/* Background decorations */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-yellow-400/5 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -right-20 w-32 h-32 bg-blue-400/5 rounded-full blur-3xl"></div>
          </div>
          
          {/* Top border */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        </>
      )}
      
      <div className="relative">
        {children}
      </div>
      
      {variant !== 'minimal' && (
        /* Bottom border */
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      )}
    </section>
  );
}
