-- Verify các sản phẩm trong giỏ hàng
select c.cart_id, p.name as product_name, p.price, c.quantity, (p.price * c.quantity) as subtotal
from cart c 
join products p on p.product_id = c.product_id
where c.user_id = 1;

-- Verify order sau khi checkout xong
select *
from orders
where user_id = 1
order by created_at desc
limit 1;

-- Verify danh sách sản phẩm của 1 đơn hàng
select o.order_number, p.name as product_name, oi.quantity, oi.unit_price, oi.subtotal
from orders o
join order_items oi on oi.order_id = o.order_id
join products p on oi.product_id = p.product_id
where order_number = 'ORD001'
order by p.name; 

-- Tổng tiền có đúng không
select o.order_number, sum(oi.subtotal) as calculated_total, o.total_amount as recorded_total,
	case
		when abs(sum(oi.subtotal) - total_amount) < 0.01 then 'Total matches'
        else 'Total not matches'
	end as total_check
from orders o
join order_items oi on oi.order_id = o.order_id
where order_number = 'ORD001'
order by o.order_id;

-- Verify đơn hàng sau khi thanh toán thành công
select order_number, status, created_at
from orders
where order_number = 'ORD001';
