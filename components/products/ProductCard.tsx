// components/products/ProductCard.tsx
"use client";

import { Star, Heart, Eye } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    category: string;
    rating: number;
    reviewCount: number;
    colors?: string[];
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-gray-800'];

  return (
    <div
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Container */}
      <div className="relative bg-gray-100 rounded-xl overflow-hidden aspect-square mb-4">
        {/* Product Image */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">👕</div>
            <p className="text-gray-500 text-sm">Product Preview</p>
          </div>
        </div>

        {/* Badges */}
        {product.originalPrice && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            SALE
          </div>
        )}

        {/* Action Buttons */}
        <div className={`absolute top-3 right-3 flex flex-col gap-2 transition-opacity ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <button
            className="bg-white p-2 rounded-full shadow hover:shadow-md"
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
          </button>
          <button className="bg-white p-2 rounded-full shadow hover:shadow-md">
            <Eye className="h-4 w-4" />
          </button>
        </div>

        {/* Quick View Overlay */}
        {isHovered && (
          <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
            <button className="w-full bg-white text-black py-2 rounded-lg font-semibold hover:bg-gray-100 transition">
              Quick View
            </button>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-2">
        <p className="text-sm text-gray-500 uppercase tracking-wider">
          {product.category}
        </p>
        <h3 className="font-medium text-gray-900 group-hover:text-accent transition">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < Math.floor(product.rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-1">
            ({product.reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Color Options */}
        <div className="flex gap-1">
          {colors.map((color, i) => (
            <div
              key={i}
              className={`w-4 h-4 rounded-full ${color} border border-gray-200`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}