using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using Moq;
using Moq.Protected;
using Newtonsoft.Json;
using WigorSchedule.Core.Models;
using WigorSchedule.Core.Services;
using Xunit;

namespace WigorSchedule.Tests
{
    public class ApiServiceTests
    {
        private readonly Mock<HttpMessageHandler> _mockHttpMessageHandler;
        private readonly HttpClient _httpClient;
        private readonly ApiService _apiService;

        public ApiServiceTests()
        {
            _mockHttpMessageHandler = new Mock<HttpMessageHandler>();
            _httpClient = new HttpClient(_mockHttpMessageHandler.Object);
            _apiService = new ApiService(_httpClient);
        }

        [Fact]
        public async Task LoginAsync_WithValidCredentials_ReturnsTrue()
        {
            // Arrange
            var credentials = new UserCredentials { Username = "test", Password = "password" };
            var response = new HttpResponseMessage
            {
                StatusCode = HttpStatusCode.OK,
                Content = new StringContent("{\"token\":\"fake_token\"}")
            };

            _mockHttpMessageHandler.Protected()
                .Setup<Task<HttpResponseMessage>>(
                    "SendAsync",
                    ItExpr.IsAny<HttpRequestMessage>(),
                    ItExpr.IsAny<CancellationToken>()
                )
                .ReturnsAsync(response);

            // Act
            var result = await _apiService.LoginAsync(credentials);

            // Assert
            Assert.True(result);
        }

        [Fact]
        public async Task GetScheduleAsync_WhenLoggedIn_ReturnsSchedule()
        {
            // Arrange
            var scheduleItems = new List<ScheduleItem>
            {
                new ScheduleItem { CourseName = "Test Course", Teacher = "Test Teacher" }
            };
            var response = new HttpResponseMessage
            {
                StatusCode = HttpStatusCode.OK,
                Content = new StringContent(JsonConvert.SerializeObject(scheduleItems))
            };

            _mockHttpMessageHandler.Protected()
                .Setup<Task<HttpResponseMessage>>(
                    "SendAsync",
                    ItExpr.IsAny<HttpRequestMessage>(),
                    ItExpr.IsAny<CancellationToken>()
                )
                .ReturnsAsync(response);

            // Act
            var result = await _apiService.GetScheduleAsync();

            // Assert
            Assert.NotNull(result);
            Assert.Single(result);
        }
    }
}
