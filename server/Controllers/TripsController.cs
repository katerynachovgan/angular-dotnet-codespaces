using Microsoft.AspNetCore.Mvc;
using server.Models;
using System.ComponentModel.DataAnnotations;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TripsController : ControllerBase
    {
        // In-memory storage for demo purposes
        private static readonly List<Trip> _trips = new List<Trip>
        {
            new Trip { Id = 1, Name = "Paris Adventure", Destination = "Paris, France", Date = new DateTime(2024, 7, 1) },
            new Trip { Id = 2, Name = "Tokyo Journey", Destination = "Tokyo, Japan", Date = new DateTime(2024, 8, 15) },
            new Trip { Id = 3, Name = "Sydney Escape", Destination = "Sydney, Australia", Date = new DateTime(2024, 9, 10) }
        };
        
        private static int _nextId = 4;

        /// <summary>
        /// GET /api/trips - Returns all trips
        /// </summary>
        [HttpGet]
        public ActionResult<IEnumerable<Trip>> GetTrips()
        {
            return Ok(_trips);
        }

        /// <summary>
        /// GET /api/trips/{id} - Returns a single trip by ID
        /// </summary>
        [HttpGet("{id}")]
        public ActionResult<Trip> GetTrip(int id)
        {
            var trip = _trips.FirstOrDefault(t => t.Id == id);
            
            if (trip == null)
            {
                return NotFound($"Trip with ID {id} not found");
            }
            
            return Ok(trip);
        }

        /// <summary>
        /// POST /api/trips - Adds a new trip
        /// </summary>
        [HttpPost]
        public ActionResult<Trip> CreateTrip([FromBody] Trip trip)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            trip.Id = _nextId++;
            _trips.Add(trip);
            
            return CreatedAtAction(nameof(GetTrip), new { id = trip.Id }, trip);
        }

        /// <summary>
        /// PUT /api/trips/{id} - Updates an existing trip
        /// </summary>
        [HttpPut("{id}")]
        public IActionResult UpdateTrip(int id, [FromBody] Trip trip)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var existingTrip = _trips.FirstOrDefault(t => t.Id == id);
            
            if (existingTrip == null)
            {
                return NotFound($"Trip with ID {id} not found");
            }

            existingTrip.Name = trip.Name;
            existingTrip.Destination = trip.Destination;
            existingTrip.Date = trip.Date;
            
            return Ok(existingTrip);
        }
    }
}