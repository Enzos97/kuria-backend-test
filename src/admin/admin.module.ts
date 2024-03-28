import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { ProfessionalModule } from 'src/professional/professional.module';
import { CommonModule } from 'src/common/common.module';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [AdminController],
  providers: [AdminService],
  imports: [
    ProfessionalModule,
    CommonModule,
    UserModule,
    AuthModule
  ]
})
export class AdminModule {}
