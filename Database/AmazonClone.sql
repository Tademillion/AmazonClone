-- Create Database
CREATE DATABASE AmazonClone;
GO

USE AmazonClone;
GO

-- Create Categories Table
CREATE TABLE Categories (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(50) NOT NULL,
    Description NVARCHAR(200),
    ImageUrl NVARCHAR(500),
    ParentCategoryId INT,
    FOREIGN KEY (ParentCategoryId) REFERENCES Categories(Id)
);

-- Create Products Table
CREATE TABLE Products (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL,
    Description NVARCHAR(500) NOT NULL,
    Price DECIMAL(10,2) NOT NULL,
    ImageUrl NVARCHAR(500) NOT NULL,
    CategoryId INT NOT NULL,
    StockQuantity INT NOT NULL DEFAULT 0,
    CreatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    UpdatedAt DATETIME2,
    IsFeatured BIT NOT NULL DEFAULT 0,
    IsActive BIT NOT NULL DEFAULT 1,
    FOREIGN KEY (CategoryId) REFERENCES Categories(Id)
);

-- Create Carts Table
CREATE TABLE Carts (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    UserId NVARCHAR(450) NOT NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    UpdatedAt DATETIME2
);

-- Create CartItems Table
CREATE TABLE CartItems (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    CartId INT NOT NULL,
    ProductId INT NOT NULL,
    Quantity INT NOT NULL DEFAULT 1,
    AddedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    FOREIGN KEY (CartId) REFERENCES Carts(Id) ON DELETE CASCADE,
    FOREIGN KEY (ProductId) REFERENCES Products(Id)
);

-- Create Indexes
CREATE INDEX IX_Products_CategoryId ON Products(CategoryId);
CREATE INDEX IX_Products_IsFeatured ON Products(IsFeatured);
CREATE INDEX IX_Products_IsActive ON Products(IsActive);
CREATE INDEX IX_Carts_UserId ON Carts(UserId);
CREATE INDEX IX_CartItems_CartId ON CartItems(CartId);
CREATE INDEX IX_CartItems_ProductId ON CartItems(ProductId);

-- Insert Sample Categories with Unsplash images
INSERT INTO Categories (Name, Description, ImageUrl) VALUES
('Electronics', 'Electronic devices and accessories', 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'),
('Fashion', 'Clothing and accessories', 'https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'),
('Home & Kitchen', 'Home appliances and kitchenware', 'https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'),
('Books', 'Books and educational materials', 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'),
('Toys & Games', 'Toys and games for all ages', 'https://images.unsplash.com/photo-1558877385-8f8c6a5e9025?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80');

-- Insert Sample Products with Unsplash images
INSERT INTO Products (Name, Description, Price, ImageUrl, CategoryId, StockQuantity, IsFeatured) VALUES
('Smartphone X', 'Latest smartphone with advanced features', 999.99, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', 1, 100, 1),
('Laptop Pro', 'High-performance laptop for professionals', 1499.99, 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', 1, 50, 1),
('Designer T-Shirt', 'Premium quality cotton t-shirt', 49.99, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', 2, 200, 1),
('Smart Watch', 'Feature-rich smartwatch', 199.99, 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', 1, 75, 0),
('Coffee Maker', 'Automatic coffee maker with timer', 79.99, 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', 3, 30, 1),
('Wireless Headphones', 'Noise-cancelling wireless headphones', 299.99, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', 1, 40, 1),
('Leather Wallet', 'Genuine leather wallet', 39.99, 'https://images.unsplash.com/photo-1627123424574-7247dbd5c87c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', 2, 150, 0),
('Blender', 'High-speed blender for smoothies', 89.99, 'https://images.unsplash.com/photo-1585238342024-78d387f4a707?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', 3, 25, 1);

-- Create Stored Procedures
CREATE PROCEDURE GetFeaturedProducts
AS
BEGIN
    SELECT TOP 10 p.*, c.Name as CategoryName
    FROM Products p
    JOIN Categories c ON p.CategoryId = c.Id
    WHERE p.IsFeatured = 1 AND p.IsActive = 1
    ORDER BY p.CreatedAt DESC;
END;
GO

CREATE PROCEDURE GetCartItems
    @UserId NVARCHAR(450)
AS
BEGIN
    SELECT ci.*, p.Name, p.Price, p.ImageUrl
    FROM CartItems ci
    JOIN Carts c ON ci.CartId = c.Id
    JOIN Products p ON ci.ProductId = p.Id
    WHERE c.UserId = @UserId;
END;
GO

-- Create Views
CREATE VIEW vw_ProductCategories AS
SELECT p.*, c.Name as CategoryName, c.Description as CategoryDescription
FROM Products p
JOIN Categories c ON p.CategoryId = c.Id
WHERE p.IsActive = 1;
GO 