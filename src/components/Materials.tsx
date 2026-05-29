import { ArrowRight } from 'lucide-react';

const MATERIALS = [
  {
    id: 'porfido',
    name: 'Pórfido Patagónico',
    desc: 'Inigualable resistencia al desgaste. Elegancia indestructible para pisos vehiculares y accesos.',
    img: '/images/Porfido/porfido_main.webp',
  },
  {
    id: 'travertino',
    name: 'Mármol Travertino',
    desc: 'Un clásico indiscutido de obras de alta gama. Textura aterciopelada y calidez inconfundible.',
    img: '/images/Travertino/Patron-frances-en-travertino-marmol-piso.webp',
  },
  {
    id: 'zapala',
    name: 'Piedra Zapala',
    desc: 'Solidez patagónica y rusticidad pura. Excelente comportamiento ante temperaturas extremas.',
    img: '/images/Zapala/piedra_zapala1.webp',
  },
  {
    id: 'laja',
    name: 'Laja San Luis',
    desc: 'Sobriedad mineralizada. Placas muy resistentes de relieve sutil e integración botánica.',
    img: '/images/san luis/san luis.webp',
  }
];

export default function Materials() {
  return (
    <section id="catalogo" className="py-20 sm:py-32 bg-brand-bg text-brand-ink">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="mb-16 sm:mb-20 max-w-2xl">
          <h2 className="text-4xl sm:text-5xl md:text-6xl mb-6">Nuestra Colección</h2>
          <p className="text-lg text-brand-ink-muted leading-relaxed font-light">
            Cada bloque es seleccionado rigurosamente en cantera. 
            No vendemos simplemente piedra; proveemos el material definitivo para proyectos que perduran en el tiempo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
          {MATERIALS.map((mat, idx) => (
            <div 
              key={mat.id} 
              className={`group flex flex-col ${idx % 2 !== 0 ? 'md:mt-40' : ''}`}
            >
              <div className="relative overflow-hidden aspect-[4/5] mb-8 bg-brand-surface">
                <img 
                  src={mat.img} 
                  alt={mat.name} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="px-2">
                <h3 className="text-3xl mb-4">{mat.name}</h3>
                <p className="text-brand-ink-muted leading-relaxed mb-8 flex-1 font-light">
                  {mat.desc}
                </p>
                <a 
                  href="#contacto" 
                  className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-widest text-brand-accent hover:text-brand-ink transition-colors"
                >
                  Consultar Valor <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
