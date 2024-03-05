using MongoDB.Bson.Serialization.Attributes;

namespace Railway_Backend.Collections
{
    public class PassengerList
    {
        [BsonElement("name")]
        public string Name { get; set; }

        [BsonElement("age")]
        public int Age { get; set; }

        [BsonElement("gender")]
        public string Gender { get; set; }

        [BsonElement("berthPreference")]
        public string BerthPreference { get; set; }

        [BsonElement("seatNo")]
        public int SeatNo { get; set; }
    }
}
