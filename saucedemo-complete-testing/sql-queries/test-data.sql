create table users (
	user_id int primary key auto_increment,
    username varchar(50) unique not null,
    password_hash varchar(255) not null,
    first_name varchar(50),
    last_name varchar(50),
    status enum('active','locked','inactive') default 'active',
    created_at timestamp default current_timestamp,
    last_login timestamp null,
    is_deleted boolean default false
);

create table products(
	product_id int primary key auto_increment,
    name varchar(100) not null,
    description text,
    price decimal(10,2) not null,
    image_url varchar(255),
    stock_quantity int default 0,
    category varchar(50),
    is_available boolean default true,
    created_at timestamp default current_timestamp
);

create table cart(
	cart_id int primary key auto_increment,
    user_id int not null,
	product_id int not null,
    quantity int default 1,
    added_at timestamp default current_timestamp,
    foreign key (user_id) references users(user_id),
    foreign key (product_id) references products(product_id)
);

create table orders(
	order_id int primary key auto_increment,
	user_id int not null,
    order_number varchar(20) unique not null,
    total_amount decimal(10,2) not null,
    status enum('pending','processing','completed','cancelled') default 'pending',
    first_name varchar(50),
    last_name varchar(50),
    postal_code varchar(50),
    created_at timestamp default current_timestamp,
    foreign key (user_id) references users(user_id)
);


create table order_items(
	order_item_id int primary key auto_increment,
    product_id int not null,
    order_id int not null,
    quantity int not null,
    unit_price decimal(10,2) not null,
    subtotal decimal(10,2) not null,
    foreign key (product_id) references products(product_id),
    foreign key (order_id) references orders(order_id)
);

create table user_session (
	session_id int primary key auto_increment,
    user_id int not null,
    token varchar(255),
    expired_at timestamp,
    created_at timestamp default current_timestamp,
    foreign key (user_id) references users(user_id)
);

insert into users (username, password_hash, first_name, last_name, status, last_login)
values
('john_doe', 'hash1235555555555555555555', 'John', 'Doe', 'active', now()),
('jane_smith', 'hash456', 'Jane', 'Smith', 'active', now()),
('locked_user', 'hash789', 'Lock', 'User', 'locked', null),
('inactive_user', 'hash000', 'Inactive', 'User', 'inactive', null);

insert into products (name, description, price, image_url, stock_quantity, category)
values
('Nike Air Max', 'Running shoes', 120.00, 'nike.jpg', 10, 'Shoes'),
('Adidas Ultraboost', 'Comfort shoes', 150.00, 'adidas.jpg', 5, 'Shoes'),
('Puma T-Shirt', 'Sport T-Shirt', 30.00, 'puma.jpg', 20, 'Clothing'),
('Converse Classic', 'Sneaker', 80.00, 'converse.jpg', 0, 'Shoes');

insert into cart (user_id, product_id, quantity)
values
(1, 1, 2),
(1, 3, 1),
(2, 2, 1); 

insert into orders (user_id, order_number, total_amount, status, first_name, last_name, postal_code)
values
(1, 'ORD001', 270.00, 'completed', 'John', 'Doe', '700000'),
(2, 'ORD002', 150.00, 'pending', 'Jane', 'Smith', '700000');

insert into order_items (product_id, order_id, quantity, unit_price, subtotal)
values
(1, 1, 2, 120.00, 240.00),
(3, 1, 1, 30.00, 30.00),
(2, 2, 1, 150.00, 150.00);


insert into user_session (user_id, token, expired_at)
values
(1, 'token_john_123', now() + interval 1 day),
(2, 'token_jane_456', now() + interval 1 day),
(3, 'token_locked', now() - interval 1 day);


