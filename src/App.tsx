import { useState, useRef, useEffect } from 'react';
import {
  Layers,
  MapPin,
  Sparkles,
  Maximize2,
  Calculator,
  Phone,
  ShieldCheck,
  Send,
  MessageSquare,
  Check,
  Info,
  Hammer,
  FileText,
  ArrowRight,
  Sparkle,
  Wrench,
  Trees,
  User,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { STONES, SCENARIOS } from './data';
import { Stone, Scenario, QuoteResult } from './types';

// Helper function to get active WhatsApp number based on the day of the week
// Lunes, Miércoles, Viernes -> Ciro (+54 9 11 5736 2228)
// Martes, Jueves, Sábado, Domingo -> Nicolás (+54 9 11 6664 9075)
function getActiveWhatsAppNumber(): string {
  const day = new Date().getDay(); // 0 = Domingo, 1 = Lunes, 2 = Martes, 3 = Miércoles, 4 = Jueves, 5 = Viernes, 6 = Sábado
  if (day === 1 || day === 3 || day === 5) {
    return '5491157362228'; // Ciro
  } else {
    return '5491166649075'; // Nicolás
  }
}

export default function App() {
  // Navigation & filtering states
  const [filter, setFilter] = useState<string>('todos');
  const [selectedStone, setSelectedStone] = useState<Stone | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  // Reset image gallery index when selectedStone changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [selectedStone]);

  const galleryImages = selectedStone?.galleryUrls && selectedStone.galleryUrls.length > 0
    ? selectedStone.galleryUrls
    : selectedStone ? [selectedStone.imageUrl] : [];

  // Scenario Simulator States
  const [activeScenario, setActiveScenario] = useState<Scenario>(SCENARIOS[0]);
  const [simulatorStone, setSimulatorStone] = useState<Stone>(STONES[3]); // Default Travertino

  // Calculator States
  const [calcStone, setCalcStone] = useState<string>('riojana'); // Default Piedra Riojana
  const [widthInput, setWidthInput] = useState<string>(''); // Empty default, transparent placeholder
  const [heightInput, setHeightInput] = useState<string>(''); // Empty default, transparent placeholder
  const [useCase, setUseCase] = useState<'pared' | 'piso'>('pared');
  const [wasteFactor, setWasteFactor] = useState<boolean>(true);
  const [includeAdhesive, setIncludeAdhesive] = useState<boolean>(true);
  const [quoteResult, setQuoteResult] = useState<QuoteResult | null>(null);

  // Filtered stones list
  const filteredStones = STONES.filter(stone => {
    if (filter === 'todos') return true;
    if (filter === 'paredes') return stone.recommendedUses.some(u => u.toLowerCase().includes('fachada') || u.toLowerCase().includes('pared') || u.toLowerCase().includes('muro') || u.toLowerCase().includes('chimenea') || u.toLowerCase().includes('columna'));
    if (filter === 'pisos') return stone.recommendedUses.some(u => u.toLowerCase().includes('piso') || u.toLowerCase().includes('vereda') || u.toLowerCase().includes('sendero') || u.toLowerCase().includes('cochera') || u.toLowerCase().includes('tránsito'));
    if (filter === 'altogama') return stone.estimatedPriceIndicator === '●●●';
    return true;
  });

  // Material and weight calculation handler
  const handleCalculate = () => {
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
    const pallets = Math.ceil(weight / 1200); // 1200 kg standard pallet

    // 1 bag of high-performance flexible adhesive covers roughly 4.5m2 of stone
    const adhesiveBags = includeAdhesive ? Math.ceil(area / 4.5) : 0;

    // Joint size recommendation
    let joints = "5 a 8 mm (Con fragua deformable)";
    if (selectedStoneObj.id === 'riojana') {
      joints = "10 a 15 mm (Rústico con mezcla impermeable asistida)";
    } else if (selectedStoneObj.id === 'travertino') {
      joints = "2 a 3 mm (Colocación rectificada cerrada o junta mínima)";
    } else if (selectedStoneObj.id === 'zapala') {
      joints = "5 a 8 mm (Traba regular de junta fina)";
    }

    setQuoteResult({
      stoneName: selectedStoneObj.name,
      areaM2: parseFloat(area.toFixed(2)),
      totalWeightKg: weight,
      palletsNeeded: pallets,
      adhesiveBags,
      recommendedJointSize: joints,
      estimatedPriceRange: selectedStoneObj.estimatedPriceIndicator === '●○○' ? 'Línea Clásica y Accesible' : selectedStoneObj.estimatedPriceIndicator === '●●○' ? 'Línea de Selección Intermedia' : 'Línea Premium de Revestimiento Fino'
    });
  };

  // Run initial calculation
  useEffect(() => {
    handleCalculate();
  }, [calcStone, widthInput, heightInput, useCase, wasteFactor, includeAdhesive]);

  // Pre-load calculator option when clicking a stone's calculator CTA
  const triggerCalculatorForStone = (stoneId: string) => {
    setCalcStone(stoneId);
    const element = document.getElementById('calculadora');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FBFBF9] text-gray-900 font-sans selection:bg-[#E2DDD2] selection:text-[#3C3830]">

      {/* Top Address Bar */}
      <div className="bg-[#3C3830] text-[#FBFBF9] py-2 px-4 sm:px-8 text-center text-[11px] sm:text-xs font-medium border-b border-stone-700 flex items-center justify-center gap-2">
        <MapPin className="w-3.5 h-3.5 text-amber-300" />
        <span>Showroom & Ventas: <strong>Camino Gral. Belgrano y Calle 206 - Berazategui</strong></span>
      </div>

      {/* Elegante Header Flotante */}
      <header className="sticky top-0 z-50 bg-[#FBFBF9]/90 backdrop-blur-md border-b border-[#EBEBE4] px-4 sm:px-8 py-4 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <div className="h-10 w-10 bg-[#3C3830] flex items-center justify-center rounded-sm text-[#FBFBF9] font-serif font-bold text-xl tracking-wider flex-shrink-0">
              L|P
            </div>
            <div>
              <span className="font-serif text-base sm:text-lg font-bold tracking-tight text-[#3C3830] block leading-tight">Los Picapiedras</span>
              <span className="text-[10px] uppercase tracking-widest text-[#B3AFA5] font-mono-data font-semibold hidden sm:block">Revestimientos de Origen</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide text-gray-600">
            <a href="#catalogo" className="hover:text-[#3C3830] transition-colors">Productos</a>
            {/* <a href="#simulador" className="hover:text-[#3C3830] transition-colors">Simulador 3D</a> */}
            <a href="#calculadora" className="hover:text-[#3C3830] transition-colors">Calculador Técnico</a>
          </nav>

          <div className="flex items-center gap-3 flex-shrink-0">
            <a
              href={`https://wa.me/${getActiveWhatsAppNumber()}?text=Hola,%20vengo%20de%20la%20landing%20page%20de%20Los%20Picapiedras%20y%20quiero%20consultar%20por%20revestimientos.`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#3C3830] hover:bg-[#524E43] text-[#FBFBF9] px-3 sm:px-4 py-2 text-xs font-semibold tracking-wide rounded-sm flex items-center gap-2 transition-all shadow-sm"
              id="cta_whatsapp_header"
            >
              <Phone className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="hidden sm:inline">Consultar Presupuesto</span>
              <span className="inline sm:hidden">Consultar</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 lg:py-24 border-b border-[#EBEBE4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Hero Content */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
            <div className="inline-flex items-center gap-2 bg-[#F1EFEA] px-3 py-1 rounded-full text-xs font-semibold tracking-wide text-[#59554B] self-start border border-[#E2DDD2]">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>Calidad en Piedra Rústica y de Lujo</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#3C3830] font-bold tracking-tight leading-none">
              La nobleza de la <span className="italic relative z-10 font-normal underline decoration-[#C6BBA8] decoration-wavy decoration-2">piedra natural</span> para vestir tus espacios
            </h1>

            <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-xl">
              Nuestra familia se dedica a la selección de revestimientos de piedras naturales únicas. Auténtico Pórfido Patagónico, sofisticado Mármol Travertino, rústica Piedra Zapala, cálida Riojana y la tradicional Laja San Luis para frentes y pisos de alto tránsito.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href="#catalogo"
                className="bg-[#3C3830] hover:bg-[#524E43] text-white text-sm font-semibold tracking-wide py-3 px-6 rounded-sm text-center transition-all flex items-center justify-center gap-2 shadow-md"
              >
                Explorar Piedras
                <ArrowRight className="w-4 h-4" />
              </a>
              {/* <a
                href="#simulador"
                className="border border-[#3C3830] hover:bg-[#3C3830]/5 text-[#3C3830] text-sm font-semibold tracking-wide py-3 px-6 rounded-sm text-center transition-all"
              >
                Probar Simulador
              </a> */}
            </div>

            {/* Stats Ticker */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-[#EBEBE4]">
              <div>
                <span className="font-serif text-2xl sm:text-3xl font-bold text-[#3C3830] block">Directo</span>
                <span className="text-[11px] text-gray-500 uppercase font-mono-data tracking-wider">de Origen</span>
              </div>
              <div>
                <span className="font-serif text-2xl sm:text-3xl font-bold text-[#3C3830] block">+30</span>
                <span className="text-[11px] text-gray-500 uppercase font-mono-data tracking-wider">Años de Tradición</span>
              </div>
              <div>
                <span className="font-serif text-2xl sm:text-3xl font-bold text-[#3C3830] block">Envío</span>
                <span className="text-[11px] text-gray-500 uppercase font-mono-data tracking-wider">A todo AMBA Y CABA</span>
              </div>
            </div>

          </div>

          {/* Hero Visual Block */}
          <div className="lg:col-span-6 relative">
            <div className="relative z-10 rounded-sm overflow-hidden h-[320px] sm:h-[450px] shadow-2xl border-4 border-[#FBFBF9]">
              <img
                src='/images/Travertino/travertino vivienda.jpg'
                alt="Casa moderna con revestimiento de piedras naturales"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                id="hero_main_img"
              />
              {/* Overlay styling and fine accents */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white flex flex-col justify-end">
                <div className="flex items-center gap-2 mb-1">
                  <span className="h-2 w-2 bg-emerald-400 rounded-full animate-pulse"></span>
                  <span className="text-xs font-mono-data tracking-widest text-[#EBEBE4]/90 uppercase">Proyecto Destacado</span>
                </div>
                <h3 className="font-serif text-xl font-semibold">Residencia Travertino rústica combinada</h3>
                <p className="text-xs text-slate-300">Pared exterior revestida en Mármol Travertino en listones variables.</p>
              </div>
            </div>
            {/* Background design glow */}
            <div className="absolute -top-6 -right-6 w-72 h-72 bg-[#E2DDD2]/50 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-amber-100/30 rounded-full blur-2xl -z-10" />
          </div>

        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-[#3C3830] py-6 text-[#FBFBF9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col md:flex-row items-center justify-around gap-6 text-center">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-amber-300" />
            <span className="text-xs sm:text-sm font-medium tracking-wide">Piedras 100% Genuinas y Eternas</span>
          </div>
          <div className="h-px w-24 bg-gray-600 md:hidden" />
          <div className="flex items-center gap-3">
            <Hammer className="w-5 h-5 text-amber-300" />
            <span className="text-xs sm:text-sm font-medium tracking-wide">Corte Seleccionado a Espesor Controlado</span>
          </div>
          <div className="h-px w-24 bg-gray-600 md:hidden" />
          <div className="flex items-center gap-3">
            <Wrench className="w-5 h-5 text-amber-300" />
            <span className="text-xs sm:text-sm font-medium tracking-wide">Asesoramiento Integral de Colocación</span>
          </div>
        </div>
      </section>

      {/* Interactive Stone Catalog */}
      <section id="catalogo" className="py-20 max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row items-baseline justify-between mb-10 pb-4 border-b border-[#EBEBE4]">
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#3C3830]" id="catalogo-titulo">Nuestro Catálogo de Piedras</h2>
            <p className="text-gray-500 text-sm mt-1">Navegá entre nuestras variedades exclusivas de áridos, lajas y sillares.</p>
          </div>

          {/* Filters Bar */}
          <div className="flex flex-wrap gap-2 mt-6 md:mt-0 font-medium">
            {[
              { id: 'todos', label: 'Todas las Piedras' },
              { id: 'paredes', label: 'Pared / Fachadas' },
              { id: 'pisos', label: 'Pisos / Alto Tránsito' },
              { id: 'altogama', label: 'Gama de Lujo' }
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setFilter(btn.id)}
                className={`px-4 py-1.5 text-xs rounded-full transition-all tracking-wide ${filter === btn.id
                  ? 'bg-[#3C3830] text-[#FBFBF9] shadow-sm'
                  : 'bg-[#F1EFEA] text-[#59554B] hover:bg-[#E2DDD2]'
                  }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Catalog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredStones.map((stone) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                key={stone.id}
                className="group bg-[#FBFBF9] border border-[#EBEBE4] rounded-sm overflow-hidden flex flex-col hover:shadow-xl hover:border-[#D1CEB7] transition-all"
                id={`stone-card-${stone.id}`}
              >
                {/* Stone Image Box */}
                <div className="h-48 relative overflow-hidden bg-gray-100">
                  <img
                    src={stone.imageUrl}
                    alt={stone.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transformation duration-500"
                    referrerPolicy="no-referrer"
                  />

                  {/* Absolute badgets on image */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1">
                    <span className="bg-white/95 text-gray-800 text-[10px] font-mono-data uppercase font-semibold tracking-wider px-2 py-0.5 rounded-sm shadow-sm flex items-center gap-1">
                      <MapPin className="w-2.5 h-2.5 text-amber-800" />
                      {stone.origin.split(',')[0]}
                    </span>
                  </div>

                  <div className="absolute bottom-3 right-3">
                    <span className="bg-[#3C3830]/90 text-white text-[10px] font-mono-data font-medium tracking-wide px-2 py-0.5 rounded-sm">
                      {stone.weightPerM2} kg/m²
                    </span>
                  </div>
                </div>

                {/* Stone Text Details */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-serif text-lg font-bold text-[#3C3830]">{stone.name}</h3>
                      <span className="text-amber-800 text-xs font-mono-data" title="Rango de Precio Estructurado">
                        {stone.estimatedPriceIndicator}
                      </span>
                    </div>

                    {stone.alternativeName && (
                      <p className="text-[11px] text-gray-400 italic mb-2 mt-[-2px]">{stone.alternativeName}</p>
                    )}

                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-4">
                      {stone.description}
                    </p>

                    <div className="space-y-1.5 mb-4">
                      <div className="flex flex-wrap gap-1">
                        {stone.colors.slice(0, 2).map((col, idx) => (
                          <span key={idx} className="bg-[#F1EFEA] text-[#59554B] text-[10px] px-2 py-0.5 rounded-sm">
                            {col}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="pt-4 border-t border-[#EBEBE4] grid grid-cols-2 gap-2 mt-auto">
                    <button
                      onClick={() => setSelectedStone(stone)}
                      className="border border-gray-300 hover:border-gray-500 text-gray-700 hover:text-gray-900 py-1.5 px-2.5 text-xs rounded-sm tracking-wide transition-all font-semibold flex items-center justify-center gap-1"
                    >
                      <Info className="w-3 h-3" /> Ver Ficha
                    </button>
                    <button
                      onClick={() => triggerCalculatorForStone(stone.id)}
                      className="bg-[#3C3830] hover:bg-[#524E43] text-white py-1.5 px-2.5 text-xs rounded-sm tracking-wide transition-all font-semibold flex items-center justify-center gap-1"
                    >
                      <Calculator className="w-3 h-3" /> Cotizar
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Selected Stone Modal (Drawer/Lightbox style) */}
      <AnimatePresence>
        {selectedStone && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedStone(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-[#FBFBF9] max-w-2xl w-full rounded-sm overflow-y-auto md:overflow-hidden max-h-[90vh] md:max-h-[600px] shadow-2xl border border-gray-300 grid grid-cols-1 md:grid-cols-2 relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Botón Cerrar X flotante */}
              <button
                onClick={() => setSelectedStone(null)}
                className="absolute top-3 right-3 z-30 bg-black/50 hover:bg-black/75 backdrop-blur-sm text-white rounded-full p-1.5 transition-all border border-white/10"
                aria-label="Cerrar modal"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Media on left */}
              <div className="h-72 md:h-full relative bg-stone-900 overflow-hidden group">
                <AnimatePresence initial={false} mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    src={galleryImages[currentImageIndex]}
                    alt={`${selectedStone.name} - Vista ${currentImageIndex + 1}`}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </AnimatePresence>

                {/* Dark Gradient Overlay for text readability at the bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                {/* Left/Right Navigation Arrows */}
                {galleryImages.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
                      }}
                      className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 border border-white/10"
                      aria-label="Imagen anterior"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 border border-white/10"
                      aria-label="Siguiente imagen"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Dots Indicator */}
                {galleryImages.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20 bg-black/35 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-white/5">
                    {galleryImages.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentImageIndex(idx);
                        }}
                        className={`w-1.5 h-1.5 rounded-full transition-all ${idx === currentImageIndex ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/70'
                          }`}
                        aria-label={`Ir a imagen ${idx + 1}`}
                      />
                    ))}
                  </div>
                )}

                {/* Origin text overlay */}
                <div className="absolute bottom-4 left-4 z-10 text-white pointer-events-none select-none">
                  <span className="text-[9px] font-mono-data tracking-widest text-[#EBEBE4]/85 uppercase block font-semibold">Procedencia de Origen</span>
                  <h4 className="font-serif text-sm font-bold tracking-tight">{selectedStone.origin}</h4>
                </div>
              </div>

              {/* Data on right */}
              <div className="p-6 md:p-8 flex flex-col justify-between space-y-4 md:max-h-[600px] md:overflow-y-auto">
                <div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-serif text-2xl font-bold text-[#3C3830]">{selectedStone.name}</h3>
                      <p className="text-gray-400 text-xs font-mono-data uppercase tracking-wider">{selectedStone.alternativeName || 'Revestimiento Auténtico'}</p>
                    </div>
                  </div>

                  <p className="text-gray-600 text-xs leading-relaxed mt-4">
                    {selectedStone.description}
                  </p>

                  <div className="mt-4 pt-4 border-t border-[#EBEBE4] space-y-2.5 text-xs">
                    <div>
                      <span className="font-semibold text-gray-700 block">Vibe & Sensación:</span>
                      <span className="text-gray-500 italic">{selectedStone.vibe}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700 block">Perfil de Textura:</span>
                      <span className="text-gray-500">{selectedStone.texture}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 pt-2">
                      <div>
                        <span className="font-semibold text-gray-700 block">Rango de Peso:</span>
                        <span className="text-[#3C3830] font-mono-data font-medium">{selectedStone.weightPerM2} kg/m²</span>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700 block">Nivel de Rústico:</span>
                        <span className="text-[#3C3830] font-mono-data font-medium">{selectedStone.estimatedPriceIndicator} indicador</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="bg-[#F1EFEA] border border-[#E2DDD2] p-3 rounded-sm">
                    <span className="text-[10px] font-mono-data font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1 mb-1">
                      <Wrench className="w-3.5 h-3.5 text-amber-800" />
                      Consejo Pro de Colocación
                    </span>
                    <p className="text-[11px] text-[#59554B] leading-relaxed">
                      {selectedStone.installationTip}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        setSelectedStone(null);
                        triggerCalculatorForStone(selectedStone.id);
                      }}
                      className="bg-[#3C3830] hover:bg-[#524E43] text-[#FBFBF9] text-xs font-semibold tracking-wide py-2 rounded-sm text-center transition-all"
                    >
                      Calcular Cantidad
                    </button>
                    <button
                      onClick={() => setSelectedStone(null)}
                      className="border border-[#3C3830] hover:bg-gray-100 text-[#3C3830] text-xs font-semibold py-2 rounded-sm text-center transition-all"
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dynamic Background Visualizer Section */}
      {/* 
      <section id="simulador" className="py-20 bg-[#F1EFEA] border-y border-[#EBEBE4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">

          <div className="max-w-xl mb-12">
            <div className="inline-flex items-center gap-1 bg-[#E2DDD2] text-gray-700 text-[10px] font-mono-data uppercase font-semibold px-2 py-0.5 rounded-sm tracking-wider mb-2">
              <Layers className="w-3 h-3 text-amber-900" />
              Simulador Interactivo de Revestimiento
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#3C3830] tracking-tight">
              Visualizá la Piedra en tu Obra
            </h2>
            <p className="text-gray-600 text-sm mt-2">
              Seleccioná un ambiente residencial y después hacé clic en las diferentes piedras para visualizar instantáneamente cómo cambian el carácter, la luz y la suntuosidad de las texturas en frentes, fuegos y piletas.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

            <div className="lg:col-span-4 flex flex-col justify-between space-y-6 bg-[#FBFBF9] p-6 rounded-sm border border-[#EBEBE4]">

              <div className="space-y-4">
                <span className="text-[11px] font-mono-data uppercase font-semibold text-gray-400 tracking-wider block">Paso 1: Elegí un Ambiente</span>
                <div className="space-y-2">
                  {SCENARIOS.map((sc) => (
                    <button
                      key={sc.id}
                      onClick={() => setActiveScenario(sc)}
                      className={`w-full text-left p-4 rounded-sm transition-all border ${activeScenario.id === sc.id
                        ? 'border-[#3C3830] bg-[#3C3830]/5 shadow-sm'
                        : 'border-transparent hover:bg-gray-100 text-gray-600'
                        }`}
                    >
                      <h4 className="font-serif font-bold text-[#3C3830] text-sm">{sc.name}</h4>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">{sc.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#EBEBE4] space-y-3">
                <span className="text-[11px] font-mono-data uppercase font-semibold text-gray-400 tracking-wider block">Piedra Aplicada Actualmente:</span>
                <div className="flex items-center gap-3 bg-[#F1EFEA] p-3 rounded-sm border border-[#E2DDD2]">
                  <img
                    src={simulatorStone.imageUrl}
                    alt={simulatorStone.name}
                    className="w-12 h-12 object-cover rounded-sm"
                  />
                  <div>
                    <h5 className="font-serif text-xs font-bold text-[#3C3830]">{simulatorStone.name}</h5>
                    <span className="text-[10px] text-gray-500 italic block">{simulatorStone.colors[0]} y mixtos</span>
                  </div>
                </div>
                <div className="text-[11px] text-[#59554B] italic leading-tight">
                  "{simulatorStone.vibe}"
                </div>
              </div>

            </div>

            <div className="lg:col-span-8 flex flex-col space-y-4">
              <div className="relative rounded-sm overflow-hidden h-[360px] sm:h-[460px] shadow-lg bg-gray-900 border border-[#EBEBE4]">
                <img
                  src={activeScenario.bgUrl}
                  alt={activeScenario.name}
                  className="w-full h-full object-cover transition-all duration-700"
                  referrerPolicy="no-referrer"
                />

                <div
                  className={activeScenario.overlayClasses}
                  style={{
                    backgroundImage: `url(${simulatorStone.imageUrl})`,
                    backgroundBlendMode: 'overlay',
                    backgroundColor: 'rgba(60, 56, 48, 0.15)'
                  }}
                />

                <div className="absolute top-4 left-4 bg-[#3C3830]/90 text-white p-3 rounded-sm text-xs max-w-xs space-y-1 shadow-md">
                  <span className="font-bold font-serif text-sm block">{activeScenario.name}</span>
                  <p className="text-[10px] text-gray-300">Zona revestida: <span className="text-[#FBFBF9] font-semibold">{simulatorStone.name}</span></p>
                </div>
              </div>

              <div className="bg-[#FBFBF9] rounded-sm border border-[#EBEBE4] p-4">
                <span className="text-[11px] font-mono-data uppercase font-semibold text-gray-400 tracking-wider block mb-3">Paso 2: Elegí una Piedra para Revestir</span>
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
                  {STONES.map((st) => (
                    <button
                      key={st.id}
                      onClick={() => setSimulatorStone(st)}
                      className={`flex-shrink-0 flex items-center gap-2 p-2 rounded-sm transition-all border ${simulatorStone.id === st.id
                        ? 'border-[#3C3830] bg-[#3C3830]/5 ring-1 ring-[#3C3830]'
                        : 'border-transparent hover:bg-[#F1EFEA]'
                        }`}
                    >
                      <img
                        src={st.imageUrl}
                        alt={st.name}
                        className="w-10 h-10 object-cover rounded-sm"
                        referrerPolicy="no-referrer"
                      />
                      <span className="text-xs font-semibold text-[#3C3830] pr-2 whitespace-nowrap">{st.name}</span>
                    </button>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>
      */}

      {/* Dynamic Weight & Material Calculator Section */}
      <section id="calculadora" className="py-20 max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Form - col-span-5 */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-[#F1EFEA] border border-[#E2DDD2] text-[#59554B] text-[10px] font-mono-data uppercase font-semibold px-2 py-0.5 rounded-sm mb-2">
                <Calculator className="w-3.5 h-3.5" />
                Herramienta Profesional
              </div>
              <h2 className="font-serif text-3xl font-bold text-[#3C3830]">Calculador de Cómputo de Material</h2>
              <p className="text-gray-500 text-xs mt-1">Estimá el peso, logística y adhesivos requeridos según las dimensiones de tu obra.</p>
            </div>

            <div className="space-y-4 bg-[#FBFBF9] p-6 rounded-sm border border-[#EBEBE4]">
              {/* Stone selection */}
              <div>
                <label className="block text-xs font-semibold text-[#3C3830] uppercase font-mono-data tracking-wider mb-1.5">Variedad de Piedra:</label>
                <select
                  value={calcStone}
                  onChange={(e) => setCalcStone(e.target.value)}
                  className="w-full bg-[#F1EFEA] border border-[#E2DDD2] px-3 py-2 text-sm rounded-sm text-gray-800 focus:outline-none focus:border-stone-500"
                >
                  {STONES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} (~{s.weightPerM2} kg/m²)
                    </option>
                  ))}
                </select>
              </div>

              {/* Width and Height */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#3C3830] uppercase font-mono-data tracking-wider mb-1.5">Ancho del Muro (m):</label>
                  <input
                    type="text"
                    inputMode="decimal"
                    placeholder="4.5"
                    value={widthInput}
                    onChange={(e) => {
                      let val = e.target.value.replace(/[^0-9.,]/g, '');
                      const separatorIndex = val.search(/[.,]/);
                      if (separatorIndex !== -1) {
                        const before = val.slice(0, separatorIndex + 1);
                        const after = val.slice(separatorIndex + 1).replace(/[.,]/g, '');
                        val = before + after;
                      }
                      setWidthInput(val);
                    }}
                    className="w-full bg-white border border-[#E2DDD2] px-3 py-2 text-sm rounded-sm text-gray-800 focus:outline-none focus:border-stone-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#3C3830] uppercase font-mono-data tracking-wider mb-1.5">Alto / Largo (m):</label>
                  <input
                    type="text"
                    inputMode="decimal"
                    placeholder="3.0"
                    value={heightInput}
                    onChange={(e) => {
                      let val = e.target.value.replace(/[^0-9.,]/g, '');
                      const separatorIndex = val.search(/[.,]/);
                      if (separatorIndex !== -1) {
                        const before = val.slice(0, separatorIndex + 1);
                        const after = val.slice(separatorIndex + 1).replace(/[.,]/g, '');
                        val = before + after;
                      }
                      setHeightInput(val);
                    }}
                    className="w-full bg-white border border-[#E2DDD2] px-3 py-2 text-sm rounded-sm text-gray-800 focus:outline-none focus:border-stone-500"
                  />
                </div>
              </div>

              {/* Use Case */}
              <div>
                <label className="block text-xs font-semibold text-[#3C3830] uppercase font-mono-data tracking-wider mb-1.5">Destino de Colocación:</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setUseCase('pared')}
                    className={`py-1.5 text-xs font-semibold rounded-sm border transition-all ${useCase === 'pared'
                      ? 'bg-[#3C3830] text-white border-[#3C3830]'
                      : 'border-[#E2DDD2] hover:bg-gray-100 text-gray-600'
                      }`}
                  >
                    Pared / Revestimiento
                  </button>
                  <button
                    onClick={() => setUseCase('piso')}
                    className={`py-1.5 text-xs font-semibold rounded-sm border transition-all ${useCase === 'piso'
                      ? 'bg-[#3C3830] text-white border-[#3C3830]'
                      : 'border-[#E2DDD2] hover:bg-gray-100 text-gray-600'
                      }`}
                  >
                    Piso / Pavimento
                  </button>
                </div>
              </div>

              {/* Checkbox for Waste Buffer & Adhesives */}
              <div className="space-y-2.5 pt-2">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={wasteFactor}
                    onChange={(e) => setWasteFactor(e.target.checked)}
                    className="accent-[#3C3830] rounded-sm w-4 h-4"
                  />
                  <span className="text-xs text-gray-600">
                    Sumar <strong>10% por desperdicio</strong> de cortes (¡Sumamente recomendado!)
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={includeAdhesive}
                    onChange={(e) => setIncludeAdhesive(e.target.checked)}
                    className="accent-[#3C3830] rounded-sm w-4 h-4"
                  />
                  <span className="text-xs text-gray-600">
                    Calcular pegamento para piedra
                  </span>
                </label>
              </div>

            </div>

          </div>

          {/* Results Summary and Quotes Panel - col-span-7 */}
          <div className="lg:col-span-7 h-full flex flex-col justify-between">
            {quoteResult ? (
              <div className="bg-[#3C3830] text-[#FBFBF9] p-8 rounded-sm space-y-6 flex-1 shadow-lg">
                <div className="border-b border-gray-600 pb-4 flex justify-between items-center">
                  <div>
                    <span className="text-[10px] font-mono-data uppercase tracking-widest text-[#B3AFA5]">Desglose de Estimación</span>
                    <h3 className="font-serif text-2xl font-bold">Cómputo Técnico</h3>
                  </div>
                  <FileText className="w-8 h-8 text-[#B3AFA5]" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-wider text-[#B3AFA5] font-mono-data">Piedra seleccionada:</span>
                    <span className="text-sm font-semibold block text-amber-200">{quoteResult.stoneName}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-wider text-[#B3AFA5] font-mono-data">Superficie Total (Con desperdicio):</span>
                    <span className="text-lg font-bold block">{quoteResult.areaM2} m²</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-black/20 p-4 rounded-sm border border-white/5 font-mono-data">
                  <div className="text-center sm:text-left">
                    <span className="text-[9px] uppercase tracking-wider text-gray-400 block">Peso Estimado:</span>
                    <span className="text-lg font-bold text-amber-100">{quoteResult.totalWeightKg.toLocaleString('es-AR')} kg</span>
                  </div>
                  <div className="text-center sm:text-left">
                    <span className="text-[9px] uppercase tracking-wider text-gray-400 block">Pegamento Flex:</span>
                    <span className="text-lg font-bold text-amber-100">{quoteResult.adhesiveBags > 0 ? `${quoteResult.adhesiveBags} bolsas` : 'No cotizado'}</span>
                  </div>
                </div>

                <div className="space-y-2 text-xs bg-white/[0.04] p-4 rounded-sm">
                  <div className="flex justify-between border-b border-white/5 pb-1.5">
                    <span className="text-[#B3AFA5]">Tipo de colocación:</span>
                    <span className="font-semibold">{useCase === 'pared' ? 'Muro Vertical' : 'Piso Peatonal/Vehicular'}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1.5">
                    <span className="text-[#B3AFA5]">Espesor de junta aconsejado:</span>
                    <span className="font-semibold">{quoteResult.recommendedJointSize}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#B3AFA5]">Línea de Inversión:</span>
                    <span className="font-semibold">{quoteResult.estimatedPriceRange}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-600 flex flex-col sm:flex-row gap-3 items-center justify-between">
                  <div className="text-xs text-gray-300">
                    <p>* Valores basados en rendimiento del material habitual. Solicitar costos de envío y logística.</p>
                  </div>

                  {/* WhatsApp Pre-charged Quote CTA */}
                  <a
                    href={`https://wa.me/${getActiveWhatsAppNumber()}?text=Hola!%20Por%20favor%20cotizarme%20formalmente%20revestimiento%20en%20piedra:%20${encodeURIComponent(quoteResult.stoneName)}%20para%20una%20superficie%20de%20${quoteResult.areaM2}%20m2,%20incluyendo%20${quoteResult.adhesiveBags}%20bolsas%20de%20adhesivo.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto bg-[#FBFBF9] hover:bg-[#EBEBE4] text-[#3C3830] hover:text-black py-2.5 px-5 rounded-sm text-xs font-semibold tracking-wide transition-all uppercase flex items-center justify-center gap-1.5 shadow-sm"
                    id="cta_whatsapp_compu"
                  >
                    <span>Solicitar Presupuesto</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ) : (
              <div className="bg-[#3C3830] text-gray-300 p-8 rounded-sm flex items-center justify-center text-center h-full">
                <span>Ingresá medidas para calcular el volumen</span>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* Elegant footer expressing natural nobility and family craft values */}
      <footer className="bg-[#3C3830] text-[#E2DDD2] pt-16 pb-12 border-t border-[#4D483F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 bg-[#FBFBF9] flex items-center justify-center rounded-sm text-[#3C3830] font-serif font-bold text-lg">
                L|P
              </div>
              <span className="font-serif text-lg font-bold tracking-tight text-[#FBFBF9]">Los Picapiedras</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Ventas y colocaciones a cargo de la familia Los Picapiedras.
              Piedras para revestimiento de paredes y pisos seleccionadas rigurosamente de orígenes como San Luis, La Rioja, Neuquén y la Patagonia.
              Tres décadas brindando elegancia e historia.
            </p>
          </div>

          <div>
            <h4 className="font-serif text-xs font-semibold uppercase tracking-widest text-[#FBFBF9] mb-4">Gama de Piedras</h4>
            <ul className="space-y-1.5 text-xs text-gray-400">
              <li><span className="hover:text-amber-200 transition-colors cursor-pointer">Laja San Luis (Rosa & Verde)</span></li>
              <li><span className="hover:text-amber-200 transition-colors cursor-pointer">Mármol Travertino & Piedra Zapala</span></li>
              <li><span className="hover:text-amber-200 transition-colors cursor-pointer">Pórfido Patagónico</span></li>
              <li><span className="hover:text-amber-200 transition-colors cursor-pointer">Laja Riojana</span></li>
              <li><span className="hover:text-amber-200 transition-colors cursor-pointer">Taco San Luis</span></li>
              <li><span className="hover:text-amber-200 transition-colors cursor-pointer">Piedra Brasilera</span></li>
              <li><span className="hover:text-amber-200 transition-colors cursor-pointer">Y Muchas más!</span></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-xs font-semibold uppercase tracking-widest text-[#FBFBF9] mb-4 font-mono-data">Asesoramiento Obra</h4>
            <ul className="space-y-1.5 text-xs text-gray-400">
              <li>Colocación Muros Rústicos</li>
              <li>Calculadora de Desperdicio y Peso</li>
              <li>Adhesivos Flexibles Especiales</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-serif text-xs font-semibold uppercase tracking-widest text-[#FBFBF9] mb-4 font-mono-data">Contacto y Ubicación</h4>
            <div className="text-xs text-gray-400 space-y-2">
              <div className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-300 shrink-0 mt-0.5" />
                <span>Showroom: Camino Gral. Belgrano y Calle 206 - Berazategui</span>
              </div>
              <p>
                Ventas directas, colocaciones y centro de despacho.
              </p>
            </div>
            <div className="pt-2">
              <span className="text-xs text-amber-200 block font-mono-data mt-1">+54 9 11 5736 2228 - Ciro</span>
              <span className="text-xs text-amber-200 block font-mono-data mt-1">+54 9 11 6664 9075 - Nicolás</span>
              <span className="text-[10px] text-gray-400 block">Atención telefónica de Lunes a Sábados</span>
              <span className="text-[10px] text-gray-400 block">8:30 hs. a 18:00 hs.</span>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-12 pt-8 border-t border-[#4D483F] flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-500">
          <p>© {new Date().getFullYear()} Los Picapiedras Revestimientos. Todos los derechos reservados. Nobleza mineral para toda la vida.</p>
          <p className="mt-2 sm:mt-0 font-mono-data">Diseño de Alta Gama en Piedras Naturales</p>
        </div>
      </footer>

    </div>
  );
}
