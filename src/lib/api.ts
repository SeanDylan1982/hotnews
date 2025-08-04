import { localAPI } from './local-api';

// Use local API instead of remote API or Supabase
export const api = {
  // Articles
  getArticles: (params?: Record<string, string>) => {
    const filters: any = {};
    
    if (params?.category) filters.category = params.category;
    if (params?.featured) filters.featured = params.featured === 'true';
    if (params?.trending) filters.trending = params.trending === 'true';
    if (params?.limit) filters.limit = parseInt(params.limit);
    if (params?.skip) filters.offset = parseInt(params.skip);

    return localAPI.getArticles(filters);
  },

  getArticle: (slug: string) => localAPI.getArticle(slug),
  getFeaturedArticles: () => localAPI.getFeaturedArticles(),
  getTrendingArticles: () => localAPI.getTrendingArticles(),
  searchArticles: (query: string, filters?: { category?: string; limit?: number }) => 
    localAPI.searchArticles(query, filters),

  // Categories
  getCategories: () => localAPI.getCategories(),
  getCategory: (slug: string) => localAPI.getCategory(slug),

  // Health check
  healthCheck: () => localAPI.healthCheck(),
};