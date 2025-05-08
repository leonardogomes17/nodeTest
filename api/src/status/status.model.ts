import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class StatusModel {
    @PrimaryGeneratedColumn()
    idStatus: number;

    @Column( { length: 100 })
     descricao: string;

}