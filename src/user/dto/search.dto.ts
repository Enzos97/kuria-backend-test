import { IsOptional, IsString } from "class-validator";

export class SearchCriteriaDto {
    @IsString()
    @IsOptional()
    profession?: string;
    @IsString()
    @IsOptional()
    country?: string;
}