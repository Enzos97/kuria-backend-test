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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @Post()
  @Auth(Role.user)
  create(
    @Body() createAppliDto: CreateApplicationDto,
    @GetUser() user: User
    ) {
    return this.userService.createApplication(createAppliDto, user);
  }

  @ApiBearerAuth()
  @Get()
  @Auth(Role.user)
  findAll(@Query() paginationDto: PaginationDto) {
    return this.userService.findAll(paginationDto);
  }

  @ApiBearerAuth()
  @Get('search/professional')
  @Auth(Role.user)
  searchProfessionals(@Query() criteria: SearchCriteriaDto) {
    return this.userService.searchProfessionals(criteria);
  }

  @ApiBearerAuth()
  @Get(':id')
  @Auth(Role.user)
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

}
