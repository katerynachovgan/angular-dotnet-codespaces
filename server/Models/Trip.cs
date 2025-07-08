using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace server.Models
{
    public class Trip
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;
        
        [Required]
        [StringLength(100)]
        [JsonPropertyName("locationName")]
        public string Destination { get; set; } = string.Empty;
        
        [Required]
        public DateTime Date { get; set; }
    }
}