import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SeedService } from './seed.service';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { Auth } from '../auth/decorators/auth.decorator';
import { Role } from 'src/auth/types/role.type';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Seeds')
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @ApiOperation({ summary: 'Genera un usuario ADMIN', description: 'Este endpoint genera un ADMIN y borra todos los usuarios.'})
  @Get('admin')
  seedAdminExecute() {
    return this.seedService.seedAdmin();
  }

  @ApiOperation({ summary: 'Genera un usuario SUPPORT', description: 'Este endpoint genera un SUPPORT'})
  @Get('support')
  seedSupportExecute() {
    return this.seedService.seedSupport();
  }

  @ApiOperation({ summary: 'Genera categorias de profesion', description: 'Este endpoint genera 3 categorias de profesion. El mismo solo puede ser ejecutado por un ADMIN.'})
  @ApiBearerAuth()
  @Get('categories')
  @Auth(Role.admin)
  seedExecute() {
    return this.seedService.seedCategories();
  }
}