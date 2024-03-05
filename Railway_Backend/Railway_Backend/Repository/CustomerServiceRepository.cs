using MongoDB.Driver;
using Railway_Backend.Collections;

namespace Railway_Backend.Repository
{
    public class CustomerServiceRepository:ICustomerServiceRepository
    {
        private readonly IMongoCollection<Customer> _mongoCustomerCollection;
        public CustomerServiceRepository(IMongoDatabase mongoDatabase)
        {
            _mongoCustomerCollection = mongoDatabase.GetCollection<Customer>("Customer");

        }
        public async Task AddQueryAsync(Customer query)
        {
            await _mongoCustomerCollection.InsertOneAsync(query);
        }
    }
}
