import { Injectable } from '@nestjs/common';
import { CreateSupportDto } from './dto/create-support.dto';
import { UpdateSupportDto } from './dto/update-support.dto';
import { ProfessionalService } from 'src/professional/professional.service';
import { CommonService } from 'src/common/common.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { UserService } from 'src/user/user.service';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/auth/entities/user.entity';
import { Model } from 'mongoose';
import { UserInterface } from 'src/auth/interfaces/user.interface';

@Injectable()
export class SupportService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly professionalService:ProfessionalService,
    private readonly commonService:CommonService,
    private readonly userService:UserService
  ){}

  async findAll(paginationDto: PaginationDto) {
    try {
      const { limit = 5, offset = 0, role, state } = paginationDto;
      
      const query = this.userModel.find({ isActive: false });
      
      if (role) {
        query.where('roles').equals(role);
      }
      if (state) {
        query.where('state').equals(state);
      }

      const totalElements: number = await this.userModel.countDocuments(query);

      if (offset > 0) {
        query.limit(limit).skip((offset - 1) * limit);
      } else {
        query.limit(limit).skip(offset);
      }
      const maxpages: number = Math.ceil(totalElements / limit);
      const currentpage: number =(offset>0?offset:offset+1)

      const professionals = await query.sort({ no: 1 }).exec();

      const professionalsDto: UserInterface[] = professionals.map(user => ({
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        photo: user.photo,
        country: user.country,
        address: user.address,
        idDni: user.idDni,
        state: user.state,
        studyCertificate: user.studyCertificate,
        category: user.category,
        rating: user.rating,
        isActive:user.isActive,
        roles:user.roles
      }));

      return { professionals: professionalsDto, totalElements, maxpages, currentpage };
    } catch (error) {
      this.commonService.handleExceptions(error);
    }
  }

  async enableProfessional(id: string, updateSupportDto: UpdateSupportDto){
    try {
      const enableProfessional = await this.professionalService.approveProfessional(id,updateSupportDto)
      return enableProfessional
    } catch (error) {
      this.commonService.handleExceptions(error)
    }
  }

}
