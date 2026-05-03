# TopCV Test Frontend

Dự án Frontend cho hệ thống quản lý và tạo biểu mẫu (Form Builder), được xây dựng bằng React, TypeScript và Vite.

## 🛠 Hướng dẫn cài đặt (Installation)

Để chạy dự án ở môi trường local, bạn vui lòng thực hiện theo các bước sau:

### 1. Cài đặt Dependencies
Mở terminal tại thư mục `topcv_test_fe` và chạy lệnh:
```bash
npm install
```

### 2. Cấu hình biến môi trường (Environment Variables)
Tạo file `.env` tại thư mục gốc của dự án (nếu chưa có) và cấu hình đường dẫn tới API Backend:
```env
VITE_API_URL=http://localhost:3000/api
```

### 3. Chạy dự án ở chế độ Development
Sau khi cài đặt xong, chạy lệnh sau để khởi động dev server:
```bash
npm run dev
```
Mặc định dự án sẽ chạy tại: [http://localhost:5173](http://localhost:5173)

### 4. Build dự án (Production)
Để đóng gói dự án cho môi trường production:
```bash
npm run build
```

---

## 📂 Cấu trúc dự án (Project Structure)

Dưới đây là mô tả chi tiết cấu trúc thư mục trong `src`:

```text
src/
├── components/     # Các thành phần UI dùng chung (Button, Input, Layout, v.v.)
├── config/         # Cấu hình hệ thống (Axios instance, constants)
├── context/        # Quản lý trạng thái toàn cục bằng React Context (Auth, Form)
├── hooks/          # Các custom hooks giúp tái sử dụng logic
├── pages/          # Các trang chính của ứng dụng (Admin, Home, Login, v.v.)
├── services/       # Lớp giao tiếp với API (gọi các endpoint từ Backend)
├── types/          # Định nghĩa các TypeScript interfaces và types
├── App.tsx         # Thành phần gốc của ứng dụng, cấu hình Router
├── main.tsx        # Điểm đầu vào (Entry point) của dự án
└── index.css       # File styles chính (sử dụng Tailwind CSS)
```
---

## 🏗 Kiến trúc & Các Base áp dụng (Architecture & Applied Bases)

Dự án tuân thủ các quy tắc cấu trúc và thiết kế (base) nhằm đảm bảo tính mở rộng và dễ bảo trì:

### 1. Service Layer Pattern (Base Service)
Toàn bộ logic gọi API được tập trung tại thư mục `services/`. Thay vì gọi trực tiếp trong component, chúng ta sử dụng các Service Class (như `FormService`).
- **Ưu điểm**: Dễ dàng unit test, tái sử dụng logic và tập trung xử lý lỗi (error handling).
- **Data Transformation**: Các service chịu trách nhiệm format data (DTO) trước khi gửi lên hoặc nhận về từ Backend.

### 2. Hệ thống Audit & Versioning (Base Audit)
Dự án được thiết kế để hỗ trợ hệ thống Audit của Backend:
- **Tracking**: Tự động xử lý và hiển thị thông tin `createdBy`, `updatedBy`, `createdAt`.
- **Versioning**: Hỗ trợ tăng `version` mỗi khi cập nhật dữ liệu để theo dõi lịch sử thay đổi của biểu mẫu.

### 3. Atomic UI Components (Base UI)
Các thành phần giao diện nhỏ nhất được tách thành các base components tại `components/ui/` (như `InputField`, `Pagination`, `EmptyState`).
- Các component này không chứa logic nghiệp vụ (business logic), chỉ nhận props và hiển thị giao diện theo style Tailwind thống nhất.

### 4. Role-Based Access Control - RBAC (Base Protection)
Sử dụng `ProtectedRoute` kết hợp với `AuthContext` để phân quyền truy cập:
- Kiểm tra trạng thái đăng nhập (`isAuthenticated`).
- Phân quyền theo vai trò (`allowedRoles` như `ADMIN`, `USER`) một cách tập trung tại file cấu hình Router.

---

### Công nghệ sử dụng:
- **React 19**: Thư viện UI.
- **TypeScript**: Đảm bảo an toàn về kiểu dữ liệu.
- **Vite**: Công cụ build và dev server tốc độ cao.
- **Tailwind CSS**: Framework CSS để thiết kế giao diện nhanh chóng.
- **React Router Dom**: Quản lý điều hướng trang.
- **Axios**: Thực hiện các yêu cầu HTTP.
- **React Hot Toast**: Hiển thị thông báo.
