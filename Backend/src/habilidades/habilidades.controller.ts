import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { HabilidadesService } from './habilidades.service';
import { CreateHabilidadDto } from './dto/create-habilidad.dto';
import { UpdateHabilidadDto } from './dto/update-habilidad.dto';

@Controller('habilidades')
export class HabilidadesController {
  constructor(private readonly habilidadesService: HabilidadesService) {}

  @Post()
  create(@Body() createHabilidadDto: CreateHabilidadDto) {
    return this.habilidadesService.create(createHabilidadDto);
  }

  @Get()
  findAll() {
    return this.habilidadesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.habilidadesService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateHabilidadDto: UpdateHabilidadDto) {
    return this.habilidadesService.update(+id, updateHabilidadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.habilidadesService.remove(+id);
  }
}
