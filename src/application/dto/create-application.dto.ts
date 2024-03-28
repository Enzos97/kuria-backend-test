import { IsString, IsBoolean, IsArray, IsOptional, IsNotEmpty, IsMongoId } from 'class-validator';
import { StateAppli } from '../types/stateAppli.type';

export class CreateApplicationDto {
  @IsString()
  @IsOptional()
  subject: string = 'ninguno';

  @IsString()
  @IsNotEmpty()
  texto: string;
  
  @IsString()
  professionalId:string;

}