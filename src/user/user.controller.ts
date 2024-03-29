import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { SearchCriteriaDto } from './dto/search.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { CreateApplicationDto } from 'src/application/dto/create-application.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/auth/types/role.type';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateRatingDto } from 'src/rating/dto/create-rating.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  @ApiOperation({ summary: 'Permite enviar solicitudes a los profecionales', description: 'Este endpoint permite enviar solicitudes al PROFESSINAL'})
  @ApiBearerAuth()
  @Post('professional/aplication')
  @Auth(Role.user)
  create(
    @Body() createAppliDto: CreateApplicationDto,
    @GetUser() user: User
  ) {
    return this.userService.createApplication(createAppliDto, user);
  }
    @ApiOperation({ summary: 'Permite enviar un rating del Profesional', description: 'Este endpoint permite crear un rating del profesional, enviando por BODY un numero de rating y un comentario. Ademas se envia el id del professional.'})
    @ApiBearerAuth()
    @Post('professional/rating')
    @Auth(Role.user)
    createRating(
      @Body() createRatingDto: CreateRatingDto,
      @GetUser() user: User
      ) {
        return this.userService.createRating(createRatingDto, user);
      }
  
    @ApiOperation({ summary: 'Trae todos los Professinales', description: 'Este endpoint devuelve todos los usuarios PROFESSIONAL y ademas permite filtrar por role. Tambien esta pagianado, enviando por PARAM el limit y el offset'})
    @ApiBearerAuth()
    @Get()
    @Auth(Role.user)
    findAll(@Query() paginationDto: PaginationDto) {
      return this.userService.findAll(paginationDto);
    }
    
    @ApiOperation({ summary: 'Trae el detalle de los professionales', description: 'Este endpoint devuelve todos los datos de PROFESSIONAL incluido el rating promedio y los ratings individuales con sus comentarios'})
    @ApiBearerAuth()
    @Get(':id')
    @Auth(Role.user)
    findOne(@Param('id') id: string) {
      return this.userService.findOne(id);
    }
    
    @ApiOperation({ summary: 'Permite buscar usuarios por pais o categoria de profesion', description: 'Este endpoint permite buscar usuarios por COUNTRY o CATEGORY, de manera case sensitive'})
    @ApiBearerAuth()
    @Get('search/professional/')
    @Auth(Role.user)
    searchProfessionals(@Query() criteria: SearchCriteriaDto) {
      return this.userService.searchProfessionals(criteria);
    }


}
