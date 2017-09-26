using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices.WindowsRuntime;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using ApiHost.Models;
using Microsoft.AspNetCore.Mvc;
namespace ApiHost.Controllers
{
    [Route("api/[controller]")]
    public class StoryController : Controller
    {
        private readonly StoryContext _context;

        public StoryController(StoryContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<StoryItem> GetAll()
        {
            return _context.StoryItems.ToList();
        }

        [HttpGet("{id}", Name = "GetStory")]
        public IActionResult GetById(int id)
        {
            var item = _context.StoryItems.FirstOrDefault(s => s.Id == id);
            if (item == null)
                return NotFound();
            return new ObjectResult(item);
        }

        [HttpPost]
        public IActionResult Create([FromBody] StoryItem item)
        {
            if (IsStoryItemValid(item))
                return BadRequest();
            
            _context.StoryItems.Add(item);
            _context.SaveChanges();

            return CreatedAtRoute("GetStory", new {id = item.Id}, item);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] StoryItem item)
        {
            if (IsStoryItemValid(item) || item.Id != id)
                return BadRequest();

            var story = _context.StoryItems.FirstOrDefault(s => s.Id == id);
            if (story == null)
                return NotFound();

            story.Title = item.Title;
            story.Content = item.Content;

            _context.StoryItems.Update(story);
            _context.SaveChanges();
            
            return new NoContentResult();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var story = _context.StoryItems.FirstOrDefault(s => s.Id == id);
            if (story == null)
                return NotFound();

            _context.StoryItems.Remove(story);
            _context.SaveChanges();
            return new NoContentResult();
        }

        private bool IsStoryItemValid(StoryItem item)
        {
            if (String.IsNullOrWhiteSpace(item?.Title))
                return false;

            if (String.IsNullOrWhiteSpace(item.Content))
                return false;

            //TODO: Make wordcount configurable.
            if (Regex.Matches(item.Content, @"[\S]+").Count < 300)
                return false;
            
            if (Regex.Matches(item.Content, @"[\S]+").Count > 500)
                return false;
            return true;
        }
    }
}