-- Verify user được tạo sau khi đăng ký
select *
from users
where username ='new_user' and is_deleted = false;

-- Verify password không phải là plain text
select username,password_hash, length(password_hash) as hash_length,
	case
		when length(password_hash) >20 then 'Hợp lệ'
        else 'Không hợp lệ'
	end as security_check
from users
where username= 'john_doe';

-- Verify user locked không thể đăng nhập
select username, status,
	case
		when status = 'locked' then 'User is looked'
        else 'User should be looked'
	end as lock_status
from users
where username = 'locked_user';

-- Verify last_login update sau khi login thành công
select username, last_login,
	case
		when last_login >= now() - interval 5 minute
        then 'Login timestape updated'
        else 'Login timestampe not updated'
	end as login_check
from users
where username = 'john_doe';
-- Tìm có user nào có username/password trống không
select user_id, username
from users
where (username is null or username ='') or (password_hash is null or password_hash = '');
-- Verify user session sau khi login
select
	s.session_id,
    s.user_id,
    u.username,
    s.expired_at,
    case
		when s.expired_at > now() then 'Session active'
		else 'Session is expired'
	end as session_status
from user_session s
join users u on s.user_id = u.user_id
where username = 'john_doe'
order by s.created_at desc
limit 1;

-- Verify session clear sau khi logout 
select 
    s.session_id,
    u.username,
    s.expired_at
from user_session s
join users u on s.user_id = u.user_id
where u.username = 'john_doe'
  and s.expired_at > now();



