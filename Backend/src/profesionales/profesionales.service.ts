import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profesional } from '../entities/profesional.entity';
import { CreateProfesionalDto } from './dto/create-profesional.dto';
import { UpdateProfesionalDto } from './dto/update-profesional.dto';

@Injectable()
export class ProfesionalesService {
  constructor(
    @InjectRepository(Profesional)
    private readonly profesionalRepository: Repository<Profesional>,
  ) {}

  async create(createProfesionalDto: CreateProfesionalDto): Promise<Profesional> {
    const profesional = this.profesionalRepository.create(createProfesionalDto);
    return this.profesionalRepository.save(profesional);
  }

  /**
   * Ejemplo de filtros y búsqueda por nombre y habilidad
   */
  async findAll(nombre?: string, habilidad?: string): Promise<Profesional[]> {
    const query = this.profesionalRepository
      .createQueryBuilder('profesional')
      .leftJoinAndSelect('profesional.habilidades', 'habilidad');

    if (nombre) {
      query.andWhere('profesional.nombre ILIKE :nombre', { nombre: `%${nombre}%` });
    }

    if (habilidad) {
      query.andWhere('habilidad.nombre ILIKE :habilidad', { habilidad: `%${habilidad}%` });
    }

    return query.getMany();
  }

  async findOne(id: number): Promise<Profesional> {
    const profesional = await this.profesionalRepository.findOne({
      where: { id },
      relations: ['habilidades', 'videos'],
    });
    if (!profesional) {
      throw new NotFoundException(`Profesional con ID ${id} no encontrado`);
    }
    return profesional;
  }

  async update(id: number, updateProfesionalDto: UpdateProfesionalDto): Promise<Profesional> {
    await this.profesionalRepository.update(id, updateProfesionalDto);
    const profesional = await this.profesionalRepository.findOne({
      where: { id },
      relations: ['habilidades', 'videos'],
    });
    if (!profesional) {
      throw new NotFoundException(`Profesional con ID ${id} no encontrado`);
    }
    return profesional;
  }

  async remove(id: number): Promise<void> {
    const result = await this.profesionalRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Profesional con ID ${id} no encontrado`);
    }
  }
}
