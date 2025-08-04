import { articles, categories, authors } from '../data/articles';
import { Article, Category } from '../types';

export class LocalAPI {
  // Categories
  async getCategories(): Promise<Category[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    return categories;
  }

  async getCategory(slug: string): Promise<Category | null> {
    await new Promise(resolve => setTimeout(resolve, 50));
    return categories.find(cat => cat.slug === slug) || null;
  }

  // Articles
  async getArticles(filters?: {
    category?: string;
    featured?: boolean;
    trending?: boolean;
    limit?: number;
    offset?: number;
  }): Promise<Article[]> {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    let filteredArticles = [...articles];

    // Apply filters
    if (filters?.category) {
      const category = categories.find(cat => cat.slug === filters.category);
      if (category) {
        filteredArticles = filteredArticles.filter(article => 
          article.category.id === category.id
        );
      }
    }

    if (filters?.featured !== undefined) {
      filteredArticles = filteredArticles.filter(article => 
        article.featured === filters.featured
      );
    }

    if (filters?.trending !== undefined) {
      filteredArticles = filteredArticles.filter(article => 
        article.trending === filters.trending
      );
    }

    // Sort by publication date (newest first)
    filteredArticles.sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

    // Apply pagination
    if (filters?.offset || filters?.limit) {
      const start = filters.offset || 0;
      const end = start + (filters.limit || 20);
      filteredArticles = filteredArticles.slice(start, end);
    }

    return filteredArticles;
  }

  async getArticle(slug: string): Promise<Article | null> {
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const article = articles.find(article => article.slug === slug);
    
    if (article) {
      // Simulate view count increment
      article.views += 1;
    }
    
    return article || null;
  }

  async getFeaturedArticles(): Promise<Article[]> {
    return this.getArticles({ featured: true, limit: 6 });
  }

  async getTrendingArticles(): Promise<Article[]> {
    return this.getArticles({ trending: true, limit: 10 });
  }

  async searchArticles(query: string, filters?: { category?: string; limit?: number }): Promise<Article[]> {
    await new Promise(resolve => setTimeout(resolve, 150));
    
    const searchTerm = query.toLowerCase();
    
    let results = articles.filter(article => 
      article.title.toLowerCase().includes(searchTerm) ||
      article.excerpt.toLowerCase().includes(searchTerm) ||
      article.content.toLowerCase().includes(searchTerm) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
      article.author.name.toLowerCase().includes(searchTerm) ||
      article.category.name.toLowerCase().includes(searchTerm)
    );

    // Apply category filter if specified
    if (filters?.category) {
      const category = categories.find(cat => cat.slug === filters.category);
      if (category) {
        results = results.filter(article => article.category.id === category.id);
      }
    }

    // Sort by relevance (title matches first, then trending, then by date)
    results.sort((a, b) => {
      const aTitle = a.title.toLowerCase().includes(searchTerm);
      const bTitle = b.title.toLowerCase().includes(searchTerm);
      
      if (aTitle && !bTitle) return -1;
      if (!aTitle && bTitle) return 1;
      if (a.trending && !b.trending) return -1;
      if (!a.trending && b.trending) return 1;
      
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });

    // Apply limit
    const limit = filters?.limit || 20;
    return results.slice(0, limit);
  }

  // Health check (always returns success for local data)
  async healthCheck() {
    return { status: 'ok', service: 'Local Data API' };
  }
}

export const localAPI = new LocalAPI();