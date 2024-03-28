import { Injectable } from '@nestjs/common';
import axios, {AxiosInstance} from 'axios';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role } from 'src/auth/types/role.type';
import * as bcrypt from 'bcrypt';
import { User } from '../auth/entities/user.entity';
import { Category } from 'src/category/entities/category.entity';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<Category>,
    @InjectModel(User.name)
    private readonly UserModel: Model<User>
  ){}
  private readonly axios: AxiosInstance= axios;
  async seedAdmin(){
    await this.UserModel.deleteMany({})

    const admin = await this.UserModel.create({
      fullName:"admin prueba",
      email:"admin@local.com",
      password:bcrypt.hashSync("Admin123", 10),
      isActive:true,
      roles:[Role.admin]
    })

    return {message:"admin created", credential:{email:admin.email,password:"Admin123"}}
  }
  async seedSupport(){
    await this.UserModel.deleteMany({ roles: Role.support });
    
    const admin = await this.UserModel.create({
      fullName:"suport prueba",
      email:"support@local.com",
      password:bcrypt.hashSync("Admin123", 10),
      isActive:true,
      roles:[Role.support]
    })

    return {message:"admin created", credential:{email:admin.email,password:"Admin123"}}
  }
  async seedCategories() {
    const categoriesToSeed = [
      { name: 'desarrollador' },
      { name: 'electricista' },
      { name: 'data analytics' }
    ];

    await this.categoryModel.insertMany(categoriesToSeed);
    return 'Seed Executed';
  }

}
