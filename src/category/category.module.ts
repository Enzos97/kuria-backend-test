import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from './entities/category.entity';
import { CommonModule } from 'src/common/common.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Category.name,
        schema: CategorySchema
      }
    ]),
    CommonModule,
    AuthModule
  ],
  exports: [
    CategoryService,
    MongooseModule
  ]
})
export class CategoryModule {}
