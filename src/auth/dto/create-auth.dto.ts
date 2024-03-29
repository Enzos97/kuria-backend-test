import {IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { Role } from "../types/role.type";
import { ApiHideProperty } from "@nestjs/swagger";

export class CreateAuthDto {
    @IsString()
    @MinLength(1)
    @MaxLength(250)
    fullName:string;
    @IsString()
    @IsEmail()
    email:string;
    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have a Uppercase, lowercase letter and a number'
    })
    password:string;
    @ApiHideProperty()
    @IsOptional()
    @IsString()
    category?:string;

    @ApiHideProperty()
    @IsOptional()
    isActive:boolean = true;
}

export class CreateAuthProfessionalDto {
    @IsString()
    @MinLength(1)
    @MaxLength(250)
    fullName:string;
    @IsString()
    @IsEmail()
    email:string;
    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have a Uppercase, lowercase letter and a number'
    })
    password:string;
    @IsNotEmpty()
    @IsString()
    photo:string;
    @IsString()
    @IsNotEmpty()
    country:string;
    @IsString()
    @IsNotEmpty()
    address:string;
    @IsNumber()
    @IsNotEmpty()
    idDni:number;
    @IsString()
    @IsNotEmpty()
    category:string;
    @IsString()
    @IsNotEmpty()
    studyCertificate:string;

    @ApiHideProperty()
    @IsOptional()
    isActive:boolean = false;
    @ApiHideProperty()
    @IsOptional()
    roles:string[] = [Role.professional];
}
