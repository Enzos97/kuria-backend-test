import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { CommonModule } from 'src/common/common.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { Category, CategorySchema } from 'src/category/entities/category.entity';
import { EmailsModule } from 'src/emails/emails.module';
@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema
      },
      {
        name: Category.name,
        schema: CategorySchema
      }
    ]),
    PassportModule.register({defaultStrategy: 'jwt'}),

    JwtModule.registerAsync({
      imports:[],
      inject:[],
      useFactory:()=>{
        return {
          secret:process.env.JWT_SECRET||'some__secret:word',
          signOptions:{
          expiresIn: '2h'
          }
        }
      }
    }),
    CommonModule,
    EmailsModule
  ],
  exports:[MongooseModule,JwtStrategy,PassportModule,JwtModule]
})
export class AuthModule {}
