import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ApplicationModule } from './application/application.module';
import { CategoryModule } from './category/category.module';
import { RatingModule } from './rating/rating.module';
import { SupportModule } from './support/support.module';
import { AdminModule } from './admin/admin.module';
import { ProfessionalModule } from './professional/professional.module';
import { EmailsModule } from './emails/emails.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    MongooseModule.forRoot(process.env.DB_URL),
    AuthModule, 
    CommonModule, 
    UserModule, 
    ApplicationModule,
    CategoryModule, 
    RatingModule, 
    SupportModule, 
    AdminModule, 
    ProfessionalModule, 
    EmailsModule, 
    SeedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
