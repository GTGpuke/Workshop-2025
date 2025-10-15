using System.Collections.Generic;
using System.Threading.Tasks;
using WigorSchedule.Core.Models;

namespace WigorSchedule.Core.Services
{
    public interface IApiService
    {
        Task<bool> LoginAsync(UserCredentials credentials);
        Task<IEnumerable<ScheduleItem>> GetScheduleAsync();
    }
}
