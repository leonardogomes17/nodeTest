import { Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Post, UseGuards } from "@nestjs/common";
import { PedidosService } from "./pedidos.service";
import { PedidosModel } from "./pedidos.model";
import { PedidoDto } from "./pedido.dto";
import { AuthGuard } from "src/auth/auth.guard";

@UseGuards(AuthGuard)
@Controller('pedidos')
export class PedidosController {
    constructor(private pedidosService: PedidosService
    ) {}

    @Get()
    public async getPedidos(): Promise <{ data: PedidosModel[] }>{
        return this.pedidosService.getPedidos();
    }

    @Get(':id')
    public async getPedido(@Param('id', ParseIntPipe) idPedido: number, ): Promise <{ data: PedidosModel }>{
        return this.pedidosService.getPedido(idPedido);
    }

    @Post()
    public async postPedidos(@Body() pedido: PedidoDto) 
    : Promise <{ data: PedidoDto }>{

        return this.pedidosService.postPedidos(pedido);
    }
}