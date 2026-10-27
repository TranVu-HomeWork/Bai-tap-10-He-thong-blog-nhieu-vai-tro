const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const { authenticate } = require('../middlewares/auth');

router.get('/post/:postId', commentController.getCommentsByPost);
// Tạo comment: Chỉ cần đăng nhập
router.post('/', authenticate, commentController.createComment);

module.exports = router;