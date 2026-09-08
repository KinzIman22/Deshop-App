// src/data/hotSaleData.js

// Mock data representing items fetched or sorted by maximum sales
export const fetchHotSaleProducts = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const products = [
        { 
          id: '1', 
          title: 'Mi Box S Xiaomi Original - 4K Ultra HD Android TV', 
          price: '969.99 EGP', 
          salesCount: 1250, // Sab se zyada sale hone wala item
          image: 'https://images.unsplash.com/photo-1543512214-318c7553f230?w=300'
        },
        { 
          id: '2', 
          title: 'Wireless Bluetooth Noise Cancelling Headphones', 
          price: '450.00 EGP', 
          salesCount: 890, 
          image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300'
        },
      ];

      // Logic: Sort products in descending order based on salesCount (maximum sales first)
      const sortedByTopSales = products.sort((a, b) => b.salesCount - a.salesCount);

      resolve(sortedByTopSales);
    }, 800); // Simulating network delay for API feel
  });
};