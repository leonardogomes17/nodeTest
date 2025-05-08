import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    Login(
        @Body('usuario') usuario: string,
        @Body('senha') senha: string
    ) : AuthDto {
        return this.authService.Login(usuario, senha);
    }

}
