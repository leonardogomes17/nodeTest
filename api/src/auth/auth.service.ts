import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from 'src/usuario/usuario.service';
import { AuthDto } from './auth.dto';
import {compareSync as bcryptCompareSync} from 'bcrypt'
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {

    private jwtExpiracaoTemEmSegundos: number | undefined;

    constructor(private usuarioService: UsuarioService,
    private jwtService: JwtService,
    private configService: ConfigService
    ) {
        this.jwtExpiracaoTemEmSegundos = this.configService.get<number>('JWT_EXPIRATION_TIME')
    }

    Login(usuario: string, senha: string) : AuthDto{
        const usuarioEncontrado = this.usuarioService.getUsuario(usuario);

        if (!usuarioEncontrado || !bcryptCompareSync(senha, usuarioEncontrado.senha)){
            throw new UnauthorizedException();
        }

        const payLoad = { sub: usuarioEncontrado, usuario: usuarioEncontrado.usuario};
        const token = this.jwtService.sign(payLoad);
        console.log(this.jwtExpiracaoTemEmSegundos);
        return { token, expirarEm: this.jwtExpiracaoTemEmSegundos}
    }
}
