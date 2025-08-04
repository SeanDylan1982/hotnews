import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Cpu, Link, Dna, Rocket, Shield, ArrowRight, TrendingUp } from 'lucide-react';
import { useCategories } from '../hooks/useCategories';
import { useArticles } from '../hooks/useArticles';
import ArticleCard from '../components/ArticleCard';
import ArticleModal from '../components/ArticleModal';
import { Article } from '../types';

const iconMap = {
  Brain,
  Cpu,
  Link,
  Dna,
  Rocket,
  Shield,
};

const Categories: React.FC = () => {
  const { categories, loading: categoriesLoading } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [fullArticle, setFullArticle] = useState<Article | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { articles, loading: articlesLoading } = useArticles({
    category: selectedCategory || undefined,
    limit: 6
  });

  const handleReadFull = (article: Article) => {
    setFullArticle(article);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFullArticle(null);
  };

  return (
    <>
      <section className="py-20 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              Explore by Category
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Dive deep into specific technology domains and discover cutting-edge research in your areas of interest.
            </p>
          </motion.div>

          {/* Categories Grid */}
          {!categoriesLoading && (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {categories.map((category, index) => {
                const IconComponent = iconMap[category.icon as keyof typeof iconMap] || Brain;
                const isSelected = selectedCategory === category.slug;
                
                return (
                  <motion.div
                    key={category.id}
                    className={`group relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer ${
                      isSelected ? 'ring-2 ring-accent-400 bg-white/20' : ''
                    }`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.6 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedCategory(isSelected ? null : category.slug)}
                  >
                    <div className={`w-16 h-16 ${category.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-accent-300 transition-colors">
                      {category.name}
                    </h3>
                    
                    <p className="text-white/70 mb-6 leading-relaxed">
                      Explore the latest developments and research in {category.name.toLowerCase()}.
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-accent-300 font-semibold">
                        {isSelected ? 'Selected' : 'Explore'}
                      </span>
                      <ArrowRight className={`w-5 h-5 text-accent-300 group-hover:translate-x-1 transition-transform ${
                        isSelected ? 'rotate-90' : ''
                      }`} />
                    </div>

                    {/* Trending indicator */}
                    <div className="absolute top-4 right-4">
                      <div className="w-3 h-3 bg-success-400 rounded-full animate-pulse"></div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>
      </section>

      {/* Selected Category Articles */}
      {selectedCategory && (
        <section className="py-20 bg-primary-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-3xl font-bold text-primary-900 mb-4">
                Latest in {categories.find(c => c.slug === selectedCategory)?.name}
              </h2>
              <p className="text-primary-600">
                Recent articles and research in this category
              </p>
            </motion.div>

            {articlesLoading ? (
              <div className="text-center py-16">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-accent-500"></div>
                <p className="mt-4 text-primary-600">Loading articles...</p>
              </div>
            ) : articles.length > 0 ? (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {articles.map((article, index) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    index={index}
                    onReadFull={handleReadFull}
                  />
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">📚</div>
                <h3 className="text-2xl font-bold text-primary-900 mb-2">No Articles Yet</h3>
                <p className="text-primary-600">
                  We're working on adding more content to this category. Check back soon!
                </p>
              </div>
            )}

            {articles.length > 0 && (
              <motion.div
                className="text-center mt-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <button className="px-8 py-4 bg-accent-500 text-white font-semibold rounded-lg hover:bg-accent-600 transition-colors shadow-lg hover:shadow-xl">
                  View All Articles
                </button>
              </motion.div>
            )}
          </div>
        </section>
      )}

      <ArticleModal
        article={fullArticle}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default Categories;