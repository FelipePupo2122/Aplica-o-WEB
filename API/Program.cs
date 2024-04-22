using System.ComponentModel.DataAnnotations;
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

// POST: http://localhost:5292/api/produto/cadastrar/nome/descricao/preco/quantidade
app.MapPost("/api/produto/cadastrar/", ([FromBody] Produto produto,
    [FromServices] AppDataContext context) =>
{
    List<ValidationResult> erros = new List<ValidationResult>();
    if (!Validator.TryValidateObject(produto, new ValidationContext(produto), erros, true))
    {
        return Results.BadRequest(erros);
    }
    //add produto na tabela
    Produto? produtoProcura = context.Produtos.FirstOrDefault(x => x.Nome == produto.Nome);
    if (produtoProcura is null)
    {

        context.Produtos.Add(produto);
        context.SaveChanges();
        return Results.Created("Foi completado o cadastro do", produto);
    }
    return Results.BadRequest("Já existe um produto com esse nome, por favor alterar!");

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

//DELETE: http://localhost:5292/api/produto/deletar/{idproduto}
app.MapDelete("/api/produto/deletar/{id}", ([FromRoute] string id,
[FromServices] AppDataContext context) =>
{
    Produto? produto = context.Produtos.Find(id);

    if (produto is null)
    {
        return Results.NotFound("Produto não encontrado");
    }
    context.Produtos.Remove(produto);
    context.SaveChanges();
    return Results.Ok(produtos);
});

//ALTERAR: 
app.MapPatch("/api/produto/alterar/{id}", ([FromRoute] string id, [FromBody] Produto produtoAtualizado,
[FromServices] AppDataContext context) =>
{

    Produto? produto = context.Produtos.Find(id);

    if (produto is null)
    {
        return Results.NotFound("Produto não encontrado");
    }
    produto.Nome = produtoAtualizado.Nome;
    produto.Descricao = produtoAtualizado.Descricao;
    produto.Preco = produtoAtualizado.Preco;
    context.Produtos.Update(produto);
    context.SaveChanges();
    return Results.Ok("Produto Alterado com Sucesso");
});



app.Run();





