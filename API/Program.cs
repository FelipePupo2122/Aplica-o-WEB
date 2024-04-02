using API.Models;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

List<Produto> produtos = new List<Produto>();


// Endpoints = Funcionalidades - JSON
// Cadastrar um produto na lista
// a) Através das informações na URL
// b) Através das informações no corpo da requisição
// Realizar as operações alteração e remoção da lista

// POST: http://localhost:5292/api/produto/cadastrar/nome/descricao/preco
app.MapPost("/api/produto/cadastrar/", ([FromBody] Produto produto) =>
{
    produtos.Add(produto);

    return Results.Created("Foi completado o cadastro do", produto);

});

// GET: http://localhost:5292/api/produto/listar
app.MapGet("/api/produto/listar", () => produtos);

// GET: http://localhost:5292/api/produto/buscar/{nomedoproduto}
app.MapGet("/api/produto/buscar/{nome}", ([FromRoute] string nome) =>
{
    //Endpoint com várias linhas de código
    for (int i = 0; i < produtos.Count; i++)
    {
        if (produtos[i].Nome == nome)
        {
            return Results.Ok(produtos[i]);
        }
    }
    return Results.NotFound("Produto não encontrado");
});


app.MapDelete("/api/produto/remover", ([FromBody] Produto produtoParaRemover) =>
{
    var produtoExistente = produtos.FirstOrDefault(p =>
        p.Nome == produtoParaRemover.Nome &&
        p.Descricao == produtoParaRemover.Descricao &&
        p.Preco == produtoParaRemover.Preco);

    if (produtoExistente != null)
    {
        produtos.Remove(produtoExistente);
        return Results.NoContent();
    }

    return Results.NotFound("Produto não encontrado!");
});

app.MapPatch("/api/produto/alterar/{id}", ([FromRoute] string id, [FromBody] Produto produtoAtualizado) =>
{
    var produtoExistente = produtos.FirstOrDefault(p => p.Id == id);
    if (produtoExistente != null)
    {
        // Atualiza as informações do produto
        produtoExistente.Nome = produtoAtualizado.Nome;
        produtoExistente.Descricao = produtoAtualizado.Descricao;
        produtoExistente.Preco = produtoAtualizado.Preco;

    }
});



app.Run();