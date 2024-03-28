import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto, CreateAuthProfessionalDto } from './dto/create-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { LoginUserDto } from './dto/login-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

    @Post('register')
    create(@Body() createAuthDto: CreateAuthDto) {
      return this.authService.create(createAuthDto);
    }
  
    @Post('professional/register')
    createprofessional(@Body() createAuthDto: CreateAuthProfessionalDto) {
      return this.authService.create(createAuthDto);
    }

    @Post('login')
    login(@Body() loginUserDto: LoginUserDto){
      return this.authService.login(loginUserDto);
    }

}
