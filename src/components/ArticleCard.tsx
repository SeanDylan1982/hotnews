import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Heart, Eye, BookOpen, X, Share2, Bookmark } from 'lucide-react';
import { Article } from '../types';
import { formatDistanceToNow } from 'date-fns';

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
  index?: number;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
  onReadFull?: (article: Article) => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ 
  article, 
  featured = false, 
  index = 0,
  isExpanded = false,
  onToggleExpand,
  onReadFull
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeOut"
      }
    },
    expanded: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };

  const imageVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent expansion when clicking on interactive elements
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    onToggleExpand?.();
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleReadFull = (e: React.MouseEvent) => {
    e.stopPropagation();
    onReadFull?.(article);
  };

  if (featured && !isExpanded) {
    return (
      <motion.article
        className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-primary-100 cursor-pointer"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover={{ y: -8 }}
        onClick={handleCardClick}
        layout
      >
        <div className="relative h-80 sm:h-96 overflow-auto-y">
          <motion.img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-fill"
            variants={imageVariants}
            whileHover="hover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
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
          <div className="absolute top-4 right-4">
            <span className={`px-3 py-1 ${article.category.color} text-white text-xs font-semibold rounded-full`}>
              {article.category.name}
            </span>
          </div>

          {/* Content Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <motion.h2
              className="text-2xl sm:text-3xl font-bold mb-3 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              {article.title}
            </motion.h2>
            <motion.p
              className="text-white/90 text-lg mb-4 line-clamp-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {article.excerpt}
            </motion.p>
            
            {/* Author & Meta */}
            <motion.div
              className="flex items-center justify-between"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center space-x-3">
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="w-10 h-10 rounded-full border-2 border-white/20"
                />
                <div>
                  <div className="font-semibold">{article.author.name}</div>
                  <div className="text-sm text-white/70">
                    {formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-sm text-white/80">
                <span className="flex items-center space-x-1">
                  <Clock size={16} />
                  <span>{article.readTime} min</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Eye size={16} />
                  <span>{article.views.toLocaleString()}</span>
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.article>
    );
  }

  return (
    <motion.article
      className={`group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-primary-100 cursor-pointer ${
        isExpanded ? 'col-span-full row-span-1' : ''
      }`}
      variants={cardVariants}
      initial="hidden"
      animate={isExpanded ? "expanded" : "visible"}
      whileHover={!isExpanded ? { y: -4 } : {}}
      onClick={handleCardClick}
      layout
      style={{
        zIndex: isExpanded ? 10 : 1,
      }}
    >
      <div className={`${isExpanded ? 'min-h-screen max-h-screen overflow-y-auto' : ''}`}>
        {/* Image Section */}
        <div className={`relative overflow-hidden ${isExpanded ? 'h-64 sm:h-80' : 'h-48'}`}>
          <motion.img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover"
            variants={imageVariants}
            whileHover={!isExpanded ? "hover" : {}}
          />
          
          {/* Close button for expanded state */}
          {isExpanded && (
            <motion.button
              className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-sm text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors z-20"
              onClick={(e) => {
                e.stopPropagation();
                onToggleExpand?.();
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <X size={20} />
            </motion.button>
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            {article.featured && (
              <span className="px-2 py-1 bg-accent-500 text-white text-xs font-semibold rounded-full">
                Featured
              </span>
            )}
            {article.trending && (
              <span className="px-2 py-1 bg-success-500 text-white text-xs font-semibold rounded-full">
                Trending
              </span>
            )}
          </div>

          {/* Category */}
          <div className="absolute top-3 right-3">
            <span className={`px-2 py-1 ${article.category.color} text-white text-xs font-semibold rounded-full`}>
              {article.category.name}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className={`p-5 ${isExpanded ? 'pb-8' : ''}`}>
          <h3 className={`font-bold text-primary-900 mb-2 group-hover:text-accent-600 transition-colors ${
            isExpanded ? 'text-2xl sm:text-3xl mb-4' : 'text-lg line-clamp-2'
          }`}>
            {article.title}
          </h3>
          
          <p className={`text-primary-600 mb-4 ${
            isExpanded ? 'text-lg mb-6' : 'text-sm line-clamp-2'
          }`}>
            {article.excerpt}
          </p>

          {/* Expanded Content */}
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="mb-6"
            >
              <div className="prose prose-lg max-w-none text-primary-700 leading-relaxed">
                {article.content.split('\n\n').slice(0, 5).map((paragraph, idx) => (
                  <p key={idx} className="mb-4">
                    {paragraph}
                  </p>
                ))}
                {article.content.split('\n\n').length > 5 && (
                  <div className="text-center mt-6">
                    <motion.button 
                      onClick={handleReadFull}
                      className="px-6 py-3 bg-accent-500 text-white rounded-lg hover:bg-accent-600 transition-colors font-semibold"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Read Full Article
                    </motion.button>
                  </div>
                )}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-primary-100">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-full hover:bg-primary-200 transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Author & Meta */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-8 h-8 rounded-full"
              />
              <div>
                <div className="text-sm font-medium text-primary-900">{article.author.name}</div>
                <div className="text-xs text-primary-500">
                  {formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })}
                </div>
              </div>
            </div>
          </div>

          {/* Stats & Actions */}
          <div className="flex items-center justify-between text-sm text-primary-500">
            <div className="flex items-center space-x-4">
              <span className="flex items-center space-x-1">
                <Clock size={14} />
                <span>{article.readTime} min</span>
              </span>
              <span className="flex items-center space-x-1">
                <Eye size={14} />
                <span>{article.views.toLocaleString()}</span>
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <motion.button
                className={`flex items-center space-x-1 px-2 py-1 rounded transition-colors ${
                  isLiked ? 'text-red-500' : 'text-primary-400 hover:text-red-500'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLike}
              >
                <Heart size={14} fill={isLiked ? 'currentColor' : 'none'} />
                <span>{article.likes + (isLiked ? 1 : 0)}</span>
              </motion.button>
              
              <motion.button
                className={`p-1 rounded transition-colors ${
                  isBookmarked ? 'text-accent-500' : 'text-primary-400 hover:text-accent-500'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBookmark}
              >
                <Bookmark size={14} fill={isBookmarked ? 'currentColor' : 'none'} />
              </motion.button>
              
              <motion.button
                className="p-1 text-primary-400 hover:text-accent-500 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleShare}
              >
                <Share2 size={14} />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default ArticleCard;