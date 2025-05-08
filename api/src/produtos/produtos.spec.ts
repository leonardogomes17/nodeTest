import { ProdutosSchema } from "./produtos.schema";


const request = require("supertest")
const app = require('../../test/server')
const produtosService = require('./produtos.service')

describe('Produto Teste', () =>{
    it('Criar Produto', async () => {
           
        let produtoSchema = new ProdutosSchema();
        produtoSchema.categoria = "TESTE AUTOMATIZADO";
        produtoSchema.descricao = "PRODUTO TESTE AUTOMATIZADO";
        produtoSchema.nome = "NOME PRODUTO TESTE";
        produtoSchema.preco = 1299.99;
        produtoSchema.qtdEstoque = 10;
        produtoSchema.urlImagem = "https:\\www.google.com\\1.jpg";
        
        const resProd = await request(app).post('/produtos').send({
            categoria: "TESTE AUTOMATIZADO",
            descricao: "PRODUTO TESTE AUTOMATIZADO",
            nome: "NOME PRODUTO TESTE",
            preco: 1299.99,
            qtdEstoque: 10,
            urlImagem: "https:\\www.google.com\\1.jpg"

        });
        console.log(resProd);
        expect(resProd.body).toHaveProperty('idproduto');
    });
})