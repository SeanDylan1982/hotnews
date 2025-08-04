import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Flame, MessageCircle, Eye, Clock, ArrowUp, ArrowDown, BarChart3, Users } from 'lucide-react';
import { useTrendingTopics, useTrendingArticles, useTrendingAnalytics } from '../hooks/useTrending';
import ArticleCard from '../components/ArticleCard';
import ArticleModal from '../components/ArticleModal';
import { Article } from '../types';

const Trending: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'1h' | '6h' | '24h' | '7d'>('24h');
  const [fullArticle, setFullArticle] = useState<Article | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { topics, loading: topicsLoading } = useTrendingTopics(selectedTimeframe);
  const { articles: trendingArticles, loading: articlesLoading } = useTrendingArticles(selectedTimeframe, 6);
  const { analytics, loading: analyticsLoading } = useTrendingAnalytics(selectedTimeframe);

  const timeframes: Array<{ value: '1h' | '6h' | '24h' | '7d'; label: string; description: string }> = [
    { value: '1h', label: '1 Hour', description: 'Breaking news & hot takes' },
    { value: '6h', label: '6 Hours', description: 'Rising discussions' },
    { value: '24h', label: '24 Hours', description: 'Daily trending topics' },
    { value: '7d', label: '7 Days', description: 'Weekly hot topics' }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'hot':
        return <Flame className="w-5 h-5 text-red-500" />;
      case 'up':
        return <ArrowUp className="w-5 h-5 text-green-500" />;
      case 'down':
        return <ArrowDown className="w-5 h-5 text-red-500" />;
      case 'new':
        return <TrendingUp className="w-5 h-5 text-blue-500" />;
      default:
        return <TrendingUp className="w-5 h-5 text-accent-500" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'hot':
        return 'bg-red-50 border-red-200 text-red-700';
      case 'up':
        return 'bg-green-50 border-green-200 text-green-700';
      case 'down':
        return 'bg-red-50 border-red-200 text-red-700';
      case 'new':
        return 'bg-blue-50 border-blue-200 text-blue-700';
      default:
        return 'bg-accent-50 border-accent-200 text-accent-700';
    }
  };

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
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-red-600 via-orange-600 to-yellow-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white text-sm font-medium mb-6">
              <Flame className="w-4 h-4 mr-2 animate-pulse" />
              Live Trending Topics
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              What's Trending Now
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Discover the hottest debates, controversial topics, and trending discussions in technology and science.
            </p>
          </motion.div>

          {/* Analytics Overview */}
          {!analyticsLoading && analytics && (
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="flex items-center space-x-2 mb-2">
                  <Users className="w-5 h-5 text-white/80" />
                  <span className="text-white/80 text-sm">Total Engagement</span>
                </div>
                <div className="text-2xl font-bold text-white">
                  {analytics.totalEngagement.toLocaleString()}
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="flex items-center space-x-2 mb-2">
                  <BarChart3 className="w-5 h-5 text-white/80" />
                  <span className="text-white/80 text-sm">Active Topics</span>
                </div>
                <div className="text-2xl font-bold text-white">
                  {analytics.activeTopics}
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-white/80" />
                  <span className="text-white/80 text-sm">Growth Rate</span>
                </div>
                <div className="text-2xl font-bold text-white">
                  +{analytics.growthRate}%
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="w-5 h-5 text-white/80" />
                  <span className="text-white/80 text-sm">Timeframe</span>
                </div>
                <div className="text-2xl font-bold text-white">
                  {selectedTimeframe}
                </div>
              </div>
            </motion.div>
          )}

          {/* Timeframe Filter */}
          <motion.div
            className="flex justify-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-white/10 backdrop-blur-sm rounded-xl p-2 border border-white/20">
              {timeframes.map((timeframe) => (
                <button
                  key={timeframe.value}
                  onClick={() => setSelectedTimeframe(timeframe.value)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    selectedTimeframe === timeframe.value
                      ? 'bg-white text-orange-600 shadow-md'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <div className="font-semibold">{timeframe.label}</div>
                  <div className="text-xs opacity-80">{timeframe.description}</div>
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trending Topics */}
      <section className="py-20 bg-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl font-bold text-primary-900 mb-4">
              Trending Topics & Debates
            </h2>
            <p className="text-primary-600">
              Hot takes, controversial discussions, and emerging trends in the last {selectedTimeframe}
            </p>
          </motion.div>

          {topicsLoading ? (
            <div className="text-center py-16">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-accent-500"></div>
              <p className="mt-4 text-primary-600">Loading trending topics...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {topics.map((topic, index) => (
                <motion.div
                  key={topic.id}
                  className={`p-6 rounded-xl border-2 ${getTrendColor(topic.trend)} hover:shadow-lg transition-all duration-300 cursor-pointer`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ scale: 1.02, y: -2 }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      {getTrendIcon(topic.trend)}
                      <span className="text-sm font-semibold uppercase tracking-wide">
                        {topic.category}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-xs bg-white/50 px-2 py-1 rounded-full mb-1">
                        {topic.timeframe}
                      </div>
                      <div className="text-xs font-semibold">
                        {topic.growthRate > 0 ? '+' : ''}{topic.growthRate}%
                      </div>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold mb-2 leading-tight">
                    {topic.title}
                  </h3>
                  
                  <p className="text-sm mb-4 opacity-80 leading-relaxed">
                    {topic.description}
                  </p>

                  {/* Keywords */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {topic.keywords.slice(0, 3).map((keyword, idx) => (
                      <span key={idx} className="text-xs bg-white/30 px-2 py-1 rounded-full">
                        {keyword}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center space-x-1">
                        <MessageCircle size={12} />
                        <span>{topic.engagementScore.toLocaleString()}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Eye size={12} />
                        <span>{topic.articles} articles</span>
                      </span>
                    </div>
                    <span className="font-semibold">
                      #{index + 1} Trending
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Trending Articles */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="text-2xl font-bold text-primary-900 mb-8 text-center">
              Trending Articles ({selectedTimeframe})
            </h3>

            {articlesLoading ? (
              <div className="text-center py-16">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-accent-500"></div>
                <p className="mt-4 text-primary-600">Loading trending articles...</p>
              </div>
            ) : trendingArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {trendingArticles.map((article, index) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    index={index}
                    onReadFull={handleReadFull}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔥</div>
                <h3 className="text-2xl font-bold text-primary-900 mb-2">No Trending Articles</h3>
                <p className="text-primary-600">
                  Check back soon for the latest trending content in this timeframe!
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <ArticleModal
        article={fullArticle}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default Trending;