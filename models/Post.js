let posts = [];
let nextId = 1;

module.exports = {
    getAll: () => posts,
    findById: (id) => posts.find(p => p.id === Number(id)),
    create: (data) => {
        const newPost = { id: nextId++, ...data };
        posts.push(newPost);
        return newPost;
    },
    deleteById: (id) => {
        const initialLength = posts.length;
        posts = posts.filter(p => p.id !== Number(id));
        return posts.length < initialLength; // Trả về true nếu xóa thành công
    }
};