using Railway_Backend.Collections;

namespace Railway_Backend.Repository
{
    public interface IDivertedTrainRepository
    {
        Task<List<Diverted>> GetAllAsync();
    }
}
