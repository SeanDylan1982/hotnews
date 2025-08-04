import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, ChevronDown } from 'lucide-react';
import { Category } from '../types';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Desktop Filter */}
      <div className="hidden md:flex items-center space-x-4">
        <motion.button
          onClick={() => onCategoryChange(null)}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            selectedCategory === null
              ? 'bg-accent-500 text-white shadow-md'
              : 'bg-white text-primary-700 hover:bg-primary-50 border border-primary-200'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          All Topics
        </motion.button>
        {categories.map((category) => (
          <motion.button
            key={category.id}
            onClick={() => onCategoryChange(category.slug)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedCategory === category.slug
                ? 'bg-accent-500 text-white shadow-md'
                : 'bg-white text-primary-700 hover:bg-primary-50 border border-primary-200'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category.name}
          </motion.button>
        ))}
      </div>

      {/* Mobile Dropdown */}
      <div className="md:hidden relative">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full px-4 py-3 bg-white border border-primary-200 rounded-lg text-primary-700 font-medium"
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center space-x-2">
            <Filter size={16} />
            <span>
              {selectedCategory 
                ? categories.find(c => c.slug === selectedCategory)?.name 
                : 'All Topics'
              }
            </span>
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown size={16} />
          </motion.div>
        </motion.button>

        {/* Dropdown Menu */}
        {isOpen && (
          <motion.div
            className="absolute top-full left-0 right-0 mt-2 bg-white border border-primary-200 rounded-lg shadow-lg z-20"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="py-2">
              <button
                onClick={() => {
                  onCategoryChange(null);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2 hover:bg-primary-50 transition-colors ${
                  selectedCategory === null ? 'text-accent-600 font-semibold' : 'text-primary-700'
                }`}
              >
                All Topics
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    onCategoryChange(category.slug);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 hover:bg-primary-50 transition-colors ${
                    selectedCategory === category.slug ? 'text-accent-600 font-semibold' : 'text-primary-700'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CategoryFilter;