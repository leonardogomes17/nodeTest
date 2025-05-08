import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PedidosService } from "./pedidos.service";
import { PedidosModel } from "./pedidos.model";
import { PedidosController } from "./pedidos.controller";
import { ProdutosModel } from "src/produtos/produtos.model";
import { PedidoItemModel } from "src/pedidosItem/pedidosItem.model";


@Module({
imports: [PedidosModule, TypeOrmModule.forFeature([PedidosModel]),  TypeOrmModule.forFeature([ProdutosModel]), TypeOrmModule.forFeature([PedidoItemModel])],
providers: [PedidosService],
controllers: [PedidosController],

})
export class PedidosModule {}