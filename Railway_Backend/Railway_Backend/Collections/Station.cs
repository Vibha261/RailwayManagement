using MongoDB.Bson.Serialization.Attributes;

namespace Railway_Backend.Collections
{
    [BsonIgnoreExtraElements]
    public class Station
    {
        [BsonElement("departureTime")]

        public string DepartureTime { get; set; }
        [BsonElement("stationCode")]
        public string StationCode { get; set; }
        [BsonElement("haltTime")]
        public string HaltTime { get; set; }
        [BsonElement("dayCount")]
        public string DayCount { get; set; }
        [BsonElement("routeNumber")]
        public string RouteNumber { get; set; }
        [BsonElement("distance")]
        public string Distance { get; set; }
        [BsonElement("arrivalTime")]
        public string ArrivalTime { get; set; }
        [BsonElement("stationName")]
        public string StationName { get; set; }
        [BsonElement("stnSerialNumber")]
        public string StnSerialNumber { get; set; }

    }
}
