import { PartialType } from '@nestjs/swagger';
import { CreateProfessionalDto } from './create-professional.dto';
import { IsArray, IsBoolean, IsEnum, IsIn, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Max, Min, ValidateNested } from 'class-validator';
import { StateAppli, stateList } from 'src/application/types/stateAppli.type';
import { Role } from 'src/auth/types/role.type';
import { Type } from 'class-transformer';

export class UpdateProfessionalDto extends PartialType(CreateProfessionalDto) {
    @IsOptional()
    @IsNumber()
    @IsPositive()
    @Min(1)
    @Max(5)
    rating?:number;

    @IsOptional()
    @IsBoolean()
    isActive?:boolean

    @IsOptional()
    @IsIn(stateList)
    state?:StateAppli;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    photo?:string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    country?:string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    address?:string;

    @IsOptional()
    @IsNumber()
    @IsNotEmpty()
    idDni?:number;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    category?:string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    studyCertificate?:string;

    @IsOptional()
    @IsString({ each: true })
    @IsEnum(Role, { each: true }) // Valida que cada elemento del array sea un valor del enum Role
    @Type(() => String)
    roles?:Role[];
}
