import type { Habilidad } from "./Habilidad"
import type { Video } from "./Video"

export interface Profesional {
  id: number
  nombre: string
  habilidades?: Habilidad[]
  videos?: Video[]
}

