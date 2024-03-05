using MongoDB.Driver;
using Railway_Backend.Collections;

namespace Railway_Backend.Repository
{
    public class DivertedTrainRepository:IDivertedTrainRepository
    {
        private readonly IMongoCollection<Diverted> _mongoDivertedCollection;
        public DivertedTrainRepository(IMongoDatabase mongoDatabase)
        {
            _mongoDivertedCollection = mongoDatabase.GetCollection<Diverted>("DivertedTrains");
        }

        public async Task<List<Diverted>> GetAllAsync()
        {
            return await _mongoDivertedCollection.Find(_ => true).ToListAsync();
        }
    }
}

