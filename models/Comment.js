let comments = [];
let nextId = 1;

module.exports = {
    findByPostId: (postId) => comments.filter(c => c.postId === Number(postId)),
    create: (data) => {
        const newComment = { id: nextId++, ...data };
        comments.push(newComment);
        return newComment;
    },
    deleteByPostId: (postId) => {
        // Xóa toàn bộ comment có postId tương ứng (Mô phỏng ON DELETE CASCADE)
        comments = comments.filter(c => c.postId !== Number(postId));
    }
};