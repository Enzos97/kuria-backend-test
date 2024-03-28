import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateApplicationDto } from './create-application.dto';
import { StateAppli } from '../types/stateAppli.type';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateApplicationDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty() 
    state:StateAppli;
}
