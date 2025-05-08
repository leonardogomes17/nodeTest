import { PedidosModel } from "src/pedidos/pedidos.model";
import { ProdutosModel } from "src/produtos/produtos.model";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PedidoItemModel {
    @PrimaryGeneratedColumn()
    idPedidoItem: number;

     @Column('int')
     idProduto: number;

      @Column('int')
      idPedido: number;

     @Column('int')
     qtdItem: number;
}