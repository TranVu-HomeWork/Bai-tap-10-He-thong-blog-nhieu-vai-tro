const Post = require('../models/Post');
const Comment = require('../models/Comment');
const AppError = require('../utils/AppError');

exports.getAllPosts = (req, res, next) => {
    try {
        res.status(200).json({ success: true, data: Post.getAll() });
    } catch (err) { next(err); }
};

exports.createPost = (req, res, next) => {
    try {
        const { title, content } = req.body;
        if (!title) throw new AppError('Thiếu tiêu đề bài viết', 400);

        const thumbnailUrl = req.file ? `/uploads/${req.file.filename}` : null;
        const newPost = Post.create({ title, content, thumbnailUrl });
        
        res.status(201).json({ success: true, data: newPost });
    } catch (err) { next(err); }
};

exports.deletePost = (req, res, next) => {
    try {
        const postId = req.params.id;
        const post = Post.findById(postId);
        if (!post) throw new AppError('Không tìm thấy bài viết', 404);

        Post.deleteById(postId);
        Comment.deleteByPostId(postId); // Xóa cascade comments

        res.status(200).json({ success: true, message: 'Xóa bài viết và comment liên quan thành công' });
    } catch (err) { next(err); }
};