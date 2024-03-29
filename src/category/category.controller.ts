import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/auth/types/role.type';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  
  @ApiOperation({ summary: 'CATEGORY es un CRUD de categorias', description: 'Estos endpoints solo estan habbilitados para usuarios ADMIN'})
  
  @ApiBearerAuth()
  @Post()
  @Auth(Role.admin)
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @ApiBearerAuth()
  @Get()
  @Auth(Role.admin)
  findAll() {
    return this.categoryService.findAll();
  }

  @ApiBearerAuth()
  @Get(':id')
  @Auth(Role.admin)
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }

  @ApiBearerAuth()
  @Patch(':id')
  @Auth(Role.admin)
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @Auth(Role.admin)
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}
