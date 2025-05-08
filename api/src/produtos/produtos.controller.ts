import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards, ValidationPipe } from "@nestjs/common";
import { ProdutosService } from "./produtos.service";
import { ProdutosModel } from "./produtos.model";
import { ProdutosSchema } from "./produtos.schema";
import { AuthGuard } from "src/auth/auth.guard";

@UseGuards(AuthGuard)
@Controller('produtos')
export class ProdutosController {
    constructor(private produtosService: ProdutosService) {}

    @Get()
    public async getProdutos(): Promise <{ data: ProdutosModel[] }>{
        return this.produtosService.getProdutos();
    }

    @Get(':id')
    public async getProduto(@Param('id', ParseIntPipe) idProduto: number, ): Promise <{ data: ProdutosModel }>{
        return this.produtosService.getProduto(idProduto);
    }

    @Put(':id')
    public async putProdutos(@Param('id', ParseIntPipe) idProduto: number, @Body() body: ProdutosSchema){
        return this.produtosService.putProdutos(idProduto, body);
    }

    @Post()
    public async postProdutos(@Body(ValidationPipe) body: ProdutosSchema) 
    : Promise <{ data: ProdutosModel }>{
        return this.produtosService.postProdutos(body);
    }

    @Delete(':id')
    public async deleteProdutos(@Param('id', ParseIntPipe) idProduto: number){
        return this.produtosService.deleteProdutos(idProduto);
    }
}