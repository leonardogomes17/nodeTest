import { PedidoItemModel } from "src/pedidosItem/pedidosItem.model";
import { StatusModel } from "src/status/status.model";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PedidosModel {
    @PrimaryGeneratedColumn()
    idPedido: number;

    @Column("decimal", { precision: 5, scale: 2 })
     valorTotal: number;

     @OneToOne( () => StatusModel, (statusModel) => statusModel.idStatus )
     idStatus: number;

     @ManyToOne(() => PedidoItemModel)
     pedidoItemModel: PedidoItemModel[];
}