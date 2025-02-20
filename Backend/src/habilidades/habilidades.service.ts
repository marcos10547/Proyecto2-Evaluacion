import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Habilidad } from '../entities/habilidad.entity';
import { CreateHabilidadDto } from './dto/create-habilidad.dto';
import { UpdateHabilidadDto } from './dto/update-habilidad.dto';

@Injectable()
export class HabilidadesService {
  constructor(
    @InjectRepository(Habilidad)
    private readonly habilidadRepository: Repository<Habilidad>,
  ) {}

  async create(createHabilidadDto: CreateHabilidadDto): Promise<Habilidad> {
    const habilidad = this.habilidadRepository.create(createHabilidadDto);
    return this.habilidadRepository.save(habilidad);
  }

  findAll(): Promise<Habilidad[]> {
    return this.habilidadRepository.find();
  }

  async findOne(id: number): Promise<Habilidad> {
    const habilidad = await this.habilidadRepository.findOneBy({ id });
    if (!habilidad) {
      throw new NotFoundException(`Habilidad con ID ${id} no encontrada`);
    }
    return habilidad;
  }

  async update(id: number, updateHabilidadDto: UpdateHabilidadDto): Promise<Habilidad> {
    // Realiza la actualización
    await this.habilidadRepository.update(id, updateHabilidadDto);

    // Busca nuevamente para retornar la entidad actualizada
    const habilidad = await this.habilidadRepository.findOneBy({ id });
    if (!habilidad) {
      throw new NotFoundException(`Habilidad con ID ${id} no encontrada`);
    }
    return habilidad;
  }

  async remove(id: number): Promise<void> {
    const result = await this.habilidadRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Habilidad con ID ${id} no encontrada`);
    }
  }
}
