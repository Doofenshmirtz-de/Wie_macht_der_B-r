'use client';

import { useRouter } from 'next/navigation';

export default function OfflinePage() {
  const router = useRouter();

  const handleRetry = () => {
    if (navigator.onLine) {
      router.refresh();
    } else {
      window.location.reload();
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="text-center space-y-8 max-w-md">
        {/* Offline Icon */}
        <div className="mx-auto w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center">
          <svg
            className="w-12 h-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M18.364 5.636l-12.728 12.728m0-12.728l12.728 12.728M12 2.252A9.998 9.998 0 0021.748 12 9.998 9.998 0 0012 21.748 9.998 9.998 0 002.252 12 9.998 9.998 0 0012 2.252z"
            />
          </svg>
        </div>








        {/* Offline Message */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-white">
            🔌 Du bist offline
          </h2>
          <p className="text-lg text-gray-300">
            Es scheint, als hättest du keine Internetverbindung. Überprüfe deine Verbindung und versuche es erneut.
          </p>
        </div>

        {/* Retry Button */}
        <button
          onClick={handleRetry}
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          <span>Erneut versuchen</span>
        </button>

        {/* Offline Game Hint */}
        <div className="mt-8 p-4 bg-gray-800 rounded-lg border border-gray-700">
          <h3 className="text-yellow-400 font-semibold mb-2">💡 Tipp</h3>
          <p className="text-sm text-gray-300">
            Einige Spiele können auch offline gespielt werden, sobald sie einmal geladen wurden.
            Versuche zur Startseite zurückzukehren.
          </p>
        </div>

        {/* Network Status Indicator */}
        <div className="text-xs text-gray-500">
          Status: <span className={navigator.onLine ? 'text-green-400' : 'text-red-400'}>
            {navigator.onLine ? 'Online' : 'Offline'}
          </span>
        </div>
      </div>
    </div>
  );
}
