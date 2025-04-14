using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace AmazonClone.Models
{
    public class Cart
    {
        public int Id { get; set; }

        [Required]
        public string UserId { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }

        public ICollection<CartItem> Items { get; set; }

        public decimal TotalAmount
        {
            get
            {
                return Items?.Sum(item => item.Quantity * item.Product.Price) ?? 0;
            }
        }
    }

    public class CartItem
    {
        public int Id { get; set; }

        public int CartId { get; set; }
        public Cart Cart { get; set; }

        public int ProductId { get; set; }
        public Product Product { get; set; }

        [Range(1, 100)]
        public int Quantity { get; set; }

        public DateTime AddedAt { get; set; } = DateTime.UtcNow;
    }
} 