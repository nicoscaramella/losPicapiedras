import { useState, useEffect } from 'react';
import { STONES } from '../data';
import { Calculator as CalcIcon, FileText, ArrowRight } from 'lucide-react';

export default function Calculator() {
  const [calcStone, setCalcStone] = useState<string>('riojana');
  const [widthInput, setWidthInput] = useState<string>('');
  const [heightInput, setHeightInput] = useState<string>('');
  const [useCase, setUseCase] = useState<'pared' | 'piso'>('pared');
  const [wasteFactor, setWasteFactor] = useState<boolean>(true);
  const [quoteResult, setQuoteResult] = useState<any>(null);

  useEffect(() => {
    const w = parseFloat(widthInput.replace(',', '.'));
    const h = parseFloat(heightInput.replace(',', '.'));
    
    if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) {
      setQuoteResult(null);
      return;
    }

    let area = w * h;
    if (wasteFactor) {
      area = area * 1.1; // Add 10% waste buffer
    }

    const selectedStoneObj = STONES.find(s => s.id === calcStone) || STONES[0];
    const weight = Math.round(area * selectedStoneObj.weightPerM2);
    
    // 1 bag of high-performance flexible adhesive covers roughly 4.5m2 of stone
    const adhesiveBags = Math.ceil(area / 4.5);

    let joints = "5 a 8 mm";
    if (selectedStoneObj.id === 'riojana') {
      joints = "10 a 15 mm";
    } else if (selectedStoneObj.id === 'travertino') {
      joints = "2 a 3 mm";
    }

    setQuoteResult({
      stoneName: selectedStoneObj.name,
      areaM2: parseFloat(area.toFixed(2)),
      totalWeightKg: weight,
      adhesiveBags,
      recommendedJointSize: joints,
    });
  }, [calcStone, widthInput, heightInput, useCase, wasteFactor]);

  const activeNumber = "5491157362228"; // Base number for WhatsApp

  const handleNumberInput = (val: string, setter: (val: string) => void) => {
    let cleanVal = val.replace(/[^0-9.,]/g, '');
    const separatorIndex = cleanVal.search(/[.,]/);
    if (separatorIndex !== -1) {
      const before = cleanVal.slice(0, separatorIndex + 1);
      const after = cleanVal.slice(separatorIndex + 1).replace(/[.,]/g, '');
      cleanVal = before + after;
    }
    if (cleanVal !== '') {
      const numericVal = parseFloat(cleanVal.replace(',', '.'));
      if (!isNaN(numericVal) && numericVal > 1000) {
        cleanVal = '1000';
      }
    }
    setter(cleanVal);
  };

  return (
    <section id="calculadora" className="py-16 sm:py-32 bg-brand-bg text-brand-ink">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 border border-brand-ink/20 px-3 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-semibold text-brand-ink/70 mb-6">
            <CalcIcon className="w-3.5 h-3.5" />
            Herramienta Profesional
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif mb-4 sm:mb-6 text-brand-ink">
            Calculador de Material
          </h2>
          <p className="text-brand-ink-muted font-light text-base sm:text-lg max-w-xl">
            Obtén una estimación precisa de los kilos de piedra y bolsas de adhesivo técnico necesarias para asegurar la perdurabilidad de tu obra.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-start">
          
          {/* Form */}
          <div className="lg:col-span-5 space-y-8 bg-brand-surface p-6 sm:p-10 border border-brand-ink/10">
            <div>
              <label className="block text-xs uppercase tracking-widest font-semibold text-brand-ink mb-3">
                Selección de Piedra
              </label>
              <select
                value={calcStone}
                onChange={(e) => setCalcStone(e.target.value)}
                className="w-full bg-brand-bg border-b border-brand-ink/20 px-0 py-3 text-base text-brand-ink focus:outline-none focus:border-brand-accent transition-colors cursor-pointer"
              >
                {STONES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} (~{s.weightPerM2} kg/m²)
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-widest font-semibold text-brand-ink mb-3">
                  Ancho (m)
                </label>
                <input
                  type="text"
                  inputMode="decimal"
                  placeholder="ej: 4.5"
                  value={widthInput}
                  onChange={(e) => handleNumberInput(e.target.value, setWidthInput)}
                  className="w-full bg-transparent border-b border-brand-ink/20 px-0 py-2 text-xl font-sans text-brand-ink placeholder:text-brand-ink/20 focus:outline-none focus:border-brand-accent transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest font-semibold text-brand-ink mb-3">
                  Alto / Largo (m)
                </label>
                <input
                  type="text"
                  inputMode="decimal"
                  placeholder="ej: 3.0"
                  value={heightInput}
                  onChange={(e) => handleNumberInput(e.target.value, setHeightInput)}
                  className="w-full bg-transparent border-b border-brand-ink/20 px-0 py-2 text-xl font-sans text-brand-ink placeholder:text-brand-ink/20 focus:outline-none focus:border-brand-accent transition-colors"
                />
              </div>
            </div>

            <div className="pt-2">
              <label className="block text-xs uppercase tracking-widest font-semibold text-brand-ink mb-4">
                Destino de Colocación
              </label>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  onClick={() => setUseCase('pared')}
                  className={`flex-1 py-4 sm:py-3 text-xs uppercase tracking-widest font-semibold transition-colors border min-h-[48px] ${useCase === 'pared' ? 'border-brand-ink bg-brand-ink text-brand-bg' : 'border-brand-ink/20 text-brand-ink/60 hover:border-brand-ink/50'}`}
                >
                  Pared / Muro
                </button>
                <button
                  onClick={() => setUseCase('piso')}
                  className={`flex-1 py-4 sm:py-3 text-xs uppercase tracking-widest font-semibold transition-colors border min-h-[48px] ${useCase === 'piso' ? 'border-brand-ink bg-brand-ink text-brand-bg' : 'border-brand-ink/20 text-brand-ink/60 hover:border-brand-ink/50'}`}
                >
                  Piso / Tránsito
                </button>
              </div>
            </div>

            <div className="pt-4">
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center mt-0.5">
                  <input
                    type="checkbox"
                    checked={wasteFactor}
                    onChange={(e) => setWasteFactor(e.target.checked)}
                    className="appearance-none w-5 h-5 border border-brand-ink/30 checked:bg-brand-ink checked:border-brand-ink transition-colors cursor-pointer"
                  />
                  {wasteFactor && <div className="absolute w-2 h-2 bg-brand-bg pointer-events-none"></div>}
                </div>
                <div>
                  <span className="block text-sm text-brand-ink font-semibold">Incluir 10% de desperdicio</span>
                  <span className="block text-xs text-brand-ink-muted mt-1 font-light">Fundamental para cubrir cortes, esquinas y ajustes naturales.</span>
                </div>
              </label>
            </div>
          </div>

          {/* Results Summary */}
          <div className="lg:col-span-7 h-full">
            {quoteResult ? (
              <div className="bg-brand-ink text-brand-bg p-6 sm:p-12 h-full flex flex-col relative overflow-hidden">
                {/* Subtle Background Accent */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-accent/10 rounded-full blur-3xl pointer-events-none"></div>

                <div className="relative z-10 flex-1">
                  <div className="flex items-center gap-3 mb-8 sm:mb-10 pb-6 border-b border-brand-bg/10">
                    <FileText className="w-5 h-5 text-brand-accent" />
                    <span className="text-xs uppercase tracking-widest font-semibold text-brand-bg/70">Desglose de Cómputo</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-serif text-brand-accent mb-2">
                    {quoteResult.stoneName}
                  </h3>
                  <div className="text-[10px] uppercase tracking-widest text-brand-bg/50 mb-10 sm:mb-12">
                    Superficie total: <span className="text-brand-bg font-semibold">{quoteResult.areaM2} m²</span>
                  </div>

                  <div className="grid grid-cols-2 gap-6 sm:gap-10 mb-10 sm:mb-12">
                    <div>
                      <span className="block text-xs uppercase tracking-widest text-brand-bg/60 mb-2">Volumen Estimado</span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-light tracking-tight">{quoteResult.totalWeightKg.toLocaleString('es-AR')}</span>
                        <span className="text-sm font-semibold text-brand-bg/60">kg</span>
                      </div>
                    </div>
                    <div>
                      <span className="block text-xs uppercase tracking-widest text-brand-bg/60 mb-2">Adhesivo Flexible</span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-light tracking-tight">{quoteResult.adhesiveBags}</span>
                        <span className="text-sm font-semibold text-brand-bg/60">bolsas</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-brand-bg/5 p-6 border border-brand-bg/10 text-sm font-light text-brand-bg/80 leading-relaxed mb-10">
                    <strong>Recomendación Técnica:</strong> Se aconseja una junta de {quoteResult.recommendedJointSize} para absorber dilataciones térmicas. Utilice únicamente adhesivos de alta elasticidad.
                  </div>
                </div>

                <div className="relative z-10 mt-auto pt-8 border-t border-brand-bg/10">
                  <a
                    href={`https://wa.me/${activeNumber}?text=Hola!%20Deseo%20cotizar%20${encodeURIComponent(quoteResult.stoneName)}%20para%20cubrir%20${quoteResult.areaM2}%20m2.%20Calculo%20que%20necesitar%C3%A9%20${quoteResult.adhesiveBags}%20bolsas%20de%20pegamento.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-brand-accent hover:bg-brand-accent/90 text-brand-bg py-4 px-4 sm:px-6 text-xs sm:text-sm font-semibold uppercase tracking-widest transition-colors flex items-center justify-center gap-3 min-h-[56px] text-center"
                  >
                    Enviar Cómputo
                    <ArrowRight className="w-4 h-4 flex-shrink-0" />
                  </a>
                </div>
              </div>
            ) : (
              <div className="bg-brand-surface border border-brand-ink/10 text-brand-ink/40 p-12 h-full flex flex-col items-center justify-center text-center">
                <CalcIcon className="w-12 h-12 mb-4 opacity-20" />
                <p className="text-lg font-light">Ingresa las dimensiones de tu obra<br/>para calcular el cómputo exacto.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
