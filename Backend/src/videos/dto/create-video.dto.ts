export class CreateVideoDto {
    readonly titulo: string;
    readonly descripcion?: string;
    readonly url: string;
    // Si quieres relacionar el video con un profesional en la creación
    readonly profesional_id?: number;
  }
  