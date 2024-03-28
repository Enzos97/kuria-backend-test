import { IsOptional, IsString } from "class-validator";

export class SearchCriteriaDto {
    @IsString()
    @IsOptional()
    category?: string;
    @IsString()
    @IsOptional()
    country?: string;
}