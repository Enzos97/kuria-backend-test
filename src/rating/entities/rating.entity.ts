import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";
import { User } from "src/auth/entities/user.entity";

@Schema({
    timestamps: true,
  })
export class Rating {
    @Prop({
        required:true,
        default:1
    })
    rating:number;
    @Prop({
        default: null
    })
    comment:string;
    @Prop({
        type: SchemaTypes.ObjectId,
        ref: User.name,
        index: true,
        required: true,
    }) // Referencia al usuario profecional
    professionalId: Types.ObjectId;   
    @Prop({
        type: SchemaTypes.ObjectId,
        ref: User.name,
        index: true,
    }) // Referencia al usuariocreador
    userId: Types.ObjectId;  
}

export const RatingSchema = SchemaFactory.createForClass(Rating)
