import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ArticleCard from './ArticleCard';
import ArticleModal from './ArticleModal';
import CategoryFilter from './CategoryFilter';
import { useArticles } from '../hooks/useArticles';
import { useCategories } from '../hooks/useCategories';
import { Article } from '../types';

const ArticleGrid: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedArticleId, setExpandedArticleId] = useState<string | null>(null);
  const [fullArticle, setFullArticle] = useState<Article | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { articles, loading: articlesLoading, error: articlesError } = useArticles({
    category: selectedCategory || undefined
  });
  
  const { categories, loading: categoriesLoading } = useCategories();

  const featuredArticles = articles.filter(article => article.featured);
  const regularArticles = articles.filter(article => !article.featured);

  const handleToggleExpand = (articleId: string) => {
    setExpandedArticleId(expandedArticleId === articleId ? null : articleId);
  };

  const handleReadFull = (article: Article) => {
    setFullArticle(article);
    setIsModalOpen(true);
    // Close expanded view if open
    setExpandedArticleId(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFullArticle(null);
  };

  if (articlesError) {
    return (
      <section id="articles-section" className="py-20 bg-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-red-600 mb-4">⚠️</div>
          <h3 className="text-2xl font-bold text-primary-900 mb-2">Unable to Load Articles</h3>
          <p className="text-primary-600 mb-4">{articlesError}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-accent-500 text-white rounded-lg hover:bg-accent-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="articles-section" className="py-20 bg-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-primary-900 mb-6">
              Latest Research Articles
            </h2>
            <p className="text-xl text-primary-600 max-w-3xl mx-auto">
              Dive deep into cutting-edge technology research, AI breakthroughs, and emerging trends shaping our future.
            </p>
          </motion.div>

          {/* Category Filter */}
          {!categoriesLoading && categories.length > 0 && (
            <motion.div
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
            </motion.div>
          )}

          {/* Loading State */}
          {articlesLoading && (
            <div className="text-center py-16">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-accent-500"></div>
              <p className="mt-4 text-primary-600">Loading articles...</p>
            </div>
          )}

          {/* Featured Articles */}
          {!articlesLoading && featuredArticles.length > 0 && (
            <motion.div
              className="mb-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold text-primary-900 mb-8">Featured Articles</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 auto-rows-max">
                {featuredArticles.map((article, index) => (
                  <div 
                    key={article.id}
                    className={expandedArticleId === article.id ? 'col-span-full' : ''}
                  >
                    <ArticleCard
                      article={article}
                      featured={true}
                      index={index}
                      isExpanded={expandedArticleId === article.id}
                      onToggleExpand={() => handleToggleExpand(article.id)}
                      onReadFull={handleReadFull}
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Regular Articles */}
          {!articlesLoading && regularArticles.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold text-primary-900 mb-8">
                {featuredArticles.length > 0 ? 'More Articles' : 'All Articles'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-max">
                {regularArticles.map((article, index) => {
                  const isExpanded = expandedArticleId === article.id;
                  return (
                    <div 
                      key={article.id}
                      className={isExpanded ? 'col-span-full' : ''}
                    >
                      <ArticleCard
                        article={article}
                        index={index + featuredArticles.length}
                        isExpanded={isExpanded}
                        onToggleExpand={() => handleToggleExpand(article.id)}
                        onReadFull={handleReadFull}
                      />
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* No Articles Found */}
          {!articlesLoading && articles.length === 0 && (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-primary-900 mb-2">No Articles Found</h3>
              <p className="text-primary-600">
                {selectedCategory 
                  ? "We couldn't find any articles in this category. Try selecting a different topic."
                  : "No articles are available at the moment. Please check back later."
                }
              </p>
            </motion.div>
          )}

          {/* Load More Button */}
          {!articlesLoading && articles.length > 0 && !expandedArticleId && (
            <motion.div
              className="text-center mt-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <motion.button
                className="px-8 py-4 bg-accent-500 text-white font-semibold rounded-lg hover:bg-accent-600 transition-colors shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Load More Articles
              </motion.button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Full Article Modal */}
      <ArticleModal
        article={fullArticle}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default ArticleGrid;