export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  image: string
  category: string
  author: string
  date: string
  readTime: string
  featured: boolean
}

export const blogCategories = [
  { slug: 'bienestar', name: 'Bienestar' },
  { slug: 'nutricion', name: 'Nutrición' },
  { slug: 'entrenamiento', name: 'Entrenamiento' },
  { slug: 'recetas', name: 'Recetas' },
]

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: '5 Hábitos matutinos que transformarán tu día',
    slug: '5-habitos-matutinos-que-transformaran-tu-dia',
    excerpt: 'Descubrí cómo una rutina matutina consciente puede mejorar tu energía, productividad y bienestar general.',
    content: `
## La importancia de una rutina matutina

La forma en que empezás tu día tiene un impacto significativo en tu energía, productividad y bienestar general. Una rutina matutina consciente no solo te ayuda a despertar con más energía, sino que también establece el tono para el resto del día.

### 1. Despertá con tiempo suficiente

El primer paso para una mañana exitosa es darte tiempo suficiente. Levantarte con prisa genera estrés innecesario y te pone en modo reactivo desde el primer momento. Intenta despertar al menos 30 minutos antes de lo que normalmente lo harías.

### 2. Hidratate apenas te levantes

Durante la noche, tu cuerpo se deshidrata. Beber un vaso de agua tibia con limón es una excelente manera de rehidratarte y activar tu sistema digestivo. Este simple hábito puede mejorar tu digestión y darte energía.

### 3. Movimiento consciente

No necesitás hacer un entrenamiento intenso por la mañana, pero sí es importante mover tu cuerpo. Puede ser una sesión corta de yoga, estiramientos suaves, o una caminata de 10 minutos. El movimiento libera endorfinas y te ayuda a despertar naturalmente.

### 4. Desayuno nutritivo

Un desayuno balanceado te da la energía necesaria para enfrentar el día. Incluí proteínas, grasas saludables y carbohidratos complejos. Evitá los azúcares refinados que generan picos de energía seguidos de bajones.

### 5. Momento de quietud

Antes de sumergirte en las notificaciones y emails, dedica unos minutos a la quietud. Puede ser meditación, escribir en un diario, o simplemente sentarte en silencio con tu café. Este momento de calma te ayuda a centrarte antes de las demandas del día.

## Conclusión

Implementar estos hábitos no tiene que ser todo o nada. Empezá con uno o dos y gradualmente incorporá los demás. La clave está en la consistencia, no en la perfección.
    `,
    image: '/images/hero-bg.jpg',
    category: 'Bienestar',
    author: 'Lu Neyez',
    date: '2024-01-15',
    readTime: '5 min',
    featured: true,
  },
  {
    id: '2',
    title: 'Guía completa de proteínas vegetales',
    slug: 'guia-completa-proteinas-vegetales',
    excerpt: 'Todo lo que necesitás saber sobre las fuentes de proteína vegetal y cómo incorporarlas en tu alimentación.',
    content: `
## Proteínas vegetales: Todo lo que necesitás saber

Las proteínas son esenciales para la construcción y reparación de tejidos, la producción de enzimas y hormonas, y el mantenimiento de un sistema inmunológico saludable.

### ¿Por qué considerar proteínas vegetales?

Las proteínas vegetales ofrecen varios beneficios:
- Menor contenido de grasas saturadas
- Alto contenido de fibra
- Ricas en fitonutrientes
- Más sostenibles ambientalmente

### Principales fuentes de proteína vegetal

**Legumbres:**
- Lentejas: 18g por taza cocida
- Garbanzos: 15g por taza cocida
- Porotos negros: 15g por taza cocida

**Derivados de soja:**
- Tofu: 20g por 100g
- Tempeh: 19g por 100g
- Edamame: 17g por taza

**Granos y semillas:**
- Quinoa: 8g por taza cocida
- Semillas de hemp: 10g por 3 cucharadas
- Semillas de chía: 4g por 2 cucharadas

### Combinando proteínas

Para obtener todos los aminoácidos esenciales, es importante variar tus fuentes de proteína vegetal. Algunas combinaciones clásicas incluyen:
- Arroz con porotos
- Hummus con pan integral
- Tofu con quinoa

## Conclusión

Con planificación y variedad, es completamente posible obtener toda la proteína que necesitás de fuentes vegetales.
    `,
    image: '/images/nutrition-category.jpg',
    category: 'Nutrición',
    author: 'Sofía Minkevich',
    date: '2024-01-10',
    readTime: '8 min',
    featured: true,
  },
  {
    id: '3',
    title: 'Cómo empezar a entrenar sin morir en el intento',
    slug: 'como-empezar-a-entrenar-sin-morir-en-el-intento',
    excerpt: 'Consejos prácticos para principiantes que quieren comenzar su camino fitness de forma segura y sostenible.',
    content: `
## Tu guía para empezar a entrenar

Empezar a hacer ejercicio puede parecer intimidante, pero con el enfoque correcto, puede convertirse en una parte disfrutable de tu vida.

### 1. Empezá despacio

El error más común de los principiantes es querer hacer demasiado, demasiado rápido. Esto lleva al agotamiento, lesiones y abandono. Empezá con 2-3 sesiones por semana de 30 minutos.

### 2. Elegí actividades que disfrutes

No todos tenemos que hacer el mismo tipo de ejercicio. Algunas personas aman correr, otras prefieren nadar, bailar o hacer pesas. Experimentá con diferentes actividades hasta encontrar lo que te gusta.

### 3. Aprendé la técnica correcta

Antes de preocuparte por cuánto peso levantás o qué tan rápido corrés, asegurate de aprender la técnica correcta. Esto previene lesiones y hace tu entrenamiento más efectivo.

### 4. Descansá adecuadamente

El descanso es cuando tu cuerpo se recupera y se fortalece. No entrenes los mismos músculos dos días seguidos y asegurate de dormir 7-9 horas por noche.

### 5. Sé consistente

La consistencia supera a la intensidad. Es mejor hacer ejercicio moderado regularmente que hacer sesiones intensas de vez en cuando.

## Conclusión

Recordá que cada persona que ves entrenando empezó desde cero. Sé paciente contigo mismo y celebrá cada pequeño progreso.
    `,
    image: '/images/training-category.jpg',
    category: 'Entrenamiento',
    author: 'Matías Fernandez',
    date: '2024-01-05',
    readTime: '6 min',
    featured: false,
  },
  {
    id: '4',
    title: 'La importancia del descanso en tu progreso',
    slug: 'importancia-del-descanso-en-tu-progreso',
    excerpt: 'Por qué el descanso es tan importante como el entrenamiento y cómo optimizar tu recuperación.',
    content: `
## El descanso: Tu arma secreta

Muchas personas subestiman la importancia del descanso en su rutina de entrenamiento. Sin embargo, es durante el descanso cuando ocurre la magia.

### La ciencia del descanso

Cuando entrenás, creás pequeñas roturas en tus fibras musculares. Durante el descanso, tu cuerpo repara estas fibras y las hace más fuertes. Sin descanso adecuado, este proceso no puede completarse.

### Señales de que necesitás más descanso

- Fatiga persistente
- Disminución del rendimiento
- Irritabilidad
- Dificultad para dormir
- Mayor susceptibilidad a enfermedades

### Cómo optimizar tu recuperación

1. **Sueño de calidad:** 7-9 horas por noche
2. **Nutrición adecuada:** Proteínas para reparación muscular
3. **Hidratación:** Al menos 2 litros de agua diarios
4. **Descanso activo:** Caminatas suaves, yoga

## Conclusión

El descanso no es pereza, es parte esencial del proceso. Escuchá a tu cuerpo y dale el tiempo que necesita para recuperarse.
    `,
    image: '/images/banner-bg.jpg',
    category: 'Bienestar',
    author: 'Lu Neyez',
    date: '2024-01-01',
    readTime: '4 min',
    featured: false,
  },
  {
    id: '5',
    title: 'Recetas fáciles para meal prep semanal',
    slug: 'recetas-faciles-meal-prep-semanal',
    excerpt: 'Organizá tu alimentación de la semana con estas recetas simples y deliciosas.',
    content: `
## Meal Prep: Tu guía completa

El meal prep o preparación de comidas es una estrategia que te ahorra tiempo, dinero y te ayuda a comer más saludable durante la semana.

### Beneficios del meal prep

- Ahorro de tiempo durante la semana
- Menor desperdicio de alimentos
- Mejor control de porciones
- Comidas más saludables

### Recetas base para la semana

**Proteína base: Pollo al horno**
- 1 kg de pechuga de pollo
- Aceite de oliva, sal, pimienta
- Hornear 25 min a 200°C

**Carbohidrato: Arroz integral**
- 2 tazas de arroz
- Cocinar según instrucciones
- Dividir en porciones

**Vegetales: Mix asado**
- Brócoli, zanahoria, calabaza
- Aceite de oliva, ajo, especias
- Hornear 25 min a 200°C

### Tips para meal prep exitoso

1. Elegí un día fijo para preparar
2. Invertí en buenos contenedores
3. Empezá con recetas simples
4. Etiquetá todo con fechas

## Conclusión

El meal prep es una herramienta poderosa para mantener una alimentación saludable sin pasar horas en la cocina cada día.
    `,
    image: '/images/nutrition-category.jpg',
    category: 'Recetas',
    author: 'Sofía Minkevich',
    date: '2023-12-28',
    readTime: '10 min',
    featured: false,
  },
  {
    id: '6',
    title: 'Yoga vs Pilates: ¿Cuál es mejor para vos?',
    slug: 'yoga-vs-pilates-cual-es-mejor',
    excerpt: 'Analizamos las diferencias entre yoga y pilates para ayudarte a elegir la práctica ideal.',
    content: `
## Yoga vs Pilates: Una comparación completa

Tanto el yoga como el pilates son excelentes formas de ejercicio que mejoran la fuerza, flexibilidad y bienestar mental. Pero tienen diferencias importantes.

### Orígenes

**Yoga:** Práctica milenaria originaria de India con un enfoque espiritual y filosófico además del físico.

**Pilates:** Desarrollado en el siglo XX por Joseph Pilates, enfocado principalmente en el fortalecimiento del core y la rehabilitación.

### Beneficios del Yoga

- Mayor flexibilidad
- Reducción del estrés
- Mejora la respiración
- Conexión mente-cuerpo
- Elemento espiritual

### Beneficios del Pilates

- Fortalecimiento del core
- Mejor postura
- Tonificación muscular
- Rehabilitación de lesiones
- Ejercicios más estructurados

### ¿Cuál elegir?

Depende de tus objetivos:
- Para flexibilidad y relajación: Yoga
- Para fortalecimiento y tonificación: Pilates
- Lo mejor: ¡Combinar ambos!

## Conclusión

No hay una opción mejor que otra, solo la que mejor se adapte a vos y tus objetivos. ¿Por qué no probar ambas?
    `,
    image: '/images/training-category.jpg',
    category: 'Entrenamiento',
    author: 'Lu Neyez',
    date: '2023-12-20',
    readTime: '7 min',
    featured: false,
  },
  {
    id: '7',
    title: 'Beneficios de la meditación diaria',
    slug: 'beneficios-meditacion-diaria',
    excerpt: 'Descubre cómo 10 minutos de meditación pueden cambiar tu vida.',
    content: '## Meditación\n\nLa meditación es clave para la salud mental...',
    image: '/images/hero-bg.jpg',
    category: 'Bienestar',
    author: 'Lu Neyez',
    date: '2023-12-15',
    readTime: '5 min',
    featured: false,
  },
  {
    id: '8',
    title: 'Snacks saludables para la tarde',
    slug: 'snacks-saludables-tarde',
    excerpt: 'Opciones ricas y nutritivas para cuando ataca el hambre.',
    content: '## Snacks\n\nIdeas rápidas para la merienda...',
    image: '/images/nutrition-category.jpg',
    category: 'Recetas',
    author: 'Sofía Minkevich',
    date: '2023-12-10',
    readTime: '4 min',
    featured: false,
  },
  {
    id: '9',
    title: 'Cómo mantener la motivación',
    slug: 'como-mantener-motivacion',
    excerpt: 'Estrategias para no abandonar tus metas a largo plazo.',
    content: '## Motivación\n\nLa disciplina supera a la motivación...',
    image: '/images/training-category.jpg',
    category: 'Entrenamiento',
    author: 'Matías Fernandez',
    date: '2023-12-05',
    readTime: '6 min',
    featured: false,
  },
  {
    id: '10',
    title: 'Hidratación: Mitos y verdades',
    slug: 'hidratacion-mitos-verdades',
    excerpt: '¿Cuánta agua realmente necesitas tomar al día?',
    content: '## Agua\n\nTodo sobre la hidratación adecuada...',
    image: '/images/hero-bg.jpg',
    category: 'Nutrición',
    author: 'Sofía Minkevich',
    date: '2023-11-28',
    readTime: '5 min',
    featured: false,
  },
  {
    id: '11',
    title: 'Ejercicios de movilidad para la mañana',
    slug: 'ejercicios-movilidad-manana',
    excerpt: 'Rutina de 5 minutos para despertar tu cuerpo.',
    content: '## Movilidad\n\nEmpieza tu día sin rigidez...',
    image: '/images/banner-bg.jpg',
    category: 'Entrenamiento',
    author: 'Matías Fernandez',
    date: '2023-11-20',
    readTime: '4 min',
    featured: false,
  },
  {
    id: '12',
    title: 'Avena nocturna: 3 recetas fáciles',
    slug: 'avena-nocturna-recetas',
    excerpt: 'Desayunos rápidos que se preparan solos mientras duermes.',
    content: '## Overnight Oats\n\nPrepara tu desayuno la noche anterior...',
    image: '/images/nutrition-category.jpg',
    category: 'Recetas',
    author: 'Lu Neyez',
    date: '2023-11-15',
    readTime: '3 min',
    featured: false,
  },
  {
    id: '13',
    title: 'El poder del descanso activo',
    slug: 'poder-descanso-activo',
    excerpt: 'Por qué no hacer nada a veces es lo mejor que puedes hacer.',
    content: '## Descanso\n\nRecuperación es parte del entrenamiento...',
    image: '/images/hero-bg.jpg',
    category: 'Bienestar',
    author: 'Lu Neyez',
    date: '2023-11-10',
    readTime: '5 min',
    featured: false,
  },
  {
    id: '14',
    title: 'Entrenamiento de fuerza en casa',
    slug: 'entrenamiento-fuerza-casa',
    excerpt: 'Cómo ganar fuerza sin equipamiento costoso.',
    content: '## Fuerza\n\nUsa tu propio peso corporal...',
    image: '/images/training-category.jpg',
    category: 'Entrenamiento',
    author: 'Matías Fernandez',
    date: '2023-11-05',
    readTime: '8 min',
    featured: false,
  },
  {
    id: '15',
    title: 'Smoothies verdes que sí saben bien',
    slug: 'smoothies-verdes-ricos',
    excerpt: 'Oculta vegetales en tus licuados sin sacrificar el sabor.',
    content: '## Smoothies\n\nEl secreto está en el balance...',
    image: '/images/nutrition-category.jpg',
    category: 'Recetas',
    author: 'Sofía Minkevich',
    date: '2023-11-01',
    readTime: '4 min',
    featured: false,
  },
  {
    id: '16',
    title: 'Mindful Eating: Comer con conciencia',
    slug: 'mindful-eating',
    excerpt: 'Conecta con tus señales de hambre y saciedad.',
    content: '## Alimentación Consciente\n\nEscucha a tu cuerpo...',
    image: '/images/banner-bg.jpg',
    category: 'Bienestar',
    author: 'Lu Neyez',
    date: '2023-10-25',
    readTime: '6 min',
    featured: false,
  },
]

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug)
}

export function getFeaturedPosts(): BlogPost[] {
  return blogPosts.filter((p) => p.featured)
}

export function getPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter((p) => p.category.toLowerCase() === category.toLowerCase())
}

export function getAllCategories(): string[] {
  return [...new Set(blogPosts.map((p) => p.category))]
}
