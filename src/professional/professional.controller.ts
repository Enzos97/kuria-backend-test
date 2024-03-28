import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { CreateApplicationDto } from 'src/application/dto/create-application.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/auth/types/role.type';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateRatingDto } from 'src/rating/dto/create-rating.dto';
import { UserService } from 'src/user/user.service';
import { ProfessionalService } from './professional.service';
import { UpdateApplicationDto } from 'src/application/dto/update-application.dto';

@ApiTags('Professional')
@Controller('professional')
export class ProfessinalController {
  constructor(private readonly professionalService: ProfessionalService) {}
  
  @ApiBearerAuth()
  @Get()
  @Auth(Role.professional)
  getMyRating(
    @GetUser() user: User
  ) {
    return this.professionalService.gatMyRating(user);
  }

  @ApiBearerAuth()
  @Get('/appli/notications')
  @Auth(Role.professional)
  getMyNotification(
    @GetUser() user: User
  ) {
    return this.professionalService.getMyNotification(user);
  }

  @ApiBearerAuth()
  @Patch(':id')
  @Auth(Role.professional)
  uploadMyNotification(
    @Param('id') id: string,
    @Body() updateApplicationDto:UpdateApplicationDto
  ){
    return this.professionalService.updateMyNotifications(updateApplicationDto, id);
  }
    
}