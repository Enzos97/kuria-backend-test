import { Module } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Application, ApplicationSchema } from './entities/application.entity';
import { CommonModule } from 'src/common/common.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [ApplicationService],
  imports:[
    MongooseModule.forFeature([
      {
        name: Application.name,
        schema: ApplicationSchema
      }
    ]),
    CommonModule,
  ],
  exports:[
    MongooseModule,
    ApplicationService
  ]
})
export class ApplicationModule {}
