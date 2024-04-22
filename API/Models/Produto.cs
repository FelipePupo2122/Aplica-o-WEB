using System.ComponentModel.DataAnnotations;

namespace API.Models;
public class Produto
{

    public Produto(string nome, string descricao, double preco)
    {
        Id = Guid.NewGuid().ToString();
        Nome = nome;
        Descricao = descricao;
        Preco = preco;
        CriadoEm = DateTime.Now;
    }
    public string Id { get; set; }
    //Atributo ou propriedade - nome e descricao

    [Required(ErrorMessage = "Campo Obrigatorio!!")]
    public string? Nome { get; set; }

    [MinLength(3, ErrorMessage = "Minimo de 3 caracteres")]
    [MaxLength(40, ErrorMessage = "Maximo de 40 caracteres")]
    public string? Descricao { get; set; }

    [Range(1, 1000, ErrorMessage = "Passou de mil pila ou ta menos que 1 pila(R$1,00-R$1.000,00!)")]
    public double Preco { get; set; }
    public int Quantidade { get; set; }
    public DateTime CriadoEm { get; set; }

}