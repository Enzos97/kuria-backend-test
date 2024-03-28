import { Module, forwardRef } from '@nestjs/common';
import { ProfessionalService } from './professional.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/auth/entities/user.entity';
import { CommonModule } from 'src/common/common.module';
import { RatingModule } from 'src/rating/rating.module';
import { AuthModule } from 'src/auth/auth.module';
import { CategoryModule } from 'src/category/category.module';
import { ApplicationModule } from 'src/application/application.module';
import { ProfessinalController } from './professional.controller';

@Module({
  controllers:[ProfessinalController],
  providers: [ProfessionalService],
  imports:[
    CommonModule,
    forwardRef(() => RatingModule),
    AuthModule,
    CategoryModule,
    ApplicationModule
  ],
  exports:[ProfessionalService]
})
export class ProfessionalModule {}
