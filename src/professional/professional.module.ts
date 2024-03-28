import { Module } from '@nestjs/common';
import { ProfessionalService } from './professional.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/auth/entities/user.entity';
import { CommonModule } from 'src/common/common.module';

@Module({
  providers: [ProfessionalService],
  imports:[
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema
      }
    ]),
    CommonModule
  ],
  exports:[ProfessionalService]
})
export class ProfessionalModule {}
