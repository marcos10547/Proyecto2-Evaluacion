export class CreateProfesionalDto {
    readonly nombre: string;
    readonly descripcion?: string;
    readonly email?: string;
    readonly telefono?: string;
    readonly foto_url?: string;
    // Si quieres asignar habilidades en la creación, podrías incluir un array de IDs
    // readonly habilidadesIds?: number[];
  }
  