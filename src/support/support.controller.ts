import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SupportService } from './support.service';
import { CreateSupportDto } from './dto/create-support.dto';
import { UpdateSupportDto } from './dto/update-support.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/auth/types/role.type';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Support')
@Controller('support')
export class SupportController {
  constructor(
    private readonly supportService: SupportService,
    ) {}

  @ApiOperation({ summary: 'Trae usuarios profesionales', description: 'Este endpoint devuelve la cantidad de usuarios totales permitiendo filtra por rol y estado de solicitud del profecional, ademas la busqueda esta paginada'})
  @ApiBearerAuth()
  @Get()
  @Auth(Role.support)
  findAll(@Query() paginationDto: PaginationDto) {
    return this.supportService.findAll(paginationDto);
  }
  @ApiOperation({ summary: 'Permite editar el estado y actividad de los profesionales', description: 'Este endpoint permite editar a los PROFESSIONAL para habilitarlos y aceptarlos o rechazarlos'})
  @ApiBearerAuth()
  @Patch('enable/professional/:id')
  @Auth(Role.support)
  enableProfessional(@Param('id') id: string, @Body() updateSupportDto: UpdateSupportDto) {
    return this.supportService.enableProfessional(id, updateSupportDto);
  }
}
