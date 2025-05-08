import {  IsString,  MaxLength } from 'class-validator'

export class StatusSchema {
   
        @IsString()
        @MaxLength(100)
        descricao: string;
}