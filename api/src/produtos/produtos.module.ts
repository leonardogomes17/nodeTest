import { Module } from "@nestjs/common";
import { ProdutosController } from "./produtos.controller";
import { ProdutosService } from "./produtos.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProdutosModel } from "./produtos.model";


@Module({
imports: [ProdutosModule, TypeOrmModule.forFeature([ProdutosModel])],
providers: [ProdutosService],
controllers: [ProdutosController],

})
export class ProdutosModule {}