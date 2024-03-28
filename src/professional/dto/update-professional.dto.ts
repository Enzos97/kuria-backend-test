import { PartialType } from '@nestjs/swagger';
import { CreateProfessionalDto } from './create-professional.dto';
import { IsBoolean, IsIn, IsNumber, IsOptional, IsPositive, Max, Min } from 'class-validator';
import { StateAppli, stateList } from 'src/application/types/stateAppli.type';

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
}
