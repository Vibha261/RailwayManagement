using MongoDB.Bson.Serialization.Attributes;

namespace Railway_Backend.Collections
{
    public class login
    {
        [BsonElement("userName")]
        public string UserName { get; set; }

        [BsonElement("password")]
        public string Password { get; set; }
    }
}
