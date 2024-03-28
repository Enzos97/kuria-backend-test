import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SupportService } from './support.service';
import { CreateSupportDto } from './dto/create-support.dto';
import { UpdateSupportDto } from './dto/update-support.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/auth/types/role.type';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Support')
@Controller('support')
export class SupportController {
  constructor(
    private readonly supportService: SupportService,
    ) {}

  @ApiBearerAuth()
  @Get()
  @Auth(Role.support)
  findAll(@Query() paginationDto: PaginationDto) {
    return this.supportService.findAll(paginationDto);
  }
  @ApiBearerAuth()
  @Patch('enable/professional/:id')
  @Auth(Role.support)
  enableProfessional(@Param('id') id: string, @Body() updateSupportDto: UpdateSupportDto) {
    return this.supportService.enableProfessional(id, updateSupportDto);
  }
}
