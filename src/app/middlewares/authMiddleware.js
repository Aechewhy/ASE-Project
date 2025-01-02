function isAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
    return next(); // Nếu đã đăng nhập, tiếp tục
  } else {
    // Thêm thông báo vào session
    req.session.error = "Vui lòng đăng nhập!";
    res.redirect("/login"); // Chuyển hướng đến trang đăng nhập
  }
}

module.exports = { isAuthenticated };
