export default function ValueProp() {
  return (
    <section className="py-20 sm:py-48 bg-brand-surface text-center">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl sm:text-4xl md:text-5xl text-brand-ink mb-10 sm:mb-12 leading-relaxed">
          "Un revestimiento no debería ser temporal. Creemos en materiales nobles que envejecen con dignidad."
        </h2>
        <div className="w-16 h-px bg-brand-accent mx-auto mb-16 sm:mb-20"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
          <div>
            <h4 className="text-xl mb-4 text-brand-ink">Origen Genuino</h4>
            <p className="text-brand-ink-muted font-light leading-relaxed">Piedras extraídas directamente de las mejores canteras de Argentina. Autenticidad en cada corte.</p>
          </div>
          <div>
            <h4 className="text-xl mb-4 text-brand-ink">Asesoramiento</h4>
            <p className="text-brand-ink-muted font-light leading-relaxed">Te guiamos en la selección técnica y los métodos de colocación para asegurar un acabado inmejorable.</p>
          </div>
          <div>
            <h4 className="text-xl mb-4 text-brand-ink">Durabilidad</h4>
            <p className="text-brand-ink-muted font-light leading-relaxed">Materiales geológicos resistentes a climas extremos, manteniendo su color y textura intactos por décadas.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
