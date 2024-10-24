﻿using System.Text;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace MyWpfApp;

/// <summary>
/// Interaction logic for MainWindow.xaml
/// </summary>
public partial class MainWindow : Window
{
    public MainWindow()
    {
        InitializeComponent();
    }
    private void LoginButton_Click(object sender, RoutedEventArgs e)
    {
        string username = UsernameTextBox.Text;
        string password = PasswordBox.Password;

        // Ví dụ: hiển thị thông báo khi bấm đăng nhập
        if (username == "admin" && password == "123")
        {
            Window1 window1 = new Window1();
            window1.Show();
            Close();
        }
        else
        {
            MessageBox.Show("Tên đăng nhập hoặc mật khẩu không chính xác.");
        }
    }
}