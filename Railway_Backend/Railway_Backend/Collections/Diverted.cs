using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace Railway_Backend.Collections
{
    public class Diverted
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        [BsonElement("trainName")]
        public string TrainName { get; set; }

        [BsonElement("trainNumber")]
        public string TrainNumber { get; set; }

        [BsonElement("from")]
        public string From { get; set; }

        [BsonElement("to")]
        public string To { get; set; }

        [BsonElement("date")]
        public string Date { get; set; }

        [BsonElement("divertedFrom")]
        public string DIvertedFrom { get; set; }

        [BsonElement("divertedTo")]
        public string DivertedTo { get; set; }
    }
}
