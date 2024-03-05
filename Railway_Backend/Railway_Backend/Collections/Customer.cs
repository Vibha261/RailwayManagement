using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace Railway_Backend.Collections
{
    public class Customer
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        [BsonElement("name")]
        public string Name { get; set; }
        [BsonElement("email")]
        public string Email { get; set; }
        [BsonElement("query")]
        public string Query { get; set; }
        [BsonElement("suggestion")]
        public string Suggestion {  get; set; }

    }
}
