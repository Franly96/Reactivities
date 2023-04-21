using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Details
    {
        public class Query : IRequest<Activity>
        {
            public Guid id { get; set; }
        }
        public class Handler : IRequestHandler<Query, Activity>
        {
            private readonly DataContext context;
            public Handler(DataContext context)
            {
                this.context = context;

            }
            public async Task<Activity> Handle(Query request, CancellationToken cancellationToken)
            {
                return await this.context.Activities.FindAsync(request.id);
            }
        }
    }
}