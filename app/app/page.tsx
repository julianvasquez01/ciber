'use client';
import Link from "next/link";
import { useState } from "react";

// Iconos SVG simples (sin dependencias externas)
const Icons = {
  Code: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  Database: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  ),
  Cloud: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.5 19c0-1.7-1.3-3-3-3h-1.1c-.1-2.9-2.5-5.2-5.4-5.2-2.6 0-4.8 1.8-5.3 4.3C1.1 15.6 0 17.2 0 19c0 2.2 1.8 4 4 4h13.5c2.2 0 4-1.8 4-4v-.5z" />
    </svg>
  ),
  Shield: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  Smartphone: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  ),
  Brain: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
    </svg>
  ),
  Server: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
      <line x1="6" y1="6" x2="6.01" y2="6" />
      <line x1="6" y1="18" x2="6.01" y2="18" />
    </svg>
  ),
  Target: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
  Star: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  GitHub: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  ),
  LinkedIn: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  ),
  Twitter: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  Mail: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
  ExternalLink: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  ),
  Check: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
};

// Datos del portafolio
const portfolio = {
  name: "Julian Vasquez",
  role: "Ingeniero de Sistemas",
  roleSecondary: "y Analista de Datos",
  tagline: "Apasionado por crear soluciones digitales innovadoras y funcionales que impacten positivamente al usuario final.",
  email: "julianvasquez799@gmail.com",
  phone: "3004627891",
  social: {
    github: "https://github.com/tu-usuario",
    linkedin: "https://linkedin.com/in/tu-usuario",
    twitter: "https://twitter.com/tu-usuario",
  },
};

const skills = [
  { icon: Icons.Code, title: "Desarrollo Web", techs: ["React", "Next.js", "Node.js", "TypeScript"] },
  { icon: Icons.Database, title: "Análisis de Datos", techs: ["Python", "SQL", "PowerBI", "Pandas"] },
  { icon: Icons.Cloud, title: "Cloud & DevOps", techs: ["AWS", "Docker", "CI/CD", "Kubernetes"] },
  { icon: Icons.Shield, title: "Ciberseguridad", techs: ["Security Audits", "Pentesting", "OWASP", "SIEM"] },
  { icon: Icons.Smartphone, title: "Mobile Dev", techs: ["React Native", "Flutter", "iOS", "Android"] },
  { icon: Icons.Brain, title: "Inteligencia Artificial", techs: ["ML", "NLP", "Computer Vision", "TensorFlow"] },
  { icon: Icons.Server, title: "Base de Datos", techs: ["PostgreSQL", "MongoDB", "Redis", "MySQL"] },
  { icon: Icons.Target, title: "Metodologías & Gestión", techs: [" Metodologías Ágiles", " Gestión de Proyectos", "Agile", "Scrum"] },
];

const projects = [
  {
    title: "E-Commerce Platform",
    description: "Plataforma de comercio electrónico full stack con Next.js, Stripe y panel administrativo.",
    image: "/projects/project1.jpg",
    technologies: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
    link: "#",
  },
  {
    title: "Sistema de Gestión Hospitalaria",
    description: "Sistema integral para gestión de pacientes, citas y historiales médicos.",
    image: "/projects/project2.jpg",
    technologies: ["React", "Node.js", "MongoDB", "Socket.io"],
    link: "#",
  },
  {
    title: "App de Finanzas Personales",
    description: "Aplicación móvil para seguimiento de gastos, presupuestos y metas financieras.",
    image: "/projects/project3.jpg",
    technologies: ["React Native", "Firebase", "Chart.js"],
    link: "#",
  },
];

// Se eliminaron testimonios y servicios por solicitud del usuario

// Componente Navbar con menú móvil
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = [
    { href: '#about', label: 'Sobre mí' },
    { href: '#skills', label: 'Habilidades' },
    { href: '#projects', label: 'Proyectos' },
    { href: '#contact', label: 'Contacto' },
  ];
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-lg font-bold text-foreground truncate max-w-[160px] sm:max-w-none">
            {portfolio.name}
          </Link>
          {/* Links desktop */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-muted hover:text-foreground transition-colors duration-200 text-sm lg:text-base">
                {link.label}
              </Link>
            ))}
          </div>
          {/* Acciones desktop */}
          <div className="hidden md:block">
            <Link href="#contact" className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-rose-700 transition-colors duration-200 text-sm">
              Contáctame
            </Link>
          </div>
          {/* Botón hamburguesa móvil */}
          <button
            className="md:hidden p-2 rounded-lg text-muted hover:text-foreground hover:bg-foreground/5 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Abrir menú"
          >
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>
      {/* Menú móvil desplegable */}
      {isOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-b border-border">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-3 px-4 text-muted hover:text-foreground hover:bg-foreground/5 rounded-lg transition-colors duration-200 text-base"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 pb-1">
              <Link
                href="#contact"
                className="block w-full py-3 px-4 text-center bg-gradient-to-r from-rose-600 to-red-800 text-white font-semibold rounded-xl transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                Contáctame
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

// Componente Hero Moderno con Gradiente
function Hero() {
  return (
    <section id="about" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-[#050505]">
      {/* Background gradiente animado */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-rose-950/20 to-black animate-gradient" />

      {/* Orbes de luz decorativos */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-rose-900/20 rounded-full blur-[120px] animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-900/10 rounded-full blur-[100px] animate-float stagger-2" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col lg:flex-row items-center justify-between gap-12">

        {/* Lado Izquierdo: Textos */}
        <div className="text-left space-y-8 max-w-2xl w-full">
          {/* Título principal con gradiente */}
          <div className="space-y-2">
            <p className="text-muted font-medium animate-fade-in-up stagger-1 mb-4 text-rose-200/70">
              Hola , Soy {portfolio.name}
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight animate-fade-in-up stagger-2 text-white">
              {portfolio.role} <br />
              <span className="bg-gradient-to-r from-rose-400 via-red-500 to-rose-600 bg-clip-text text-transparent animate-gradient-shift">
                {portfolio.roleSecondary}
              </span>
              <span className="inline-block w-1 h-12 ml-2 bg-rose-500 animate-pulse align-middle"></span>
            </h1>
          </div>

          {/* Tagline */}
          <p className="text-base sm:text-lg lg:text-xl text-muted/80 max-w-xl animate-fade-in-up stagger-3">
            {portfolio.tagline}
          </p>

          {/* CTAs principales */}
          <div className="flex flex-col sm:flex-row items-start lg:items-center gap-4 pt-4 animate-fade-in-up stagger-4">
            <Link
              href="/cv.pdf"
              className="group relative px-6 py-3 bg-gradient-to-r from-rose-600 to-red-800 text-white font-semibold rounded-full overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-2xl hover:shadow-rose-900/50 hover:scale-105"
            >
              <span className="relative z-10 flex items-center gap-2">
                Descargar CV
              </span>
            </Link>
            <Link
              href="#contact"
              className="group px-6 py-3 border border-border/50 text-white font-semibold rounded-full hover:border-rose-500/50 hover:bg-rose-500/10 transition-all duration-300 cursor-pointer"
            >
              <span className="flex items-center gap-2">
                Contáctame
              </span>
            </Link>
          </div>

          {/* Redes sociales */}
          <div className="flex items-center justify-start gap-4 pt-8 animate-fade-in-up stagger-5">
            <a
              href={portfolio.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-foreground/5 rounded-full hover:bg-rose-600/20 hover:text-rose-500 transition-all duration-300 cursor-pointer hover:scale-110"
              aria-label="LinkedIn"
            >
              <Icons.LinkedIn />
            </a>
            <a
              href={portfolio.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-foreground/5 rounded-full hover:bg-white/10 hover:text-white transition-all duration-300 cursor-pointer hover:scale-110"
              aria-label="GitHub"
            >
              <Icons.GitHub />
            </a>
            <a
              href={portfolio.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-foreground/5 rounded-full hover:bg-white/10 hover:text-white transition-all duration-300 cursor-pointer hover:scale-110"
              aria-label="Twitter"
            >
              <Icons.Twitter />
            </a>
          </div>
        </div>

        {/* Lado Derecho: Imagen y Órbitas */}
        <div className="relative w-full max-w-md hidden lg:flex justify-center items-center h-[500px] animate-fade-in stagger-2">
          {/* Órbitas */}
          <div className="absolute inset-0 rounded-full border border-rose-900/30 animate-[spin_30s_linear_infinite]" />
          <div className="absolute inset-[40px] rounded-full border border-rose-800/20 animate-[spin_40s_linear_infinite_reverse]" />
          <div className="absolute inset-[80px] rounded-full border border-rose-700/10" />

          {/* Foto Central */}
          <div className="absolute inset-[100px] rounded-full bg-gradient-to-br from-rose-900/40 to-black border-2 border-rose-800/50 flex items-center justify-center overflow-hidden z-20 shadow-[0_0_50px_rgba(159,18,57,0.3)]">
            <span className="text-rose-500/50 text-sm">Imagen</span>
          </div>

          {/* Iconos Flotantes de la órbita (ejemplo estático) */}
          <div className="absolute top-[10%] right-[20%] p-3 bg-rose-950/80 border border-rose-800/50 rounded-full z-30 text-rose-400">
            <Icons.Code />
          </div>
          <div className="absolute bottom-[20%] left-[10%] p-3 bg-rose-950/80 border border-rose-800/50 rounded-full z-30 text-rose-400">
            <Icons.Database />
          </div>
          <div className="absolute top-[40%] left-[-10px] p-3 bg-rose-950/80 border border-rose-800/50 rounded-full z-30 text-rose-400">
            <Icons.Brain />
          </div>
        </div>

      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}

// Componente Skills Grid
function SkillsGrid() {
  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-foreground/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Habilidades Técnicas
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            Un conjunto completo de habilidades para abordar proyectos de cualquier escala
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {skills.map((skill, index) => (
            <div
              key={skill.title}
              className="group p-6 bg-background rounded-xl border border-border hover:border-accent/50 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-accent/10 hover:-translate-y-1"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 mb-4 text-accent group-hover:scale-110 transition-transform duration-300">
                <skill.icon />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {skill.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skill.techs.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 text-xs bg-foreground/5 rounded-md text-muted"
                  >
                    {tech}
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

// Componente Projects
function Projects() {
  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Proyectos Destacados
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            Una selección de mis trabajos más recientes
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((project) => (
            <article
              key={project.title}
              className="group bg-background rounded-xl border border-border overflow-hidden hover:border-accent/50 transition-all duration-300 cursor-pointer hover:shadow-xl hover:shadow-accent/10"
            >
              <div className="aspect-video bg-foreground/10 flex items-center justify-center">
                <span className="text-6xl">🚀</span>
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-semibold text-foreground group-hover:text-accent transition-colors duration-200">
                  {project.title}
                </h3>
                <p className="text-muted line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs bg-accent/10 text-accent rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <a
                  href={project.link}
                  className="inline-flex items-center gap-2 text-accent hover:underline cursor-pointer"
                >
                  Ver proyecto <Icons.ExternalLink />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// Componente de Contacto
function ContactForm() {
  return (
    <section id="contact" className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-foreground/5">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium">
            Contacto
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Comunícate conmigo
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8 text-muted">
            <p className="flex items-center gap-2">
              <span className="text-xl">📞</span> <b>Teléfono:</b> {portfolio.phone}
            </p>
            <p className="flex items-center gap-2">
              <span className="text-xl">✉️</span> <b>Email:</b>
              <a href={`mailto:${portfolio.email}`} className="text-accent hover:underline transition-colors">
                {portfolio.email}
              </a>
            </p>
          </div>
          <p className="text-muted max-w-2xl mx-auto text-lg pt-4">
            ¿Tienes un proyecto en mente o quieres más información? Escríbeme y hablemos.
          </p>
        </div>

        <div className="bg-background p-6 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl border border-border shadow-xl">
          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-foreground text-left block">
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 bg-foreground/5 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent text-foreground transition-colors"
                  placeholder="Tu nombre"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground text-left block">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 bg-foreground/5 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent text-foreground transition-colors"
                  placeholder="tu@email.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-foreground text-left block">
                Mensaje
              </label>
              <textarea
                id="message"
                rows={5}
                className="w-full px-4 py-3 bg-foreground/5 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent text-foreground transition-colors resize-none"
                placeholder="¿En qué te puedo ayudar?"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-4 mt-4 bg-gradient-to-r from-rose-600 to-red-800 text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-accent/30 transition-all duration-300 transform hover:-translate-y-1"
            >
              Enviar Mensaje
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

// Componente Footer
function Footer() {
  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="text-lg font-semibold text-foreground mb-2">
              {portfolio.name}
            </p>
            <p className="text-muted">
              <a href={`mailto:${portfolio.email}`} className="hover:text-accent transition-colors cursor-pointer">
                {portfolio.email}
              </a>
            </p>
          </div>
          <div className="flex gap-4">
            <a
              href={portfolio.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-foreground transition-colors duration-200 cursor-pointer"
              aria-label="GitHub"
            >
              <Icons.GitHub />
            </a>
            <a
              href={portfolio.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-foreground transition-colors duration-200 cursor-pointer"
              aria-label="LinkedIn"
            >
              <Icons.LinkedIn />
            </a>
            <a
              href={portfolio.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-foreground transition-colors duration-200 cursor-pointer"
              aria-label="Twitter"
            >
              <Icons.Twitter />
            </a>
            <a
              href={`mailto:${portfolio.email}`}
              className="text-muted hover:text-foreground transition-colors duration-200 cursor-pointer"
              aria-label="Email"
            >
              <Icons.Mail />
            </a>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border text-center text-muted text-sm">
          <p>&copy; {new Date().getFullYear()} {portfolio.name}. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

// Página principal
export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <SkillsGrid />
        <Projects />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
