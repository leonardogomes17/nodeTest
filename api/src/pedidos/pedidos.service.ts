import { Body, Injectable, NotFoundException, Param, ParseIntPipe, Post } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PedidosModel } from "./pedidos.model";
import { ProdutosModel } from "src/produtos/produtos.model";
import { PedidoDto, PedidoItemDto } from "./pedido.dto";
import { PedidoItemModel } from "src/pedidosItem/pedidosItem.model";



@Injectable()
export class PedidosService {

constructor(
    @InjectRepository(PedidosModel) private model: Repository<PedidosModel>,
    @InjectRepository(ProdutosModel) private modelProdutos: Repository<ProdutosModel>,
    @InjectRepository(PedidoItemModel) private modelItem: Repository<PedidoItemModel>,
    ) {

    }

    public async getPedidos(): Promise <{ data: PedidosModel[] }>{
            let list = await this.model.find({ relations: { pedidoItemModel: true } });
            const listItems = await this.modelItem.find();

            list.forEach(element => {
                element.pedidoItemModel = listItems.filter(x => x.idPedido == element.idPedido);
            });

            return { data: list };
        }

        public async getPedido(@Param('id', ParseIntPipe) idPedido: number, ): Promise <{ data: PedidosModel }>{
            let pedido = await this.model.findOne({ where: { idPedido } });

            if (!pedido)
                throw new NotFoundException(`Não foi encontrado o pedido com o id ${idPedido}` );

            const listItems = await this.modelItem.find();
            pedido.pedidoItemModel = listItems.filter(x => x.idPedido == pedido.idPedido);

            return { data: pedido };
        }

        @Post()
        public async postPedidos(@Body() pedido: PedidoDto)
        : Promise <{ data: PedidoDto }>{

            const produtos = await this.modelProdutos.find();
            console.log(pedido.pedidosItems);
            pedido.pedidosItems.forEach(element => {
                let produtoEncontrado = produtos.filter(x => x.idProduto == element.idProduto)[0];
                if (produtoEncontrado != null && element.qtdItem > produtoEncontrado.qtdEstoque)
                    throw new NotFoundException(`Estoque indisponivel, quantidade disponivel é de : ${produtoEncontrado.qtdEstoque} para o produto com id: ${produtoEncontrado.idProduto}` );

                if (produtoEncontrado != null ){
                    produtoEncontrado.qtdEstoque = produtoEncontrado.qtdEstoque - element.qtdItem;

                }

                this.atualizarQtd(produtoEncontrado.idProduto, element.qtdItem);
            });

            const pedidoCreate = await this.model.save(pedido);
            pedidoCreate.pedidoItemModel = [];

            console.log(pedido.pedidosItems);
            pedido.pedidosItems.forEach(element => {
                element.idPedido = pedidoCreate.idPedido;
                
                this.salvarPedidoItems(element);
            });

            return {data: pedidoCreate};
        }

        async salvarPedidoItems(pediditoItem: PedidoItemDto){
            return await this.modelItem.save(pediditoItem);
        }

        async atualizarQtd(idProd: number, qtdRetirar: number){
            const idProduto = idProd;
            const produto = await this.modelProdutos.findOne({ where: { idProduto } });

            if (produto != null)
                produto.qtdEstoque = produto.qtdEstoque - qtdRetirar;

            if (produto != null)
                await this.modelProdutos.update({ idProduto } , produto);
        }
}