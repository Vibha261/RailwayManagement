using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Railway_Backend.Collections
{
    public class TypeOfClass
    {
        [BsonElement("className")]
        public string ClassName {  get; set; }
        [BsonElement("availableSeats")]
        public int AvailableSeats { get; set; }
        [BsonElement("fare")]
        public int Fare {  get; set; }

        [BsonElement("bookedSeats")]
        [BsonRepresentation(BsonType.Document)]
        public Dictionary<string, int> BookedSeat {  get; set; }
    }
}
