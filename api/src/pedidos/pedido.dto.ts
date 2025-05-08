export class PedidoDto {

    idPedido: number;

    valorTotal: number;

    idStatus: number;
    
    pedidosItems: PedidoItemDto[]
}

 export class PedidoItemDto {
          idPedido: number;
          idProduto: number;
          qtdItem: number;
 }