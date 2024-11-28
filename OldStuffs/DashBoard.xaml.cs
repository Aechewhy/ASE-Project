using System.Windows;
using System.Windows.Controls;
using System.Windows.Media;

namespace MyApp
{
    public partial class DashBoard : Window
    {
        public DashBoard()
        {
            InitializeComponent();
            ToggleAdditionalFunctions.Checked += ToggleAdditionalFunctions_Checked;
            ToggleAdditionalFunctions.Unchecked += ToggleAdditionalFunctions_Unchecked;
        }

        private void SearchBox_GotFocus(object sender, RoutedEventArgs e)
        {
            TextBox textBox = sender as TextBox;
            if (textBox.Text == "Search...")
            {
                textBox.Text = "";
                textBox.Foreground = new SolidColorBrush(Colors.Black);
            }
        }

        private void SearchBox_LostFocus(object sender, RoutedEventArgs e)
        {
            TextBox textBox = sender as TextBox;
            if (string.IsNullOrWhiteSpace(textBox.Text))
            {
                textBox.Text = "Search...";
                textBox.Foreground = new SolidColorBrush(Colors.Gray);
            }
        }

        private void ToggleAdditionalFunctions_Checked(object sender, RoutedEventArgs e)
        {
            AdditionalFunctionsPanel.Visibility = Visibility.Visible;
        }

        private void ToggleAdditionalFunctions_Unchecked(object sender, RoutedEventArgs e)
        {
            AdditionalFunctionsPanel.Visibility = Visibility.Collapsed;
        }
    }
}

