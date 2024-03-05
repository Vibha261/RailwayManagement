using Railway_Backend.Collections;

namespace Railway_Backend.Repository
{
    public interface ICustomerServiceRepository
    {
        Task AddQueryAsync(Customer query);
    }
}
