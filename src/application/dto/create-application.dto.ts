import { IsString, IsBoolean, IsArray, IsOptional, IsNotEmpty, IsMongoId } from 'class-validator';
import { StateAppli } from '../types/stateAppli.type';

export class CreateApplicationDto {
  @IsString()
  @IsOptional()
  subject: string = 'ninguno';

  @IsString()
  @IsNotEmpty()
  texto: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  state?: StateAppli

  @IsBoolean()
  @IsOptional()
  read?: boolean = false;
  
  @IsString()
  professionalId:string;

}