import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Video } from '../entities/video.entity';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';

@Injectable()
export class VideosService {
  constructor(
    @InjectRepository(Video)
    private readonly videoRepository: Repository<Video>,
  ) {}

  create(createVideoDto: CreateVideoDto): Promise<Video> {
    const video = this.videoRepository.create(createVideoDto);
    return this.videoRepository.save(video);
  }

  /**
   * Filtrar videos por título (opcional)
   */
  findAll(titulo?: string): Promise<Video[]> {
    if (titulo) {
      return this.videoRepository.find({
        where: { titulo: ILike(`%${titulo}%`) },
        relations: ['profesional'],
      });
    }
    return this.videoRepository.find({ relations: ['profesional'] });
  }

  async findOne(id: number): Promise<Video> {
    const video = await this.videoRepository.findOne({
      where: { id },
      relations: ['profesional'],
    });
    if (!video) {
      throw new NotFoundException(`Video con ID ${id} no encontrado`);
    }
    return video;
  }

  async update(id: number, updateVideoDto: UpdateVideoDto): Promise<Video> {
    await this.videoRepository.update(id, updateVideoDto);
    const video = await this.videoRepository.findOne({
      where: { id },
      relations: ['profesional'],
    });
    if (!video) {
      throw new NotFoundException(`Video con ID ${id} no encontrado`);
    }
    return video;
  }

  async remove(id: number): Promise<void> {
    const result = await this.videoRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Video con ID ${id} no encontrado`);
    }
  }
}
