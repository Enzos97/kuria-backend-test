import { Type } from "class-transformer";
import { IsBoolean, IsIn, IsNumber, IsOptional, IsPositive, IsString, Min } from "class-validator";
import { Role, roleList } from './../../auth/types/role.type';
import { StateAppli } from "src/application/types/stateAppli.type";

export class PaginationDto{
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @IsPositive()
    @Min(1)
    limit?: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @IsPositive()
    offset?:number;

    @IsOptional()
    @IsString()
    role?:Role;

    @IsOptional()
    @IsString()
    state?:StateAppli

    @IsOptional()
    @IsBoolean()
    isActive?:boolean
}