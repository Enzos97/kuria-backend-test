import { StateAppli } from "src/application/types/stateAppli.type";

export interface UserInterface {
    id?: string;
    fullName: string;
    email: string;
    photo: string;
    state?: StateAppli
    country: string;
    address: string;
    idDni: number;
    studyCertificate: string;
    category: string;
    rating: number;
    isActive?:Boolean;
    roles?:string[]
  }