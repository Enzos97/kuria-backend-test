import { Document, SchemaTypes, Types } from "mongoose";
import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose"
import { User } from "src/auth/entities/user.entity";
import { StateAppli, stateList } from '../types/stateAppli.type';;

@Schema({
    timestamps: true,
  })
export class Application {
    @Prop({
        default:"ninguno"
    })
    subject: string;
    @Prop({
        required:true
    })
    texto: string;
    @Prop({
        default:StateAppli.pending
    })
    state:StateAppli;
    @Prop({default:false})
    read:boolean;
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

export const ApplicationSchema = SchemaFactory.createForClass(Application)