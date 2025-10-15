using System;

namespace WigorSchedule.Core.Models
{
    public class ScheduleItem
    {
        public string CourseName { get; set; } = string.Empty;
        public string Teacher { get; set; } = string.Empty;
        public string Room { get; set; } = string.Empty;
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
    }
}
