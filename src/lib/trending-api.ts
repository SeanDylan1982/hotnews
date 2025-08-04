import { Article } from '../types';

export interface TrendingMetrics {
  articleId: string;
  views: number;
  likes: number;
  shares: number;
  comments: number;
  engagementScore: number;
  timeframe: string;
  timestamp: string;
}

export interface TrendingTopic {
  id: string;
  title: string;
  description: string;
  category: string;
  trend: 'up' | 'down' | 'hot' | 'new';
  engagementScore: number;
  timeframe: string;
  articles: number;
  growthRate: number;
  keywords: string[];
}

export class TrendingAPI {
  // Calculate engagement score based on multiple factors
  private calculateEngagementScore(metrics: {
    views: number;
    likes: number;
    shares: number;
    comments: number;
    publishedAt: string;
    timeframe: string;
  }): number {
    const { views, likes, shares, comments, publishedAt, timeframe } = metrics;
    
    // Time decay factor - newer content gets higher weight
    const now = new Date().getTime();
    const published = new Date(publishedAt).getTime();
    const ageInHours = (now - published) / (1000 * 60 * 60);
    
    // Different decay rates for different timeframes
    const decayRates = {
      '1h': 0.9,   // Very fast decay
      '6h': 0.7,   // Fast decay
      '24h': 0.5,  // Medium decay
      '7d': 0.2    // Slow decay
    };
    
    const decayRate = decayRates[timeframe as keyof typeof decayRates] || 0.5;
    const timeFactor = Math.exp(-ageInHours * decayRate);
    
    // Weighted engagement score
    const engagementScore = (
      views * 1 +           // Base engagement
      likes * 5 +           // Higher weight for likes
      shares * 10 +         // Even higher for shares
      comments * 15         // Highest for comments (active engagement)
    ) * timeFactor;
    
    return engagementScore;
  }

  // Get trending articles for a specific timeframe
  async getTrendingArticles(timeframe: '1h' | '6h' | '24h' | '7d', limit: number = 10): Promise<Article[]> {
    // In a real implementation, this would query the database
    // For now, we'll simulate with enhanced logic
    
    const timeframeHours = {
      '1h': 1,
      '6h': 6,
      '24h': 24,
      '7d': 168
    };
    
    const hoursBack = timeframeHours[timeframe];
    const cutoffTime = new Date(Date.now() - hoursBack * 60 * 60 * 1000);
    
    // This would be a real database query in production:
    /*
    SELECT a.*, 
           COUNT(v.id) as recent_views,
           COUNT(l.id) as recent_likes,
           COUNT(s.id) as recent_shares,
           COUNT(c.id) as recent_comments
    FROM articles a
    LEFT JOIN views v ON a.id = v.article_id AND v.created_at > $cutoffTime
    LEFT JOIN likes l ON a.id = l.article_id AND l.created_at > $cutoffTime
    LEFT JOIN shares s ON a.id = s.article_id AND s.created_at > $cutoffTime
    LEFT JOIN comments c ON a.id = c.article_id AND c.created_at > $cutoffTime
    WHERE a.published_at > $cutoffTime
    GROUP BY a.id
    ORDER BY engagement_score DESC
    LIMIT $limit
    */
    
    // Simulate the response
    return this.simulateTrendingArticles(timeframe, limit);
  }

  // Get trending topics (themes/keywords that are popular)
  async getTrendingTopics(timeframe: '1h' | '6h' | '24h' | '7d'): Promise<TrendingTopic[]> {
    // This would analyze article content, tags, and engagement patterns
    // to identify trending themes and topics
    
    const topics: TrendingTopic[] = [
      {
        id: '1',
        title: 'AI Consciousness Debate',
        description: 'Growing discussion around whether current AI models show signs of consciousness',
        category: 'AI Ethics',
        trend: 'hot',
        engagementScore: this.getTimeframedScore(15420, timeframe),
        timeframe,
        articles: 12,
        growthRate: 245,
        keywords: ['AI consciousness', 'sentient AI', 'AI ethics', 'machine consciousness']
      },
      {
        id: '2',
        title: 'Quantum Internet Breakthrough',
        description: 'Scientists achieve record-breaking quantum entanglement over 1000km',
        category: 'Quantum Computing',
        trend: 'up',
        engagementScore: this.getTimeframedScore(8930, timeframe),
        timeframe,
        articles: 8,
        growthRate: 180,
        keywords: ['quantum internet', 'quantum entanglement', 'quantum communication']
      },
      {
        id: '3',
        title: 'CRISPR Gene Drive Controversy',
        description: 'Heated debate over releasing gene-edited mosquitoes in the wild',
        category: 'Biotechnology',
        trend: 'up',
        engagementScore: this.getTimeframedScore(12340, timeframe),
        timeframe,
        articles: 15,
        growthRate: 156,
        keywords: ['CRISPR', 'gene drive', 'genetic modification', 'mosquito control']
      },
      {
        id: '4',
        title: 'Web3 Sustainability Claims',
        description: 'Critics question environmental benefits of new blockchain protocols',
        category: 'Blockchain',
        trend: 'down',
        engagementScore: this.getTimeframedScore(6780, timeframe),
        timeframe,
        articles: 9,
        growthRate: -23,
        keywords: ['Web3 sustainability', 'blockchain environment', 'crypto energy']
      },
      {
        id: '5',
        title: 'Space Mining Rights',
        description: 'International tensions rise over asteroid mining territorial claims',
        category: 'Space Technology',
        trend: 'hot',
        engagementScore: this.getTimeframedScore(11250, timeframe),
        timeframe,
        articles: 7,
        growthRate: 312,
        keywords: ['space mining', 'asteroid mining', 'space law', 'space resources']
      },
      {
        id: '6',
        title: 'Neural Implant Privacy',
        description: 'Concerns over data security in brain-computer interfaces',
        category: 'Neurotechnology',
        trend: 'up',
        engagementScore: this.getTimeframedScore(9870, timeframe),
        timeframe,
        articles: 11,
        growthRate: 89,
        keywords: ['neural implants', 'brain privacy', 'BCI security', 'neuroethics']
      }
    ];

    // Sort by engagement score and filter based on timeframe relevance
    return topics
      .filter(topic => this.isRelevantForTimeframe(topic, timeframe))
      .sort((a, b) => b.engagementScore - a.engagementScore);
  }

  // Simulate real-time trending calculation
  private getTimeframedScore(baseScore: number, timeframe: string): number {
    const multipliers = {
      '1h': 0.3,   // Recent activity is more concentrated
      '6h': 0.6,   // Medium concentration
      '24h': 1.0,  // Base score
      '7d': 1.8    // Accumulated over longer period
    };
    
    const multiplier = multipliers[timeframe as keyof typeof multipliers] || 1.0;
    const randomVariation = 0.8 + Math.random() * 0.4; // ±20% variation
    
    return Math.floor(baseScore * multiplier * randomVariation);
  }

  // Check if topic is relevant for the given timeframe
  private isRelevantForTimeframe(topic: TrendingTopic, timeframe: string): boolean {
    // In a real system, this would check if the topic has sufficient
    // activity in the specified timeframe
    
    const minimumArticles = {
      '1h': 1,
      '6h': 2,
      '24h': 3,
      '7d': 5
    };
    
    const minimum = minimumArticles[timeframe as keyof typeof minimumArticles] || 3;
    return topic.articles >= minimum;
  }

  // Simulate trending articles with realistic data
  private async simulateTrendingArticles(timeframe: string, limit: number): Promise<Article[]> {
    // This would be replaced with actual database queries
    // For now, return mock data that changes based on timeframe
    
    const { articles } = await import('../data/articles');
    
    // Simulate different trending articles for different timeframes
    const trendingArticles = articles
      .map(article => ({
        ...article,
        // Simulate engagement metrics based on timeframe
        views: this.getTimeframedScore(article.views, timeframe),
        likes: this.getTimeframedScore(article.likes, timeframe),
        engagementScore: this.calculateEngagementScore({
          views: article.views,
          likes: article.likes,
          shares: Math.floor(article.likes * 0.1), // Estimate shares
          comments: Math.floor(article.likes * 0.05), // Estimate comments
          publishedAt: article.publishedAt,
          timeframe
        })
      }))
      .sort((a, b) => b.engagementScore - a.engagementScore)
      .slice(0, limit);
    
    return trendingArticles;
  }

  // Get trending analytics for admin dashboard
  async getTrendingAnalytics(timeframe: string) {
    return {
      totalEngagement: this.getTimeframedScore(125000, timeframe),
      activeTopics: 6,
      growthRate: timeframe === '1h' ? 15.2 : timeframe === '6h' ? 8.7 : timeframe === '24h' ? 12.4 : 5.8,
      topCategories: [
        { name: 'AI Ethics', engagement: this.getTimeframedScore(45000, timeframe) },
        { name: 'Quantum Computing', engagement: this.getTimeframedScore(32000, timeframe) },
        { name: 'Biotechnology', engagement: this.getTimeframedScore(28000, timeframe) },
        { name: 'Space Technology', engagement: this.getTimeframedScore(20000, timeframe) }
      ]
    };
  }
}

export const trendingAPI = new TrendingAPI();