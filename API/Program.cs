var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

List<Produto> produtos = new List<Produto>()
{
    new Produto("Celular", "Android"),
    new Produto("Celular", "IOS"),
    new Produto("Celular", "LG")
};

app.MapGet("/", () => "Hello World!");

app.MapGet("/API/produto", () => produtos);

app.Run();

public record Produto(string Nome, string Descricao);