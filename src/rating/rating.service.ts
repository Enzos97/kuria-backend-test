import { Injectable } from '@nestjs/common';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Rating } from './entities/rating.entity';
import { Model, Types } from 'mongoose';
import { CommonService } from 'src/common/common.service';
import { User } from 'src/auth/entities/user.entity';
import { ProfessionalService } from 'src/professional/professional.service';

@Injectable()
export class RatingService {
  constructor(
    @InjectModel(Rating.name)
    private readonly ratingModel: Model<Rating>,
    private readonly commonService: CommonService,
    private readonly professionalService: ProfessionalService
  ){}
  async getMyRating(user:User){
    try {
      const myrating = await this.ratingModel.find({professionalId:user.id})
      console.log('myrating',myrating)
      return myrating
    } catch (error) {
      this.commonService.handleExceptions(error)
    }
  }
  async create(createRatingDto: CreateRatingDto, user:User) {
    try {
      const rating = await this.ratingModel.create({...createRatingDto, userId:user.id})
      const averageRating = await this.getAverageRatingByProfessionalId(createRatingDto.professionalId)
      
      await this.professionalService.updateRating(createRatingDto.professionalId,averageRating)

      return rating
    } catch (error) {
      this.commonService.handleExceptions(error)
    }
  }

  async getAverageRatingByProfessionalId(professionalId: string) {
    try {
      const ratings = await this.ratingModel.find({ professionalId }).exec();
      const totalRatings = ratings.length;
      if (totalRatings === 0) {
        return 0; // No ratings found
      }
      const sumRatings = ratings.reduce((acc, curr) => acc + curr.rating, 0);
      return sumRatings / totalRatings;
    } catch (error) {
      this.commonService.handleExceptions(error)
    }
  }

  async getRatingAndCommentsForUser(id:string){
    try {
      const ratings = await this.ratingModel.find({ professionalId:id }).exec();
      return ratings
    } catch (error) {
      this.commonService.handleExceptions(error)
    }
  }
}
