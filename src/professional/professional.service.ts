import { Injectable } from '@nestjs/common';
import { CreateProfessionalDto } from './dto/create-professional.dto';
import { UpdateProfessionalDto } from './dto/update-professional.dto';
import { CommonService } from 'src/common/common.service';
import { User } from 'src/auth/entities/user.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProfessionalService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly commonService: CommonService,
  ){}

  async update(id: string, updateProfessionalDto: UpdateProfessionalDto) {
    try {
      const rating = await this.userModel.findByIdAndUpdate(id,updateProfessionalDto,{new:true})
      return rating
    } catch (error) {
      this.commonService.handleExceptions(error)
    }
  }

  async updateRating(id: string, rating: number) {
      try {
        const updateRating = await this.userModel.findByIdAndUpdate(id,{rating},{new:true})
        return updateRating
      } catch (error) {
        this.commonService.handleExceptions(error)
      }
  }

  async approveProfessional(id:string, updateProfessionalDto: UpdateProfessionalDto){
    try {
      const isActive = await this.userModel.findByIdAndUpdate(id,updateProfessionalDto,{new:true})
      return isActive
    } catch (error) {
      this.commonService.handleExceptions(error)
    }
  }

}
