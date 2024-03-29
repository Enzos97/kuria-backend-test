import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { UpdateProfessionalDto } from 'src/professional/dto/update-professional.dto';
import { ProfessionalService } from 'src/professional/professional.service';
import { CommonService } from 'src/common/common.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AdminService {
  constructor(
    private readonly professionalService: ProfessionalService,
    private readonly commonService: CommonService,
    private readonly userService: UserService
  ){}

  async updateProfessional(id: string, updateProffesionalDto: UpdateProfessionalDto) {
    try {
      const updateProfessionalSettings = await this.professionalService.update(id,updateProffesionalDto)
      return updateProfessionalSettings
    } catch (error) {
      this.commonService.handleExceptions(error)
    }
  }

  async getUsersStatistics(){
    try {
      const statistics = await this.userService.getUsersStatistics()
      return statistics
    } catch (error) {
      this.commonService.handleExceptions(error)
    }
  }
}
