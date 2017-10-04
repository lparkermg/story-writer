using Microsoft.EntityFrameworkCore;

namespace ApiHost.Models
{
    public class StoryContext : DbContext
    {
        public StoryContext(DbContextOptions<StoryContext> options) : base(options)
        {
            
        }

        public DbSet<StoryItem> StoryItems { get; set; }
    }
}