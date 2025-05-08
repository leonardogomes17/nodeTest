import { Body, Controller, Post } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioSchema } from './usuario.schema';

@Controller('usuario')
export class UsuarioController {
    constructor(private usuarioService: UsuarioService){ }

        @Post()
        criar(@Body() usuario: UsuarioSchema){
            this.usuarioService.criar(usuario);
        
        
    }
}
