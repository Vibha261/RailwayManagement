using Railway_Backend.Collections;

namespace Railway_Backend.Repository
{
    public interface IRegisteredUser
    {
        string SaveUser(User user);
        string HashPassword(string password);
        User LoginUser(string userName, string password);

        void EditUser(string id, User user);
        void DeleteUser(string id);
    }
}
