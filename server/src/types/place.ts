import { Address } from "./address";

export interface Place{
    name: string;
    ID: string;
    createTime: number;
    pType: 'Restaurant' | 'Hotel' | 'Park'
    adress: Address;
}