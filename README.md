# Bài 10 - Hệ Thống Blog Nhiều Vai Trò (MVC + Role-based Authorization)

## Bảng Liệt Kê Endpoints

| Method | Endpoint | Middleware | Controller Action | Mô tả |
|---|---|---|---|---|
| GET | `/api/posts` | Không | `getAllPosts` | Lấy danh sách bài viết |
| POST | `/api/posts` | `authenticate`, `upload.single` | `createPost` | Đăng bài (có ảnh), yêu cầu đăng nhập |
| DELETE| `/api/posts/:id` | `authenticate`, `authorize('admin')` | `deletePost` | Xóa bài viết & toàn bộ comment (Cascade). Yêu cầu quyền admin |
| GET | `/api/comments/post/:postId` | Không | `getCommentsByPost` | Lấy các bình luận của 1 bài viết |
| POST | `/api/comments` | `authenticate` | `createComment` | Viết bình luận, yêu cầu đăng nhập. Bắt lỗi 404 nếu postId sai |

---

## 5 Kịch Bản Test (Postman)

### 1. Phân quyền - Người dùng chưa đăng nhập tạo Post
- **Hành động:** `POST /api/posts` (Không truyền Header `Authorization`).
- **Kết quả mong đợi:** Status `401 Unauthorized` - `{ "success": false, "message": "Chưa đăng nhập" }`.

### 2. Quan hệ - Bình luận vào một bài viết KHÔNG tồn tại
- **Hành động:** `POST /api/comments` với Header `Authorization: user`, Body JSON `{"postId": 999, "content": "Hay"}`.
- **Kết quả mong đợi:** Status `404 Not Found` - `{ "success": false, "message": "Bài viết không tồn tại" }`.

### 3. Phân quyền - Xóa bài viết với Role 'User'
- **Hành động:** Tạo một bài viết ID 1. Gọi `DELETE /api/posts/1` với Header `Authorization: user`.
- **Kết quả mong đợi:** Status `403 Forbidden` - `{ "success": false, "message": "Không đủ quyền truy cập" }`.

### 4. Thành công - Upload Post có ảnh
- **Hành động:** `POST /api/posts` dạng `form-data`. Header `Authorization: admin`. Body có `title`, `content` và `thumbnail` (file ảnh hợp lệ < 2MB).
- **Kết quả mong đợi:** Status `201 Created` - Trả về object Post có chứa trường `thumbnailUrl`.

### 5. Quan hệ CASCADE - Xóa bài viết bằng Role 'Admin'
- **Hành động:** 
  1. Tạo Post ID 1 (Header: `admin`).
  2. Tạo 2 Comments cho `postId: 1` (Header: `user`).
  3. Xóa Post `DELETE /api/posts/1` (Header `Authorization: admin`).
  4. Lấy danh sách comment `GET /api/comments/post/1`.
- **Kết quả mong đợi:** Bước 3 báo xóa thành công (Status 200). Bước 4 trả về mảng rỗng `[]` (chứng tỏ comment đã bị xóa cùng bài viết).