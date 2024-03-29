import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({
    timestamps: true,
  })
export class Category extends Document {
    @Prop({
        required:true,
        unique:true,
        set: (val: string) => val.toLowerCase().trim(), get: (val: string) => val
    })
    name:string
}

export const CategorySchema = SchemaFactory.createForClass(Category)