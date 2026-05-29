import { Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contacto" className="bg-brand-ink text-brand-bg pt-16 pb-[max(3rem,env(safe-area-inset-bottom))] sm:py-32 border-t border-brand-ink-muted/20">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16">
        <div>
          <h2 className="text-4xl sm:text-5xl mb-8 text-brand-bg">Hablemos de tu obra.</h2>
          <p className="text-brand-bg/70 mb-16 font-light text-lg max-w-md leading-relaxed">
            Envíanos un mensaje para coordinar una visita a nuestro showroom en Berazategui o solicitar un presupuesto a medida.
          </p>
          
          <div className="space-y-8">
            <a 
              href="https://wa.me/5491157362228?text=Hola,%20quisiera%20consultar%20por%20revestimientos." 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-6 group"
            >
              <div className="w-14 h-14 rounded-full border border-brand-bg/20 flex items-center justify-center group-hover:border-brand-accent transition-colors">
                <Phone className="w-5 h-5 text-brand-bg group-hover:text-brand-accent transition-colors" />
              </div>
              <div>
                <span className="block text-xs text-brand-bg/50 uppercase tracking-widest mb-1.5 font-semibold">WhatsApp Ventas</span>
                <span className="text-2xl text-brand-bg group-hover:text-brand-accent transition-colors">+54 9 11 5736 2228</span>
              </div>
            </a>
            
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 rounded-full border border-brand-bg/20 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-brand-bg" />
              </div>
              <div>
                <span className="block text-xs text-brand-bg/50 uppercase tracking-widest mb-1.5 font-semibold">Showroom Central</span>
                <span className="text-xl text-brand-bg">Cno. Gral. Belgrano y C. 206</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex md:justify-end items-end pt-12 md:pt-0">
          <div className="text-left md:text-right w-full md:w-auto border-t border-brand-bg/10 md:border-none pt-8 md:pt-0">
            <div className="text-5xl mb-6 text-brand-bg/30 tracking-widest">L|P</div>
            <p className="text-brand-bg/40 font-sans text-xs uppercase tracking-widest leading-loose font-semibold">
              © {new Date().getFullYear()} Los Picapiedras
              <br />Revestimientos de Origen
              <br />Berazategui, Buenos Aires
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
