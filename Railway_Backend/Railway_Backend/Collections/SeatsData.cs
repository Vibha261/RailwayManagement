namespace Railway_Backend.Collections
{
    public class SeatsData
    {
        public string TrainNumber { get; set; }
        public string TrainName { get; set; }
        public string StationFrom { get; set; }
        public string StationTo { get; set; }
        public List<TypeOfClass> Classes { get; set; }
    }
}
