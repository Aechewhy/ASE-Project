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
        private void LoadTableData()
        {
            // Connection string for your database
            string connectionString = "Server=DESKTOP-G0GQNUT\\SQLEXPRESS;Database=[Livestock management];Integrated Security=True;";

            string query = "SELECT * waste_treatment.facility"; // Replace with your actual table name

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlDataAdapter dataAdapter = new SqlDataAdapter(query, connection);
                DataTable dataTable = new DataTable();
                dataAdapter.Fill(dataTable);
                DataGridTable.ItemsSource = dataTable.DefaultView;
            }
        }

        private void Function1_Click(object sender, RoutedEventArgs e)
        {
            LoadTableData();
            DataGridTable.Visibility = Visibility.Visible; // Show the DataGrid
        }
    }   

}
