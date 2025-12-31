export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4 text-center">
          Live AI Dashboard
        </h1>
        <p className="text-gray-400 text-center mb-8">
          Voice AI Agent Session Monitoring
        </p>
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-8 border border-gray-800">
          <div className="text-center text-gray-300">
            <p className="mb-4">
              Environment successfully initialized with:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Next.js 16 with App Router</li>
              <li>React 19</li>
              <li>TypeScript</li>
              <li>Tailwind CSS with Dark Mode</li>
              <li>ESLint & Prettier</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
