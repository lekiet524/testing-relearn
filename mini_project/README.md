# Mini Project: End-to-End Testing - Login Feature

## Mục tiêu

Thực hành testing hoàn chỉnh cho tính năng đăng nhập, kết hợp:
-Manual Test + Test Case Design
-Bug reporting
-API Testing với Postman
-Database Verification Concept với SQL

## Website under test

https://www.saucedemo.com/

## Công nghệ & Công cụ

| Kỹ năng          | Công cụ                | Mức độ       |
| ---------------- | ---------------------- | ------------ |
| Test Case Design | Google Sheets/Markdown | Thành thạo   |
| Bug Reporting    | Markdown template      | Thành thạo   |
| API Testing      | Postman                | Cơ bản → Khá |
| SQL Verification | PostgreSQL syntax      | Cơ bản       |
| Version Control  | Git/GitHub             | Cơ bản       |

## Test Coverage

## Kết quả thực thi

| Test Case ID | Status | Ghi chú                                     |
| ------------ | ------ | ------------------------------------------- |
| TC01         | Pass   | Login thành Công                            |
| TC02         | Pass   | Error message chính xác                     |
| TC03         | Pass   | Error message chính xác                     |
| TC04         | Pass   | Error message chính xác                     |
| TC05         | Pass   | Locked user handled properly                |
| TC06         | Pass   | Validation username required                |
| TC07         | Pass   | Validation password required                |
| TC08         | Pass   | Validation username required                |
| TC09         | Fail   | Không tự động xóa khoảng trắng              |
| TC10         | Fail   | Không tự động xóa khoảng trắng              |
| TC11         | Pass   | Error message chính xác                     |
| TC12         | Pass   | Không cho phép vào trang khi chưa đăng nhập |
| TC13         | Pass   | Không cho phép vào trang khi chưa đăng nhập |
| TC14         | Pass   | UI Đầy đủ components                        |
| TC15         | Pass   | Close error hoạt động                       |
| TC16         | Fail   | Click Enter không hoạt động                 |

**Tổng quan**: 13/16 test cases passed | 3/16 test case failed

## Cách chạy lại tests

### Manual Testing:

1. Mở https://www.saucedemo.com/
2. Follow steps trong [login_testcases.xlsx](./testcases/login_testcases.xlsx)

### API Testing:

1. Mở Postman
2. Import file [login_api.postman.json](./api_tests/login_api.postman.json)
3. Click "Run collection" hoặc send từng request

### SQL Verification (concept):

1. Mở [verify_login.sql](./sql_verify/verify_login.sql)
2. Chạy queries trên môi trường test database tương tự

_Project thực hiện bởi: [Lê Tuấn Kiệt] - [22/3/2026]_  
_GitHub: https://github.com/lekiet524/testing-relearn_
