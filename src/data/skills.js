export const techs = [
  // Lenguajes
  { name: 'Python',     slug: 'python',     color: '#3776AB', category: 'Lenguaje' },
  { name: 'TypeScript', slug: 'typescript', color: '#3178C6', category: 'Lenguaje' },
  { name: 'C#',         color: '#9B4F96', category: 'Lenguaje',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg' },
  { name: 'Kotlin',     slug: 'kotlin',     color: '#7F52FF', category: 'Lenguaje' },

  // Frameworks
  { name: 'Vue.js',     slug: 'vuedotjs',   color: '#42B883', category: 'Framework' },
  { name: 'Node.js',    slug: 'nodedotjs',  color: '#339933', category: 'Runtime' },
  { name: 'FastAPI',    slug: 'fastapi',    color: '#009485', category: 'Framework' },
  { name: 'NestJS',     slug: 'nestjs',     color: '#E0234E', category: 'Framework' },
  { name: 'React',      slug: 'react',      color: '#61DAFB', category: 'Framework' },

  // Datos
  { name: 'PostgreSQL', slug: 'postgresql', color: '#4169E1', category: 'Base de datos' },
  { name: 'MongoDB',    slug: 'mongodb',    color: '#47A248', category: 'Base de datos' },
  { name: 'Redis',      slug: 'redis',      color: '#DC382D', category: 'Cache' },

  // DevOps
  { name: 'Docker',     slug: 'docker',     color: '#2496ED', category: 'DevOps' },
  { name: 'GitHub Actions', slug: 'githubactions', color: '#2088FF', category: 'CI/CD' },
  { name: 'Linux',      slug: 'linux',      color: '#FCC624', category: 'Sistema' },
  { name: 'n8n / RPA',  slug: 'n8n',        color: '#EA4B71', category: 'Automatización' },
]

export const softSkills = [
  'Liderazgo técnico end-to-end',
  'Comunicación con stakeholders',
  'Resolución bajo presión',
  'Trabajo en equipo ágil',
  'Pensamiento analítico',
  'Adaptabilidad',
  'Autonomía en entornos dinámicos',
]

export function getTechIcon(tech) {
  return tech.iconUrl || `https://cdn.simpleicons.org/${tech.slug}`
}
