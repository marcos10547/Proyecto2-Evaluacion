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
  import { EventosService } from './eventos.service';
  import { CreateEventoDto } from './dto/create-evento.dto';
  import { UpdateEventoDto } from './dto/update-evento.dto';
  
  @Controller('eventos')
  export class EventosController {
    constructor(private readonly eventosService: EventosService) {}
  
    @Post()
    create(@Body() createEventoDto: CreateEventoDto) {
      return this.eventosService.create(createEventoDto);
    }
  
    /**
     * Ejemplo de búsqueda por título
     * GET /eventos?titulo=algo
     */
    @Get()
    findAll(@Query('titulo') titulo?: string) {
      return this.eventosService.findAll(titulo);
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.eventosService.findOne(+id);
    }
  
    @Put(':id')
    update(@Param('id') id: string, @Body() updateEventoDto: UpdateEventoDto) {
      return this.eventosService.update(+id, updateEventoDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.eventosService.remove(+id);
    }
  }
  