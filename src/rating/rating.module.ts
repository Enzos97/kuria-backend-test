import { Module, forwardRef } from '@nestjs/common';
import { RatingService } from './rating.service';

import { MongooseModule } from '@nestjs/mongoose';
import { Rating, RatingSchema } from './entities/rating.entity';
import { CommonModule } from 'src/common/common.module';
import { ProfessionalModule } from 'src/professional/professional.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [RatingService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Rating.name,
        schema: RatingSchema
      }
    ]),
    CommonModule,
    forwardRef(() => ProfessionalModule),
    forwardRef(() => AuthModule),
  ],
  exports:[
    RatingService
  ]
})
export class RatingModule {}
