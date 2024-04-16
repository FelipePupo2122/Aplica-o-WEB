using API.Models;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);
//registrar o serviço do banco
builder.Services.AddDbContext<AppDataContext>();
var app = builder.Build();

List<Produto> produtos = new List<Produto>();


// Endpoints = Funcionalidades - JSON
// Cadastrar um produto na lista
// a) Através das informações na URL
// b) Através das informações no corpo da requisição
// Realizar as operações alteração e remoção da lista

// POST: http://localhost:5292/api/produto/cadastrar/nome/descricao/preco
app.MapPost("/api/produto/cadastrar/", ([FromBody] Produto produto,
    [FromServices] AppDataContext context) =>
{
    //add produto na tabela
    context.Produtos.Add(produto);
    context.SaveChanges();
    return Results.Created("Foi completado o cadastro do", produto);

});

// GET: http://localhost:5292/api/produto/listar
app.MapGet("/api/produto/listar", ([FromServices] AppDataContext context) =>
{
    if (context.Produtos.Any())
    {
        return Results.Ok(context.Produtos.ToList());
    }
    return Results.NotFound("não existem produtos na tabela");
});

// GET: http://localhost:5292/api/produto/buscar/{id}
app.MapGet("/api/produto/buscar/{id}", ([FromRoute] string id,
 [FromServices] AppDataContext context) =>
{
    //Endpoint com várias linhas de código

    Produto? produto = context.Produtos.FirstOrDefault(x => x.Id == id);

    if (produto is null)
    {
        return Results.NotFound("Produto não encontrado");
    }
    return Results.Ok(produto);
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





