import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsuarioModule } from 'src/usuario/usuario.module';

@Module({
  imports: [JwtModule.registerAsync({ 
      global: true,
      imports: [],
      useFactory: async (configService : ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<number>('JWT_EXPIRATION_TIME')}
      }),
      inject: [ConfigService],
   }), UsuarioModule],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
