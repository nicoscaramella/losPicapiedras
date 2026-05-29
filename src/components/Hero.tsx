import { ArrowRight, Phone } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/Travertino/travertino_vivienda.webp" 
          alt="Fachada moderna de piedra premium" 
          className="w-full h-full object-cover"
          fetchPriority="high"
        />
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-ink/90 via-brand-ink/60 to-transparent"></div>
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 py-20">
        <div className="max-w-2xl text-brand-bg">
          <div className="inline-block border border-brand-accent/50 text-brand-accent px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-8 backdrop-blur-sm bg-brand-ink/30">
            Revestimientos Premium
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl leading-tight mb-8">
            La naturaleza en su máxima expresión.
          </h1>
          
          <p className="text-base sm:text-xl text-brand-bg/90 mb-10 sm:mb-12 font-sans font-light leading-relaxed max-w-xl">
            Seleccionamos y trabajamos las piedras más nobles de la Patagonia y Cuyo. 
            Calidad atemporal para frentes, fachadas y pisos de alto tránsito.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <a 
              href="#catalogo" 
              className="w-full sm:w-auto bg-brand-accent hover:bg-brand-accent/90 text-brand-bg px-8 py-4 rounded-sm font-semibold flex items-center justify-center gap-3 transition-colors text-sm tracking-wide min-h-[56px]"
            >
              Explorar Catálogo
              <ArrowRight className="w-4 h-4" />
            </a>
            <a 
              href="https://wa.me/5491157362228?text=Hola,%20quisiera%20consultar%20por%20revestimientos%20premium." 
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-brand-bg px-8 py-4 rounded-sm font-semibold flex items-center justify-center gap-3 transition-colors text-sm tracking-wide min-h-[56px]"
            >
              <Phone className="w-4 h-4" />
              Cotizar por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
