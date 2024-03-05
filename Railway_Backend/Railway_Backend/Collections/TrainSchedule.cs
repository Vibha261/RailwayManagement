using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using Newtonsoft.Json;
using MongoDB.Bson.IO;
using MongoDB.Bson.Serialization.IdGenerators;
using MongoDB.Bson.Serialization.Serializers;


namespace Railway_Backend.Collections
{
    public class TrainSchedule
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("trainRunsOnWed")]
        public string TrainRunsOnWed { get; set; }

        [BsonElement("trainRunsOnFri")]
        public string TrainRunsOnFri { get; set; }

        [BsonElement("stationList")]
        public List<Station> StationListString { get; set; } = new List<Station>();

        [BsonElement("serverId")]
        public string ServerId { get; set; }

        [BsonElement("trainNumber")]
        public string TrainNumber { get; set; }

        [BsonElement("stationFrom")]
        public string StationFrom { get; set; }

        [BsonElement("trainRunsOnSat")]
        public string TrainRunsOnSat { get; set; }

        [BsonElement("trainRunsOnMon")]
        public string TrainRunsOnMon { get; set; }

        [BsonElement("trainRunsOnSun")]
        public string TrainRunsOnSun { get; set; }

        [BsonElement("stationTo")]
        public string StationTo { get; set; }

        [BsonElement("trainRunsOnThu")]
        public string TrainRunsOnThu { get; set; }

        [BsonElement("timeStamp")]
        public string TimeStamp { get; set; }

        [BsonElement("trainName")]
        public string TrainName { get; set; }

        [BsonElement("trainRunsOnTue")]
        public string TrainRunsOnTue { get; set; }

        [BsonElement("errorMessage")]
        public string ErrorMessage { get; set; }
    }
    
}
