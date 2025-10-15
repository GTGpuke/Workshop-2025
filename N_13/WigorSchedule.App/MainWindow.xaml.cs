using System.Collections.ObjectModel;
using System.Net.Http;
using System.Windows;
using WigorSchedule.Core.Models;
using WigorSchedule.Core.Services;

namespace WigorSchedule.App;

/// <summary>
/// Interaction logic for MainWindow.xaml
/// </summary>
public partial class MainWindow : Window
{
    private readonly IApiService _apiService;
    public ObservableCollection<ScheduleItem> ScheduleItems { get; set; }

    public MainWindow(IApiService apiService)
    {
        InitializeComponent();
        _apiService = apiService;
        ScheduleItems = new ObservableCollection<ScheduleItem>();
        ScheduleListView.ItemsSource = ScheduleItems;
    }

    private async void RefreshButton_Click(object sender, RoutedEventArgs e)
    {
        StatusTextBlock.Text = "Loading...";
        ScheduleItems.Clear();

        var credentials = new UserCredentials
        {
            Username = UsernameTextBox.Text,
            Password = PasswordBox.Password
        };

        try
        {
            bool loggedIn = await _apiService.LoginAsync(credentials);
            if (loggedIn)
            {
                var schedule = await _apiService.GetScheduleAsync();
                foreach (var item in schedule)
                {
                    ScheduleItems.Add(item);
                }
                StatusTextBlock.Text = "Schedule loaded successfully.";
            }
            else
            {
                StatusTextBlock.Text = "Login failed.";
            }
        }
        catch (HttpRequestException ex)
        {
            StatusTextBlock.Text = $"Error: {ex.Message}";
        }
    }
}