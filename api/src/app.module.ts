import { Module } from '@nestjs/common';
import { ProdutosModule } from './produtos/produtos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PedidosModule } from './pedidos/pedidos.module';
import { PedidosItemModule } from './pedidosItem/pedidosItem.module';
import { StatusModule } from './status/status.module';
import { UsuarioModule } from './usuario/usuario.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config' 

@Module({
  imports: [ 
    ConfigModule.forRoot({ isGlobal: true }),
    ProdutosModule, PedidosModule, StatusModule, PedidosItemModule, TypeOrmModule.forRoot({ 
    database: './db.sql',
    type: 'sqlite',
    synchronize: true,
    entities : ['dist/**/*.model.js']
  }), UsuarioModule, AuthModule],
})
export class AppModule {}
