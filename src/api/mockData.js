export const TOP_CATEGORIES = [
  { id: '1', name: 'All' },
  { id: '2', name: 'Jewelry' },
  { id: '3', name: 'Kids' },
  { id: '4', name: 'Women' },
  { id: '5', name: 'Men' },
  { id: '6', name: 'Home' },
  { id: '7', name: 'Sports' },
  { id: '8', name: 'Electronics' },
  { id: '9', name: 'Beauty' },
  { id: '10', name: 'Automotive' },
];

export const SUB_CATEGORIES = [
  { id: 's1', name: 'All', icon: 'apps-outline' },
  { id: 's2', name: 'Deals', icon: 'flash-outline' },
  { id: 's3', name: '5-Star Rated', icon: 'star-outline' },
  { id: 's4', name: 'Best-Selling', icon: 'ribbon-outline' },
];

export const PRODUCTS = [
  // Jewelry (Top ID: 2)
  {
    id: 'p1',
    topId: '2',
    subId: 's2',
    title: '1 pair of simple tassel butterfly chain earrings',
    price: 'Rs.278',
    rating: '5.0',
    sold: '74K+ sold',
    image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: 'p2',
    topId: '2',
    subId: 's4',
    title: 'Gold Plated Vintage Ring Set for Girls',
    price: 'Rs.350',
    rating: '4.7',
    sold: '15K+ sold',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: 'p3',
    topId: '2',
    subId: 's3',
    title: 'Minimalist Sterling Silver Zircon Necklace',
    price: 'Rs.890',
    rating: '4.9',
    sold: '9K+ sold',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&auto=format&fit=crop&q=60',
  },

  // Kids (Top ID: 3)
  {
    id: 'p4',
    topId: '3',
    subId: 's3',
    title: 'Anti slip baby knee pads for crawling toddler',
    price: 'Rs.1,423',
    rating: '4.8',
    sold: '5K+ sold',
    image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: 'p5',
    topId: '3',
    subId: 's2',
    title: 'Cute Cartoon Animal Soft Cotton Baby Socks',
    price: 'Rs.299',
    rating: '4.6',
    sold: '32K+ sold',
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=500&auto=format&fit=crop&q=60',
  },

  // Women (Top ID: 4)
  {
    id: 'p6',
    topId: '4',
    subId: 's4',
    title: 'Luxury Pearl Crystal Stud Earrings for Women',
    price: 'Rs.425',
    rating: '4.9',
    sold: '22K+ sold',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: 'p7',
    topId: '4',
    subId: 's2',
    title: 'Bohemian Floral Print Summer Maxi Dress',
    price: 'Rs.2,150',
    rating: '4.7',
    sold: '11K+ sold',
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: 'p8',
    topId: '4',
    subId: 's3',
    title: 'Elegant Leather Crossbody Handbag for Ladies',
    price: 'Rs.1,650',
    rating: '4.8',
    sold: '18K+ sold',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&auto=format&fit=crop&q=60',
  },

  // Men (Top ID: 5)
  {
    id: 'p9',
    topId: '5',
    subId: 's2',
    title: '1pc Pro Portable Earphone Case Silicon Cover',
    price: 'Rs.471',
    rating: '4.5',
    sold: '10K+ sold',
    image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: 'p10',
    topId: '5',
    subId: 's4',
    title: 'Classic Quartz Analog Stainless Steel Watch',
    price: 'Rs.1,299',
    rating: '4.6',
    sold: '25K+ sold',
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=500&auto=format&fit=crop&q=60',
  },

  // Home (Top ID: 6)
  {
    id: 'p11',
    topId: '6',
    subId: 's3',
    title: 'Minimalist LED Desk Lamp with Touch Control',
    price: 'Rs.1,850',
    rating: '4.9',
    sold: '8K+ sold',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: 'p12',
    topId: '6',
    subId: 's2',
    title: 'Multifunctional Stainless Steel Kitchen Organizer',
    price: 'Rs.950',
    rating: '4.7',
    sold: '14K+ sold',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=500&auto=format&fit=crop&q=60',
  },

  // Sports (Top ID: 7)
  {
    id: 'p13',
    topId: '7',
    subId: 's4',
    title: 'Professional Anti-Slip Fitness Yoga Mat 6mm',
    price: 'Rs.1,350',
    rating: '4.8',
    sold: '19K+ sold',
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: 'p14',
    topId: '7',
    subId: 's2',
    title: 'Stainless Steel Insulated Sports Water Bottle',
    price: 'Rs.850',
    rating: '4.9',
    sold: '30K+ sold',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&auto=format&fit=crop&q=60',
  },

  // Electronics (Top ID: 8)
  {
    id: 'p15',
    topId: '8',
    subId: 's3',
    title: 'Wireless Bluetooth RGB Gaming Mouse',
    price: 'Rs.1,199',
    rating: '4.7',
    sold: '12K+ sold',
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: 'p16',
    topId: '8',
    subId: 's2',
    title: 'Fast Charging Type-C Braided Cable 2M',
    price: 'Rs.399',
    rating: '4.6',
    sold: '45K+ sold',
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=500&auto=format&fit=crop&q=60',
  },

  // Beauty (Top ID: 9)
  {
    id: 'p17',
    topId: '9',
    subId: 's4',
    title: 'Matte Liquid Lipstick Makeup Set of 6 pcs',
    price: 'Rs.799',
    rating: '4.8',
    sold: '55K+ sold',
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500&auto=format&fit=crop&q=60',
  },

  // Automotive (Top ID: 10)
  {
    id: 'p18',
    topId: '10',
    subId: 's3',
    title: 'Car Dashboard Sticky Anti-Slip Phone Mat',
    price: 'Rs.320',
    rating: '4.5',
    sold: '21K+ sold',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=500&auto=format&fit=crop&q=60',
  },
];