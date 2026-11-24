/**
 * Fuente única de verdad del portafolio.
 * Edita este archivo para actualizar textos, proyectos, experiencia y enlaces.
 * Los valores entre [corchetes] son marcadores que debes reemplazar.
 */

export const profile = {
  name: 'Andrés Cantuña',
  shortName: 'Andrés',
  initials: 'AC',
  title: 'Ingeniero de Software',
  role: 'Desarrollador Full Stack',
  location: 'Quito, Ecuador',
  timezone: 'GMT-5 (America/Guayaquil)',
  tagline: 'La innovación ya no es una opción, es nuestra realidad.',
  summary:
    'Diseño y construyo aplicaciones web de punta a punta: interfaces rápidas y accesibles, APIs robustas y bases de datos bien modeladas, desplegadas con contenedores y listas para escalar.',
  available: true,
  availabilityText: 'Disponible para proyectos y oportunidades',
  email: 'andresmh7@gmail.com',
  links: {
    github: 'https://github.com/Cantx08',
    linkedin: 'https://www.linkedin.com/in/andres-cantu%C3%B1a-932640270/',
  },
} as const;

export const navLinks = [
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#experiencia', label: 'Experiencia' },
  { href: '#stack', label: 'Stack' },
  { href: '#contacto', label: 'Contacto' },
] as const;

export interface Project {
  name: string;
  description: string;
  stack: string[];
  repo: string;
  /** Ruta a una captura en /public (p. ej. '/projects/mi-proyecto.webp'). Si se omite, se muestra un placeholder. */
  image?: string;
}

export const projects: Project[] = [
  {
    name: 'FerrEcom',
    description:
      'Plataforma integral para la gestión completa de una ferretería.',
    stack: ['Laravel', 'Tailwind CSS', 'Alpine.js'],
    repo: 'https://github.com/Cantx08/FerrEcom',
  },
  {
    name: 'Inventory Manager',
    description:
      'Aplicación para gestionar inventarios.',
    stack: ['.NET', 'Angular', 'SQL Server'],
    repo: 'https://github.com/Cantx08/InventoryManager',
  },
  {
    name: 'SQL 2 Cypher',
    description:
      'Middleware de traducción de SQL a Cypher que ejecuta consultas en Neo4j y visualiza los resultados como tabla, JSON o grafo.',
    stack: ['FastAPI', 'Next.js', 'React', 'PostgreSQL'],
    repo: 'https://github.com/sql-cypher-traductor/middleware',
  },
];

export interface Experience {
  role: string;
  company: string;
  period: string;
  achievements: string[];
}

// TODO: reemplaza con tu trayectoria real
export const experience: Experience[] = [
  {
    role: 'Desarrollador Full Stack',
    company: '[Empresa / Cliente]',
    period: '[2024] — Actualidad',
    achievements: [
      '[Logro medible] — p. ej. migré un monolito a servicios en Docker, reduciendo despliegues de 1 h a 10 min.',
      '[Logro medible] — p. ej. mejoré el rendimiento del frontend (LCP de 4 s a 1,2 s).',
    ],
  },
  {
    role: 'Desarrollador Backend',
    company: '[Empresa / Cliente]',
    period: '[2022 — 2024]',
    achievements: [
      '[Logro medible] — p. ej. diseñé APIs REST en FastAPI/Django consumidas por 4 aplicaciones.',
      '[Logro medible] — p. ej. optimicé consultas SQL reduciendo tiempos de respuesta un 60%.',
    ],
  },
];

export const highlights = [
  { value: '[3+]', label: 'años construyendo software' },
  { value: '[15+]', label: 'proyectos entregados' },
  { value: '12', label: 'tecnologías en producción' },
] as const;

export const skills = [
  {
    category: 'Frontend',
    icon: 'layout',
    items: ['TypeScript', 'React', 'Next.js', 'Tailwind CSS'],
  },
  {
    category: 'Backend',
    icon: 'server',
    items: ['Node.js', 'Python', 'FastAPI', 'Django', 'PHP', 'Laravel'],
  },
  {
    category: 'Bases de datos',
    icon: 'database',
    items: ['PostgreSQL', 'SQL Server'],
  },
  {
    category: 'DevOps / Herramientas',
    icon: 'tool',
    items: ['Docker', 'Git', 'GitHub Actions', 'Netlify'],
  },
] as const;

export const projectTypes = [
  'Desarrollo web a medida',
  'Aplicación Full Stack / SaaS',
  'API / Backend',
  'Consultoría técnica',
  'Oportunidad laboral',
  'Otro',
] as const;
