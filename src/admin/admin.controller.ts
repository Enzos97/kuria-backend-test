import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { UpdateProfessionalDto } from 'src/professional/dto/update-professional.dto';
import { Admin } from './entities/admin.entity';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/auth/types/role.type';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('user/statistics')
  @Auth(Role.admin)
  getUsersStatistics() {
    return this.adminService.getUsersStatistics();
  }

  @Patch('/update/professional/:id')
  @Auth(Role.admin)
  updateProfessional(@Param('id') id: string, @Body() updateProfessionalDto: UpdateProfessionalDto) {
    return this.adminService.updateProfessional(id, updateProfessionalDto);
  }

}
