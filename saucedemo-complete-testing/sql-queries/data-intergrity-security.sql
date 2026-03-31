-- Có dòng nào trong cart tham chiếu đến user không tồn tại
select c.cart_id, c.user_id, c.product_id
from cart c
left join users u on u.user_id = c.user_id
where u.user_id is null;

-- Kiểm tra có item nòa thuộc về đơn hàng không tồn tại
select oi.order_item_id, oi.order_id
from order_items oi
join orders o on o.order_id = oi.order_id
where o.order_id is null;

-- Kiểm tra username có bị lặp lại (trùng nhau)
select username, count(*) as count
from users
group by username
having count(*) >1;

-- Password phải đc hash
select username, length(password_hash) as hash_length,
	case
		when length(password_hash) <20 then 'Password not hash'
        else 'password hashed'
	end as security_check
from users
where user_id = 1;

-- Có session nào đã hết hạn
select session_id,user_id,expired_at
from user_session
where expired_at < NOW();

-- Các đơn hàng mà không có user tương ứng
select o.order_id, o.user_id
from orders o
left join users u on o.user_id = u.user_id
where u.user_id is null;

-- Kiểm tra trạng thái của user: đã bị xóa mềm hay chưa
select user_id, username,is_deleted,
    case 
        when is_deleted = true then 'Soft deleted'
        else ' Active'
    end as delete_status
from users
where username = 'deleted_test_user';

-- Những sản phẩm trong giỏ hàng có số lượng không hợp lệ
select cart_id, user_id,quantity
from cart
where quantity <= 0;
