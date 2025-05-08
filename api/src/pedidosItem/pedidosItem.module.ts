import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PedidoItemModel } from "./pedidosItem.model";


@Module({
imports: [PedidosItemModule, TypeOrmModule.forFeature([PedidoItemModel])],
})
export class PedidosItemModule {}