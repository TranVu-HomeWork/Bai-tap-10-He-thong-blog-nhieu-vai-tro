const AppError = require('../utils/AppError');

// Middleware 1: Kiểm tra đăng nhập
const authenticate = (req, res, next) => {
    const role = req.headers.authorization;
    if (!role) {
        return next(new AppError('Chưa đăng nhập', 401));
    }
    // Giả lập user từ header
    req.user = { id: 1, role: role.toLowerCase() };
    next();
};

// Middleware 2: Kiểm tra quyền (Factory pattern)
const authorize = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return next(new AppError('Không đủ quyền truy cập', 403));
        }
        next();
    };
};

module.exports = { authenticate, authorize };