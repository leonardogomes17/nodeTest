import { Injectable } from "@nestjs/common";
import { Body, NotFoundException, Param, ParseIntPipe, ValidationPipe } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProdutosModel } from "./produtos.model";
import { Repository } from "typeorm";
import { ProdutosSchema } from "./produtos.schema";

@Injectable()
export class ProdutosService {

    constructor(@InjectRepository(ProdutosModel) private model: Repository<ProdutosModel>) {}

    public async getProdutos(): Promise <{ data: ProdutosModel[] }>{
            const list = await this.model.find();
            return { data: list };
        }
    
        public async getProduto(@Param('id', ParseIntPipe) idProduto: number, ): Promise <{ data: ProdutosModel }>{
            const produto = await this.model.findOne({ where: { idProduto } });
    
            if (!produto)
                throw new NotFoundException(`Não foi encontrado o produto com o id ${idProduto}` );
    
            return { data: produto };
        }
    
        public async putProdutos(@Param('id', ParseIntPipe) idProduto: number, @Body() body: ProdutosSchema){
            const produto = await this.model.findOne({ where: { idProduto } });
    
            if (!produto)
                throw new NotFoundException(`Não foi encontrado o produto com o id ${idProduto}` );
    
            await this.model.update({ idProduto }, body);
            return body;
        }
    
        public async postProdutos(@Body(ValidationPipe) body: ProdutosSchema) 
        : Promise <{ data: ProdutosModel }>{
            const produtoCreate = await this.model.save(body);
            return {data: produtoCreate};
        }
    
        public async deleteProdutos(@Param('id', ParseIntPipe) idProduto: number){
            const produto = await this.model.findOne({ where: { idProduto } });
    
            if (!produto)
                throw new NotFoundException(`Não foi encontrado o produto com o id ${idProduto}` );
    
            await this.model.delete({ idProduto });
            return {data: `O produto com id ${idProduto} foi deletado`};
        }
}