using Scalar.AspNetCore;
using KiokuWaNokoru.WebAPI.Extensions;
using DotNetEnv.Configuration;
using DotNetEnv;
using System.Reflection;
using KiokuWaNokoru.BLL.MappingProfiles;
using Microsoft.IdentityModel.JsonWebTokens;

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
builder.Services.AddTelegram(builder.Configuration);
builder.Services.AddJwtAuthentication(builder.Configuration);

builder.Services.AddControllers();
builder.Services.AddAutoMapper(automapper =>
{
    automapper.AddMaps(Assembly.GetAssembly(typeof(ReminderProfile)));
});

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi(options =>
{
    options.AddDocumentTransformer<BearerSecuritySchemeTransformer>();
    options.AddOperationTransformer<OperationSecurityRequirementTransformer>();
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference(options =>
    {
        options.Authentication = new ScalarAuthenticationOptions
        {
            PreferredSecurityScheme = "Bearer"
        };
    });
}

app.UseHttpsRedirection();

JsonWebTokenHandler.DefaultInboundClaimTypeMap.Clear();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
