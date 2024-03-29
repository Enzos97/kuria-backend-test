import { Injectable } from '@nestjs/common';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Application } from './entities/application.entity';
import { Model } from 'mongoose';
import { CommonService } from 'src/common/common.service';
import { User } from '../auth/entities/user.entity';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectModel(Application.name)
    private readonly applicationModel: Model<Application>,
    private readonly commonService: CommonService,
  ){}
  async create(createApplicationDto: CreateApplicationDto,user:User) {
    try{
      const newApplication = await this.applicationModel.create( {...createApplicationDto, userId:user.id} )
      return newApplication
    }catch(error){
      this.commonService.handleExceptions(error);
    }
  }
  async getMyApplications(user:User){
    try {
      const myApplications = await this.applicationModel.find({id:user.id})
      return myApplications
    } catch (error) {
      this.commonService.handleExceptions(error)
    }
  }
  async update(updateApplicationDto:UpdateApplicationDto, id:string){
    try {
      const updateAppli = await this.applicationModel.findByIdAndUpdate(id,updateApplicationDto,{new:true})
      return updateAppli
    } catch (error) {
      this.commonService.handleExceptions(error)
    }    
  }
}
