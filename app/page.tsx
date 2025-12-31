import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-white flex flex-col justify-center items-center overflow-hidden">
      {/* Hero Section Container */}
      <div className="container mx-auto px-6 py-12 flex flex-col lg:flex-row items-center gap-12 z-10">

        {/* Text Content */}
        <div className="flex-1 text-center lg:text-left space-y-8 animate-in fade-in slide-in-from-left-8 duration-1000">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-600">
              Live AI Dashboard
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-2xl leading-relaxed">
              Experience the future of communication. Our platform provides real-time monitoring and analytics for simulated Voice AI agent sessions.
            </p>
          </div>

          {/* Call to Action */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
            <Link
              href="/dashboard"
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-full transition-all transform hover:scale-105 shadow-lg shadow-indigo-500/20 text-lg"
            >
              Enter Dashboard
            </Link>
            <span className="text-gray-500 text-sm italic">
              Real-time Simulation Environment
            </span>
          </div>
        </div>

        {/* Hero Image Section */}
        <div className="flex-1 relative w-full aspect-square max-w-[500px] animate-in fade-in zoom-in duration-1000 delay-200">
          <div className="absolute inset-0 bg-indigo-500/10 rounded-full blur-3xl"></div>
          <Image
            src="/hero-droid.jpg"
            alt="Futuristic AI Droid"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px"
            priority
            className="object-cover rounded-3xl border border-gray-800 shadow-2xl"
          />
        </div>
      </div>

      {/* Subtle Background Elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-900/30 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[120px]"></div>
      </div>
    </main>
  )
}
