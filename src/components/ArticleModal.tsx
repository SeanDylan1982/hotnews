import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Eye, Heart, Share2, Bookmark, User } from 'lucide-react';
import { Article } from '../types';
import { formatDistanceToNow } from 'date-fns';

interface ArticleModalProps {
  article: Article | null;
  isOpen: boolean;
  onClose: () => void;
}

const ArticleModal: React.FC<ArticleModalProps> = ({ article, isOpen, onClose }) => {
  if (!article) return null;

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
            className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleBackdropClick}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
              {/* Header */}
              <div className="relative">
                <img
                  src={article.coverImage}
                  alt={article.title}
                  className="w-full h-64 sm:h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Close Button */}
                <motion.button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-sm text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X size={20} />
                </motion.button>

                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  {article.featured && (
                    <span className="px-3 py-1 bg-accent-500 text-white text-xs font-semibold rounded-full">
                      Featured
                    </span>
                  )}
                  {article.trending && (
                    <span className="px-3 py-1 bg-success-500 text-white text-xs font-semibold rounded-full">
                      Trending
                    </span>
                  )}
                </div>

                {/* Category */}
                <div className="absolute bottom-4 left-4">
                  <span className={`px-3 py-1 ${article.category.color} text-white text-sm font-semibold rounded-full`}>
                    {article.category.name}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8 max-h-[calc(90vh-20rem)] overflow-y-auto">
                {/* Title */}
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-900 mb-4 leading-tight">
                  {article.title}
                </h1>

                {/* Author & Meta */}
                <div className="flex items-center justify-between mb-6 pb-6 border-b border-primary-200">
                  <div className="flex items-center space-x-3">
                    <img
                      src={article.author.avatar}
                      alt={article.author.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <div className="font-semibold text-primary-900 flex items-center space-x-2">
                        <span>{article.author.name}</span>
                        {article.author.verified && (
                          <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                            <User size={10} className="text-white" />
                          </div>
                        )}
                      </div>
                      <div className="text-sm text-primary-500">
                        {formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-primary-500">
                    <span className="flex items-center space-x-1">
                      <Clock size={16} />
                      <span>{article.readTime} min read</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Eye size={16} />
                      <span>{article.views.toLocaleString()}</span>
                    </span>
                  </div>
                </div>

                {/* Excerpt */}
                <div className="text-lg text-primary-600 mb-8 leading-relaxed font-medium">
                  {article.excerpt}
                </div>

                {/* Full Content */}
                <div className="prose prose-lg max-w-none text-primary-700 leading-relaxed">
                  {article.content.split('\n\n').map((paragraph, idx) => {
                    if (paragraph.startsWith('## ')) {
                      return (
                        <h2 key={idx} className="text-2xl font-bold text-primary-900 mt-8 mb-4 pb-2 border-b border-primary-200">
                          {paragraph.replace('## ', '')}
                        </h2>
                      );
                    }
                    if (paragraph.startsWith('### ')) {
                      return (
                        <h3 key={idx} className="text-xl font-semibold text-primary-900 mt-6 mb-3">
                          {paragraph.replace('### ', '')}
                        </h3>
                      );
                    }
                    if (paragraph.startsWith('- ')) {
                      const listItems = paragraph.split('\n').filter(item => item.startsWith('- '));
                      return (
                        <ul key={idx} className="list-disc list-inside space-y-2 mb-4">
                          {listItems.map((item, itemIdx) => (
                            <li key={itemIdx} className="text-primary-700">
                              {item.replace('- ', '')}
                            </li>
                          ))}
                        </ul>
                      );
                    }
                    return (
                      <p key={idx} className="mb-4 text-primary-700 leading-relaxed">
                        {paragraph}
                      </p>
                    );
                  })}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-primary-200">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-full hover:bg-primary-200 transition-colors cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-primary-200">
                  <div className="flex items-center space-x-4">
                    <motion.button
                      className="flex items-center space-x-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Heart size={18} />
                      <span>{article.likes}</span>
                    </motion.button>
                    
                    <motion.button
                      className="flex items-center space-x-2 px-4 py-2 bg-accent-50 text-accent-600 rounded-lg hover:bg-accent-100 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Bookmark size={18} />
                      <span>Save</span>
                    </motion.button>
                  </div>

                  <motion.button
                    className="flex items-center space-x-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: article.title,
                          text: article.excerpt,
                          url: window.location.href
                        });
                      } else {
                        navigator.clipboard.writeText(window.location.href);
                      }
                    }}
                  >
                    <Share2 size={18} />
                    <span>Share</span>
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ArticleModal;