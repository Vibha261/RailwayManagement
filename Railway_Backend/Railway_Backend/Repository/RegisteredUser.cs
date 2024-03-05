using MongoDB.Driver;
using Railway_Backend.Collections;
using System.Security.Cryptography;
using System.Text;

namespace Railway_Backend.Repository
{
    public class RegisteredUser: IRegisteredUser
    {
        private readonly IMongoCollection<User> _users;

        public RegisteredUser(IMongoDatabase mongoDatabase)
        {
            _users = mongoDatabase.GetCollection<User>("User");
        }

        public string SaveUser(User user)
        {
            var existingUser = _users.Find(u => u.UserName == user.UserName).FirstOrDefault();
            if (existingUser != null)
            {
                return "Username already exists";
            }
            // Hash the password
            user.Password = HashPassword(user.Password);

            // Save the user to MongoDB
            _users.InsertOne(user);

            return "User registered successfully";
        }

        public string HashPassword(string password)
        {
            using var sha256 = SHA256.Create();
            var bytes = Encoding.UTF8.GetBytes(password);
            var hash = sha256.ComputeHash(bytes);
            return BitConverter.ToString(hash).Replace("-", "").ToLower();
        }
        public User LoginUser(string userName, string password)
        {
            var user = _users.Find(u => u.UserName == userName).FirstOrDefault();
            if (user == null)
            {
                return null; // User not found
            }

            var hashedPassword = HashPassword(password);
            if (user.Password != hashedPassword)
            {
                return null; // Incorrect password
            }

            return user;
            
        }

        public void EditUser(string id, User user)
        {
            var filter = Builders<User>.Filter.Eq(u => u.Id, id);
            var update = Builders<User>.Update
                .Set(u => u.Name, user.Name)
                .Set(u => u.UserName, user.UserName)
                .Set(u => u.Password, HashPassword(user.Password)) // Hash the password before updating
                .Set(u => u.Email, user.Email)
                .Set(u => u.PhoneNumber, user.PhoneNumber);

            _users.UpdateOne(filter, update);
        }

        public void DeleteUser(string id)
        {
            var filter = Builders<User>.Filter.Eq(u => u.Id, id);
            _users.DeleteOne(filter);
        }
    }
}
