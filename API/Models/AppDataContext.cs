using Microsoft.EntityFrameworkCore;

namespace API.Models;

public class AppDataContext : DbContext
{
        //quais classes irão representar as tabelas no banco
    public DbSet<Produto> Produtos { get; set; }
    
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
       optionsBuilder.UseSqlite("Data Source=app.db");
    }

}
