import { IsNumber, IsOptional, IsPositive, IsString, Max, Min } from "class-validator";

export class CreateRatingDto {
    @IsNumber()
    @IsPositive()
    @Min(1)
    @Max(5)
    rating:number;
    @IsString()
    @IsOptional()
    comment?:string;
    @IsString()
    professionalId:string;
}
