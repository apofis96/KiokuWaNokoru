using Konscious.Security.Cryptography;
using System;
using System.Security.Cryptography;
using System.Text;

namespace KiokuWaNokoru.Common.Utils
{
    public static class ArgonHashUtil
    {
        private const int _degreeOfParallelism = 4;
        private const int _memorySize = 16;
        private const int _iterations = 4;

        private static byte[] GenerateSalt()
        {
            using var rng = RandomNumberGenerator.Create();
            var salt = new byte[16];
            rng.GetBytes(salt);

            return salt;
        }

        private static byte[] Hash(string password, byte[] salt)
        {
            using var argon2 = new Argon2id(Encoding.UTF8.GetBytes(password));
            argon2.Salt = salt;
            argon2.DegreeOfParallelism = _degreeOfParallelism;
            argon2.MemorySize = _memorySize;
            argon2.Iterations = _iterations;
            return argon2.GetBytes(32);
        }

        public static (string, string) Hash(string password)
        {
            var salt = GenerateSalt();
            var hash = Hash(password, salt);

            return (Convert.ToBase64String(hash), Convert.ToBase64String(salt));
        }

        public static bool Verify(string password, string salt, string hash)
        {
            var newHash = Hash(password, Convert.FromBase64String(salt));
            var oldHash = Convert.FromBase64String(hash);

            return CryptographicOperations.FixedTimeEquals(oldHash, newHash);
        }

    }
}
