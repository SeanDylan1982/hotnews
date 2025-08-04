import { supabase } from './supabase';
import { Article, Category } from '../types';

export class SupabaseAPI {
  // Categories
  async getCategories(): Promise<Category[]> {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');

    if (error) throw new Error(`Failed to fetch categories: ${error.message}`);
    return data || [];
  }

  async getCategory(slug: string): Promise<Category | null> {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // Not found
      throw new Error(`Failed to fetch category: ${error.message}`);
    }
    return data;
  }

  // Articles
  async getArticles(filters?: {
    category?: string;
    featured?: boolean;
    trending?: boolean;
    limit?: number;
    offset?: number;
  }): Promise<Article[]> {
    let query = supabase
      .from('articles')
      .select(`
        *,
        author:profiles!articles_author_id_fkey(id, name, avatar_url),
        category:categories!articles_category_id_fkey(id, name, slug, color, icon)
      `)
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    if (filters?.category) {
      // First get the category ID
      const { data: categoryData } = await supabase
        .from('categories')
        .select('id')
        .eq('slug', filters.category)
        .single();
      
      if (categoryData) {
        query = query.eq('category_id', categoryData.id);
      }
    }

    if (filters?.featured !== undefined) {
      query = query.eq('featured', filters.featured);
    }

    if (filters?.trending !== undefined) {
      query = query.eq('trending', filters.trending);
    }

    if (filters?.limit) {
      query = query.limit(filters.limit);
    }

    if (filters?.offset) {
      query = query.range(filters.offset, filters.offset + (filters.limit || 20) - 1);
    }

    const { data, error } = await query;

    if (error) throw new Error(`Failed to fetch articles: ${error.message}`);

    // Transform the data to match our Article interface
    return (data || []).map(this.transformArticle);
  }

  async getArticle(slug: string): Promise<Article | null> {
    const { data, error } = await supabase
      .from('articles')
      .select(`
        *,
        author:profiles!articles_author_id_fkey(id, name, avatar_url),
        category:categories!articles_category_id_fkey(id, name, slug, color, icon)
      `)
      .eq('slug', slug)
      .eq('status', 'published')
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // Not found
      throw new Error(`Failed to fetch article: ${error.message}`);
    }

    // Increment view count
    await supabase
      .from('articles')
      .update({ views: (data.views || 0) + 1 })
      .eq('id', data.id);

    return this.transformArticle(data);
  }

  async getFeaturedArticles(): Promise<Article[]> {
    return this.getArticles({ featured: true, limit: 6 });
  }

  async getTrendingArticles(): Promise<Article[]> {
    return this.getArticles({ trending: true, limit: 10 });
  }

  async searchArticles(query: string): Promise<Article[]> {
    const { data, error } = await supabase
      .from('articles')
      .select(`
        *,
        author:profiles!articles_author_id_fkey(id, name, avatar_url),
        category:categories!articles_category_id_fkey(id, name, slug, color, icon)
      `)
      .eq('status', 'published')
      .or(`title.ilike.%${query}%,excerpt.ilike.%${query}%,tags.cs.{${query}}`)
      .order('published_at', { ascending: false })
      .limit(20);

    if (error) throw new Error(`Failed to search articles: ${error.message}`);

    return (data || []).map(this.transformArticle);
  }

  // Create article (for authenticated users)
  async createArticle(articleData: {
    title: string;
    excerpt: string;
    content: string;
    cover_image: string;
    category_id: string;
    tags?: string[];
    read_time?: number;
    featured?: boolean;
    trending?: boolean;
    ai_prompt?: string;
    ai_model?: string;
  }): Promise<Article> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User must be authenticated to create articles');

    // Generate slug from title
    const slug = articleData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const { data, error } = await supabase
      .from('articles')
      .insert({
        ...articleData,
        slug,
        author_id: user.id,
      })
      .select(`
        *,
        author:profiles!articles_author_id_fkey(id, name, avatar_url),
        category:categories!articles_category_id_fkey(id, name, slug, color, icon)
      `)
      .single();

    if (error) throw new Error(`Failed to create article: ${error.message}`);

    return this.transformArticle(data);
  }

  // User profile management
  async getProfile(userId?: string): Promise<any> {
    const targetUserId = userId || (await supabase.auth.getUser()).data.user?.id;
    if (!targetUserId) throw new Error('No user ID provided');

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', targetUserId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // Not found
      throw new Error(`Failed to fetch profile: ${error.message}`);
    }

    return data;
  }

  async updateProfile(updates: {
    name?: string;
    avatar_url?: string;
    bio?: string;
    social_links?: any;
  }): Promise<any> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User must be authenticated');

    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id)
      .select()
      .single();

    if (error) throw new Error(`Failed to update profile: ${error.message}`);

    return data;
  }

  // Transform database article to our Article interface
  private transformArticle(dbArticle: any): Article {
    return {
      id: dbArticle.id,
      title: dbArticle.title,
      slug: dbArticle.slug,
      excerpt: dbArticle.excerpt,
      content: dbArticle.content,
      coverImage: dbArticle.cover_image,
      author: {
        id: dbArticle.author.id,
        name: dbArticle.author.name,
        avatar: dbArticle.author.avatar_url || `https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop`,
        bio: '',
        verified: true
      },
      category: {
        id: dbArticle.category.id,
        name: dbArticle.category.name,
        slug: dbArticle.category.slug,
        color: dbArticle.category.color,
        icon: dbArticle.category.icon
      },
      tags: dbArticle.tags || [],
      publishedAt: dbArticle.published_at,
      readTime: dbArticle.read_time || 5,
      likes: dbArticle.likes || 0,
      views: dbArticle.views || 0,
      featured: dbArticle.featured || false,
      trending: dbArticle.trending || false
    };
  }
}

export const supabaseAPI = new SupabaseAPI();