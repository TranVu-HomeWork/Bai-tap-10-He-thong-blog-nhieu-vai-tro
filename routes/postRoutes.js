const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const { authenticate, authorize } = require('../middlewares/auth');
const upload = require('../middlewares/upload');

router.get('/', postController.getAllPosts);
// Tạo post: Bắt buộc đăng nhập (authenticate)
router.post('/', authenticate, upload.single('thumbnail'), postController.createPost);
// Xóa post: Bắt buộc đăng nhập VÀ phải là admin
router.delete('/:id', authenticate, authorize('admin'), postController.deletePost);

module.exports = router;