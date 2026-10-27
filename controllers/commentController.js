const Comment = require('../models/Comment');
const Post = require('../models/Post');
const AppError = require('../utils/AppError');

exports.createComment = (req, res, next) => {
    try {
        const { postId, content } = req.body;
        
        // Validate Post tồn tại
        if (!Post.findById(postId)) {
            throw new AppError('Bài viết không tồn tại', 404);
        }
        if (!content) throw new AppError('Thiếu nội dung comment', 400);

        const newComment = Comment.create({ postId: Number(postId), content, userId: req.user.id });
        res.status(201).json({ success: true, data: newComment });
    } catch (err) { next(err); }
};

exports.getCommentsByPost = (req, res, next) => {
    try {
        const comments = Comment.findByPostId(req.params.postId);
        res.status(200).json({ success: true, data: comments });
    } catch (err) { next(err); }
};