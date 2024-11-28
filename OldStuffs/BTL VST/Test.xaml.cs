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
	public partial class MainWindow : Window
	{
		public MainWindow()
		{
			InitializeComponent();
		}
	}
	private void Button_CLick_1(object sender, RouteEvent)
	{
		var rb = new RichTextBox();
		MainContent.Child = rb;
		foreach (var table in Migrate.Load())
		{
			rb.AppendText(table.ToString() + "\r\n");
		}

	}
}