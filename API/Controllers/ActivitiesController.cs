using Application.Activities;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            return await this.Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> GetActivity(Guid id)
        {
            return await this.Mediator.Send(new Details.Query{id = id});
        }

        [HttpPost]
        public async Task<IActionResult> CreateActivity(Activity activity){
            await this.Mediator.Send(new Create.Command { Activity = activity });
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Activity>> UpdateActivity(Guid id, Activity activity){
            activity.Id = id;
            await this.Mediator.Send(new Edit.Command { Activity = activity });
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id){
            await this.Mediator.Send(new Delete.Command { Id = id });
            return Ok();
        }
    }
}