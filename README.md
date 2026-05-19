# Lu Neyez - Wellness Coach E-commerce

Plataforma de e-commerce y marca personal para Lu Neyez, Wellness Coach con más de 6 años de experiencia acompañando a mujeres en su transformación hacia una vida más saludable.

## Referencias de Diseño

- **Sitio 1:** [thwbycata.com](https://thwbycata.com/)
- **Sitio 2:** [estefaniaestarli.com](https://www.estefaniaestarli.com/)
- **Perfiles de IG de referencia:** [@estefaniaestarli](https://www.instagram.com/estefaniaestarli) y [@catacohan](https://www.instagram.com/catacohan)

## Datos de Contacto y Redes Oficiales

- **Email de contacto:** Asesorias@luneyez.com
- **Teléfono (WhatsApp):** 3484307219
- **Instagram Oficial:** [Lu Neyez](https://www.instagram.com/lu.neyez)

## Lógica de Negocio

- **Envíos:** La web debe calcular automáticamente el costo de envío según la ubicación del cliente
- **Facturación:** Se requiere integración con facturación automática
- **Checkout:** Los clientes NO deben poder contactar para comprar por WhatsApp directamente desde la web (todo debe pasar por el carrito)

## Estructura de Precios y Productos

### NUTRI-GUÍA
*(Guía de alimentación + Combo x5 recetarios)*

| Producto | Precio Original | Precio Final |
|----------|----------------|--------------|
| Descenso tejido adiposo HOMBRES | $30.000 | **$25.000** |
| Aumento de masa muscular HOMBRES | $30.000 | **$25.000** |
| Aumento de masa muscular MUJERES | $30.000 | **$25.000** |
| Descenso tejido adiposo MUJERES | $30.000 | **$25.000** |

### PLANES DE ENTRENAMIENTO | PRINCIPIANTES
*(Duración 6 semanas. Para gimnasio o casa)*

| Producto | Precio |
|----------|--------|
| MUJER - PRINCIPIANTE - GIMNASIO | **$20.000** |
| MUJER - PRINCIPIANTE - HOGAR | **$20.000** |
| HOMBRE - PRINCIPIANTE - GIMNASIO | **$20.000** |
| HOMBRE - PRINCIPIANTE - HOGAR | **$20.000** |

### OTRAS CATEGORÍAS

- **RECETARIOS:** Combo x5 recetarios o individuales (Desayunos, meriendas, almuerzos, cenas, smoothies, vegan, GF)
- **GUÍAS DE ALIMENTACIÓN:** Consejos, menús y marcas recomendadas para aumento de masa o descenso de grasa
- **PROGRAMAS PERSONALIZADOS:**
  - Asesorías Personalizadas By Matías Fernández (Fuerza, alimentación, acompañamiento)
  - Asesorías personalizadas generales (Yoga, pilates, recetarios)
- **PLANES DE ENTRENAMIENTO:** YOGALATES II

## Textos para el Frontend

### Performance Experience (Sección de Servicios/Planes)
> "Un enfoque integral donde entrenamiento y nutrición trabajan en conjunto para ayudarte a lograr resultados reales, sostenibles y adaptados a vos."

### Ebook GRATIS (Lead Magnet)
> **Tu camino saludable:** Una guía práctica para construir hábitos reales y sostenibles. En este e-book vas a encontrar herramientas simples, consejos aplicables y una guía clara para organizarte con tu alimentación y tus entrenamientos sin caer en extremos. Aprendé a crear una rutina que se adapte a vos, no al revés, y a disfrutar del proceso hacia una vida más equilibrada y consciente.

### Sobre el Equipo

**Matías Fernandez (Profesor de Educación Física):**
> "Profesor de Educación Física y entrenador orientado al desarrollo de fuerza, rendimiento y entrenamiento funcional. Busca acompañar a cada persona de manera personalizada para potenciar su desempeño, mejorar su calidad de vida y generar hábitos sostenibles a largo plazo."

**Sofía Minkevich (Licenciada en Nutrición MN. 11592):**
> "Especializada en alimentación basada en plantas, salud digestiva y deporte. Su enfoque combina alimentación real, hábitos saludables y educación nutricional para ayudarte a mejorar tu bienestar de manera sostenible, disfrutando el proceso y aprendiendo a nutrirte desde un lugar más consciente."

---

## Arquitectura del Proyecto

### Stack Tecnológico

- **Framework:** Next.js 16 (App Router)
- **Estilos:** Tailwind CSS 4
- **Componentes:** shadcn/ui
- **Animaciones:** Framer Motion
- **Iconos:** Phosphor Icons
- **Tipografías:** Outfit (sans) + Sora (serif)
- **Estado:** Context API (Carrito)
- **Notificaciones:** Sonner
- **Temas:** next-themes (Light/Dark mode)

### Estructura de Carpetas

```
app/
├── page.tsx                 # Homepage
├── layout.tsx               # Root layout con providers
├── globals.css              # Estilos globales y tokens
├── catalogo/
│   ├── page.tsx             # Catálogo principal
│   └── [slug]/
│       └── page.tsx         # Detalle de producto
├── sobre-mi/
│   └── page.tsx             # Página del equipo
├── blog/
│   └── page.tsx             # Blog
└── contacto/
    └── page.tsx             # Contacto

components/
├── layout/
│   ├── navbar.tsx           # Navegación sticky
│   ├── footer.tsx           # Footer 4 columnas
│   ├── cart-sheet.tsx       # Slide-over del carrito
│   └── whatsapp-button.tsx  # Botón flotante
├── home/
│   ├── hero-section.tsx     # Hero con parallax
│   ├── about-preview.tsx    # Resumen sobre mí
│   ├── categories-section.tsx # Grid de categorías
│   ├── banner-section.tsx   # Banner motivacional
│   ├── testimonials-section.tsx # Carrusel testimonios
│   └── contact-form.tsx     # Formulario rápido
├── catalog/
│   ├── product-card.tsx     # Tarjeta de producto
│   ├── catalog-grid.tsx     # Grid con filtros
│   ├── catalog-filters.tsx  # Sidebar de filtros
│   └── product-detail.tsx   # Vista de detalle
├── about/
│   └── about-content.tsx    # Contenido sobre mí
├── blog/
│   └── blog-content.tsx     # Grid de artículos
├── contact/
│   └── contact-content.tsx  # Formulario completo
└── providers/
    └── theme-provider.tsx   # Provider de temas

lib/
├── data/
│   ├── products.ts          # Mock de productos
│   └── blog.ts              # Mock de artículos
├── store/
│   └── cart-store.tsx       # Context del carrito
└── utils.ts                 # Utilidades (cn)
```

### Integraciones Pendientes

Para convertir este mock en producción:

1. **CMS Headless (Sanity):** Conectar productos, blog y contenido dinámico
2. **Supabase:** Autenticación y base de datos de usuarios/pedidos
3. **Mercado Pago:** Integración de checkout y pagos
4. **Email:** Formularios con envío real (Resend/SendGrid)
5. **Analytics:** Vercel Analytics ya configurado

---

## Desarrollo Local

```bash
# Instalar dependencias
pnpm install

# Iniciar servidor de desarrollo
pnpm dev

# Build de producción
pnpm build
```

## Paleta de Colores

La paleta está basada en el logo de Lu Neyez (dusty rose sobre negro):

- **Primary:** Dusty Rose (`oklch(0.72 0.06 20)`)
- **Background Light:** Off-white cálido (`oklch(0.98 0.005 80)`)
- **Background Dark:** Zinc elegante (`oklch(0.14 0.01 250)`)
- **Accent:** Sage suave (`oklch(0.92 0.02 145)`)

**PROHIBIDO:** Rojos, naranjas o colores muy saturados.

## Características Implementadas

- [x] Dark/Light mode con transiciones suaves
- [x] Navegación sticky con efecto glassmorphism
- [x] Hero con imagen parallax (bg-attachment: fixed)
- [x] Carrito con estado global y slide-over
- [x] Filtros de catálogo con ordenamiento
- [x] Tarjetas de producto con hover actions
- [x] Carrusel de testimonios
- [x] Formularios de contacto
- [x] Botón flotante de WhatsApp
- [x] Scrollbar personalizada
- [x] Animaciones de aparición con Framer Motion
- [x] Responsive design mobile-first
