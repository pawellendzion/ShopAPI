using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ServerAPI.Exceptions
{
    [Serializable]
    public class UserExistException : Exception
    {
        public UserExistException() : base() { }
        public UserExistException(string message): base(message) { }
        public UserExistException(string message, Exception inner) : base(message, inner) { }
        public UserExistException(System.Runtime.Serialization.SerializationInfo info ,
            System.Runtime.Serialization.StreamingContext context) : base(info, context) { }

        public override string ToString()
        {
            return "UserExistException";
        }
    }
}
