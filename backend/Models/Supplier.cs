using System.ComponentModel.DataAnnotations;

namespace CotaZap.Api.Models;

public class Supplier
{
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    public string Name { get; set; } = string.Empty;

    [MaxLength(500)]
    public string? Comment { get; set; }

    [MaxLength(100)]
    public string? ContactName { get; set; }

    [Required]
    [MaxLength(20)]
    public string Whatsapp { get; set; } = string.Empty;
}
