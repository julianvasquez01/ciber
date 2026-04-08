'use client';
// Indica que este archivo se ejecutará del lado del cliente (Client Component) 
// Necesario para que funcionen hooks interactivos como useState o useEffect.

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

// ==========================================
// SECCIÓN 1: ÍCONOS E INTERFAZ
// ==========================================
// Centralizamos todos los SVG para no ensuciar el código JSX principal.
// Para añadir nuevos íconos, simplemente crea una nueva función que retorne el SVG.
const Icons = {
  GitHub: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  ),
  LinkedIn: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  ),
  Mail: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
  Phone: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  MapPin: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  ExternalLink: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  ),
  Database: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  ),
  Code: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  Star: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  BarChart: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="20" x2="12" y2="10" />
      <line x1="18" y1="20" x2="18" y2="4" />
      <line x1="6" y1="20" x2="6" y2="16" />
    </svg>
  ),
  Terminal: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  ),
  Sun: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  ),
  Moon: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  ),
  Dashboard: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  )
};

// ==========================================
// SECCIÓN 2: BASE DE DATOS LOCAL (Modificable)
// ==========================================
// Si deseas actualizar el contenido del portafolio, edita solamente las variables de este bloque.

// 2.1 Datos generales del usuario
const portfolio = {
  name: "Julián Vasquez Ojeda",
  role: "Analista de Datos",
  roleSecondary: "Ingeniero de Sistemas",
  summary: " Experiencia práctica como Analista de Datos. En Power BI, Python y SQL para extracción, procesamiento y visualización de datos. Desarrollador web con bastante cretividad para integrar o generar proyectos de alto impacto ,Capacidad comprobada para generar reportes estratégicos que apoyan la toma de decisiones con mis conocimientos aportando soluciones tecnológicas de impacto.",
  email: "julianvasquez799@gmail.com",
  phone: "+57 3004627891",
  location: "Bogotá, Colombia",
  social: {
    github: "https://github.com/JulianFVasquez1",
    linkedin: "https://www.linkedin.com/in/julian-vasquez-ojeda", // Enlace directo a LinkedIn
  },
};

// 2.2 Lista de Competencias divididas por categorías
const skills = [
  {
    category: "Data & Analytics",
    icon: Icons.Database,
    items: ["Power BI", "Excel", "Python", "SQL", "Análisis Estadístico", "Office365", "MySQL", "PostgreSQL"]
  },
  {
    category: "Desarrollo Web",
    icon: Icons.Code,
    items: ["HTML / CSS", "Angular", "Node.js", "JavaScript", "React"]
  },
  {
    category: "Habilidades Blandas",
    icon: Icons.Star,
    items: ["Pensamiento Analítico", "Resolución de Problemas", "Trabajo en Equipo", "Comunicación Clara"]
  }
];

// 2.3 Experiencia laboral relevante
const experience = [
  {
    role: "Analista de Datos",
    company: "Universidad Santo Tomás",
    location: "Tunja",
    period: "2023 – Actual",
    achievements: [
      "Diseñé y administré dashboards en Power BI para monitoreo de KPIs institucionales, reduciendo tiempos de revisión gerencial.",
      "Automaticé la extracción, limpieza y procesamiento de conjuntos de datos de más de 5.000 registros mensuales.",
      "Generé reportes estructurados semanales para apoyo a la toma de decisiones de directivos y coordinadores.",
      "Apliqué paquetes estadísticos para el análisis de conjuntos de datos académicos y operativos.",
      "Coordiné y colaboré en entornos de trabajo virtual, garantizando cumplimiento de lineamientos de planeación e información.",
      "Apoyé procesos operativos y administrativos mediante análisis de información institucional."
    ]
  }
];

// 2.4 Estudios o Formación Académica
const education = [
  {
    degree: "Ingeniería de Sistemas",
    institution: "Universidad Santo Tomás",
    location: "Tunja",
    period: "2022 – Actual (9° semestre)"
  },
  {
    degree: "Bachiller Académico",
    institution: "Colegio Salesiano Maldonado",
    location: "Tunja", // Asumiendo, dado el contexto
    period: "Enero 2021"
  }
];

// 2.5 Proyectos destacados a promocionar en las 'Cards'
const projects = [
  {
    title: "Dashboard de Seguimiento",
    description: "Panel de control en Power BI para visualización de métricas académicas y administrativas.",
    technologies: ["Power BI", "SQL", "Excel"],
    link: "https://github.com/JulianVasquez1",
    icon: Icons.Dashboard,

  },
  {
    title: "Portafolio Personal",
    description: "Sitio web personal con proyectos y visualizaciones interactivas. Diseño minimalista.",
    technologies: ["Next.js", "Tailwind", "React"],
    link: "#",
    icon: Icons.Code,
  },
  {
    title: "Pipeline de Datos",
    description: "Automatización de extracción, transformación y carga de datos para análisis empresarial.",
    technologies: ["Python", "SQL", "Airflow"],
    link: "https://github.com/JulianVasquez1",
    icon: Icons.Database,
  }
];

// ==========================================
// SECCIÓN 3: COMPONENTES DE INTERFAZ 
// ==========================================

// 3.1 NavBar (Menú de navegación superior)
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Enlaces o links internos de la página para hacer scroll suave
  const navLinks = [
    { href: '#about', label: 'Inicio' },
    { href: '#skills', label: 'Competencias' },
    { href: '#projects', label: 'Proyectos' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-border transition-colors duration-300" style={{ background: 'var(--nav-bg, rgba(255,255,255,0.85))' }}>
      <style>{`.dark nav { --nav-bg: rgba(20,33,61,0.85); } nav { --nav-bg: rgba(255,255,255,0.85); }`}</style>
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">

          {/* Logo - Esquina izquierda (Imagen + Texto) */}
          <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
            {/* Contenedor de la foto de perfil en miniatura */}
            <div className="relative w-10 h-10 overflow-hidden rounded-full border border-border shadow-sm">
              <Image
                src="/images/fotito.png"
                alt="Logo Julian"
                fill
                className="object-cover"
                unoptimized
                priority
              />
            </div>
            {/* Texto auxiliar que se oculta en móviles */}

          </Link>

          {/* Menú de PC (oculto en móviles por 'hidden md:flex') */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm font-medium text-muted hover:text-accent transition-colors relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[2px] after:bg-accent after:transition-all after:duration-300 hover:after:w-full">
                {link.label}
              </Link>
            ))}
          </div>

          {/* Botón "Contáctame" (solo visible en PC) */}
          <div className="hidden md:block">




            <Link href="#contact">
              <button
                className="relative inline-flex h-12 active:scale-95 transition overflow-hidden rounded-lg p-[1px] focus:outline-none"
              >
                <span
                  className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#FCA311_0%,#f8d070_50%,#d48806_100%)]"
                >
                </span>
                <span
                  className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg px-7 text-sm font-medium text-white backdrop-blur-3xl gap-2" style={{ background: '#14213D' }}
                >
                  Contáctame
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 448 512"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M429.6 92.1c4.9-11.9 2.1-25.6-7-34.7s-22.8-11.9-34.7-7l-352 144c-14.2 5.8-22.2 20.8-19.3 35.8s16.1 25.8 31.4 25.8H224V432c0 15.3 10.8 28.4 25.8 31.4s30-5.1 35.8-19.3l144-352z"
                    ></path>
                  </svg>
                </span>
              </button>
            </Link>

          </div>

          {/* Botón Hamburguesa para Móviles (abre/cierra el menú dinámicamente) */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {/* Cambia el ícono (X o Rayas) según el estado de 'isOpen' */}
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>

      {/* Menú desplegable para vista móvil (Condicional a 'isOpen') */}
      {isOpen && (
        <div className="md:hidden bg-background border-b border-border px-6 py-4 space-y-4 shadow-lg absolute w-full">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-foreground font-medium text-lg py-2"
              onClick={() => setIsOpen(false)} // Cierra el menú tras pinchar una opción
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="#contact"
            className="block w-full py-3 text-center bg-accent text-black font-medium rounded-lg"
            onClick={() => setIsOpen(false)}
          >
            Contáctame
          </Link>
        </div>
      )}
    </nav>
  );
}

// 3.2 Hero (Componente de introducción superior en la web)
function Hero() {
  const node1Ref = useRef<HTMLDivElement>(null);
  const node2Ref = useRef<HTMLDivElement>(null);
  const node3Ref = useRef<HTMLDivElement>(null);
  const node4Ref = useRef<HTMLDivElement>(null);
  const node5Ref = useRef<HTMLDivElement>(null);
  const node6Ref = useRef<HTMLDivElement>(null);
  const [isDark, setIsDark] = useState(true);

  // Detectar tema para cambiar estilo de nodos orbitales
  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  // Estilos de nodos: en light mode todos usan estilo Database (glow dorado)
  const nodeStyleLg = isDark
    ? { background: '#14213D', borderColor: 'rgba(252,163,17,0.3)', color: '#FCA311', boxShadow: '0 0 10px rgba(252,163,17,0.15)' }
    : { background: 'rgba(252,163,17,0.1)', border: '1px solid rgba(252,163,17,0.25)', color: '#FCA311', boxShadow: '0 0 15px rgba(252,163,17,0.3)', backdropFilter: 'blur(4px)' };

  const nodeStyleMd = isDark
    ? { background: '#14213D', borderColor: 'rgba(252,163,17,0.3)', color: '#FCA311', boxShadow: '0 0 10px rgba(252,163,17,0.15)' }
    : { background: 'rgba(252,163,17,0.1)', border: '1px solid rgba(252,163,17,0.25)', color: '#FCA311', boxShadow: '0 0 15px rgba(252,163,17,0.3)', backdropFilter: 'blur(4px)' };

  const nodeStyleSm = isDark
    ? { background: '#14213D', borderColor: 'rgba(252,163,17,0.3)', color: '#FCA311' }
    : { background: 'rgba(252,163,17,0.1)', border: '1px solid rgba(252,163,17,0.25)', color: '#FCA311', boxShadow: '0 0 12px rgba(252,163,17,0.25)', backdropFilter: 'blur(4px)' };

  // Database node siempre usa su estilo glow (no cambia)
  const nodeStyleDb = { background: 'rgba(252,163,17,0.1)', border: '1px solid rgba(252,163,17,0.2)', boxShadow: '0 0 15px rgba(252,163,17,0.3)', color: '#FCA311' };

  // Animación JS del sistema orbital
  useEffect(() => {
    let animationFrameId: number;
    let angle1 = 0;
    let angle2 = 180;
    let angle3 = 90;
    let angle4 = 45;
    let angle5 = 270;
    let angle6 = 0;

    const animate = () => {
      const r1 = window.innerWidth < 768 ? 100 : 140;
      const r2 = window.innerWidth < 768 ? 140 : 195;
      const r3 = window.innerWidth < 768 ? 70 : 100;
      const r4 = window.innerWidth < 768 ? 180 : 240;

      angle1 += 0.2;
      angle2 -= 0.15;
      angle3 += 0.3;
      angle4 += 0.1;
      angle5 -= 0.12;
      angle6 += 0.15;

      if (node1Ref.current) {
        node1Ref.current.style.transform = `translate(${Math.cos(angle1 * Math.PI / 180) * r1}px, ${Math.sin(angle1 * Math.PI / 180) * r1}px)`;
      }
      if (node2Ref.current) {
        node2Ref.current.style.transform = `translate(${Math.cos(angle2 * Math.PI / 180) * r2}px, ${Math.sin(angle2 * Math.PI / 180) * r2}px)`;
      }
      if (node3Ref.current) {
        node3Ref.current.style.transform = `translate(${Math.cos(angle3 * Math.PI / 180) * r3}px, ${Math.sin(angle3 * Math.PI / 180) * r3}px)`;
      }
      if (node4Ref.current) {
        node4Ref.current.style.transform = `translate(${Math.cos(angle4 * Math.PI / 180) * r4}px, ${Math.sin(angle4 * Math.PI / 180) * r4}px)`;
      }
      if (node5Ref.current) {
        node5Ref.current.style.transform = `translate(${Math.cos(angle5 * Math.PI / 180) * r4}px, ${Math.sin(angle5 * Math.PI / 180) * r4}px)`;
      }
      if (node6Ref.current) {
        node6Ref.current.style.transform = `translate(${Math.cos(angle6 * Math.PI / 180) * r4}px, ${Math.sin(angle6 * Math.PI / 180) * r4}px)`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <section id="about" className="pt-32 pb-20 md:pt-48 md:pb-32 px-6 max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12 md:gap-20">

      {/* Contenedor Izquierdo: Textos y Botones */}
      <div className="flex-1 space-y-8 animate-fade-in-up mt-8 md:mt-0 z-10 w-full md:max-w-xl">
        <div className="space-y-4">
          <p className="text-accent font-medium tracking-wide code-font text-sm md:text-base">
            Hola , Soy {portfolio.name.split(' ')[0]}
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.1]">
            {portfolio.roleSecondary} y <br className="hidden md:block" />
            <span className="text-accent relative inline-block mt-2">
              {portfolio.role}
              <span className="animate-blink text-accent font-light absolute -right-4 top-0">|</span>
            </span>
          </h1>
        </div>

        <p className="text-base md:text-lg text-muted/90 leading-relaxed max-w-lg">
          {portfolio.summary}
        </p>

        <div className="flex flex-wrap items-center gap-6 pt-4 pb-2">
          {/* Botón Principal (Card interactiva) - Descargar CV */}
          <div className="relative duration-300 hover:rotate-0 -rotate-[8deg] group border-4 overflow-hidden rounded-2xl h-48 w-64 p-5 flex flex-col items-start gap-4 shadow-xl z-20" style={{ background: '#172b58ff', borderColor: '#FCA311' }}>
            <div className="text-gray-50 z-20 flex flex-col">
              <span className="font-bold text-4xl">CV</span>
              <p className="text-xs font-medium tracking-wider">{portfolio.roleSecondary.toUpperCase()}</p>
            </div>

            <a href="public/CV/CV_Julian_Vasquez_Ojeda..pdf" download className="duration-300 hover:bg-[#0a1628] border border-transparent hover:border-accent hover:text-gray-50 bg-gray-50 font-semibold px-3 py-2 flex flex-row items-center gap-3 rounded-lg z-20 shadow-md" style={{ color: '#2f6becff' }}>
              Download CV
              <svg className="w-5 h-5 fill-current" height="100" preserveAspectRatio="xMidYMid meet" viewBox="0 0 100 100" width="100" x="0" xmlns="http://www.w3.org/2000/svg" y="0">
                <path d="M22.1,77.9a4,4,0,0,1,4-4H73.9a4,4,0,0,1,0,8H26.1A4,4,0,0,1,22.1,77.9ZM35.2,47.2a4,4,0,0,1,5.7,0L46,52.3V22.1a4,4,0,1,1,8,0V52.3l5.1-5.1a4,4,0,0,1,5.7,0,4,4,0,0,1,0,5.6l-12,12a3.9,3.9,0,0,1-5.6,0l-12-12A4,4,0,0,1,35.2,47.2Z" fillRule="evenodd"></path>
              </svg>
            </a>



            <svg className="group-hover:scale-125 duration-500 absolute -bottom-0.5 -right-20 w-48 h-48 z-10 -my-2 fill-gray-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" style={{ stroke: '#656a70ff' }}>
              <path data-name="layer1" d="M 50.4 51 C 40.5 49.1 40 46 40 44 v -1.2 a 18.9 18.9 0 0 0 5.7 -8.8 h 0.1 c 3 0 3.8 -6.3 3.8 -7.3 s 0.1 -4.7 -3 -4.7 C 53 4 30 0 22.3 6 c -5.4 0 -5.9 8 -3.9 16 c -3.1 0 -3 3.8 -3 4.7 s 0.7 7.3 3.8 7.3 c 1 3.6 2.3 6.9 4.7 9 v 1.2 c 0 2 0.5 5 -9.5 6.8 S 2 62 2 62 h 60 a 14.6 14.6 0 0 0 -11.6 -11 z" strokeMiterlimit="10" strokeWidth="5"></path>
            </svg>

            <svg className="group-hover:scale-125 duration-200 absolute -bottom-0.5 -right-20 w-48 h-48 z-10 -my-2 fill-gray-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" style={{ stroke: '#FCA311' }}>
              <path data-name="layer1" d="M 50.4 51 C 40.5 49.1 40 46 40 44 v -1.2 a 18.9 18.9 0 0 0 5.7 -8.8 h 0.1 c 3 0 3.8 -6.3 3.8 -7.3 s 0.1 -4.7 -3 -4.7 C 53 4 30 0 22.3 6 c -5.4 0 -5.9 8 -3.9 16 c -3.1 0 -3 3.8 -3 4.7 s 0.7 7.3 3.8 7.3 c 1 3.6 2.3 6.9 4.7 9 v 1.2 c 0 2 0.5 5 -9.5 6.8 S 2 62 2 62 h 60 a 14.6 14.6 0 0 0 -11.6 -11 z" strokeMiterlimit="10" strokeWidth="2"></path>
            </svg>
          </div>

          {/* Botón Secundario - Contáctame (Animado) */}

        </div>

        {/* Círculos Redes Sociales Pequeños debajo de los botones */}
        <div className="flex items-center gap-3 pt-4 border-t border-border/30 w-max pr-12">
          <a
            href={portfolio.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-foreground/5 text-muted hover:bg-accent hover:text-black transition-all duration-300"
            title="LinkedIn"
          >
            <Icons.LinkedIn />
          </a>
          <a
            href={portfolio.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-foreground/5 text-muted hover:bg-accent hover:text-black transition-all duration-300"
            title="GitHub"
          >
            <Icons.GitHub />
          </a>
          <a
            href={`mailto:${portfolio.email}`}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-foreground/5 text-muted hover:bg-accent hover:text-black transition-all duration-300"
            title="Email"
          >
            <Icons.Mail />
          </a>
        </div>
      </div>

      {/* Contenedor Derecho: Sistema Orbital con Foto animado mediante JS */}
      {/* Movido a la derecha usando md:ml-auto u otorgando un ancho fijo contenedor. */}
      <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] shrink-0 flex items-center justify-center -translate-y-6 md:translate-y-0 md:translate-x-12 lg:translate-x-16">

        {/* Anillo Orbital Ultra-Externo (Nuevo) */}
        <div className="absolute inset-[-40px] md:inset-[-30px] rounded-full border opacity-40 dark:opacity-20 hidden sm:block" style={{ borderColor: 'rgba(252,163,17,0.15)' }}></div>

        {/* Anillo Orbital Externo */}
        <div className="absolute inset-0 rounded-full border opacity-50 dark:opacity-25 hidden sm:block" style={{ borderColor: 'rgba(252,163,17,0.2)' }}></div>

        {/* Anillo Orbital Medio */}
        <div className="absolute inset-10 md:inset-16 rounded-full border opacity-60 dark:opacity-35" style={{ borderColor: 'rgba(252,163,17,0.25)' }}></div>

        {/* Anillo Orbital Interno */}
        <div className="absolute inset-20 md:inset-28 rounded-full border opacity-80 dark:opacity-45" style={{ borderColor: 'rgba(252,163,17,0.3)' }}></div>

        {/* Nodos Orbitando (Transform controladas por el hook de useEffect JS) */}

        {/* Nodo 1: Satélite (Code) */}
        <div ref={node1Ref} className="absolute top-1/2 left-1/2 -mt-4 -ml-4 z-20">
          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={nodeStyleLg}>
            <Icons.Code />
          </div>
        </div>

        {/* Nodo 2: Satélite externo (Database) */}
        <div ref={node2Ref} className="absolute top-1/2 left-1/2 -mt-5 -ml-5 z-20">
          <div className="w-10 h-10 rounded-full backdrop-blur flex items-center justify-center" style={nodeStyleDb}>
            <Icons.Database />
          </div>
        </div>

        {/* Nodo 3: Satélite interno (Star) */}


        {/* Nodo 4: Satélite Nuevo Ultra-Externo (BarChart/PowerBI) */}
        <div ref={node4Ref} className="absolute top-1/2 left-1/2 -mt-4 -ml-4 z-20 hidden sm:block">
          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={nodeStyleMd}>
            <Icons.BarChart />
          </div>
        </div>

        {/* Nodo 5: Satélite Nuevo Ultra-Externo (Terminal/SQL-Python) */}
        <div ref={node5Ref} className="absolute top-1/2 left-1/2 -mt-4 -ml-4 z-20 hidden sm:block">
          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={nodeStyleMd}>
            <Icons.Terminal />
          </div>
        </div>

        <div ref={node6Ref} className="absolute top-1/2 left-1/2 -mt-3 -ml-3 z-20">
          <div className="w-6 h-6 rounded-full flex items-center justify-center" style={nodeStyleSm}>
            <Icons.Star />
          </div>
        </div>

        {/* Centro: Foto Principal del Usuario */}
        <div className="relative w-44 h-44 md:w-56 md:h-56 z-30 group rounded-full overflow-hidden ring-2 transition-transform duration-500 hover:scale-105" style={{ '--tw-ring-color': 'rgba(252,163,17,0.6)', boxShadow: '0 0 40px rgba(252,163,17,0.25)' } as React.CSSProperties}>
          <Image
            src="/images/Retrato_corporativo_pulido_202604051338.jpeg"
            alt={portfolio.name}
            fill
            className="object-cover"
            unoptimized
            priority
          />
          <div className="absolute inset-0 rounded-full border border-white/20 dark:border-white/10 mix-blend-overlay pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
}

// 3.3 Experiencia Laboral y Educación (Mostrada como Timeline / Grid)
function Experience() {
  return (
    <section id="experience" className="py-20 px-6" style={{ background: 'var(--background)' }}>
      <div className="max-w-5xl mx-auto space-y-16">
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">Experiencia</h2>
          <p className="text-muted text-lg">Mi trayectoria profesional y académica.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Lado izquierdo: Lista de experiencias laborales */}
          <div className="md:col-span-8 space-y-12">
            {experience.map((exp, idx) => (
              <div key={idx} className="relative pl-8 md:pl-0">
                {/* Línea decorativa para imitar una línea base de vida en PC */}
                <div className="hidden md:block absolute left-[-2rem] top-2 w-3 h-3 rounded-full ring-4" style={{ background: '#FCA311', '--tw-ring-color': 'rgba(252,163,17,0.2)' } as React.CSSProperties}></div>

                <h3 className="text-2xl font-bold text-foreground mb-1">{exp.role}</h3>
                <div className="flex flex-wrap gap-2 text-muted font-medium mb-4">
                  <span>{exp.company}</span>
                  <span className="text-border">•</span>
                  <span>{exp.location}</span>
                  <span className="text-border">•</span>
                  <span className="text-accent">{exp.period}</span>
                </div>

                {/* Puntos de logros en formato de listado balizado */}
                <ul className="space-y-3 text-muted/90">
                  {exp.achievements.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-1.5 w-1.5 h-1.5 bg-border rounded-full shrink-0"></span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Lado derecho: Estudios y Conocimientos Adicionales (Idiomas) */}
          <div className="md:col-span-4 space-y-12 md:pl-8 md:border-l" style={{ borderColor: 'rgba(252,163,17,0.2)' }}>
            {/* Box de Formación */}
            <div>
              <h3 className="text-xl font-bold text-foreground mb-6">Formación Académica</h3>
              <div className="space-y-8">
                {education.map((edu, idx) => (
                  <div key={idx}>
                    <h4 className="font-semibold text-foreground mb-1">{edu.degree}</h4>
                    <p className="text-sm text-muted">{edu.institution}</p>
                    <p className="text-sm text-muted mb-1">{edu.period}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Box de Idiomas */}
            <div>
              <h3 className="text-xl font-bold text-foreground mb-6">Idiomas</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground">Español</h4>
                  <p className="text-sm text-muted">Nativo</p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Inglés</h4>
                  <p className="text-sm text-muted">Intermedio (B1)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// 3.4 Skills o Competencias Profesionales
function Skills() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  // Colores condicionales según tema
  const colors = isDark ? {
    sectionBg: '#000000',
    titleColor: '#FFFFFF',
    subtitleColor: '#E5E5E5',
    cardBg: '#14213D',
    cardBorder: 'rgba(252,163,17,0.15)',
    iconBg: 'rgba(252,163,17,0.08)',
    iconColor: '#E5E5E5',
    categoryColor: '#FFFFFF',
    chipBg: 'rgba(252,163,17,0.08)',
    chipColor: '#E5E5E5',
    chipHoverBg: 'rgba(252,163,17,0.2)',
  } : {
    sectionBg: '#f5f5f0',
    titleColor: '#14213D',
    subtitleColor: '#4B5563',
    cardBg: '#FFFFFF',
    cardBorder: 'rgba(252,163,17,0.25)',
    iconBg: 'rgba(252,163,17,0.1)',
    iconColor: '#14213D',
    categoryColor: '#14213D',
    chipBg: 'rgba(252,163,17,0.08)',
    chipColor: '#14213D',
    chipHoverBg: 'rgba(252,163,17,0.2)',
  };

  return (
    <section id="skills" className="py-20 px-6 transition-colors duration-500" style={{ background: colors.sectionBg }}>
      <div className="max-w-5xl mx-auto space-y-16">
        <div className="space-y-4 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight transition-colors duration-500" style={{ color: colors.titleColor }}>Competencias</h2>
          <p className="text-lg transition-colors duration-500" style={{ color: colors.subtitleColor }}>Tecnologías y habilidades que domino para construir soluciones efectivas.</p>
        </div>

        {/* Cajas interactivas por categoría */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skills.map((skillGroup, idx) => (
            <div
              key={idx}
              className="rounded-2xl p-8 border shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group hover:border-accent"
              style={{ background: colors.cardBg, borderColor: colors.cardBorder }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-black transition-colors duration-300" style={{ background: colors.iconBg, color: colors.iconColor }}>
                <skillGroup.icon />
              </div>
              <h3 className="text-xl font-bold mb-4 transition-colors duration-500" style={{ color: colors.categoryColor }}>{skillGroup.category}</h3>

              {/* Chips/etiquetas de cada tecnología */}
              <div className="flex flex-wrap gap-2">
                {skillGroup.items.map((item, i) => (
                  <span key={i} className="px-3 py-1.5 font-medium text-sm rounded-lg transition-colors duration-200" style={{ background: colors.chipBg, color: colors.chipColor }}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// 3.5 Proyectos Destacados (Cards con Ícono Grande + Tilt 3D)
function Projects() {
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const [isDark, setIsDark] = useState(true);

  // Detectar tema
  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  // Colores condicionales
  const c = isDark ? {
    sectionBg: '#000000',
    titleColor: '#FFFFFF',
    subtitleColor: '#FCA311',
    cardBg: '#0a0a0a',
    cardBorder: 'rgba(252,163,17,0.12)',
    iconAreaBg: 'linear-gradient(135deg, #1a1a2e 0%, #14213D 100%)',
    projectTitle: '#FFFFFF',
    projectDesc: '#E5E5E5',
    badgeColor: '#FCA311',
    badgeBg: 'rgba(252,163,17,0.1)',
    badgeBorder: '1px solid rgba(252,163,17,0.3)',
  } : {
    sectionBg: '#f5f5f0',
    titleColor: '#14213D',
    subtitleColor: '#b87608',
    cardBg: '#FFFFFF',
    cardBorder: 'rgba(252,163,17,0.2)',
    iconAreaBg: 'linear-gradient(135deg, #e8e4df 0%, #d4cfc8 100%)',
    projectTitle: '#14213D',
    projectDesc: '#4B5563',
    badgeColor: '#b87608',
    badgeBg: 'rgba(252,163,17,0.08)',
    badgeBorder: '1px solid rgba(252,163,17,0.35)',
  };

  // Efecto Tilt 3D en las project cards
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const container = cardsContainerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll<HTMLElement>('[data-tilt]');

    const handleMouseMove = (e: MouseEvent) => {
      const card = e.currentTarget as HTMLElement;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const card = e.currentTarget as HTMLElement;
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    };

    cards.forEach(card => {
      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      cards.forEach(card => {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <section id="projects" className="py-24 px-6 transition-colors duration-500" style={{ background: c.sectionBg }}>
      <div className="max-w-6xl mx-auto">

        {/* Header con label PORTAFOLIO + Título */}
        <div className="text-center mb-16 space-y-3">
          <div className="flex justify-center mb-2">
            <div className="w-2 h-2 rounded-full" style={{ background: '#FCA311' }} />
          </div>
          <p className="text-xs uppercase tracking-[0.35em] font-medium" style={{ color: c.subtitleColor }}>
            Portafolio
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight transition-colors duration-500" style={{ color: c.titleColor, fontFamily: "'Georgia', 'Times New Roman', serif" }}>
            Proyectos Destacados
          </h2>
        </div>

        {/* Grid 3 columnas */}
        <div ref={cardsContainerRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project, idx) => (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              key={idx}
              data-tilt
              className="project-card-tilt group block rounded-2xl overflow-hidden border transition-all duration-300 hover:border-accent"
              style={{ background: c.cardBg, borderColor: c.cardBorder }}
            >
              {/* Área de ícono grande */}
              <div
                className="flex items-center justify-center"
                style={{ height: '180px', background: c.iconAreaBg }}
              >
                <div style={{ color: '#FCA311', width: 48, height: 48 }}>
                  <project.icon />
                </div>
              </div>

              {/* Contenido inferior */}
              <div className="p-6 space-y-3">
                <h3 className="text-lg font-bold group-hover:text-accent transition-colors" style={{ color: c.projectTitle }}>
                  {project.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: c.projectDesc, opacity: 0.85 }}>
                  {project.description}
                </p>

                {/* Tech badges */}
                <div className="flex flex-wrap gap-2 pt-3">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs font-medium px-3 py-1 rounded-md transition-colors duration-200"
                      style={{ color: c.badgeColor, background: c.badgeBg, border: c.badgeBorder }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// 3.6 Contacto (Dark Elegance - Gold & Navy)
function Contact() {
  const [isDark, setIsDark] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Sync with theme toggle
  useEffect(() => {
    const checkTheme = () => {
      const savedTheme = localStorage.getItem('theme');
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDark(savedTheme === 'dark' || (!savedTheme && systemPrefersDark));
    };
    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  // Colores para modo dark y light
  const colors = isDark ? {
    bg: 'linear-gradient(135deg, #14213D 0%, #0a1120 50%, #000000 100%)',
    bgCard: 'rgba(255, 255, 255, 0.03)',
    text: '#FFFFFF',
    textMuted: '#E5E5E5',
    textSubtle: '#A0A0A0',
    border: 'rgba(252, 163, 17, 0.2)',
    borderFocus: '#FCA311',
    accent: '#FCA311',
    accentBg: 'rgba(252, 163, 17, 0.1)',
    buttonBg: 'linear-gradient(135deg, #FCA311 0%, #d48806 50%, #FCA311 100%)',
    buttonText: '#000000',
    inputBg: 'rgba(255, 255, 255, 0.03)',
    successBg: 'rgba(252, 163, 17, 0.15)',
    successBorder: 'rgba(252, 163, 17, 0.4)',
  } : {
    bg: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 50%, #dee2e6 100%)',
    bgCard: 'rgba(255, 255, 255, 0.8)',
    text: '#1a1a2e',
    textMuted: '#495057',
    textSubtle: '#6c757d',
    border: 'rgba(252, 163, 17, 0.3)',
    borderFocus: '#FCA311',
    accent: '#b87608',
    accentBg: 'rgba(252, 163, 17, 0.15)',
    buttonBg: 'linear-gradient(135deg, #FCA311 0%, #d48806 50%, #FCA311 100%)',
    buttonText: '#000000',
    inputBg: 'rgba(255, 255, 255, 0.9)',
    successBg: 'rgba(252, 163, 17, 0.2)',
    successBorder: 'rgba(252, 163, 17, 0.5)',
  };

  return (
    <section id="contact" className="py-24 px-6 relative overflow-hidden transition-colors duration-500" style={{ background: colors.bg }}>
      {/* Grain texture overlay - solo en dark mode */}
      {isDark && (
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}></div>
      )}

      {/* Golden accent lines */}
      <div className="absolute top-0 left-0 w-full h-px opacity-30" style={{ background: 'linear-gradient(90deg, transparent, #FCA311, transparent)' }}></div>
      <div className="absolute bottom-0 left-0 w-full h-px opacity-30" style={{ background: 'linear-gradient(90deg, transparent, #FCA311, transparent)' }}></div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 space-y-4 animate-fade-in-up">
          <p className="text-sm uppercase tracking-[0.3em] font-medium transition-colors duration-500" style={{ color: isDark ? '#FCA311' : '#b87608' }}>Contacto</p>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight transition-colors duration-500" style={{ color: colors.text }}>
            Contáctame
          </h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed transition-colors duration-500" style={{ color: colors.textMuted }}>
            ¿Tienes un proyecto en mente? Estoy aquí para hacerlo realidad.
          </p>
        </div>

        {/* Form Container */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* Info Section */}
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4 group cursor-pointer">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-500 group-hover:scale-110" style={{
                  background: colors.accentBg,
                  border: `1px solid ${isDark ? 'rgba(252, 163, 17, 0.3)' : 'rgba(252, 163, 17, 0.4)'}`,
                  color: isDark ? '#E5E5E5' : '#495057'
                }}>
                  <Icons.Mail />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider mb-1 transition-colors duration-500" style={{ color: isDark ? '#FCA311' : '#b87608', opacity: 0.8 }}>Email</p>
                  <a href={`mailto:${portfolio.email}`} className="text-base hover:text-[#FCA311] transition-colors duration-300" style={{ color: colors.textMuted }}>
                    {portfolio.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 group cursor-pointer">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-500 group-hover:scale-110" style={{
                  background: colors.accentBg,
                  border: `1px solid ${isDark ? 'rgba(252, 163, 17, 0.3)' : 'rgba(252, 163, 17, 0.4)'}`,
                  color: isDark ? '#E5E5E5' : '#495057'
                }}>
                  <Icons.Phone />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider mb-1 transition-colors duration-500" style={{ color: isDark ? '#FCA311' : '#b87608', opacity: 0.8 }}>Teléfono</p>
                  <a href={`tel:${portfolio.phone}`} className="text-base hover:text-[#FCA311] transition-colors duration-300" style={{ color: colors.textMuted }}>
                    {portfolio.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 group cursor-pointer">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-500 group-hover:scale-110" style={{
                  background: colors.accentBg,
                  border: `1px solid ${isDark ? 'rgba(252, 163, 17, 0.3)' : 'rgba(252, 163, 17, 0.4)'}`,
                  color: isDark ? '#E5E5E5' : '#495057'
                }}>
                  <Icons.MapPin />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider mb-1 transition-colors duration-500" style={{ color: isDark ? '#FCA311' : '#b87608', opacity: 0.8 }}>Ubicación</p>
                  <p className="text-base transition-colors duration-500" style={{ color: colors.textMuted }}>
                    {portfolio.location}
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-8">
              <p className="text-xs uppercase tracking-wider mb-4 transition-colors duration-500" style={{ color: isDark ? '#FCA311' : '#b87608', opacity: 0.8 }}>Sígueme</p>
              <div className="flex gap-3">
                <a href={portfolio.social.github} target="_blank" rel="noopener noreferrer"
                  className="w-11 h-11 rounded-lg flex items-center justify-center transition-all duration-500 hover:scale-110 hover:-translate-y-1"
                  style={{
                    background: colors.accentBg,
                    border: `1px solid ${isDark ? 'rgba(252, 163, 17, 0.2)' : 'rgba(252, 163, 17, 0.3)'}`,
                    color: isDark ? '#E5E5E5' : '#495057'
                  }}>
                  <Icons.GitHub />
                </a>
                <a href={portfolio.social.linkedin} target="_blank" rel="noopener noreferrer"
                  className="w-11 h-11 rounded-lg flex items-center justify-center transition-all duration-500 hover:scale-110 hover:-translate-y-1"
                  style={{
                    background: colors.accentBg,
                    border: `1px solid ${isDark ? 'rgba(252, 163, 17, 0.2)' : 'rgba(252, 163, 17, 0.3)'}`,
                    color: isDark ? '#E5E5E5' : '#495057'
                  }}>
                  <Icons.LinkedIn />
                </a>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="text-center py-16 space-y-6 animate-fade-in-up transition-all duration-500" style={{
                background: colors.successBg,
                border: `1px solid ${isDark ? 'rgba(252, 163, 17, 0.2)' : 'rgba(252, 163, 17, 0.3)'}`,
                borderRadius: '16px'
              }}>
                <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center" style={{
                  background: 'linear-gradient(135deg, #FCA311, #b87608)'
                }}>
                  <svg className="w-10 h-10" fill="none" stroke={isDark ? '#FFFFFF' : '#1a1a2e'} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold transition-colors duration-500" style={{ color: colors.text }}>Mensaje enviado</h3>
                <p className="transition-colors duration-500" style={{ color: colors.textMuted }}>Gracias por contactarme. Te responderé lo antes posible.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Input */}
                <div className="relative group">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-5 py-4 rounded-xl transition-all duration-500 focus:outline-none"
                    style={{
                      background: colors.inputBg,
                      border: `1px solid ${focusedField === 'name' ? '#FCA311' : (isDark ? 'rgba(252, 163, 17, 0.2)' : 'rgba(252, 163, 17, 0.3)')}`,
                      color: colors.text,
                      backdropFilter: 'blur(10px)'
                    }}
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="name"
                    className={`absolute left-5 transition-all duration-500 pointer-events-none ${focusedField === 'name' || formData.name
                      ? 'top-2 text-xs'
                      : 'top-1/2 -translate-y-1/2 text-base'
                      }`}
                    style={{ color: focusedField === 'name' ? '#FCA311' : colors.textMuted }}
                  >
                    Nombre completo
                  </label>
                </div>

                {/* Email Input */}
                <div className="relative group">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-5 py-4 rounded-xl transition-all duration-500 focus:outline-none"
                    style={{
                      background: colors.inputBg,
                      border: `1px solid ${focusedField === 'email' ? '#FCA311' : (isDark ? 'rgba(252, 163, 17, 0.2)' : 'rgba(252, 163, 17, 0.3)')}`,
                      color: colors.text,
                      backdropFilter: 'blur(10px)'
                    }}
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="email"
                    className={`absolute left-5 transition-all duration-500 pointer-events-none ${focusedField === 'email' || formData.email
                      ? 'top-2 text-xs'
                      : 'top-1/2 -translate-y-1/2 text-base'
                      }`}
                    style={{ color: focusedField === 'email' ? '#FCA311' : colors.textMuted }}
                  >
                    Correo electrónico
                  </label>
                </div>

                {/* Message Input */}
                <div className="relative group">
                  <textarea
                    name="message"
                    id="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-5 py-4 rounded-xl transition-all duration-500 focus:outline-none resize-none"
                    style={{
                      background: colors.inputBg,
                      border: `1px solid ${focusedField === 'message' ? '#FCA311' : (isDark ? 'rgba(252, 163, 17, 0.2)' : 'rgba(252, 163, 17, 0.3)')}`,
                      color: colors.text,
                      backdropFilter: 'blur(10px)',
                      minHeight: '140px'
                    }}
                    placeholder=" "
                    rows={5}
                    required
                  />
                  <label
                    htmlFor="message"
                    className={`absolute left-5 transition-all duration-500 pointer-events-none ${focusedField === 'message' || formData.message
                      ? 'top-2 text-xs'
                      : 'top-1/2 -translate-y-1/2 text-base'
                      }`}
                    style={{ color: focusedField === 'message' ? '#FCA311' : colors.textMuted }}
                  >
                    Mensaje
                  </label>
                </div>

                {/* Submit Button - Gold Animated */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="relative inline-flex items-center justify-center px-10 py-4 rounded-xl font-medium text-base tracking-wide overflow-hidden group disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-500 hover:scale-105 active:scale-95"
                    style={{
                      background: isSubmitting ? (isDark ? '#1a1a1a' : '#e9ecef') : colors.buttonBg,
                      backgroundSize: '200% 200%',
                      color: colors.buttonText,
                      boxShadow: isSubmitting ? 'none' : `0 10px 40px ${isDark ? 'rgba(252, 163, 17, 0.3)' : 'rgba(252, 163, 17, 0.4)'}`
                    }}
                  >
                    <span className={`absolute inset-0 transition-opacity duration-500 ${isSubmitting ? 'opacity-0' : 'opacity-100'}`} style={{
                      background: colors.buttonBg,
                      backgroundSize: '200% 200%',
                      animation: 'shimmer 3s infinite'
                    }}></span>
                    <span className="relative z-10 flex items-center gap-3">
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Enviando...
                        </>
                      ) : (
                        <>
                          Enviar mensaje
                          <svg className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-2" fill="currentColor" viewBox="0 0 448 512">
                            <path d="M429.6 92.1c4.9-11.9 2.1-25.6-7-34.7s-22.8-11.9-34.7-7l-352 144c-14.2 5.8-22.2 20.8-19.3 35.8s16.1 25.8 31.4 25.8H224V432c0 15.3 10.8 28.4 25.8 31.4s30-5.1 35.8-19.3l144-352z" />
                          </svg>
                        </>
                      )}
                    </span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Bottom accent */}
        <div className="mt-20 flex justify-center">
          <div className="w-24 h-px transition-colors duration-500" style={{ background: `linear-gradient(90deg, transparent, ${isDark ? '#FCA311' : '#b87608'}, transparent)` }}></div>
        </div>
      </div>

      {/* Custom animation for shimmer effect */}
      {/* shimmer animation now in globals.css */}
    </section>
  );
}

// 3.7 Theme Toggle (Botón lateral flotante de Modo Claro / Oscuro)
function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Revisamos la preferencia guardada o el esquema de color del sistema
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  // Prevenir parpadeo o problemas de hidratación en Next.js
  if (!mounted) return null;

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4 p-2 bg-white/80 dark:bg-[rgba(20,33,61,0.85)] backdrop-blur-md border border-border rounded-2xl shadow-xl">
      <button
        onClick={toggleTheme}
        className="p-3 rounded-xl transition-all duration-300 hover:bg-[rgba(252,163,17,0.1)] hover:scale-110 active:scale-95 flex items-center justify-center text-accent group focus:outline-none"
        aria-label="Toggle Theme"
        title={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      >
        <div className="relative w-5 h-5 flex items-center justify-center">
          {/* Mostramos el Sol cuando estamos en modo oscuro (para volver a claro) */}
          <div className={`absolute transition-all duration-500 ease-in-out ${isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-50'}`}>
            <Icons.Sun />
          </div>
          {/* Mostramos la Luna cuando estamos en modo claro (para volver a oscuro) */}
          <div className={`absolute transition-all duration-500 ease-in-out ${isDark ? 'opacity-0 -rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'}`}>
            <Icons.Moon />
          </div>
        </div>
      </button>
    </div>
  );
}

// 3.8 Custom Cursor (Seguimiento suave del mouse con hover expansion)
function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Solo activar en desktop
    if (typeof window === 'undefined' || window.innerWidth <= 768) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let dotX = 0;
    let dotY = 0;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      // Cursor ring lag suave
      cursorX += (mouseX - cursorX) * 0.1;
      cursorY += (mouseY - cursorY) * 0.1;
      // Dot más rápido
      dotX += (mouseX - dotX) * 0.25;
      dotY += (mouseY - dotY) * 0.25;

      if (cursorRef.current) {
        cursorRef.current.style.left = cursorX + 'px';
        cursorRef.current.style.top = cursorY + 'px';
      }
      if (dotRef.current) {
        dotRef.current.style.left = dotX + 'px';
        dotRef.current.style.top = dotY + 'px';
      }
      rafId = requestAnimationFrame(animate);
    };

    // Hover en elementos interactivos
    const interactiveSelector = 'a, button, input, textarea, [data-tilt], .group';
    const onEnterInteractive = () => cursorRef.current?.classList.add('hover');
    const onLeaveInteractive = () => cursorRef.current?.classList.remove('hover');

    const attachHoverListeners = () => {
      document.querySelectorAll(interactiveSelector).forEach(el => {
        el.addEventListener('mouseenter', onEnterInteractive);
        el.addEventListener('mouseleave', onLeaveInteractive);
      });
    };

    document.addEventListener('mousemove', onMouseMove);
    rafId = requestAnimationFrame(animate);
    // Attach con pequeño delay para que el DOM esté listo
    const hoverTimeout = setTimeout(attachHoverListeners, 500);

    // Observer para re-attachear cuando cambia el DOM
    const observer = new MutationObserver(() => {
      attachHoverListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
      clearTimeout(hoverTimeout);
      observer.disconnect();
      document.querySelectorAll(interactiveSelector).forEach(el => {
        el.removeEventListener('mouseenter', onEnterInteractive);
        el.removeEventListener('mouseleave', onLeaveInteractive);
      });
    };
  }, []);

  if (!mounted) return null;

  return (
    <>
      <div ref={cursorRef} className="custom-cursor" />
      <div ref={dotRef} className="custom-cursor-dot" />
    </>
  );
}

// ==========================================
// SECCIÓN 4: COMPONENTE MAESTRO (Render final)
// ==========================================
// Encapsula todas las sub-secciones para pintarlas en una vista única (Landing Page fluida).

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans selection:bg-accent/20 transition-colors duration-300">

      {/* Cursor personalizado (solo desktop) */}
      <CustomCursor />

      {/* Carga del botón del DarkMode global */}
      <ThemeToggle />

      {/* Menú de Navegación superior */}
      <Navbar />

      {/* Contenido general encapsulado por tag 'main' de HTML semántico */}
      <main>
        <Hero />         {/* Portada */}
        <Skills />       {/* Competencias Técnicas */}
        <Projects />     {/* Cards interactivas (Trabajos extras) */}
        <Contact />      {/* Tarjeta inferior final */}
      </main>

      {/* Footer (Texto de derechos pequeños inferior a CTA)*/}
      <footer className="py-8 text-center border-t" style={{ background: '#000000', borderColor: 'rgba(252,163,17,0.2)' }}>
        <p className="text-sm font-medium" style={{ color: '#E5E5E5' }}> {portfolio.name}. &copy; {new Date().getFullYear()}</p>
      </footer>

    </div>
  );
}
