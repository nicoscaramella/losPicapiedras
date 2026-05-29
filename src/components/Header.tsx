import { Phone } from 'lucide-react';

export default function Header() {
  return (
    <header className="fixed top-0 w-full z-50 bg-brand-bg/90 backdrop-blur-xl border-b border-brand-ink/5 transition-all">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 h-20 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-2xl tracking-widest text-brand-ink">L|P</div>
          <div className="hidden sm:block w-px h-6 bg-brand-ink/20"></div>
          <div className="hidden sm:block text-xs uppercase tracking-widest font-semibold text-brand-ink/60">
            Los Picapiedras
          </div>
        </div>
        
        <nav className="hidden md:flex items-center gap-10 text-xs font-semibold uppercase tracking-widest text-brand-ink/60">
          <a href="#catalogo" className="hover:text-brand-ink transition-colors">Colección</a>
          <a href="#contacto" className="hover:text-brand-ink transition-colors">Contacto</a>
        </nav>

        <a 
          href="https://wa.me/5491157362228?text=Hola,%20quisiera%20consultar%20por%20revestimientos." 
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest bg-brand-ink text-brand-bg px-5 py-2.5 hover:bg-brand-ink-muted transition-colors rounded-sm"
        >
          <Phone className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Cotizar</span>
        </a>
      </div>
    </header>
  );
}
