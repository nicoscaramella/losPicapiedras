import { Stone, Scenario } from './types';

export const STONES: Stone[] = [
  {
    id: 'riojana',
    name: 'Piedra Riojana',
    alternativeName: 'Laja Riojana Ocre',
    origin: 'La Rioja, Argentina',
    colors: ['Ocre templado', 'Marrones terrosos', 'Gris óxido'],
    texture: 'Rugosa, irregular de relieve natural grueso',
    recommendedUses: ['Fachadas exteriores', 'Columnas de entrada', 'Muros de contención', 'Chimeneas'],
    description: 'Piedra de apariencia robusta y montañesa. Sus marcados tonos óxidos y terrosos visten fachadas dándoles personalidad y un carácter atemporal de gran calidez.',
    vibe: 'Se destaca por sus imponentes relieves. Brinda cobijo de montaña y un aire hogareño supremo.',
    installationTip: 'Colocar con junta trabada o semi-seca. Utilizar adhesivo de alta adherencia tipo Impermeable Flex.',
    weightPerM2: 55,
    estimatedPriceIndicator: '●●○',
    imageUrl: '/images/Riojana/laja-riojana-irregular-de-3-a-6cm.jpg',
    galleryUrls: [
      '/images/Riojana/laja-riojana-irregular-de-3-a-6cm.jpg',
      '/images/Riojana/Piedra-Riojana-cortada.webp'

    ]
  },
  {
    id: 'porfido',
    name: 'Pórfido Patagónico',
    alternativeName: 'Pórfido Murete / Adoquín',
    origin: 'Patagonia Argentina',
    colors: ['Gris violáceo', 'Rojizo rústico', 'Púrpura pálido'],
    texture: 'Plana antideslizante con exfoliación natural pareja',
    recommendedUses: ['Senderos de alto tránsito', 'Entradas vehiculares / Rampas', 'Veredas', 'Muros de base'],
    description: 'Inigualable resistencia al desgaste mecánico y agentes climáticos extremos. El clásico porfido es la gema de las piedras de piso, entregando elegancia indestructible.',
    vibe: 'De carácter sobrio, europeo y de resistencia extrema. Inspira permanencia y elegancia histórica.',
    installationTip: 'Para pisos vehiculares, colocar sobre carpeta de hormigón bien consolidada con mezcla de cemento y arena reforzada.',
    weightPerM2: 65,
    estimatedPriceIndicator: '●●●',
    imageUrl: '/images/Porfido/Porfido.jpg',
    galleryUrls: [
      '/images/Porfido/Porfido.jpg',
      '/images/Porfido/porfido2jpg',
      '/images/Porfido/Porfido3.webp',
      '/images/Porfido/Porfido4.webp'
    ]
  },
  {
    id: 'zapala',
    name: 'Piedra Zapala',
    alternativeName: 'Piedra Natural Zapala',
    origin: 'Zapala, Neuquén',
    colors: ['Gris ceniza', 'Blanco tiza', 'Veteado ocre'],
    texture: 'Rugosa rústica muy porosa y compacta de alta densidad',
    recommendedUses: ['Revestimiento exterior', 'Muros de contención', 'Cercos', 'Chimeneas'],
    description: 'Piedra originaria de Neuquén de enorme resistencia térmica y dureza mineral extrema. Presenta matices claros, grises y blanquecinos con texturas rústicas patagónicas ideales para frentes y muros exteriores.',
    vibe: 'Solidez patagónica, rusticidad pura y excelente comportamiento ante temperaturas bajo cero.',
    installationTip: 'Colocar con juntas de 10mm con mezcla de cemento reforzado o adhesivo flexible.',
    weightPerM2: 58,
    estimatedPriceIndicator: '●●○',
    imageUrl: '/images/Zapala/Piedra_Zapala1.jpg',
    galleryUrls: [
      '/images/Zapala/Piedra_Zapala1.jpg',
      '/images/Zapala/Zapala2.jpg',
      '/images/Zapala/Zapala3.jpg'
    ]
  },
  {
    id: 'travertino',
    name: 'Mármol Travertino',
    alternativeName: 'Travertino Nacional Rústico',
    origin: 'San Juan, Argentina',
    colors: ['Beige crema', 'Marfil satinado', 'Arena suave'],
    texture: 'Superficie porosa fina, cortada a disco con textura aterciopelada',
    recommendedUses: ['Interiores residenciales de lujo', 'Fachadas de diseño minimalista', 'Frentes de baño', 'Paredes del living'],
    description: 'Un clásico indiscutido de las obras de alta gama. Su porosidad natural entrega una calidez inconfundible y un juego de luces sutil bajo iluminación artificial indirecta tanto en interiores de lujo como frentes modernos.',
    vibe: 'Modernidad pura, sofisticación mediterránea y minimalismo sofisticado.',
    installationTip: 'Se aconseja aplicar un impregnante hidro-oleofugo invisible tras su colocación para proteger su refinado tono beige de la acumulación de humedad.',
    weightPerM2: 52,
    estimatedPriceIndicator: '●●●',
    imageUrl: '/images/Travertino/Patron-frances-en-travertino-marmol-piso.png',
    galleryUrls: [
      '/images/Travertino/Patron-frances-en-travertino-marmol-piso.png',
      '/images/Travertino/travertino exterior.webp',
      '/images/Travertino/travertino interior.webp',
      '/images/Travertino/Piso-travertino-exterior-e1676562688400.jpg',
      '/images/Travertino/travertino vivienda.jpg'
    ]
  },
  {
    id: 'laja-san-luis-verde',
    name: 'Laja San Luis Verde y Rosa',
    alternativeName: 'Pizarra San Luis Verde Musgo',
    origin: 'San Luis, Argentina',
    colors: ['Verde oliva apagado', 'Gris verdoso', 'Musgo mineral'],
    texture: 'Placas finas muy resistentes de relieve sutil and uniforme',
    recommendedUses: ['Veredas', 'Entornos de piscina', 'Fachadas modernas', 'Piso galerías abiertas'],
    description: 'La sobriedad del verde mineralizado San Luis dota de calma y naturalidad a los espacios de transición exterior, funcionando idealmente junto a madera y detalles de vegetación abundante.',
    vibe: 'Moderno, de tintes botánicos y excelente integración con jardines frondosos.',
    installationTip: 'Excelente resistencia al deslizamiento. Ideal para zonas húmedas de piscinas.',
    weightPerM2: 42,
    estimatedPriceIndicator: '●●○',
    imageUrl: '/images/san luis/san luis.webp',
    galleryUrls: [
      '/images/san luis/san luis.webp',
      '/images/san luis/san luis',
      '/images/san luis/san luis irregular.webp'
    ]
  },
  {
    id: 'piedra-morisca',
    name: 'Piedra Brasilera',
    alternativeName: 'Arenisca Morisca Oxidada',
    origin: 'Cuyo y Sierras Pampeanas, Argentina',
    colors: ['Cobrizo rústico', 'Oro viejo', 'Marrón tostado', 'Negro mineral'],
    texture: 'Fina y arenosa de veteado exótico y contrastante',
    recommendedUses: ['Muros destacados interiores/exteriores', 'Hall de acceso corporativo', 'Detalles decorativos templados'],
    description: 'Una joya geológica de veteados salvajes que semejan el desierto o remolinos naturales. Cada placa de piedra Morisca es un cuadro natural de bronce y metales oxidados.',
    vibe: 'Vanguardismo artístico, diseño industrial cálido e impacto suntuoso.',
    installationTip: 'Limpiar con un eliminador de salitre suave después de sellar las juntas y dar una protección de laca efecto húmedo opaco.',
    weightPerM2: 48,
    estimatedPriceIndicator: '●●●',
    imageUrl: '/images/morisca/Morisca.png',
    galleryUrls: [
      '/images/morisca/Morisca.png',
      '/images/morisca/morisca2.jpg',
      '/images/morisca/Morisca_Multicolor_05.jpg'
    ]
  }
];

export const SCENARIOS: Scenario[] = [
  {
    id: 'living',
    name: 'Living Familiar / Chimenea',
    description: 'Ideal para visualizar cómo un revestimiento de piedra aporta calidez hogareña y sofisticación al salón familiar.',
    bgUrl: '/images/scenario_living.png',
    overlayClasses: 'absolute top-0 left-[35%] w-[33%] h-full opacity-90 transition-all duration-700 bg-cover bg-center'
  },
  {
    id: 'facade',
    name: 'Fachada Residencial Moderna',
    description: 'Comprueba el monumental impacto estético que genera una piedra natural sobre muros exteriores y accesos.',
    bgUrl: '/images/scenario_facade.png',
    overlayClasses: 'absolute top-0 right-0 w-[45%] h-[80%] opacity-90 transition-all duration-700 bg-cover bg-center'
  },
  {
    id: 'pool',
    name: 'Solárium y Piscina',
    description: 'Espacios exteriores que requieren resistencia mineral, baja conductividad térmica y texturas seguras antideslizantes.',
    bgUrl: '/images/scenario_pool.png',
    overlayClasses: 'absolute bottom-0 right-[15%] w-[45%] h-[40%] opacity-90 transition-all duration-700 bg-cover bg-center'
  }
];
