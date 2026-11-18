import { projects } from '@/data/projects'

export function getProjects(): Project[] {
  return projects
}

export function getProjectBySlug(slug: string): Project {
  const p = projects.find((p) => p.slug == slug)
  if (p) return p
  throw new Error(`No project with slug "${slug}"`)
}
