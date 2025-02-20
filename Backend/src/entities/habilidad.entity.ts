import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Profesional } from './profesional.entity';

@Entity({ name: 'habilidades' })
export class Habilidad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, unique: true })
  nombre: string;

  @ManyToMany(() => Profesional, profesional => profesional.habilidades)
  profesionales: Profesional[];
}
