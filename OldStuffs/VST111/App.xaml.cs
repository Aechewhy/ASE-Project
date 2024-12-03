using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Windows;
using VST111.Views;

namespace VST111
{
    /// <summary>
    /// Interaction logic for App.xaml
    /// </summary>
    public partial class App : Application
    {
        protected override void OnStartup(StartupEventArgs e)
        {
            var main = new MainWindow();
            main.Show();

            //var login = new Views.LoginWindow();
            //if (login.ShowDialog() == true)
            //{
            //    main.Show();
            //}
        }
    }
}
