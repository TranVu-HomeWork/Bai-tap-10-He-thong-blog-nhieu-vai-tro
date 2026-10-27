const express = require('express');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Hỗ trợ form-data text fields
app.use('/uploads', express.static('uploads'));

// Mount Routes
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

// GLOBAL ERROR HANDLING
app.use((err, req, res, next) => {
    // Xử lý lỗi Multer
    if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ success: false, message: 'File vượt quá 2MB' });
    }
    
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        message: err.message || 'Internal Server Error'
    });
});

app.listen(PORT, () => {
    console.log(`Hệ thống Blog chạy tại http://localhost:${PORT}`);
});