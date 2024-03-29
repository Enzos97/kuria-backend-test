import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsBoolean, IsIn, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Max, Min } from 'class-validator';
import { StateAppli, stateList } from 'src/application/types/stateAppli.type';
import { Role } from 'src/auth/types/role.type';

export class UpdateUserDto extends PartialType(CreateUserDto) {
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
    @IsString()
    roles?:string[] = [Role.professional];
}
