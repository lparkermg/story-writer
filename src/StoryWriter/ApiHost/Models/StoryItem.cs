using System;

namespace ApiHost.Models
{
    public class StoryItem
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
    }
}