import { games } from '@/data/games'

export function getGames(): Game[] {
  return games
}

export function getProjectBySlug(slug: string): Game {
  const p = games.find((p) => p.slug == slug)
  if (p) return p
  throw new Error(`No project with slug "${slug}"`)
}
