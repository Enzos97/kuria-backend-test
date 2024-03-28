import { PartialType } from '@nestjs/swagger';
import { CreateSupportDto } from './create-support.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateSupportDto extends PartialType(CreateSupportDto) {
    @IsOptional()
    @IsBoolean()
    isActive?:boolean
}
