import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Put,
    Delete,
    Query,
    NotFoundException,
  } from '@nestjs/common';
  import { VideosService } from './videos.service';
  import { CreateVideoDto } from './dto/create-video.dto';
  import { UpdateVideoDto } from './dto/update-video.dto';
  
  @Controller('videos')
  export class VideosController {
    constructor(private readonly videosService: VideosService) {}
  
    @Post()
    create(@Body() createVideoDto: CreateVideoDto) {
      return this.videosService.create(createVideoDto);
    }
  
    /**
     * Ejemplo de búsqueda por título
     * GET /videos?titulo=algo
     */
    @Get()
    findAll(@Query('titulo') titulo?: string) {
      return this.videosService.findAll(titulo);
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.videosService.findOne(+id);
    }
  
    @Put(':id')
    update(@Param('id') id: string, @Body() updateVideoDto: UpdateVideoDto) {
      return this.videosService.update(+id, updateVideoDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.videosService.remove(+id);
    }
  }
  