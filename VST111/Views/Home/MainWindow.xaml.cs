using System;
using System.Data.SqlClient;
using System.Data;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Media;

namespace VST111.Views
{
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }

        // Phương thức xử lý sự kiện GotFocus
        private void SearchBox_GotFocus(object sender, RoutedEventArgs e)
        {
            TextBox textBox = sender as TextBox;
            if (textBox.Text == "Search...")
            {
                textBox.Text = "";
                textBox.Foreground = new SolidColorBrush(Colors.Black);
            }
        }

        // Phương thức xử lý sự kiện LostFocus
        private void SearchBox_LostFocus(object sender, RoutedEventArgs e)
        {
            TextBox textBox = sender as TextBox;
            if (string.IsNullOrWhiteSpace(textBox.Text))
            {
                textBox.Text = "Search...";
                textBox.Foreground = new SolidColorBrush(Colors.Gray);
            }
        }

        private void Function1_Click(object sender, RoutedEventArgs e)
        {
            var data = new Provider().Select("livestockFacility");
            DataGridTable.ItemsSource = data.DefaultView;
            DataGridTable.Visibility = Visibility.Visible; // Show the DataGrid
        }
    }

}
