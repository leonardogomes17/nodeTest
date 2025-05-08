import { IsInt,  IsString, IsUrl, MaxLength, Min } from 'class-validator'

export class ProdutosSchema {
   
        @IsString()
        @MaxLength(100)
        nome: string;
    
        preco: number;

        @IsString()
        @MaxLength(100)
        categoria: string;
    
        @IsString()
        @MaxLength(255)
        descricao: string;
    
        @IsString()
        @IsUrl()
        urlImagem: string;
    
        @IsInt()
        @Min(1)
        qtdEstoque: number;
}