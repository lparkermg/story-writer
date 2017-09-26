using System;
using System.Collections.Generic;
using System.IO;
using System.Runtime.Serialization.Json;
using Newtonsoft.Json;

namespace FileIO
{
    public static class FileIo
    {
        private static bool _initialised;
        private static string _filePath;
        
        public static void Initialise(string filePath)
        {
            _filePath = filePath;
            _initialised = true;
        }

        public static void Update<T>(List<T> toUpdate)
        {
            if(!_initialised)
                throw new Exception("File IO not initialised.");
            
            var json = JsonConvert.SerializeObject(toUpdate);

            using (var fs = new FileStream(_filePath, FileMode.Create, FileAccess.ReadWrite, FileShare.ReadWrite))
            {
                using (var sw = new StreamWriter(fs))
                {
                    sw.Write(json);
                    sw.Flush();
                }
            }
        }

        public static List<T> LoadMaster<T>()
        {
            if(!_initialised)
                throw new Exception("File IO not initialised.");
            
            using (var fs = new FileStream(_filePath, FileMode.Open, FileAccess.ReadWrite, FileShare.ReadWrite))
            {
                using (var sr = new StreamReader(fs))
                {
                    var json = sr.ReadToEnd();
                    List<T> data = JsonConvert.DeserializeObject<List<T>>(json);
                    return data;
                }
            }
        }
    }
}