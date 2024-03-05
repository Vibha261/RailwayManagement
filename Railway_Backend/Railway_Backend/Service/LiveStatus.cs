namespace Railway_Backend.Service
{
    public class LiveStatus
    {
            private readonly HttpClient _client;

            public LiveStatus(HttpClient client)
            {
                _client = client;
                _client.DefaultRequestHeaders.Add("X-RapidAPI-Key", "3ddded3e8cmsh87e82e7b2bb842ap14d7a7jsn805d70cd88ba");
                _client.DefaultRequestHeaders.Add("X-RapidAPI-Host", "irctc1.p.rapidapi.com");
            }

        // Existing methods...

        public async Task<string> GetLiveTrainStatusAsync(string trainNo, string startDay)
        {
            var request = new HttpRequestMessage
            {
                Method = HttpMethod.Get,
                RequestUri = new Uri($"https://irctc1.p.rapidapi.com/api/v1/liveTrainStatus?trainNo={trainNo}&startDay={startDay}"),
            };

            using var response = await _client.SendAsync(request);
            response.EnsureSuccessStatusCode();
            return await response.Content.ReadAsStringAsync();
        }
    }
}


