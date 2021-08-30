
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ServerAPI.Exceptions;

namespace ServerAPI.Middleware
{
    public class ErrorHandlingMiddleware : IMiddleware
    {
        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            try
            {
                await next.Invoke(context);
            }
            catch (UserNotFoundException e)
            {
                context.Response.StatusCode = 404;
                await context.Response.WriteAsync(e.ToString());
            }
            catch (UserExistException e)
            {
                context.Response.StatusCode = 400;
                await context.Response.WriteAsync(e.ToString());
            }
        }
    }
}
