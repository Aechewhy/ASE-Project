using System.Text;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace BTL_VST
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();

            var rb = new RichTextBox();
            foreach (var table in Migrate.Load())
            {
                rb.AppendText(table.ToString() + "\r\n");
            }
            rb.SelectAll();
            rb.Copy();

            MainContent.Child = rb;
        }
    }
}