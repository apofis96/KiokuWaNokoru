using Scalar.AspNetCore;
using KiokuWaNokoru.WebAPI.Extensions;
using DotNetEnv.Configuration;
using DotNetEnv;

var builder = WebApplication.CreateBuilder(args);

builder.Configuration
    .SetBasePath(builder.Environment.ContentRootPath)
    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
    .AddDotNetEnv(".env", LoadOptions.TraversePath())
    .AddEnvironmentVariables()
    .Build();

// Add services to the container.
builder.Services.AddCustomDbContext(builder.Configuration);
builder.Services.AddCustomServices();

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
