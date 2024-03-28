import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateProfessionalDto } from './dto/create-professional.dto';
import { UpdateProfessionalDto } from './dto/update-professional.dto';
import { CommonService } from 'src/common/common.service';
import { User } from 'src/auth/entities/user.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { RatingService } from 'src/rating/rating.service';
import { UpdateApplicationDto } from 'src/application/dto/update-application.dto';
import { ApplicationService } from './../application/application.service';

@Injectable()
export class ProfessionalService {
  
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly commonService: CommonService,
    @Inject(forwardRef(() => RatingService))
    private readonly ratingService: RatingService,
    private readonly applicationService:ApplicationService
  ){}

  async gatMyRating(user:User){
    try {
      const myRating = await this.ratingService.getMyRating(user)
      return myRating
    } catch (error) {
      this.commonService.handleExceptions(error)
    }
  }

  async getMyNotification(user:User){
    try {
      const myRating = await this.applicationService.getMyApplications(user.id)
      return myRating
    } catch (error) {
      this.commonService.handleExceptions(error)
    }
  }

  async updateMyNotifications(updateApplicationDto:UpdateApplicationDto, id:string){
    try {
      const updateNoti = await this.applicationService.update(updateApplicationDto,id)
      return updateNoti
    } catch (error) {
      this.commonService.handleExceptions(error)
    }
  }

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
