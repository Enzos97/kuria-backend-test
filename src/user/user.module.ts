import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/auth/entities/user.entity';
import { CommonModule } from 'src/common/common.module';
import { RatingModule } from 'src/rating/rating.module';
import { ApplicationModule } from 'src/application/application.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
  CommonModule,
  RatingModule,
  ApplicationModule,
  AuthModule
  ],
  exports:[
    UserService
  ]
})
export class UserModule {}
