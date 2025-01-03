function isAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
    return next(); // Nếu đã đăng nhập, tiếp tục
  } else {
    req.session.error = "Vui lòng đăng nhập!";
    return res.redirect("/login");
  }
}

function isAdmin(req, res, next) {
  if (req.session.user?.is_admin) {
    return next(); // Nếu là admin, tiếp tục
  } else {
    return res.status(403).send("Bạn không có quyền truy cập.");
  }
}

module.exports = { isAuthenticated, isAdmin };
