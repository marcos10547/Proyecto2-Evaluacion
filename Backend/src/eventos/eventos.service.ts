import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Evento } from '../entities/evento.entity';
import { CreateEventoDto } from './dto/create-evento.dto';
import { UpdateEventoDto } from './dto/update-evento.dto';

@Injectable()
export class EventosService {
  constructor(
    @InjectRepository(Evento)
    private readonly eventoRepository: Repository<Evento>,
  ) {}

  create(createEventoDto: CreateEventoDto): Promise<Evento> {
    const evento = this.eventoRepository.create(createEventoDto);
    return this.eventoRepository.save(evento);
  }

  /**
   * Filtrar eventos por título (opcional)
   */
  findAll(titulo?: string): Promise<Evento[]> {
    if (titulo) {
      return this.eventoRepository.find({
        where: { titulo: ILike(`%${titulo}%`) },
      });
    }
    return this.eventoRepository.find();
  }

  async findOne(id: number): Promise<Evento> {
    const evento = await this.eventoRepository.findOneBy({ id });
    if (!evento) {
      throw new NotFoundException(`Evento con ID ${id} no encontrado`);
    }
    return evento;
  }

  async update(id: number, updateEventoDto: UpdateEventoDto): Promise<Evento> {
    await this.eventoRepository.update(id, updateEventoDto);
    const evento = await this.eventoRepository.findOneBy({ id });
    if (!evento) {
      throw new NotFoundException(`Evento con ID ${id} no encontrado`);
    }
    return evento;
  }

  async remove(id: number): Promise<void> {
    const result = await this.eventoRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Evento con ID ${id} no encontrado`);
    }
  }
}
