import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { CreateApplicationDto } from 'src/application/dto/create-application.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/auth/types/role.type';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateRatingDto } from 'src/rating/dto/create-rating.dto';
import { UserService } from 'src/user/user.service';
import { ProfessionalService } from './professional.service';
import { UpdateApplicationDto } from 'src/application/dto/update-application.dto';

@ApiTags('Professional')
@Controller('professional')
export class ProfessinalController {
  constructor(private readonly professionalService: ProfessionalService) {}
  
  @ApiOperation({ summary: 'Trae el rating del usuario', description: 'Este endpoint devuelve la cantidad de puntuaciones y comentarios de usuario PROFESSIONAL.'})
  @ApiBearerAuth()
  @Get()
  @Auth(Role.professional)
  getMyRating(
    @GetUser() user: User
  ) {
    return this.professionalService.gatMyRating(user);
  }

  @ApiOperation({ summary: 'Trae notificaciones de invitacion (contratacion) de usuarios', description: 'Este endpoint devuelve la cantidad de solicitudes que tiene el usuario PROFESSIONAL de los USER'})
  @ApiBearerAuth()
  @Get('/appli/notications')
  @Auth(Role.professional)
  getMyNotification(
    @GetUser() user: User
  ) {
    return this.professionalService.getMyNotification(user);
  }

  @ApiOperation({ summary: 'Permite aceptar las solicitudes', description: 'Este endpoint permite editar las solicitudes de los USER, es decir, hacer un cambio de estado, de PENDING a ACEPTED o REJECTED. Se envia el ID de la notificacion por params y el estado por BODY.'})
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