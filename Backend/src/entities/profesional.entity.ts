import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Habilidad } from './habilidad.entity';
import { Video } from './video.entity';

@Entity({ name: 'profesionales' })
export class Profesional {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  nombre: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ length: 255, unique: true, nullable: true })
  email: string;

  @Column({ length: 50, nullable: true })
  telefono: string;

  @Column({ type: 'text', nullable: true })
  foto_url: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @ManyToMany(() => Habilidad, habilidad => habilidad.profesionales, { cascade: true })
  @JoinTable({
    name: 'profesional_habilidades',
    joinColumn: { name: 'profesional_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'habilidad_id', referencedColumnName: 'id' },
  })
  habilidades: Habilidad[];

  @OneToMany(() => Video, video => video.profesional)
  videos: Video[];
}
