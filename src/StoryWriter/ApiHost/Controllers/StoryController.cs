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
        private readonly List<StoryItem> _storyItems;

        public StoryController()
        {
            //TODO: Load story items here. <- YOU KNOW, FILEIO?
        }

        [HttpGet]
        public IEnumerable<StoryItem> GetAll()
        {
            return _storyItems;
        }

        [HttpGet("{id}", Name = "GetStory")]
        public IActionResult GetById(int id)
        {
            var item = _storyItems.FirstOrDefault(s => s.Id == id);
            if (item == null)
                return NotFound();
            return new ObjectResult(item);
        }

        [HttpPost]
        public IActionResult Create([FromBody] StoryItem item)
        {
            if (IsStoryItemValid(item))
                return BadRequest();
            
            _storyItems.Add(item);
            //TODO: Add File IO where it updates a master list.
            //_context.SaveChanges();

            return CreatedAtRoute("GetStory", new {id = item.Id}, item);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] StoryItem item)
        {
            if (IsStoryItemValid(item) || item.Id != id)
                return BadRequest();

            var story = _storyItems.FirstOrDefault(s => s.Id == id);
            if (story == null)
                return NotFound();

            story.Title = item.Title;
            story.Content = item.Content;
            //TODO: Fix this and have the master json? file updating
            //_storyItems.Update(story);
            //_context.SaveChanges();
            
            return new NoContentResult();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var story = _storyItems.FirstOrDefault(s => s.Id == id);
            if (story == null)
                return NotFound();

            _storyItems.Remove(story);
            //TODO: File IO things famalam!
            //_context.SaveChanges();
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