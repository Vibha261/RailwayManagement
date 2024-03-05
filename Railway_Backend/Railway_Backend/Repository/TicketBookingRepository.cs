using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;
using Railway_Backend.Collections;
using System.Net.Sockets;

namespace Railway_Backend.Repository
{
    public class TicketBookingRepository:ITicketBookingRepository
    {
        private readonly IMongoCollection<TicketBooking> _mongoBookingCollection;
        private readonly IMongoCollection<SeatsData> _mongoSeatsCollection;
        private readonly IMongoCollection<AvailableSeats> _mongoAvailableCollection;
        public TicketBookingRepository(IMongoDatabase mongoDatabase) 
        {
            _mongoBookingCollection = mongoDatabase.GetCollection<TicketBooking>("PassengerBooking");
            _mongoSeatsCollection = mongoDatabase.GetCollection<SeatsData>("SeatAvailability");
            _mongoAvailableCollection = mongoDatabase.GetCollection<AvailableSeats>("SeatAvailability");


        }

        public async Task<List<TicketBooking>> GetAllAsync()
        {
            return await _mongoBookingCollection.Find(_ => true).ToListAsync();
        }

        //public async Task CreateAsync(TicketBooking newTicketBooking)
        //{
        //    await _mongoBookingCollection.InsertOneAsync(newTicketBooking);
        //}

        public async Task<List<TicketBooking>> GetByIdAsync(string userName)
        {
            return await _mongoBookingCollection.Find(booking => booking.UserName == userName).ToListAsync();
        }

        public async Task PostBooking(TicketBooking booking)
        {
            booking.BookingDate = DateTime.UtcNow;

            
            booking.Status = "Booked";

            int seatNo = new Random().Next(1, 90); ; 
            foreach (var passenger in booking.Passengers)
            {
                passenger.SeatNo = seatNo++;
            }

            await _mongoBookingCollection.InsertOneAsync(booking);
        }

        public async Task UpdateBookingStatusToCancelled(string bookingId)
        {
            var filter = Builders<TicketBooking>.Filter.Eq(b => b.Id, bookingId);
            var update = Builders<TicketBooking>.Update.Set(b => b.Status, "Cancelled");
            await _mongoBookingCollection.UpdateOneAsync(filter, update);
        }

        public async Task UpdateSeatAvailability(string trainNumber, string className, string date, int passengerCount)
        {
            var filter = Builders<AvailableSeats>.Filter.And(
                Builders<AvailableSeats>.Filter.Eq(a => a.TrainNumber, trainNumber),
                Builders<AvailableSeats>.Filter.ElemMatch(a => a.Classes, c => c.ClassName == className)
            );

            var update = Builders<AvailableSeats>.Update.Set(a => a.Classes[-1].BookedSeat[date], passengerCount);

            var updateResult = await _mongoAvailableCollection.UpdateOneAsync(filter, update);

            if (updateResult.ModifiedCount == 0)
            {
                var update2 = Builders<AvailableSeats>.Update.Push(a => a.Classes[-1].BookedSeat, new KeyValuePair<string, int>(date, passengerCount));

                await _mongoAvailableCollection.UpdateOneAsync(filter, update2);
            }
        }



    }
}
   
