using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using WigorSchedule.Core.Models;

namespace WigorSchedule.Core.Services
{
    public class ApiService : IApiService
    {
        private readonly HttpClient _httpClient;
        private const string BaseUrl = "https://api.wigorservices.com/"; // URL fictive

        public ApiService(HttpClient httpClient)
        {
            _httpClient = httpClient;
            _httpClient.BaseAddress = new Uri(BaseUrl);
        }

        public async Task<bool> LoginAsync(UserCredentials credentials)
        {
            var json = JsonConvert.SerializeObject(credentials);
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            
            var response = await _httpClient.PostAsync("login", content);

            if (response.IsSuccessStatusCode)
            {
                var responseContent = await response.Content.ReadAsStringAsync();
                var tokenData = JsonConvert.DeserializeObject<dynamic>(responseContent);
                var token = (string?)tokenData?.token;
                if (!string.IsNullOrEmpty(token))
                {
                    _httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);
                    return true;
                }
                return false;
            }
            return false;
        }

        public async Task<IEnumerable<ScheduleItem>> GetScheduleAsync()
        {
            var response = await _httpClient.GetAsync("schedule");
            response.EnsureSuccessStatusCode();
            var content = await response.Content.ReadAsStringAsync();
            return JsonConvert.DeserializeObject<IEnumerable<ScheduleItem>>(content) ?? new List<ScheduleItem>();
        }
    }
}
