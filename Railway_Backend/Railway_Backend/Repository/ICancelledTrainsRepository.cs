using Railway_Backend.Collections;

namespace Railway_Backend.Repository
{
    public interface ICancelledTrainsRepository
    {
        Task<List<Cancelled>> GetAllAsync();
    }
}
