  import { Controller, Get, Post, Body, Param, Put, Delete, Query, NotFoundException, } from '@nestjs/common';
  import { ProfesionalesService } from './profesionales.service';
  import { CreateProfesionalDto } from './dto/create-profesional.dto';
  import { UpdateProfesionalDto } from './dto/update-profesional.dto';
  
  @Controller('profesionales')
  export class ProfesionalesController {
    constructor(private readonly profesionalesService: ProfesionalesService) {}
  
    @Post()
    create(@Body() createProfesionalDto: CreateProfesionalDto) {
      return this.profesionalesService.create(createProfesionalDto);
    }
  
    /**
     * Ejemplo de filtros y búsqueda:
     * GET /profesionales?nombre=Juan&habilidad=carpinteria
     */
    @Get()
    findAll(
      @Query('nombre') nombre?: string,
      @Query('habilidad') habilidad?: string,
    ) {
      return this.profesionalesService.findAll(nombre, habilidad);
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.profesionalesService.findOne(+id);
    }
  
    @Put(':id')
    update(@Param('id') id: string, @Body() updateProfesionalDto: UpdateProfesionalDto) {
      return this.profesionalesService.update(+id, updateProfesionalDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.profesionalesService.remove(+id);
    }
  }
  