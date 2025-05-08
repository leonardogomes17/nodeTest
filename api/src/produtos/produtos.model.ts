import { isNotEmpty } from "class-validator";
import { Column, Decimal128, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProdutosModel {
    @PrimaryGeneratedColumn()
    idProduto: number;

    @Column({ length: 100 })
    nome: string;

    @Column("decimal", { precision: 5, scale: 2 })
     preco: number;

    @Column({ length: 255 })
    descricao: string;

    @Column('int')
    urlImagem: string;

    @Column('int')
    qtdEstoque: number;

    @Column({ length: 100 })
    categoria: string;
}