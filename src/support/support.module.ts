import { Module } from '@nestjs/common';
import { SupportService } from './support.service';
import { SupportController } from './support.controller';
import { CommonModule } from 'src/common/common.module';
import { ProfessionalModule } from 'src/professional/professional.module';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/auth/entities/user.entity';

@Module({
  controllers: [SupportController],
  providers: [SupportService],
  imports: [
    CommonModule,
    ProfessionalModule,
    AuthModule,
    UserModule,
  ],
})
export class SupportModule {}
