import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {

  private jwtSecret: string | undefined;
  constructor(private readonly jwtService: JwtService, private configService: ConfigService) {
    this.jwtSecret = this.configService.get<string>('JWT_SECRET');
  }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extrairTokenHeader(request);

    if (!token){
      throw new UnauthorizedException();
    }

    try{
      const payLoad = await this.jwtService.verifyAsync(
        token,
        {
          secret: this.jwtSecret
        }
      )
    
      request['usuario'] = payLoad;
     }
     catch{    
       throw new UnauthorizedException();
     }

    return true;
  }

  private extrairTokenHeader(request: Request) : string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
