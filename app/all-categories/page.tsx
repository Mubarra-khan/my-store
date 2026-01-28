import Link from 'next/link';
import './AllCategories.css'; // ✅ CSS file import karein

export default function AllCategoriesPage() {
  const categories = [
    { 
      name: 'Men', 
      href: '/category/men', 
      desc: "Hoodies, Jackets, Shirts, Suits, Trousers, T-Shirts",
      count: "200+ Products",
      color: '#3B82F6'
    },
    { 
      name: 'Women', 
      href: '/category/women', 
      desc: "Dresses, Trousers, Shirts, Twinning Sets",
      count: "180+ Products",
      color: '#EC4899'
    },
    { 
      name: 'Kids', 
      href: '/category/kids', 
      desc: "Boys & Girls - Jackets, Shirts, Trousers, T-Shirts, Dresses",
      count: "150+ Products",
      color: '#10B981'
    },
    { 
      name: 'Newborns', 
      href: '/category/newborns', 
      desc: "Baby Dresses & Essentials",
      count: "80+ Products",
      color: '#FBBF24'
    },
    { 
      name: 'Sale', 
      href: '/sale', 
      desc: "Discounted items",
      count: "100+ Products",
      color: '#EF4444'
    },
  ];

  return (
    <div className="categories-container"> {/* ✅ Class name use karein */}
      <h1 className="categories-title">
        All Categories
      </h1>
      <p className="categories-subtitle">
        Browse through all our product categories
      </p>
      
      <div className="categories-list">
        {categories.map((cat) => (
          <Link 
            key={cat.name} 
            href={cat.href} 
            className="category-card" // ✅ Class name for hover
            style={{
              '--category-color': cat.color // ✅ CSS variable for color
            } as React.CSSProperties}
          >
            <div className="category-icon">
              <div className="category-dot"></div>
            </div>
            <div className="category-content">
              <h3>{cat.name}</h3>
              <p>{cat.desc}</p>
              <span className="category-count">{cat.count}</span>
            </div>
            <div className="category-arrow">
              <div className="arrow-dot"></div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}