import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { CategoryModule } from 'src/category/category.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [CategoryModule, AuthModule]
})
export class SeedModule {}
