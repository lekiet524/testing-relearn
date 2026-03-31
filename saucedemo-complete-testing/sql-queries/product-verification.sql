-- Verify hiển thị 4 sản phẩm 
select count(*) as total_products,
    case 
        when count(*) = 4 then ' Correct product count'
        else ' Wrong product count!'
    end as count_check
from products
where is_available = TRUE;

-- Verify price là số dương
select product_id, name, price,
    case 
        when price > 0 then 'Valid price'
        else 'Invalid price!'
    end as price_check
from products
where price <= 0;

-- Verify sản phẩm sắp xếp theo giá (low to high)
select product_id, name, price
from products
where is_available = true
order by price asc;

-- Verify sản phẩm sắp xếp theo giá (high to low)
select product_id, name, price
from products
where is_available = true
order by price desc;

-- Tìm sản phẩm có số lượng là âm
select product_id, name, price, stock_quantity
from products 
where stock_quantity < 0;

-- Verify stock quantity sau khi thêm vào giỏ hàng
select p.product_id, p.name, p.stock_quantity as current_stock,
	coalesce(c.quantity, 0) as in_cart,
    p.stock_quantity - coalesce(c.quantity, 0) as available_stock
from products p
left join cart c on c.product_id = p.product_id
where p.product_id = 1
order by p.product_id






