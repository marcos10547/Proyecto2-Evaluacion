export class CreateEventoDto {
    readonly titulo: string;
    readonly descripcion?: string;
    readonly fecha_evento: Date;
    readonly ubicacion?: string;
  }
  