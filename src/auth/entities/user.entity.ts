import mongoose, { Document, SchemaTypes } from "mongoose";
import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose"
import { Role } from "../types/role.type";
import { Application } from "src/application/entities/application.entity";
import { IsNotEmpty, IsString } from "class-validator";
import { StateAppli } from "src/application/types/stateAppli.type";

@Schema({
    timestamps: true,
  })
export class User extends Document {
    @Prop({
        required:true,
        set: (val: string) => val.toLowerCase().trim(), get: (val: string) => val
    })
    fullName:string;
    @Prop({
        unique:true,
        required:true,
        set: (val: string) => val.toLowerCase().trim(), get: (val: string) => val
    })
    email:string;
    @Prop({
        required:true,
        set: (val: string) => val.trim(), get: (val: string) => val
    })
    password:string;
    @Prop({
        default:true
    })
    isActive:Boolean;
    @Prop({
        default:Role.user
    })
    roles:string[]
    @Prop({
        default:null
    })
    photo:string;
    @Prop({
        default:null
    })
    country:string;
    @Prop({
        default:null
    })
    address:string;
    @Prop({
        default:null
    })
    idDni:number;
    @Prop({
        default:null
    })
    studyCertificate:string;
    @Prop({
        default:null
    })
    category:string;
    @Prop({
        default:0
    })
    rating: number;

    @Prop({
        default:StateAppli.pending
    })
    state:StateAppli
}

export const UserSchema = SchemaFactory.createForClass(User)
