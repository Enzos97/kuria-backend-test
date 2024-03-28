import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto, CreateAuthProfessionalDto } from './dto/create-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { LoginUserDto } from './dto/login-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

    @ApiOperation({ summary: 'Registra al usuario (user). Devuelve user y token', description: 'Este endpoint no deberia devolver datos del usuario, solo deberia mostrar el token, por cuestiones de prueba lo deje.'})
    @Post('register')
    create(@Body() createAuthDto: CreateAuthDto) {
      return this.authService.create(createAuthDto);
    }
    @ApiOperation({ summary: 'Registra al usuario (profesional). Devuelve user y token', description: 'Este endpoint no deberia devolver datos del usuario, solo deberia mostrar el token, por cuestiones de prueba lo deje.'})
    @Post('professional/register')
    createprofessional(@Body() createAuthDto: CreateAuthProfessionalDto) {
      return this.authService.create(createAuthDto);
    }
    @ApiOperation({summary: 'Login del cualquier usuario.'})
    @Post('login')
    login(@Body() loginUserDto: LoginUserDto){
      return this.authService.login(loginUserDto);
    }

}
