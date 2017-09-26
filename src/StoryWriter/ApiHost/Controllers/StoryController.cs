using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices.WindowsRuntime;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using ApiHost.Models;
using Microsoft.AspNetCore.Mvc;
using FileIO;
namespace ApiHost.Controllers
{
    [Route("api/[controller]")]
    public class StoryController : Controller
    {
        private readonly List<StoryItem> _storyItems;

        public StoryController()
        {
            //TODO: Load story items here. <- YOU KNOW, FILEIO?
            FileInputOutput.Initialise($"{AppDomain.CurrentDomain.BaseDirectory}/storyMaster.json");
        }

        [HttpGet]
        public IEnumerable<StoryItem> GetAll()
        {
            return _storyItems;
        }

        [HttpGet("{id}", Name = "GetStory")]
        public IActionResult GetById(Guid id)
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

            item.Id = Guid.NewGuid();
            _storyItems.Add(item);
            //TODO: Add File IO where it updates a master list.
            FileInputOutput.Update(_storyItems);

            return CreatedAtRoute("GetStory", new {id = item.Id}, item);
        }

        [HttpPut("{id}")]
        public IActionResult Update(Guid id, [FromBody] StoryItem item)
        {
            if (IsStoryItemValid(item) || item.Id != id)
                return BadRequest();

            StoryItem story = _storyItems.FirstOrDefault(s => s.Id == id);
            if (story == null)
                return NotFound();
            var itemIndex = _storyItems.FindIndex(s => s.Id == story.Id);
            _storyItems[itemIndex] = item;
            FileInputOutput.Update(_storyItems);
            
            return new NoContentResult();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            var story = _storyItems.FirstOrDefault(s => s.Id == id);
            if (story == null)
                return NotFound();

            _storyItems.Remove(story);
            FileInputOutput.Update(_storyItems);
            return new NoContentResult();
        }

        private bool IsStoryItemValid(StoryItem item)
        {
            if (item.Id == Guid.Empty)
                return false;
            
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