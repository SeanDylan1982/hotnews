import { useState, useEffect } from 'react';
import { trendingAPI, TrendingTopic } from '../lib/trending-api';
import { Article } from '../types';

export const useTrendingTopics = (timeframe: '1h' | '6h' | '24h' | '7d') => {
  const [topics, setTopics] = useState<TrendingTopic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrendingTopics = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await trendingAPI.getTrendingTopics(timeframe);
        setTopics(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch trending topics');
        console.error('Error fetching trending topics:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingTopics();
    
    // Set up real-time updates (in production, this would use WebSockets or Server-Sent Events)
    const interval = setInterval(fetchTrendingTopics, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, [timeframe]);

  return { topics, loading, error };
};

export const useTrendingArticles = (timeframe: '1h' | '6h' | '24h' | '7d', limit: number = 10) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrendingArticles = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await trendingAPI.getTrendingArticles(timeframe, limit);
        setArticles(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch trending articles');
        console.error('Error fetching trending articles:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingArticles();
    
    // Real-time updates
    const interval = setInterval(fetchTrendingArticles, 30000); // Update every 30 seconds
    
    return () => clearInterval(interval);
  }, [timeframe, limit]);

  return { articles, loading, error };
};

export const useTrendingAnalytics = (timeframe: '1h' | '6h' | '24h' | '7d') => {
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const data = await trendingAPI.getTrendingAnalytics(timeframe);
        setAnalytics(data);
      } catch (err) {
        console.error('Error fetching trending analytics:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
    
    // Update analytics every 2 minutes
    const interval = setInterval(fetchAnalytics, 120000);
    
    return () => clearInterval(interval);
  }, [timeframe]);

  return { analytics, loading };
};