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
          salesCount: 1250, 
          image: 'https://images.unsplash.com/photo-1543512214-318c7553f230?w=300'
        },
        { 
          id: '2', 
          title: 'Wireless Bluetooth Noise Cancelling Headphones', 
          price: '450.00 EGP', 
          salesCount: 890, 
          image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300'
        },
        { 
          id: '3', 
          title: 'Smart Fitness Band with Heart Rate Monitor', 
          price: '320.00 EGP', 
          salesCount: 1120, 
          image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300'
        },
        { 
          id: '4', 
          title: 'Portable Waterproof Bluetooth Speaker', 
          price: '280.00 EGP', 
          salesCount: 750, 
          image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300'
        },
        { 
          id: '5', 
          title: 'Ergonomic Wireless Optical Gaming Mouse', 
          price: '190.00 EGP', 
          salesCount: 950, 
          image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=300'
        },
        { 
          id: '6', 
          title: 'Mechanical RGB Backlit USB Keyboard', 
          price: '650.00 EGP', 
          salesCount: 620, 
          image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300'
        },
        { 
          id: '7', 
          title: 'Fast Charging Power Bank 20000mAh', 
          price: '390.00 EGP', 
          salesCount: 1400, 
          image: 'https://images.unsplash.com/photo-1609592424104-97d4c4240a5a?w=300'
        },
        { 
          id: '8', 
          title: 'Full HD 1080p Webcam with Built-in Mic', 
          price: '510.00 EGP', 
          salesCount: 430, 
          image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300'
        },
        { 
          id: '9', 
          title: 'Adjustable Aluminium Laptop Stand', 
          price: '220.00 EGP', 
          salesCount: 810, 
          image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=300'
        },
        { 
          id: '10', 
          title: 'Type-C Hub Multiport Adapter 7-in-1', 
          price: '410.00 EGP', 
          salesCount: 670, 
          image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=300'
        }
      ];

      // Logic: Sort products in descending order based on salesCount (maximum sales first)
      const sortedByTopSales = products.sort((a, b) => b.salesCount - a.salesCount);

      resolve(sortedByTopSales);
    }, 800); // Simulating network delay for API feel
  });
};