import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';

@Module({
  controllers: [UsuarioController],
  exports: [UsuarioService],
  providers: [UsuarioService]
})
export class UsuarioModule {}
