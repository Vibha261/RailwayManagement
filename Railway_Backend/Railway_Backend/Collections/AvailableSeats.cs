using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace Railway_Backend.Collections
{
    public class AvailableSeats
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id {  get; set; }
        [BsonElement("trainNumber")]
        public string TrainNumber { get; set; }
        [BsonElement("classes")]
        public List<TypeOfClass> Classes { get; set;}
    }
}
