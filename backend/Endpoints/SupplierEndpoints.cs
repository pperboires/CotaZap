using CotaZap.Api.Data;
using CotaZap.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace CotaZap.Api.Endpoints;

public static class SupplierEndpoints
{
    public static void MapSupplierEndpoints(this IEndpointRouteBuilder routes)
    {
        var group = routes.MapGroup("/api/suppliers").WithTags("Suppliers");

        group.MapGet("/", async (ApplicationDbContext db) =>
        {
            return await db.Suppliers.ToListAsync();
        });

        group.MapGet("/{id}", async (int id, ApplicationDbContext db) =>
        {
            return await db.Suppliers.FindAsync(id)
                is Supplier supplier
                    ? Results.Ok(supplier)
                    : Results.NotFound();
        });

        group.MapPost("/", async (Supplier supplier, ApplicationDbContext db) =>
        {
            db.Suppliers.Add(supplier);
            await db.SaveChangesAsync();
            return Results.Created($"/api/suppliers/{supplier.Id}", supplier);
        });

        group.MapPut("/{id}", async (int id, Supplier inputSupplier, ApplicationDbContext db) =>
        {
            var supplier = await db.Suppliers.FindAsync(id);

            if (supplier is null) return Results.NotFound();

            supplier.Name = inputSupplier.Name;
            supplier.Comment = inputSupplier.Comment;
            supplier.ContactName = inputSupplier.ContactName;
            supplier.Whatsapp = inputSupplier.Whatsapp;

            await db.SaveChangesAsync();

            return Results.NoContent();
        });

        group.MapDelete("/{id}", async (int id, ApplicationDbContext db) =>
        {
            if (await db.Suppliers.FindAsync(id) is Supplier supplier)
            {
                db.Suppliers.Remove(supplier);
                await db.SaveChangesAsync();
                return Results.NoContent();
            }

            return Results.NotFound();
        });
    }
}
