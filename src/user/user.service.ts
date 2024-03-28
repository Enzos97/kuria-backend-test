import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommonService } from 'src/common/common.service';
import { User } from 'src/auth/entities/user.entity';
import { SearchCriteriaDto } from './dto/search.dto';
import { RatingService } from '../rating/rating.service';
import { ApplicationService } from '../application/application.service';
import { CreateApplicationDto } from 'src/application/dto/create-application.dto';
import { UserInterface } from 'src/auth/interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly commonService: CommonService,
    private readonly ratingService:RatingService,
    private readonly applicationService:ApplicationService
  ){}

  async createApplication(createApplicationDto: CreateApplicationDto, user:User){
    try {
      const newApplication = await this.applicationService.create(createApplicationDto, user.id)
      return newApplication
    } catch (error) {
      this.commonService.handleExceptions(error)
    }
  }

  async findAll(paginationDto: PaginationDto) {
    try {
      const { limit = 5, offset = 0, role } = paginationDto;
      
      const query = this.userModel.find({ isActive: true });
      
      if (role) {
        query.where('roles').equals(role);
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
        fullName: user.fullName,
        email: user.email,
        photo: user.photo,
        country: user.country,
        address: user.address,
        idDni: user.idDni,
        studyCertificate: user.studyCertificate,
        category: user.category,
        rating: user.rating
      }));

      return { professionals: professionalsDto, totalElements, maxpages, currentpage };
    } catch (error) {
      this.commonService.handleExceptions(error);
    }
  }
  async searchProfessionals(criteria: SearchCriteriaDto) {
    const { profession, country } = criteria;

    //RegExp para la búsqueda case-sensitive
    const categoryRegex = new RegExp("^" +profession, "i");
    const locationRegex = new RegExp("^" +country, "i");

    const query = {
      profession: { $regex: categoryRegex },
      country: { $regex: locationRegex },
      roles: 'PROFESSIONAL',
    };
    const professionals = await this.userModel.find(query).exec();
    const professionalsDto: UserInterface[] = professionals.map(user => ({
      fullName: user.fullName,
      email: user.email,
      roles: user.roles,
      photo: user.photo,
      country: user.country,
      address: user.address,
      idDni: user.idDni,
      studyCertificate: user.studyCertificate,
      category: user.category,
      rating: user.rating
    }));

    return professionalsDto;
  }
  async findOne(id: string) {
    try {
      const user = await this.userModel.findById(id).exec();
      const ratings = await this.ratingService.getRatingAndCommentsForUser(id)

      const userDto: UserInterface = {
        fullName: user.fullName,
        email: user.email,
        photo: user.photo,
        country: user.country,
        address: user.address,
        idDni: user.idDni,
        studyCertificate: user.studyCertificate,
        category: user.category,
        rating: user.rating
      };

      return { user:userDto, ratings };
    } catch (error) {
      this.commonService.handleExceptions(error);
    }
  }

  //Indicadores
  async getUsersStatistics() {
    const totalUsers = await this.userModel.countDocuments().exec();
    const professionalUsers = await this.userModel.countDocuments({ roles: 'PROFESSIONAL' }).exec();
    const normalUsers = await this.userModel.countDocuments({ roles: 'USER' }).exec();
    const pendingUsers = await this.userModel.countDocuments({ state: 'pending' }).exec();

    return {
      totalUsers,
      professionalUsers,
      normalUsers,
      pendingUsers
    };
  }

}
