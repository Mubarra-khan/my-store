"use client";

import Link from 'next/link';
import { Shirt, Users, Baby } from 'lucide-react';
import { useState, useEffect } from 'react';

const categories = [
  {
    name: 'Men',
    href: '/category/men',
    icon: Shirt,
    description: 'Formal & Casual Wear',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-700',
    borderColor: 'border-blue-500',
    hoverColor: 'hover:border-blue-500',
  },
  {
    name: 'Women',
    href: '/category/women',
    icon: Users,
    description: 'Elegant Collections',
    bgColor: 'bg-pink-50',
    textColor: 'text-pink-700',
    borderColor: 'border-pink-500',
    hoverColor: 'hover:border-pink-500',
  },
  {
    name: 'Kids',
    href: '/category/kids',
    icon: Baby,
    description: 'Comfortable & Playful',
    bgColor: 'bg-green-50',
    textColor: 'text-green-700',
    borderColor: 'border-green-500',
    hoverColor: 'hover:border-green-500',
  },
];

export default function CategoryGrid() {
  const [currentHoverIndex, setCurrentHoverIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHoverIndex((prevIndex) => (prevIndex + 1) % categories.length);
    }, 3000); // Change hover every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <section className="py-16 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-bold text-center mb-12 animate-fade-in">
            Shop by Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, index) => {
              const Icon = category.icon;
              const isAutoHovered = currentHoverIndex === index;
              
              return (
                <Link
                  key={category.name}
                  href={category.href}
                  className={`
                    ${category.bgColor} 
                    rounded-2xl p-8 text-center 
                    transition-all duration-500 ease-in-out
                    relative overflow-hidden
                    border-2 ${isAutoHovered ? category.borderColor : 'border-transparent'}
                    transform ${isAutoHovered ? 'scale-105 -translate-y-2' : 'scale-100 translate-y-0'}
                    shadow-lg hover:shadow-2xl
                    cursor-pointer
                  `}
                  onMouseEnter={() => setCurrentHoverIndex(index)}
                  onMouseLeave={() => {}}
                >
                  {/* Hover shine effect */}
                  <div className={`
                    absolute top-0 left-full w-full h-full 
                    bg-gradient-to-r from-transparent via-white/30 to-transparent
                    transition-all duration-700
                    ${isAutoHovered ? 'left-full' : '-left-full'}
                  `}></div>
                  
                  {/* Pulsing border animation */}
                  <div className={`
                    absolute inset-0 rounded-2xl border-2 ${category.borderColor}
                    opacity-0 ${isAutoHovered ? 'animate-pulse-border' : ''}
                  `}></div>

                  {/* Icon with animation */}
                  <div className={`
                    inline-flex items-center justify-center w-16 h-16 rounded-full bg-white mb-4
                    relative z-10
                    transform ${isAutoHovered ? 'rotate-12 scale-110' : 'rotate-0 scale-100'}
                    transition-all duration-500
                    shadow-lg
                  `}>
                    <Icon className={`
                      h-8 w-8 ${category.textColor}
                      transform ${isAutoHovered ? 'scale-125' : 'scale-100'}
                      transition-transform duration-500
                    `} />
                    
                    {/* Pulsing circle behind icon */}
                    <div className={`
                      absolute inset-0 rounded-full ${category.textColor.replace('text-', 'bg-')}
                      opacity-10 ${isAutoHovered ? 'animate-ping' : ''}
                    `}></div>
                  </div>
                  
                  <h3 className={`
                    text-2xl font-bold mb-2 relative z-10
                    transform ${isAutoHovered ? 'translate-y-1' : 'translate-y-0'}
                    transition-transform duration-500
                    ${isAutoHovered ? category.textColor : 'text-gray-900'}
                  `}>
                    {category.name}
                  </h3>
                  
                  <p className={`
                    text-gray-600 relative z-10
                    transform ${isAutoHovered ? 'translate-y-1' : 'translate-y-0'}
                    transition-transform duration-500
                    ${isAutoHovered ? 'font-medium' : 'font-normal'}
                  `}>
                    {category.description}
                  </p>

                  {/* Floating animation indicators */}
                  {isAutoHovered && (
                    <div className="absolute bottom-4 right-4 flex space-x-1">
                      {[1, 2, 3].map((dot) => (
                        <div 
                          key={dot}
                          className={`
                            w-2 h-2 rounded-full 
                            ${category.bgColor.replace('bg-', 'bg-').replace('-50', '-400')}
                            animate-bounce
                          `}
                          style={{ animationDelay: `${dot * 200}ms` }}
                        ></div>
                      ))}
                    </div>
                  )}

                  {/* Arrow indicator */}
                  <div className={`
                    absolute top-4 right-4 text-gray-400
                    transform ${isAutoHovered ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}
                    transition-all duration-500
                  `}>
                    →
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }

        @keyframes pulse-border {
          0%, 100% {
            opacity: 0;
            transform: scale(1);
          }
          50% {
            opacity: 0.3;
            transform: scale(1.02);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animate-pulse-border {
          animation: pulse-border 2s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </>
  );
}