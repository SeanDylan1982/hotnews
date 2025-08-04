import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Clock, TrendingUp, Filter, ArrowRight } from 'lucide-react';
import { useArticles } from '../hooks/useArticles';
import { useCategories } from '../hooks/useCategories';
import { Article, Category } from '../types';
import { formatDistanceToNow } from 'date-fns';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onArticleSelect: (article: Article) => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onArticleSelect }) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<Article[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { articles } = useArticles();
  const { categories } = useCategories();

  // Popular search terms
  const popularSearches = [
    'Artificial Intelligence',
    'Quantum Computing',
    'CRISPR',
    'Neural Networks',
    'Blockchain',
    'Space Technology',
    'Gene Editing',
    'Machine Learning'
  ];

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('deepresearch_recent_searches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Focus search input when modal opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Perform search
  useEffect(() => {
    if (!query.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    
    // Simulate search delay for better UX
    const searchTimeout = setTimeout(() => {
      const filtered = articles.filter(article => {
        const matchesQuery = 
          article.title.toLowerCase().includes(query.toLowerCase()) ||
          article.excerpt.toLowerCase().includes(query.toLowerCase()) ||
          article.content.toLowerCase().includes(query.toLowerCase()) ||
          article.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())) ||
          article.author.name.toLowerCase().includes(query.toLowerCase()) ||
          article.category.name.toLowerCase().includes(query.toLowerCase());

        const matchesCategory = !selectedCategory || 
          article.category.slug === selectedCategory;

        return matchesQuery && matchesCategory;
      });

      // Sort by relevance (title matches first, then trending, then by date)
      filtered.sort((a, b) => {
        const aTitle = a.title.toLowerCase().includes(query.toLowerCase());
        const bTitle = b.title.toLowerCase().includes(query.toLowerCase());
        
        if (aTitle && !bTitle) return -1;
        if (!aTitle && bTitle) return 1;
        if (a.trending && !b.trending) return -1;
        if (!a.trending && b.trending) return 1;
        
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      });

      setSearchResults(filtered);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(searchTimeout);
  }, [query, selectedCategory, articles]);

  const handleSearch = (searchTerm: string) => {
    setQuery(searchTerm);
    
    // Add to recent searches
    if (searchTerm.trim() && !recentSearches.includes(searchTerm)) {
      const updated = [searchTerm, ...recentSearches.slice(0, 4)];
      setRecentSearches(updated);
      localStorage.setItem('deepresearch_recent_searches', JSON.stringify(updated));
    }
  };

  const handleArticleClick = (article: Article) => {
    onArticleSelect(article);
    onClose();
  };

  const clearSearch = () => {
    setQuery('');
    setSelectedCategory(null);
    setSearchResults([]);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleBackdropClick}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[80vh] overflow-hidden">
              {/* Search Header */}
              <div className="p-6 border-b border-primary-200">
                <div className="flex items-center space-x-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary-400" size={20} />
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search articles, topics, authors..."
                      className="w-full pl-12 pr-12 py-4 bg-primary-50 border border-primary-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent text-lg"
                    />
                    {query && (
                      <button
                        onClick={clearSearch}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-primary-400 hover:text-primary-600"
                      >
                        <X size={20} />
                      </button>
                    )}
                  </div>
                  
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`p-3 rounded-xl border transition-colors ${
                      showFilters || selectedCategory
                        ? 'bg-accent-50 border-accent-200 text-accent-600'
                        : 'bg-primary-50 border-primary-200 text-primary-600 hover:bg-primary-100'
                    }`}
                  >
                    <Filter size={20} />
                  </button>
                  
                  <button
                    onClick={onClose}
                    className="p-3 bg-primary-100 text-primary-600 rounded-xl hover:bg-primary-200 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Filters */}
                <AnimatePresence>
                  {showFilters && (
                    <motion.div
                      className="mt-4 pt-4 border-t border-primary-200"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => setSelectedCategory(null)}
                          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                            !selectedCategory
                              ? 'bg-accent-500 text-white'
                              : 'bg-primary-100 text-primary-700 hover:bg-primary-200'
                          }`}
                        >
                          All Categories
                        </button>
                        {categories.map((category) => (
                          <button
                            key={category.id}
                            onClick={() => setSelectedCategory(
                              selectedCategory === category.slug ? null : category.slug
                            )}
                            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                              selectedCategory === category.slug
                                ? 'bg-accent-500 text-white'
                                : 'bg-primary-100 text-primary-700 hover:bg-primary-200'
                            }`}
                          >
                            {category.name}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Search Content */}
              <div className="max-h-[60vh] overflow-y-auto">
                {!query ? (
                  /* Default State - Recent & Popular Searches */
                  <div className="p-6 space-y-6">
                    {recentSearches.length > 0 && (
                      <div>
                        <div className="flex items-center space-x-2 mb-3">
                          <Clock size={16} className="text-primary-500" />
                          <h3 className="font-semibold text-primary-900">Recent Searches</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {recentSearches.map((search, index) => (
                            <button
                              key={index}
                              onClick={() => handleSearch(search)}
                              className="px-3 py-2 bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100 transition-colors text-sm"
                            >
                              {search}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div>
                      <div className="flex items-center space-x-2 mb-3">
                        <TrendingUp size={16} className="text-accent-500" />
                        <h3 className="font-semibold text-primary-900">Popular Searches</h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {popularSearches.map((search, index) => (
                          <button
                            key={index}
                            onClick={() => handleSearch(search)}
                            className="px-3 py-2 bg-accent-50 text-accent-700 rounded-lg hover:bg-accent-100 transition-colors text-sm"
                          >
                            {search}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Quick Categories */}
                    <div>
                      <h3 className="font-semibold text-primary-900 mb-3">Browse by Category</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {categories.slice(0, 6).map((category) => (
                          <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.slug)}
                            className="flex items-center space-x-3 p-3 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors text-left"
                          >
                            <div className={`w-8 h-8 ${category.color} rounded-lg flex items-center justify-center`}>
                              <span className="text-white text-xs">📊</span>
                            </div>
                            <span className="font-medium text-primary-900">{category.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : isSearching ? (
                  /* Loading State */
                  <div className="p-6 text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-accent-500 mb-4"></div>
                    <p className="text-primary-600">Searching...</p>
                  </div>
                ) : searchResults.length > 0 ? (
                  /* Search Results */
                  <div className="p-6">
                    <div className="mb-4">
                      <p className="text-primary-600">
                        Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for "{query}"
                      </p>
                    </div>
                    <div className="space-y-4">
                      {searchResults.map((article, index) => (
                        <motion.div
                          key={article.id}
                          className="group p-4 bg-primary-50 rounded-xl hover:bg-primary-100 transition-colors cursor-pointer"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          onClick={() => handleArticleClick(article)}
                        >
                          <div className="flex items-start space-x-4">
                            <img
                              src={article.coverImage}
                              alt={article.title}
                              className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2 mb-1">
                                <span className={`px-2 py-1 ${article.category.color} text-white text-xs rounded-full`}>
                                  {article.category.name}
                                </span>
                                {article.trending && (
                                  <span className="px-2 py-1 bg-red-100 text-red-600 text-xs rounded-full">
                                    Trending
                                  </span>
                                )}
                              </div>
                              <h4 className="font-semibold text-primary-900 group-hover:text-accent-600 transition-colors line-clamp-2 mb-1">
                                {article.title}
                              </h4>
                              <p className="text-sm text-primary-600 line-clamp-2 mb-2">
                                {article.excerpt}
                              </p>
                              <div className="flex items-center space-x-4 text-xs text-primary-500">
                                <span>{article.author.name}</span>
                                <span>{formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })}</span>
                                <span>{article.readTime} min read</span>
                              </div>
                            </div>
                            <ArrowRight className="w-5 h-5 text-primary-400 group-hover:text-accent-500 group-hover:translate-x-1 transition-all flex-shrink-0" />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ) : (
                  /* No Results */
                  <div className="p-6 text-center">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-xl font-semibold text-primary-900 mb-2">No results found</h3>
                    <p className="text-primary-600 mb-4">
                      We couldn't find any articles matching "{query}". Try different keywords or browse by category.
                    </p>
                    <button
                      onClick={clearSearch}
                      className="px-4 py-2 bg-accent-500 text-white rounded-lg hover:bg-accent-600 transition-colors"
                    >
                      Clear Search
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;