using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.IdGenerators;

namespace Railway_Backend.Collections
{
    public class User
    {
        [BsonId(IdGenerator =typeof(StringObjectIdGenerator))]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("name")]
        public string Name { get; set; }

        [BsonElement("userName")]
        public string UserName { get; set; }

        [BsonElement("password")]
        public string Password {  get; set; }

        [BsonElement("email")]
        public string Email {  get; set; }

        [BsonElement("phoneNo")]
        public string PhoneNumber { get; set; }



    }
}
