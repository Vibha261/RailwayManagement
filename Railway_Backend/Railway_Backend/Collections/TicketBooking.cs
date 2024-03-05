using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.IdGenerators;
using MongoDB.Bson.Serialization.Serializers;

namespace Railway_Backend.Collections
{
    public class TicketBooking
    {
        [BsonId(IdGenerator = typeof(StringObjectIdGenerator))]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("userName")]
        public string UserName { get; set; }

        [BsonElement("trainNumber")]
        public string TrainNumber { get; set; }

        [BsonElement("trainName")]
        public string TrainName { get; set; }

        [BsonElement("fromStation")]
        public string FromStation { get; set; }

        [BsonElement("fromStationArrivalTime")]
        public string FromStationArrivalTime { get; set; }

        [BsonElement("fromStationDepartureTime")]
        public string FromStationDepartureTime { get; set; }

        [BsonElement("toStation")]
        public string ToStation { get; set; }

        [BsonElement("toStationArrivalTime")]
        public string ToStationArrivalTime { get; set; }

        [BsonElement("toStationDepartureTime")]
        public string ToStationDepartureTime { get; set; }

        [BsonElement("date")]
        public string Date { get; set; }

        [BsonElement("className")]
        public string ClassName { get; set; }

        [BsonElement("passenger")]
        public List<PassengerList> Passengers { get; set; }

        [BsonElement("phoneNumber")]
        public string PhoneNumber { get; set; }

        [BsonElement("email")]
        public string Email { get; set; }

        [BsonElement("amount")]
        public decimal Amount { get; set; }

        [BsonElement("status")]
        public string Status { get; set; }

        [BsonElement("bookingDate")]
        [BsonRepresentation(BsonType.DateTime)]
        public DateTime BookingDate { get; set; }
    }
}
