'use client';

import { useState } from 'react';
import { useResponsive } from '../hooks/useResponsive';

interface ResponsiveDebugPanelProps {
  enabled?: boolean;
}

export function ResponsiveDebugPanel({ enabled = process.env.NODE_ENV === 'development' }: ResponsiveDebugPanelProps) {
  const [isVisible, setIsVisible] = useState(false);
  const responsive = useResponsive();

  if (!enabled) return null;

  return (
    <div className="fixed top-4 left-4 z-50">
      {/* Toggle Button */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="bg-purple-600 text-white px-3 py-2 rounded-lg text-xs font-bold shadow-lg hover:bg-purple-700 transition-colors"
      >
        📱 Debug
      </button>

      {/* Debug Panel */}
      {isVisible && (
        <div className="absolute top-full left-0 mt-2 bg-black/90 backdrop-blur-sm text-white p-4 rounded-lg min-w-[300px] text-xs font-mono">
          <h3 className="text-yellow-400 font-bold mb-3">📱 Responsive Debug Info</h3>
          
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-green-400 font-semibold mb-1">Device Type:</h4>
                <div className="space-y-1">
                  <div className={responsive.isMobile ? 'text-green-400' : 'text-gray-500'}>
                    📱 Mobile: {responsive.isMobile ? 'YES' : 'NO'}
                  </div>
                  <div className={responsive.isTablet ? 'text-green-400' : 'text-gray-500'}>
                    📋 Tablet: {responsive.isTablet ? 'YES' : 'NO'}
                  </div>
                  <div className={responsive.isDesktop ? 'text-green-400' : 'text-gray-500'}>
                    🖥️ Desktop: {responsive.isDesktop ? 'YES' : 'NO'}
                  </div>
                  <div className={responsive.isLargeDesktop ? 'text-green-400' : 'text-gray-500'}>
                    🖥️ Large: {responsive.isLargeDesktop ? 'YES' : 'NO'}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-blue-400 font-semibold mb-1">Screen Info:</h4>
                <div className="space-y-1">
                  <div>📏 Width: {responsive.screenWidth}px</div>
                  <div>📐 Height: {responsive.screenHeight}px</div>
                  <div>🔄 Orientation: {responsive.orientation}</div>
                  <div>🎯 DPR: {responsive.devicePixelRatio}</div>
                </div>
              </div>
            </div>

            <div className="border-t border-white/20 pt-2 mt-3">
              <h4 className="text-purple-400 font-semibold mb-1">Input Methods:</h4>
              <div className={responsive.isTouch ? 'text-green-400' : 'text-gray-500'}>
                👆 Touch: {responsive.isTouch ? 'YES' : 'NO'}
              </div>
            </div>

            <div className="border-t border-white/20 pt-2 mt-3">
              <h4 className="text-orange-400 font-semibold mb-1">Breakpoints:</h4>
              <div className="text-gray-400 text-xs">
                <div>Mobile: 0px - 639px</div>
                <div>Tablet: 640px - 1023px</div>
                <div>Desktop: 1024px - 1279px</div>
                <div>Large: 1280px+</div>
              </div>
            </div>

            <div className="border-t border-white/20 pt-2 mt-3">
              <h4 className="text-red-400 font-semibold mb-1">Viewport Test:</h4>
              <div className="grid grid-cols-4 gap-1 text-center text-xs">
                <div className="bg-red-500 p-1 rounded block sm:hidden">XS</div>
                <div className="bg-orange-500 p-1 rounded hidden sm:block md:hidden">SM</div>
                <div className="bg-yellow-500 p-1 rounded hidden md:block lg:hidden">MD</div>
                <div className="bg-green-500 p-1 rounded hidden lg:block xl:hidden">LG</div>
                <div className="bg-blue-500 p-1 rounded hidden xl:block">XL</div>
              </div>
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-white/20">
            <button
              onClick={() => setIsVisible(false)}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-1 px-2 rounded text-xs font-semibold transition-colors"
            >
              ✖️ Close Debug Panel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
