using System.Windows;
using System.Data;
using System.Data.SqlClient;
using System.Collections.Generic;
using System;
namespace YourNamespace
{
    public partial class Dashboard : Window
    {
        public Dashboard()
        {
            InitializeComponent();
        }

        private void All_Tables_Button_Click(object sender, RoutedEventArgs e)
        {
            // Clear any existing data from the ListBox
            MainContentListBox.Items.Clear();

            string connectionString = @"Server=LAPCUAHUY\SQLEXPRESS;Database=[Livestock management];Integrated Security=True;";
            string query = "SELECT * FROM livestock.product"; // Query to get data from the product table

            try
            {
                // Create a new SqlConnection
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    // Open the connection
                    connection.Open();

                    // Create a SqlCommand object with the query and connection
                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        // Execute the command and retrieve the data
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            // Read the data from the reader
                            while (reader.Read())
                            {
                                // Create a string to hold data for the current row
                                var row = new List<string>();

                                // Loop through all columns in the current row
                                for (int i = 0; i < reader.FieldCount; i++)
                                {
                                    // Get the column name and value
                                    string columnName = reader.GetName(i);
                                    string columnValue = reader[i]?.ToString() ?? "NULL"; // Handle null values safely

                                    // Add column data to the row list
                                    row.Add($"{columnName}: {columnValue}");
                                }

                                // Add the row data to the ListBox as a new item
                                MainContentListBox.Items.Add(string.Join(", ", row));
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                // Handle errors (e.g., connection issues, invalid SQL)
                MessageBox.Show($"An error occurred: {ex.Message}");
            }
        }


        private void SettingsButton_Click(object sender, RoutedEventArgs e)
        {
            DisplayMessage("Settings page loaded.");
        }

        private void AboutButton_Click(object sender, RoutedEventArgs e)
        {
            DisplayMessage("About page loaded.");
        }

        private void DisplayMessage(string message)
        {
            // Find the main content TextBlock by name and set its text
            
        }
        // Class-level connection string (you can remove the one inside the method if you prefer)
        //private string connectionString = @"Server=LAPCUAHUY\SQLEXPRESS;Database=[Livestock management];Integrated Security=True;";

        //private void GetDataFromDatabase()
        //{
        //    // Your SQL query
        //    string query = "SELECT * FROM livestock.product"; // Make sure the table name is correct

        //    try
        //    {
        //        // Create a new SqlConnection
        //        using (SqlConnection connection = new SqlConnection(connectionString))
        //        {
        //            // Open the connection
        //            connection.Open();

        //            // Create a SqlCommand object with the query and connection
        //            using (SqlCommand command = new SqlCommand(query, connection))
        //            {
        //                // Execute the command and retrieve the data
        //                using (SqlDataReader reader = command.ExecuteReader())
        //                {
        //                    // List to hold data
        //                    var dataList = new List<string>();

        //                    // Read the data from the reader and add it to the list
        //                    while (reader.Read())
        //                    {
        //                        // Create a list to hold data for the current row
        //                        var row = new List<string>();

        //                        // Loop through all columns in the current row
        //                        for (int i = 0; i < reader.FieldCount; i++)
        //                        {
        //                            // Get the column name and value
        //                            string columnName = reader.GetName(i);
        //                            string columnValue = reader[i]?.ToString() ?? "NULL"; // Handle null values safely

        //                            // Add column data to the row list
        //                            row.Add($"{columnName}: {columnValue}");
        //                        }

        //                        // Join the row's column data into a single string and add it to the data list
        //                        dataList.Add(string.Join(", ", row));
        //                    }

        //                    // Display data in a TextBlock or ListBox
        //                    MainContentTextBlock.Text = string.Join("\n", dataList); // You can bind this data to your UI
        //                }
        //            }
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        // Handle errors (e.g., connection issues, invalid SQL)
        //        MessageBox.Show($"An error occurred: {ex.Message}");
        //    }
        //}


    }
}
