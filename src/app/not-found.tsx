import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="text-center space-y-8 max-w-md">
        {/* 404 Icon */}
        <div className="mx-auto w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center">
          <span className="text-4xl">🔍</span>
        </div>

        {/* 404 Message */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-white">
            404 - Seite nicht gefunden
          </h2>
          <p className="text-lg text-gray-300">
            Die gesuchte Seite existiert nicht oder wurde verschoben.
          </p>
        </div>

        {/* Back to Home Button */}
        <Link
          href="/"
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <span>🏠 Zur Startseite</span>
        </Link>
      </div>
    </div>
  );
}
