using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class List
    {
        public class Query : IRequest<Result<List<Activity>>> { };

        public class Handler : IRequestHandler<Query, Result<List<Activity>>>
        {
            private readonly DataContext context;
            public Handler(DataContext context)
            {
                this.context = context;

            }
            public async Task<Result<List<Activity>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var activities = await this.context.Activities.ToListAsync();
                if(activities.Count() == 0) return Result<List<Activity>>.Failure("Not Activity found");
                return Result<List<Activity>>.Success(activities);
            }
        }
    }
}