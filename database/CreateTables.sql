-- Tạo Database (Nếu chưa có)
-- CREATE DATABASE QuanLyNhaThuocMini;
-- USE QuanLyNhaThuocMini;

-- 1. Bảng Người dùng (Admin/Nhân viên) - Dùng cho trang Login
CREATE TABLE Users (
    UserID INT PRIMARY KEY IDENTITY(1,1),
    Username VARCHAR(50) NOT NULL,
    Password VARCHAR(100) NOT NULL, -- Lưu ý: Thực tế nên mã hóa MD5/SHA
    FullName NVARCHAR(100),
    Email VARCHAR(100),
    Role NVARCHAR(20) DEFAULT 'NhanVien' -- 'Admin' hoặc 'NhanVien'
);

-- 2. Bảng Danh mục thuốc (Kho hàng)
CREATE TABLE Medicines (
    MedID INT PRIMARY KEY IDENTITY(1,1), -- Mã tự tăng
    MedName NVARCHAR(200) NOT NULL,      -- Tên thuốc
    Category NVARCHAR(100),              -- Phân loại (Thuốc, TPCN, Thiết bị)
    Unit NVARCHAR(20),                   -- Đơn vị (Hộp, Vỉ, Lọ)
    Price DECIMAL(18, 0),                -- Giá bán (VND)
    StockQuantity INT DEFAULT 0,         -- Số lượng tồn kho
    ImageURL VARCHAR(MAX)                -- Đường dẫn ảnh
);

-- 3. Bảng Khách hàng
CREATE TABLE Customers (
    CustomerID INT PRIMARY KEY IDENTITY(1,1),
    FullName NVARCHAR(100),
    PhoneNumber VARCHAR(15),
    CustomerType NVARCHAR(50) DEFAULT 'BinhThuong' -- BinhThuong, KhachQuen, VIP
);

-- 4. Bảng Hóa đơn (Lưu lịch sử bán hàng)
CREATE TABLE Orders (
    OrderID INT PRIMARY KEY IDENTITY(1,1),
    OrderDate DATETIME DEFAULT GETDATE(),
    TotalAmount DECIMAL(18, 0),
    CustomerID INT, -- Liên kết với khách hàng (có thể null nếu khách vãng lai)
    FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID)
);

-- 5. Bảng Chi tiết hóa đơn (Biết đơn đó mua thuốc gì)
CREATE TABLE OrderDetails (
    DetailID INT PRIMARY KEY IDENTITY(1,1),
    OrderID INT,
    MedID INT,
    Quantity INT,
    UnitPrice DECIMAL(18, 0),
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID),
    FOREIGN KEY (MedID) REFERENCES Medicines(MedID)
);