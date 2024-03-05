using MongoDB.Driver;
using Railway_Backend.Collections;

namespace Railway_Backend.Repository
{
    public class CancelledTrainRepository:ICancelledTrainsRepository
    {
        private readonly IMongoCollection<Cancelled> _mongoCancelledCollection;
        public CancelledTrainRepository(IMongoDatabase mongoDatabase)
        {
            _mongoCancelledCollection = mongoDatabase.GetCollection<Cancelled>("CancelledTrains");

        }

        public async Task<List<Cancelled>> GetAllAsync()
        {
            return await _mongoCancelledCollection.Find(_ => true).ToListAsync();
        }
    }
}
