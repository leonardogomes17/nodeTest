import { Injectable } from '@nestjs/common';
import { UsuarioSchema } from './usuario.schema';
import {v4 as uuid} from 'uuid'
import {hashSync as bcryptHashSync} from 'bcrypt'

@Injectable()
export class UsuarioService {

    private readonly usuarios: UsuarioSchema[] = []

    criar(novoUsuario: UsuarioSchema){
        novoUsuario.id = uuid();
        novoUsuario.senha = bcryptHashSync(novoUsuario.senha, 10);
        this.usuarios.push(novoUsuario);
    }

    getUsuario(usuarioNome: string) : UsuarioSchema | undefined | null {
        return this.usuarios.find(usuario => usuario.usuario === usuarioNome);
    }
}
