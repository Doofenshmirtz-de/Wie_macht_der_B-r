"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { getGames, getInitialGames, type GameCard, type GetGamesResult } from '../lib/game-actions';

interface ItemListProps {
  initialData?: GetGamesResult;
  itemsPerLoad?: number;
  renderItem: (item: GameCard, index: number) => React.ReactNode;
  loadingComponent?: React.ReactNode;
  errorComponent?: React.ReactNode;
  className?: string;
  direction?: 'vertical' | 'horizontal';
}

interface LoadingState {
  forward: boolean;
  backward: boolean;
  error: string | null;
}

export function ItemList({
  initialData,
  itemsPerLoad = 3,
  renderItem,
  loadingComponent,
  errorComponent,
  className = '',
  direction = 'horizontal'
}: ItemListProps) {
  // State Management
  const [items, setItems] = useState<GameCard[]>(initialData?.games || []);
  const [loading, setLoading] = useState<LoadingState>({
    forward: false,
    backward: false,
    error: null
  });
  const [hasMoreForward, setHasMoreForward] = useState(initialData?.hasMore ?? true);
  const [hasMoreBackward, setHasMoreBackward] = useState(() => {
    // Sofort aktivieren wenn initialData vorhanden ist
    return initialData?.games?.length ? true : false;
  });
  const [forwardOffset, setForwardOffset] = useState(initialData?.nextOffset || itemsPerLoad);
  // Initialer backwardOffset für sofortiges Rückwärts-Scrollen
  const [backwardOffset, setBackwardOffset] = useState(() => {
    if (initialData?.total) {
      return initialData.total - itemsPerLoad; // Vom Ende der Liste
    }
    return 10 - itemsPerLoad; // Fallback: 10 Spiele angenommen
  });
  
  // Refs für Scroll-Position Management
  const containerRef = useRef<HTMLDivElement>(null);
  const previousScrollHeight = useRef<number>(0);
  
  // Debouncing für Load-Requests
  const loadTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Intersection Observer für Forward Loading (unten/rechts)
  const { ref: forwardRef, inView: forwardInView } = useInView({
    threshold: 0.1,
    rootMargin: direction === 'vertical' ? '200px 0px' : '0px 200px',
  });
  
  // Intersection Observer für Backward Loading (oben/links)
  const { ref: backwardRef, inView: backwardInView } = useInView({
    threshold: 0.1,
    rootMargin: direction === 'vertical' ? '200px 0px' : '0px 200px',
  });

  // Debounced Loading Function
  const debouncedLoad = useCallback((direction: 'forward' | 'backward') => {
    if (loadTimeoutRef.current) {
      clearTimeout(loadTimeoutRef.current);
    }
    
    loadTimeoutRef.current = setTimeout(() => {
      if (direction === 'forward') {
        loadMoreForward();
      } else {
        loadMoreBackward();
      }
    }, 300); // 300ms Debounce
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Forward Loading (nach rechts/unten)
  const loadMoreForward = useCallback(async () => {
    if (loading.forward || !hasMoreForward) return;
    
    setLoading(prev => ({ ...prev, forward: true, error: null }));
    
    try {
      const result = await getGames({
        offset: forwardOffset,
        limit: itemsPerLoad,
        direction: 'forward'
      });
      
      setItems(prev => [...prev, ...result.games]);
        setHasMoreForward(result.hasMore);
        setForwardOffset(result.nextOffset);
      
      console.log(`✅ Loaded ${result.games.length} forward items`);
    } catch (error) {
      console.error('❌ Error loading forward items:', error);
      setLoading(prev => ({ ...prev, error: 'Fehler beim Laden der Spiele' }));
    } finally {
      setLoading(prev => ({ ...prev, forward: false }));
    }
  }, [forwardOffset, itemsPerLoad, hasMoreForward, loading.forward]);

  // Backward Loading (nach links/oben)  
  const loadMoreBackward = useCallback(async () => {
    if (loading.backward || !hasMoreBackward || items.length === 0) return;
    
    setLoading(prev => ({ ...prev, backward: true, error: null }));
    
    // Scroll-Position merken für nahtloses Laden
    const container = containerRef.current;
    if (container) {
      previousScrollHeight.current = direction === 'vertical' 
        ? container.scrollHeight 
        : container.scrollWidth;
    }
    
      try {
        // Für zirkuläres Backward Loading - berechne offset basierend auf backwardOffset
        console.log(`🔄 Loading backward: backwardOffset=${backwardOffset}`);
        
        const result = await getGames({
          offset: backwardOffset,
          limit: itemsPerLoad,
          direction: 'backward'
        });
        
        if (result.games.length > 0) {
          setItems(prev => [...result.games, ...prev]);
          setBackwardOffset(result.nextOffset); // Update backward offset
          
          console.log(`✅ Loaded ${result.games.length} backward items`);
          
          // Scroll-Position nach dem Laden korrigieren
          setTimeout(() => {
            if (container) {
              const newHeight = direction === 'vertical' 
                ? container.scrollHeight 
                : container.scrollWidth;
              const heightDiff = newHeight - previousScrollHeight.current;
              
              if (direction === 'vertical') {
                container.scrollTop += heightDiff;
              } else {
                container.scrollLeft += heightDiff;
              }
            }
          }, 50);
        }
      
    } catch (error) {
      console.error('❌ Error loading backward items:', error);
      setLoading(prev => ({ ...prev, error: 'Fehler beim Laden der Spiele' }));
    } finally {
      setLoading(prev => ({ ...prev, backward: false }));
    }
  }, [backwardOffset, itemsPerLoad, hasMoreBackward, loading.backward, items, direction]);

  // Initial Data Loading (falls nicht per SSR bereitgestellt)
  useEffect(() => {
    if (!initialData && items.length === 0) {
      const loadInitial = async () => {
        setLoading(prev => ({ ...prev, forward: true }));
        try {
          const result = await getInitialGames();
          setItems(result.games);
          setHasMoreForward(result.hasMore);
          setForwardOffset(result.nextOffset);
          // Initialer Backward Offset - von Position 0 aus rückwärts (zum Ende der Liste)
          const totalGames = result.total || 10;
          setBackwardOffset(totalGames - itemsPerLoad); // Starte am Ende für Rückwärts-Scrollen
          // Sofort Backward aktivieren nach dem Laden
          setHasMoreBackward(true);
        } catch (error) {
          console.error('❌ Error loading initial items:', error);
          setLoading(prev => ({ ...prev, error: 'Fehler beim Laden der Spiele' }));
        } finally {
          setLoading(prev => ({ ...prev, forward: false }));
        }
      };
      
      loadInitial();
    }
  }, [initialData, items.length, itemsPerLoad]);

  // Debug-Logging für hasMoreBackward Status
  useEffect(() => {
    console.log(`📊 Debug - hasMoreBackward: ${hasMoreBackward}, items: ${items.length}, initialData: ${!!initialData}`);
  }, [hasMoreBackward, items.length, initialData]);

  // Update hasMoreBackward - für zirkuläres Scrollen sofort verfügbar
  useEffect(() => {
    // Zirkuläres Scrollen bedeutet: Backward ist immer möglich sobald wir Items haben
    const canLoadBackward = items.length > 0;
    
    // Nur setzen wenn sich der Wert ändert um Endlos-Updates zu vermeiden
    if (canLoadBackward !== hasMoreBackward) {
      setHasMoreBackward(canLoadBackward);
      console.log(`🔄 Backward Update: items=${items.length}, canLoadBackward=${canLoadBackward} (sofort verfügbar)`);
    }
  }, [items.length, hasMoreBackward]);

  // Forward Intersection Observer
  useEffect(() => {
    if (forwardInView && !loading.forward && hasMoreForward) {
      console.log('🔄 Forward intersection detected, loading more...');
      debouncedLoad('forward');
    }
  }, [forwardInView, loading.forward, hasMoreForward, debouncedLoad]);

  // Backward Intersection Observer  
  useEffect(() => {
    if (backwardInView && !loading.backward && hasMoreBackward) {
      console.log('🔄 Backward intersection detected, loading more...');
      debouncedLoad('backward');
    }
  }, [backwardInView, loading.backward, hasMoreBackward, debouncedLoad]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (loadTimeoutRef.current) {
        clearTimeout(loadTimeoutRef.current);
      }
    };
  }, []);

  // Loading Component
  const LoadingSpinner = loadingComponent || (
    <div className="flex items-center justify-center p-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400"></div>
      <span className="ml-3 text-white/80">Lade Spiele...</span>
    </div>
  );

  // Error Component
  const ErrorDisplay = errorComponent || (
    <div className="text-center p-8 text-red-400">
      <p>{loading.error}</p>
      <button 
        onClick={() => setLoading(prev => ({ ...prev, error: null }))}
        className="mt-2 px-4 py-2 bg-red-500/20 rounded-lg hover:bg-red-500/30 transition-colors"
      >
        Erneut versuchen
      </button>
    </div>
  );

  if (loading.error) {
    return ErrorDisplay;
  }

  const containerClasses = direction === 'vertical'
    ? `space-y-8 ${className}`
    : `flex gap-8 overflow-x-auto snap-x snap-mandatory pb-8 pt-4 px-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth ${className}`;

  return (
    <div className="relative">
      <div 
        ref={containerRef}
        className={containerClasses}
        style={{ scrollBehavior: 'smooth' }}
      >
        {/* Backward Loading Trigger - immer rendern für zirkuläres Scrollen */}
        {items.length > 0 && (
          <div ref={backwardRef} className={direction === 'vertical' ? 'h-4' : 'min-w-4'}>
            {loading.backward && LoadingSpinner}
          </div>
        )}

        {/* Items */}
        {items.map((item, index) => (
          <div key={`item-${item.id}-pos-${index}`} className={direction === 'horizontal' ? 'snap-center flex-shrink-0' : ''}>
            {renderItem(item, index)}
          </div>
        ))}

        {/* Forward Loading Trigger */}
        {hasMoreForward && (
          <div ref={forwardRef} className={direction === 'vertical' ? 'h-4' : 'min-w-4'}>
            {loading.forward && LoadingSpinner}
          </div>
        )}
      </div>

      {/* Scroll Indicators (nur für horizontales Scrollen) */}
      {direction === 'horizontal' && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          <div className="w-3 h-3 bg-yellow-400/50 rounded-full animate-pulse"></div>
          <div className="w-3 h-3 bg-yellow-400/30 rounded-full animate-pulse delay-100"></div>
          <div className="w-3 h-3 bg-yellow-400/20 rounded-full animate-pulse delay-200"></div>
        </div>
      )}

      {/* Debug Info deaktiviert - alles funktioniert */}
      {false && process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 right-4 bg-black/90 text-white p-3 rounded text-xs max-w-xs z-50 border border-yellow-400">
          <div className="font-bold text-yellow-400 mb-1">🐛 DEBUG:</div>
          <div>Items: {items.length}</div>
          <div>Forward: {hasMoreForward ? '✅' : '❌'} (Offset: {forwardOffset})</div>
          <div>Backward: {hasMoreBackward ? '✅' : '❌'} (Offset: {backwardOffset})</div>
          <div>InitData: {initialData ? '✅' : '❌'}</div>
          <div>Loading: {JSON.stringify(loading)}</div>
        </div>
      )}
    </div>
  );
}
