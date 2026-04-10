export default function TailwindCSS() {
  return (
    // Background gelap deep slate untuk kesan mewah
    <div className="bg-[#050810] min-h-screen text-white p-4 md:p-12 font-sans selection:bg-orange-300 selection:text-black">
      
      {/* Navbar Minimalis Revolusioner */}
      <FlexboxGrid />

      <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-4">
        
        {/* Section Utama - Belajar Tailwind */}
        <div className="md:col-span-8 bg-gradient-to-br from-blue-950/50 to-transparent border border-white/10 p-10 rounded-[3rem] backdrop-blur-sm flex flex-col justify-center">
          <h1 className="text-border text-5xl font-black mb-6 tracking-tight">Belajar tailwind</h1>
          <button className="w-fit bg-blue-950 text-lime-400 px-10 py-4 rounded-2xl shadow-[0_0_30px_rgba(30,58,138,0.5)] font-bold hover:scale-105 transition-all active:scale-95">
            Click me
          </button>
        </div>

        {/* Bento Box: Spacing */}
        <div className="md:col-span-4">
          <Spacing />
        </div>

        {/* Bento Box: Typography */}
        <div className="md:col-span-7">
          <Typography />
        </div>

        {/* Bento Box: Border Radius */}
        <div className="md:col-span-5 bg-white/5 border border-white/10 rounded-[3rem] p-8 flex items-center justify-center gap-4">
          <BorderRadius />
        </div>

        {/* Bento Box: Background Colors */}
        <div className="md:col-span-6">
          <BackgroundColors />
        </div>

        {/* Bento Box: Shadow Effects */}
        <div className="md:col-span-6">
          <ShadowEffects />
        </div>

      </main>
    </div>
  )
}

function FlexboxGrid() {
  return (
    <nav className="flex justify-between items-center bg-blue-900/30 backdrop-blur-xl border border-white/5 p-5 rounded-3xl max-w-6xl mx-auto mb-10 shadow-2xl">
      <h1 className="text-orange-300 text-xl font-black tracking-tighter">MyWebsite</h1>
      <ul className="hidden md:flex space-x-10 font-medium text-sm tracking-widest uppercase">
        <li><a href="#" className="hover:text-orange-300 transition-all">Home</a></li>
        <li><a href="#" className="hover:text-orange-300 transition-all">About</a></li>
        <li><a href="#" className="hover:text-orange-300 transition-all">Contact</a></li>
      </ul>
      <h1 className="text-red-400 text-sm font-bold cursor-pointer bg-red-400/10 px-4 py-2 rounded-xl border border-red-400/20 hover:bg-red-400 hover:text-white transition-all">
        Logout
      </h1>
    </nav>
  )
}

function Spacing() {
  return (
    <div className="bg-blue-950 border border-blue-800/50 p-10 h-full rounded-[3rem] shadow-2xl flex flex-col justify-center">
      <h2 className="text-white text-2xl font-bold mb-4">Card Title</h2>
      <p className="text-orange-300 leading-relaxed italic">
        Ini adalah contoh penggunaan padding dan margin di Tailwind.
      </p>
    </div>
  )
}

function Typography() {
  return (
    <div className="bg-white/5 border border-white/10 p-10 rounded-[3rem] h-full flex flex-col justify-center">
      <h1 className="text-4xl font-extrabold text-blue-400 tracking-tighter mb-4">Tailwind Typography</h1>
      <p className="text-gray-400 text-xl leading-relaxed">
        Belajar Tailwind sangat menyenangkan dan cepat!
      </p>
    </div>
  )
}

function BorderRadius() {
  return (
    <>
      <button className="border-2 border-blue-500 text-orange-300 px-8 py-4 rounded-l-3xl hover:bg-blue-500 hover:text-white transition-all font-bold"> Klik Saya </button>
      <button className="border-2 border-blue-500 text-orange-300 px-8 py-4 rounded-r-3xl hover:bg-blue-500 hover:text-white transition-all font-bold"> Klik Saya </button>
    </>
  )
}

function BackgroundColors() {
  return (
    <div className="bg-blue-900 border border-blue-700 p-10 rounded-[3rem] shadow-xl h-full">
      <h3 className="text-2xl font-bold mb-4">Tailwind Colors</h3>
      <p className="text-blue-100/80 text-lg">
        Belajar Tailwind itu seru dan fleksibel!
      </p>
    </div>
  )
}

function ShadowEffects() {
  return (
    <div className="group relative bg-slate-900 border border-white/5 p-10 rounded-[3rem] overflow-hidden transition-all duration-500 hover:border-orange-300/30 shadow-2xl">
      <div className="relative z-10">
        <h3 className="text-2xl font-bold group-hover:text-orange-300 transition-colors">Hover me!</h3>
        <p className="text-gray-500 mt-4 text-lg">
          Lihat efek bayangan saat hover.
        </p>
      </div>
      {/* Decorative Glow */}
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-600/20 blur-[50px] group-hover:bg-orange-300/20 transition-all duration-700"></div>
    </div>
  )
}