use  testing_relearn;

create table users (
	id int,
	username varchar(50),
    email varchar(100),
    status varchar(50)
);

create table orders (
	order_id int,
	user_id int,
    amount decimal(10,2),
    order_status varchar(50)
);


insert into users value
(1,'Lê Tuấn Kiệt','lekiet524@gmail.com','active'),
(2,'Lê Tuấn Kiệt1','lekiet5241@gmail.com','blocked'),
(3,'Lê Tuấn Kiệt2','lekiet5242@gmail.com','active');


insert into orders value
(101,1,240000,'peding'),
(102,2,50000,'completed'),
(103,3,20000,'cancelled');

-- Lấy danh sách username, email, order_id, amount
select orders.order_id, orders.amount, users.username, users.email
from users
inner join orders on orders.user_id = users.id;

-- Lấy tất cả đơn hàng của user có username = nguyenA
select users.username, orders.order_id, orders.amount, orders.order_status
from users
left join orders on users.id = orders.user_id
where username = 'Lê Tuấn Kiệt';

-- Lấy danh sách user không có đơn hàng nào
select *
from users
left join orders on users.id = orders.user_id
where orders.order_id is null;

-- Tính tổng tiền (amount) mỗi user đã mua
select user_id, sum(amount) as TotalAmount
from orders
group by user_id;

-- Đếm số lượng đơn hàng của mỗi user
select count(order_id)
from orders;

-- Lấy user có tổng tiền mua > 200000
select user_id, sum(amount)
from orders
group by user_id
having sum(amount) > 200000;

-- Tìm các đơn hàng có user bị blocked
select *
from orders
join users on users.id = orders.order_id
where users.status = 'blocked';

-- Tìm user: status = active nhưng KHÔNG có đơn hàng completed
select *
from users
where users.status = 'active'
and not exists(
	select 1
    from orders
    where orders.user_id = users.id
    and orders.order_status = 'completed'
);

-- Tìm đơn hàng có amount = 0 hoặc NULL
select *
from orders
where amount = 0 or amount is null;

-- User blocked không được tạo đơn hàng
select *, users.status
from orders
left join  users on users.id = orders.order_id
where users.status = 'blocked';

-- Mỗi user phải có ít nhất 1 đơn hàng
select *
from orders
left join users on orders.order_id = users.id
where orders.order_id is null;








