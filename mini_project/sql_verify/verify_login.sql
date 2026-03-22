-- Kịch bản: Sau khi user login thành công, 
-- làm sao verify dữ liệu session/user trong database?

-- Giả sử bảng 'users' có cấu trúc:
-- id, username, password_hash, status, last_login

-- Kiểm tra user có tồn tại và active không
select id, username, last_login
from users
where status = 'active' and username = 'standard_user';

-- Cập nhật last_login khi user đăng nhập thành công
update users
set last_login = now()
where username = 'standard_user';

-- Kiểm tra không có user nào có password là plain text
select username
from users
where password_hash = 'secret_sauce';



