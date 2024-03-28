import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto, CreateAuthProfessionalDto } from './dto/create-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { CommonService } from 'src/common/common.service';
import * as bcrypt from 'bcrypt'
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
import { Category } from 'src/category/entities/category.entity';
import { EmailsService } from 'src/emails/emails.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    @InjectModel(Category.name) 
    private categoryModel: Model<Category>,
    private readonly commonService: CommonService,
    private readonly jwtService: JwtService,
    private readonly emailService:EmailsService
  ){}

  async create(createAuthDto: CreateAuthDto | CreateAuthProfessionalDto) {
    try {
      const {password, ...userData} = createAuthDto

      if (createAuthDto.category) {
        const categoryExists = await this.categoryModel.exists({ name: createAuthDto.category });

        if (!categoryExists) {
          throw new Error(`La categoría '${createAuthDto.category}' no existe.`);
        }
      }

      const newUser = await this.userModel.create({
        ...userData,
        password: bcrypt.hashSync(password, 10)
      })

      await this.emailService.send_register_mail({user: newUser.email,name: newUser.fullName})
      return {
        user: newUser,
        token: this.getJwtToken({id :newUser.id})
      }
    } catch (error) {
      this.commonService.handleExceptions(error)
    }
  }

  async login(loginUserDto:LoginUserDto){
    try {
      const {email, password} = loginUserDto
      const user = await this.userModel.findOne({email})
      if(!user){
        throw new UnauthorizedException('email or password is invalid')
      }
      if(!bcrypt.compareSync(password,user.password)){
        throw new UnauthorizedException('email or password is invalid')
      }
      return {
        user,
        token: this.getJwtToken({id :user.id})
      }
    } catch (error) {
      this.commonService.handleExceptions(error)
    }
  }

  private getJwtToken( payload:JwtPayload){
    const token = this.jwtService.sign(payload);
    return token
  }

}
