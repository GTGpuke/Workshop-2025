using System.Configuration;
using System.Data;
using System.Net.Http;
using System.Windows;
using Microsoft.Extensions.DependencyInjection;
using WigorSchedule.Core.Services;

namespace WigorSchedule.App;

/// <summary>
/// Interaction logic for App.xaml
/// </summary>
public partial class App : Application
{
    public static ServiceProvider? ServiceProvider { get; private set; }

    protected override void OnStartup(StartupEventArgs e)
    {
        base.OnStartup(e);

        var serviceCollection = new ServiceCollection();
        ConfigureServices(serviceCollection);

        ServiceProvider = serviceCollection.BuildServiceProvider();

        var mainWindow = ServiceProvider.GetRequiredService<MainWindow>();
        mainWindow.Show();
    }

    private void ConfigureServices(IServiceCollection services)
    {
        services.AddSingleton<HttpClient>();
        services.AddSingleton<IApiService, ApiService>();
        services.AddTransient<MainWindow>();
    }
}

