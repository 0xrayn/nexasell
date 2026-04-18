export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  description: string;
  stock: number;
  sold: number;
  rating: number;
  badge?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export const categories: Category[] = [
  { id: "all", name: "All", icon: "🛍️" },
  { id: "food", name: "Food & Drink", icon: "🍔" },
  { id: "electronics", name: "Electronics", icon: "📱" },
  { id: "fashion", name: "Fashion", icon: "👕" },
  { id: "beauty", name: "Beauty", icon: "💄" },
  { id: "home", name: "Home", icon: "🏠" },
  { id: "sports", name: "Sports", icon: "⚽" },
];

export const products: Product[] = [
  { id: "p001", name: "Americano Coffee", price: 28000, category: "food", image: "https://images.unsplash.com/photo-1521302080334-4bebac2763a6?w=400&q=80", description: "Rich espresso diluted with hot water. Bold and smooth flavor, perfect for any time of day.", stock: 50, sold: 234, rating: 4.8, badge: "Best Seller" },
  { id: "p002", name: "Matcha Latte", price: 35000, category: "food", image: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=400&q=80", description: "Premium matcha powder blended with steamed milk for a creamy, earthy taste.", stock: 40, sold: 189, rating: 4.7 },
  { id: "p003", name: "Wireless Earbuds Pro", price: 450000, originalPrice: 599000, category: "electronics", image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&q=80", description: "Active noise cancelling with 30hr battery life and premium sound quality.", stock: 15, sold: 87, rating: 4.9, badge: "Sale" },
  { id: "p004", name: "Smart Watch Series 5", price: 1250000, originalPrice: 1500000, category: "electronics", image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&q=80", description: "Health tracking, GPS, and 7-day battery with beautiful AMOLED display.", stock: 8, sold: 56, rating: 4.6, badge: "Sale" },
  { id: "p005", name: "Oversized Tee", price: 85000, category: "fashion", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80", description: "Premium cotton oversized t-shirt in neutral tones, perfect for everyday wear.", stock: 60, sold: 312, rating: 4.5, badge: "New" },
  { id: "p006", name: "Cargo Pants", price: 195000, category: "fashion", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&q=80", description: "Relaxed fit cargo pants with multiple pockets for utility and style.", stock: 30, sold: 145, rating: 4.4 },
  { id: "p007", name: "Vitamin C Serum", price: 120000, category: "beauty", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&q=80", description: "Brightening serum with 20% Vitamin C for radiant, even-toned skin.", stock: 25, sold: 278, rating: 4.8, badge: "Best Seller" },
  { id: "p008", name: "Lip Tint Set", price: 75000, category: "beauty", image: "https://images.unsplash.com/photo-1586495777744-4e6232bf2ebb?w=400&q=80", description: "Set of 4 long-lasting lip tints in trendy Korean-inspired shades.", stock: 45, sold: 201, rating: 4.6 },
  { id: "p009", name: "Ceramic Plant Pot", price: 65000, category: "home", image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&q=80", description: "Minimalist ceramic pot perfect for indoor plants and home decoration.", stock: 20, sold: 93, rating: 4.5 },
  { id: "p010", name: "LED Desk Lamp", price: 185000, category: "home", image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&q=80", description: "Eye-care LED lamp with adjustable color temperature and brightness.", stock: 12, sold: 67, rating: 4.7 },
  { id: "p011", name: "Yoga Mat Premium", price: 250000, originalPrice: 320000, category: "sports", image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=400&q=80", description: "Non-slip 6mm thick yoga mat with carry strap, ideal for all yoga types.", stock: 18, sold: 134, rating: 4.8, badge: "Sale" },
  { id: "p012", name: "Protein Shaker", price: 55000, category: "sports", image: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400&q=80", description: "BPA-free 700ml shaker bottle with stainless mixing ball.", stock: 35, sold: 189, rating: 4.3 },
  { id: "p013", name: "Croissant Butter", price: 22000, category: "food", image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&q=80", description: "Freshly baked butter croissant – flaky, golden, and absolutely delicious.", stock: 30, sold: 445, rating: 4.9, badge: "Best Seller" },
  { id: "p014", name: "USB-C Hub 7-in-1", price: 320000, category: "electronics", image: "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400&q=80", description: "7-port USB-C hub with 4K HDMI, SD card reader, and 100W PD charging.", stock: 22, sold: 78, rating: 4.6, badge: "New" },
  { id: "p015", name: "Tote Bag Canvas", price: 95000, category: "fashion", image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=400&q=80", description: "Heavy-duty canvas tote bag with inner zip pocket and reinforced handles.", stock: 50, sold: 267, rating: 4.5 },
  { id: "p016", name: "Face Wash Gentle", price: 89000, category: "beauty", image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&q=80", description: "Gentle foam cleanser with ceramides and hyaluronic acid for all skin types.", stock: 40, sold: 223, rating: 4.7 },
];

export const salesData = [
  { month: "Jan", revenue: 12500000, transactions: 145 },
  { month: "Feb", revenue: 18200000, transactions: 201 },
  { month: "Mar", revenue: 15800000, transactions: 178 },
  { month: "Apr", revenue: 22100000, transactions: 256 },
  { month: "May", revenue: 19700000, transactions: 234 },
  { month: "Jun", revenue: 28500000, transactions: 312 },
  { month: "Jul", revenue: 24300000, transactions: 289 },
];

export const recentTransactions = [
  { id: "TRX001", customer: "Andi Pratama", items: 3, total: 183000, date: "2025-04-18", status: "completed", cashier: "Siti" },
  { id: "TRX002", customer: "Budi Santoso", items: 1, total: 450000, date: "2025-04-18", status: "completed", cashier: "Rina" },
  { id: "TRX003", customer: "Citra Dewi", items: 5, total: 327000, date: "2025-04-18", status: "pending", cashier: "Siti" },
  { id: "TRX004", customer: "Dini Rahayu", items: 2, total: 95000, date: "2025-04-17", status: "completed", cashier: "Rina" },
  { id: "TRX005", customer: "Eko Wijaya", items: 4, total: 612000, date: "2025-04-17", status: "completed", cashier: "Siti" },
  { id: "TRX006", customer: "Fani Lestari", items: 2, total: 160000, date: "2025-04-17", status: "refunded", cashier: "Rina" },
];
