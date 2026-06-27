// CodeHTML.in Unified Data Persistence Layer (Supabase Ready / LocalStorage-First Fallback)
// This service allows running 100% free and instantly on LocalStorage, 
// while being fully ready to connect to Supabase by filling in the credentials below.

import { createClient } from '@supabase/supabase-js';

// ==========================================
// SUPABASE CONFIGURATION
// To connect to a live Supabase backend, fill these in or set them in .env:
// ==========================================
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://zconrjsxnqgvkolhwfai.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "sb_publishable_pA-vxwxq6mjr7pWi3z7FCA_2Xg3mYpW";

const isSupabaseConfigured = supabaseUrl !== "" && supabaseAnonKey !== "";
export const supabase = isSupabaseConfigured ? createClient(supabaseUrl, supabaseAnonKey) : null;

let isSupabaseUnreachable = false;

// Timeout helper to prevent infinite loading screens if Supabase is unreachable
const withTimeout = (promise, ms = 2000) => {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      console.warn(`[DB] Supabase query timed out after ${ms}ms. Short-circuiting to LocalStorage.`);
      isSupabaseUnreachable = true;
      reject(new Error("Supabase query timed out"));
    }, ms);
    promise.then(
      (res) => {
        clearTimeout(timer);
        resolve(res);
      },
      (err) => {
        clearTimeout(timer);
        console.warn("[DB] Supabase operation failed. Short-circuiting to LocalStorage.", err);
        isSupabaseUnreachable = true;
        reject(err);
      }
    );
  });
};

// ==========================================
// MOCK DATA SEED TEMPLATES
// ==========================================
const DEFAULT_RESOURCES = [];

const DEFAULT_PARTNERS = [];

const DEFAULT_LEADS = [];


const DEFAULT_PROJECTS = [
  {
    id: '1',
    name: 'The Circle',
    category: 'SAAS PLATFORM',
    vertical: 'Collaborative Doc SaaS Workspace with Real-Time Sync',
    status: 'Live App',
    link: 'https://jition.vercel.app',
    bgImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: '2',
    name: 'Co-Found',
    category: 'MOBILE & WEB PLATFORM',
    vertical: 'Founder Matchmaking & Networking Mobile/Web Platform',
    status: 'Under Progress',
    link: '',
    bgImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: '3',
    name: 'SwigatoIndia.in',
    category: 'FOOD LICENCE PORTAL',
    vertical: 'Food Licence Website',
    status: 'Live App',
    link: 'https://swigatoindia.in',
    bgImage: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: '4',
    name: 'Slcc.in',
    category: 'CONSTRUCTION PORTAL',
    vertical: 'Construction Company',
    status: 'Live App',
    link: 'https://slcc.in',
    bgImage: '/slcc_construction.webp'
  },
  {
    id: '5',
    name: 'crystamedia.in',
    category: 'MARKETING AGENCY',
    vertical: 'Digital Marketing Agency',
    status: 'Live App',
    link: 'https://crystamedia.in',
    bgImage: '/crystamedia_agency.webp'
  },
  {
    id: '6',
    name: 'AlayaRealty.in',
    category: 'REAL ESTATE PORTAL',
    vertical: 'Real Estate Consultancy',
    status: 'Live App',
    link: 'https://alayarealty.in',
    bgImage: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: '7',
    name: 'Elgamingo.store',
    category: 'GAMING PORTAL',
    vertical: 'Online Games Platform',
    status: 'Live App',
    link: 'https://elgamingo.store',
    bgImage: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: '8',
    name: 'LeadTool',
    category: 'DEVELOPER TOOL',
    vertical: 'Business Lead Extraction Map Integration Dashboard',
    status: 'Local Tool',
    link: '',
    bgImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: '9',
    name: 'Azude Hotel',
    category: 'HOSPITALITY PORTAL',
    vertical: 'Premium Resort Booking & Guest Loyalty Portal',
    status: 'Concept App',
    link: 'https://azudehotel.netlify.app',
    bgImage: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: '10',
    name: 'Tinkus-cafe',
    category: 'E-COMMERCE CONCEPT',
    vertical: 'Sweet Bakery, Shakes & Custom Cake Quote Tool',
    status: 'Concept App',
    link: 'https://tinkus-cafe.netlify.app',
    bgImage: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: '11',
    name: 'cafe-decasa',
    category: 'RETAIL CONCEPT',
    vertical: 'Cafe Website',
    status: 'Concept App',
    link: 'https://cafe-decasa.netlify.app',
    bgImage: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: '12',
    name: 'cutler-dining',
    category: 'GASTRONOMY SHOWCASE',
    vertical: 'Contemporary Gastronomy & Tasting Rooms',
    status: 'Concept App',
    link: 'https://cutler-dining.netlify.app',
    bgImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: '13',
    name: 'Famous Restaurant',
    category: 'GASTRONOMY SHOWCASE',
    vertical: 'Elegant Sommelier Wine Bistro & Flight Builder',
    status: 'Concept App',
    link: 'https://famous-restaurant.netlify.app',
    bgImage: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: '14',
    name: 'Fine Dine Restaurant',
    category: 'GASTRONOMY SHOWCASE',
    vertical: 'Ultra-Luxury Multi-Course Culinary Showcase',
    status: 'Concept App',
    link: 'https://finedine-restaurant.netlify.app',
    bgImage: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: '15',
    name: 'Lumina',
    category: 'FASHION EDITORIAL',
    vertical: 'High-Fashion Editorial Catalog (Mobile-First)',
    status: 'Concept App',
    link: 'https://lumina.netlify.app',
    bgImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: '16',
    name: 'teamo-dating',
    category: 'AI DATING CONCEPT',
    vertical: 'AI-Driven Matchmaker & Swipe Dating Card Deck',
    status: 'Concept App',
    link: 'https://teamo-dating.netlify.app',
    bgImage: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=1200&q=80'
  }
];

// Helper to check and initialize LocalStorage keys if they are empty
function initStorage() {
  if (typeof window === 'undefined') return;
  
  // Clean up legacy fake data from localStorage if present
  const currentPartners = localStorage.getItem('codehtml_partners');
  if (currentPartners && (currentPartners.includes('agencytest@gmail.com') || currentPartners.includes('solotest@gmail.com'))) {
    localStorage.removeItem('codehtml_partners');
    localStorage.removeItem('codehtml_referrals');
  }
  const currentResources = localStorage.getItem('codehtml_resources');
  if (currentResources && currentResources.includes('React 18 + Vite Starter Template')) {
    localStorage.removeItem('codehtml_resources');
  }

  if (!localStorage.getItem('codehtml_resources')) {
    localStorage.setItem('codehtml_resources', JSON.stringify(DEFAULT_RESOURCES));
  }
  if (!localStorage.getItem('codehtml_partners')) {
    localStorage.setItem('codehtml_partners', JSON.stringify(DEFAULT_PARTNERS));
  }
  if (!localStorage.getItem('codehtml_referrals')) {
    localStorage.setItem('codehtml_referrals', JSON.stringify(DEFAULT_LEADS));
  }
  if (!localStorage.getItem('codehtml_pricing')) {
    localStorage.setItem('codehtml_pricing', JSON.stringify({}));
  }
  if (!localStorage.getItem('codehtml_blogs')) {
    localStorage.setItem('codehtml_blogs', JSON.stringify([]));
  }
  if (!localStorage.getItem('codehtml_portfolio')) {
    localStorage.setItem('codehtml_portfolio', JSON.stringify(DEFAULT_PROJECTS));
  }
}

initStorage();

// Central Database Service
class DatabaseService {
  constructor() {
    this._isFirebase = isSupabaseConfigured;
    if (this._isFirebase) {
      console.log("[DB] Supabase backend active");
    } else {
      console.log("[DB] LocalStorage backend active (100% Free Offline Mode)");
    }
  }

  get isFirebase() {
    return this._isFirebase && !isSupabaseUnreachable;
  }

  // ==========================================
  // LEADS & REFERRALS PIPELINE
  // ==========================================
  async getLeads() {
    if (this.isFirebase) {
      try {
        const { data, error } = await withTimeout(supabase.from('leads').select('*'));
        if (error) throw error;
        if (!data || data.length === 0) {
          // Auto seed Supabase if empty
          for (const lead of DEFAULT_LEADS) {
            await withTimeout(supabase.from('leads').upsert(lead));
          }
          return DEFAULT_LEADS;
        }
        return data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      } catch (err) {
        console.error("Supabase getLeads failed, falling back to LocalStorage", err);
      }
    }
    const leads = JSON.parse(localStorage.getItem('codehtml_referrals') || '[]');
    return leads.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  async getLead(id) {
    if (this.isFirebase) {
      try {
        const { data, error } = await withTimeout(supabase.from('leads').select('*').eq('id', id).maybeSingle());
        if (error) throw error;
        return data;
      } catch (err) {
        console.error("Supabase getLead failed, falling back to LocalStorage", err);
      }
    }
    const leads = await this.getLeads();
    return leads.find(l => l.id === id) || null;
  }

  async addLead(leadData) {
    const id = leadData.id || `lead_${Date.now()}`;
    const partners = await this.getPartners();
    
    // Find commission rate if referral code is provided
    let commissionRate = 10;
    if (leadData.referralCode) {
      const partner = partners.find(p => p.referralCode.toUpperCase() === leadData.referralCode.toUpperCase());
      if (partner) {
        commissionRate = partner.commissionRate || (partner.partnerType === 'agency' ? 15 : 10);
      }
    }

    const newLead = {
      name: leadData.name,
      email: leadData.email,
      phone: leadData.phone || '',
      projectType: leadData.projectType || 'Custom Project',
      budget: leadData.budget || 'Inquiry',
      budgetVal: this.parseNumericBudget(leadData.budget),
      finalPrice: leadData.finalPrice || null,
      referralCode: leadData.referralCode || null,
      status: leadData.status || 'Inquiry',
      commissionRate: commissionRate,
      notes: leadData.notes || '',
      createdAt: leadData.createdAt || new Date().toISOString()
    };

    if (this.isFirebase) {
      try {
        const { data, error } = await withTimeout(supabase.from('leads').upsert({ id, ...newLead }).select().single());
        if (error) throw error;
        return data;
      } catch (err) {
        console.error("Supabase addLead failed, falling back to LocalStorage", err);
      }
    }

    const leads = await this.getLeads();
    leads.push({ id, ...newLead });
    localStorage.setItem('codehtml_referrals', JSON.stringify(leads));
    return { id, ...newLead };
  }

  async updateLead(id, updates) {
    if (this.isFirebase) {
      try {
        const { data: oldLead, error: fetchErr } = await withTimeout(supabase.from('leads').select('*').eq('id', id).single());
        if (fetchErr) throw fetchErr;

        const updatedLead = { ...oldLead, ...updates };
        if (updates.budget && updates.budget !== oldLead.budget) {
          updatedLead.budgetVal = this.parseNumericBudget(updates.budget);
        }

        const { data, error } = await withTimeout(supabase.from('leads').upsert(updatedLead).select().single());
        if (error) throw error;
        return data;
      } catch (err) {
        console.error("Supabase updateLead failed, falling back to LocalStorage", err);
      }
    }

    const leads = await this.getLeads();
    const index = leads.findIndex(l => l.id === id);
    if (index === -1) throw new Error("Lead not found");

    const oldLead = leads[index];
    const updatedLead = { ...oldLead, ...updates };

    if (updates.budget && updates.budget !== oldLead.budget) {
      updatedLead.budgetVal = this.parseNumericBudget(updates.budget);
    }

    leads[index] = updatedLead;
    localStorage.setItem('codehtml_referrals', JSON.stringify(leads));
    return updatedLead;
  }

  async deleteLead(id) {
    if (this.isFirebase) {
      try {
        const { error } = await withTimeout(supabase.from('leads').delete().eq('id', id));
        if (error) throw error;
        return true;
      } catch (err) {
        console.error("Supabase deleteLead failed, falling back to LocalStorage", err);
      }
    }
    let leads = await this.getLeads();
    leads = leads.filter(l => l.id !== id);
    localStorage.setItem('codehtml_referrals', JSON.stringify(leads));
    return true;
  }

  parseNumericBudget(budgetStr) {
    if (!budgetStr) return 0;
    if (typeof budgetStr === 'number') return budgetStr;
    const clean = budgetStr.replace(/[^0-9]/g, '');
    return parseInt(clean, 10) || 0;
  }

  // ==========================================
  // B2B PARTNERS
  // ==========================================
  async getPartners() {
    if (this.isFirebase) {
      try {
        const { data, error } = await withTimeout(supabase.from('partners').select('*'));
        if (error) throw error;
        if (!data || data.length === 0) {
          // Auto seed Supabase if empty
          for (const partner of DEFAULT_PARTNERS) {
            await withTimeout(supabase.from('partners').upsert(partner));
          }
          return DEFAULT_PARTNERS;
        }
        return data;
      } catch (err) {
        console.error("Supabase getPartners failed", err);
      }
    }
    return JSON.parse(localStorage.getItem('codehtml_partners') || '[]');
  }

  async getPartner(email) {
    if (!email) return null;
    const cleanEmail = email.toLowerCase().trim();
    if (this.isFirebase) {
      try {
        const { data, error } = await withTimeout(supabase.from('partners').select('*').eq('email', cleanEmail).maybeSingle());
        if (error) throw error;
        return data;
      } catch (err) {
        console.error("Supabase getPartner failed, falling back to LocalStorage", err);
      }
    }
    const partners = await this.getPartners();
    return partners.find(p => p.email.toLowerCase() === cleanEmail) || null;
  }

  async getPartnerByReferralCode(code) {
    if (!code) return null;
    const uppercaseCode = code.toUpperCase().trim();
    const partners = await this.getPartners();
    return partners.find(p => p.referralCode.toUpperCase() === uppercaseCode) || null;
  }

  async addPartner(partnerData) {
    const email = partnerData.email.toLowerCase().trim();
    const partners = await this.getPartners();
    const exists = partners.some(p => p.email.toLowerCase() === email);
    if (exists) throw new Error("Partner email already registered");

    let referralCode = partnerData.referralCode;
    if (!referralCode) {
      const cleanName = partnerData.name.split(' ')[0].replace(/[^A-Za-z]/g, '').toUpperCase();
      const randomHex = Math.floor(1000 + Math.random() * 9000).toString(16).toUpperCase();
      referralCode = `${partnerData.partnerType === 'agency' ? 'AGENCY' : 'SOLO'}-${cleanName}-${randomHex}`;
    }

    const newPartner = {
      name: partnerData.name,
      email: email,
      password: partnerData.password, 
      phone: partnerData.phone || '',
      city: partnerData.city || '',
      partnerType: partnerData.partnerType || 'solo',
      agencyName: partnerData.agencyName || null,
      agencySize: partnerData.agencySize || null,
      agencyWebsite: partnerData.agencyWebsite || null,
      referralCode: referralCode,
      commissionRate: partnerData.commissionRate || (partnerData.partnerType === 'agency' ? 15 : 10),
      status: partnerData.status || 'active', 
      upiId: partnerData.upiId || '',
      termsAccepted: partnerData.termsAccepted || false,
      joinedDate: partnerData.joinedDate || new Date().toISOString().split('T')[0]
    };

    if (this.isFirebase) {
      try {
        const { data, error } = await withTimeout(supabase.from('partners').upsert(newPartner).select().single());
        if (error) throw error;
        return data;
      } catch (err) {
        console.error("Supabase addPartner failed, falling back to LocalStorage", err);
      }
    }

    partners.push(newPartner);
    localStorage.setItem('codehtml_partners', JSON.stringify(partners));
    return newPartner;
  }

  async updatePartner(email, updates) {
    const cleanEmail = email.toLowerCase().trim();
    if (this.isFirebase) {
      try {
        const { data: oldPartner, error: fetchErr } = await withTimeout(supabase.from('partners').select('*').eq('email', cleanEmail).single());
        if (fetchErr) throw fetchErr;

        const updated = { ...oldPartner, ...updates };
        const { data, error } = await withTimeout(supabase.from('partners').upsert(updated).select().single());
        if (error) throw error;
        return data;
      } catch (err) {
        console.error("Supabase updatePartner failed, falling back to LocalStorage", err);
      }
    }

    const partners = await this.getPartners();
    const index = partners.findIndex(p => p.email.toLowerCase() === cleanEmail);
    if (index === -1) throw new Error("Partner not found");

    partners[index] = { ...partners[index], ...updates };
    localStorage.setItem('codehtml_partners', JSON.stringify(partners));
    return partners[index];
  }

  async deletePartner(email) {
    const cleanEmail = email.toLowerCase().trim();
    if (this.isFirebase) {
      try {
        const { error } = await withTimeout(supabase.from('partners').delete().eq('email', cleanEmail));
        if (error) throw error;
        return true;
      } catch (err) {
        console.error("Supabase deletePartner failed, falling back to LocalStorage", err);
      }
    }
    let partners = await this.getPartners();
    partners = partners.filter(p => p.email.toLowerCase() !== cleanEmail);
    localStorage.setItem('codehtml_partners', JSON.stringify(partners));
    return true;
  }

  // ==========================================
  // BLOG CMS (Manually written posts)
  // ==========================================
  async getBlogs() {
    if (this.isFirebase) {
      try {
        const { data, error } = await withTimeout(supabase.from('blogs').select('*'));
        if (error) throw error;
        return data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      } catch (err) {
        console.error("Supabase getBlogs failed", err);
      }
    }
    return JSON.parse(localStorage.getItem('codehtml_blogs') || '[]');
  }

  async getBlog(slug) {
    if (this.isFirebase) {
      try {
        const { data, error } = await withTimeout(supabase.from('blogs').select('*').eq('slug', slug).maybeSingle());
        if (error) throw error;
        return data;
      } catch (err) {
        console.error("Supabase getBlog failed, falling back to LocalStorage", err);
      }
    }
    const blogs = await this.getBlogs();
    return blogs.find(b => b.slug === slug) || null;
  }

  async addBlog(blogData) {
    const slug = blogData.slug || blogData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const blogs = await this.getBlogs();
    if (blogs.some(b => b.slug === slug)) {
      throw new Error("A blog post with this title or slug already exists");
    }

    const newBlog = {
      id: `manual_${Date.now()}`,
      slug: slug,
      title: blogData.title,
      category: blogData.category || 'TECHNOLOGY',
      tags: blogData.tags || [],
      author: blogData.author || 'FOUNDING TEAM',
      content: blogData.content || '',
      excerpt: blogData.excerpt || '',
      featuredImage: blogData.featuredImage || '',
      status: blogData.status || 'published',
      readTime: blogData.readTime || `${Math.max(2, Math.round((blogData.content || '').split(' ').length / 200))} MIN READ`,
      metaTitle: blogData.metaTitle || blogData.title,
      metaDescription: blogData.metaDescription || blogData.excerpt || '',
      isAutoGenerated: false,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };

    if (this.isFirebase) {
      try {
        const { data, error } = await withTimeout(supabase.from('blogs').upsert(newBlog).select().single());
        if (error) throw error;
        return data;
      } catch (err) {
        console.error("Supabase addBlog failed, falling back to LocalStorage", err);
      }
    }

    blogs.unshift(newBlog);
    localStorage.setItem('codehtml_blogs', JSON.stringify(blogs));
    return newBlog;
  }

  async updateBlog(slug, updates) {
    if (this.isFirebase) {
      try {
        const { data: oldBlog, error: fetchErr } = await withTimeout(supabase.from('blogs').select('*').eq('slug', slug).single());
        if (fetchErr) throw fetchErr;

        const updated = { 
          ...oldBlog, 
          ...updates, 
          updatedAt: new Date().toISOString().split('T')[0] 
        };
        const { data, error } = await withTimeout(supabase.from('blogs').upsert(updated).select().single());
        if (error) throw error;
        return data;
      } catch (err) {
        console.error("Supabase updateBlog failed, falling back to LocalStorage", err);
      }
    }

    const blogs = await this.getBlogs();
    const index = blogs.findIndex(b => b.slug === slug);
    if (index === -1) throw new Error("Blog post not found");

    blogs[index] = { 
      ...blogs[index], 
      ...updates, 
      updatedAt: new Date().toISOString().split('T')[0] 
    };
    localStorage.setItem('codehtml_blogs', JSON.stringify(blogs));
    return blogs[index];
  }

  async deleteBlog(slug) {
    if (this.isFirebase) {
      try {
        const { error } = await withTimeout(supabase.from('blogs').delete().eq('slug', slug));
        if (error) throw error;
        return true;
      } catch (err) {
        console.error("Supabase deleteBlog failed, falling back to LocalStorage", err);
      }
    }
    let blogs = await this.getBlogs();
    blogs = blogs.filter(b => b.slug !== slug);
    localStorage.setItem('codehtml_blogs', JSON.stringify(blogs));
    return true;
  }

  // ==========================================
  // RESOURCES HUB
  // ==========================================
  async getResources() {
    if (this.isFirebase) {
      try {
        const { data, error } = await withTimeout(supabase.from('resources').select('*'));
        if (error) throw error;
        if (!data || data.length === 0) {
          // Auto seed Supabase if empty
          for (const res of DEFAULT_RESOURCES) {
            await withTimeout(supabase.from('resources').upsert(res));
          }
          return DEFAULT_RESOURCES;
        }
        return data.sort((a, b) => Number(b.id) - Number(a.id));
      } catch (err) {
        console.error("Supabase getResources failed", err);
      }
    }
    return JSON.parse(localStorage.getItem('codehtml_resources') || '[]');
  }

  async addResource(resourceData) {
    const id = Date.now().toString();
    const newResource = {
      title: resourceData.title,
      url: resourceData.url,
      category: resourceData.category || 'Developer Tool',
      isGated: resourceData.isGated || false,
      isPaid: resourceData.isPaid || false,
      price: Number(resourceData.price || 0),
      links: resourceData.links || []
    };

    if (this.isFirebase) {
      try {
        const { data, error } = await withTimeout(supabase.from('resources').upsert({ id, ...newResource }).select().single());
        if (error) throw error;
        return data;
      } catch (err) {
        console.error("Supabase addResource failed, falling back to LocalStorage", err);
      }
    }

    const resources = await this.getResources();
    resources.unshift({ id, ...newResource });
    localStorage.setItem('codehtml_resources', JSON.stringify(resources));
    return { id, ...newResource };
  }

  async updateResource(id, updates) {
    if (this.isFirebase) {
      try {
        const { data: oldRes, error: fetchErr } = await withTimeout(supabase.from('resources').select('*').eq('id', id).single());
        if (fetchErr) throw fetchErr;

        const updated = { ...oldRes, ...updates };
        const { data, error } = await withTimeout(supabase.from('resources').upsert(updated).select().single());
        if (error) throw error;
        return data;
      } catch (err) {
        console.error("Supabase updateResource failed, falling back to LocalStorage", err);
      }
    }

    const resources = await this.getResources();
    const index = resources.findIndex(r => r.id === id);
    if (index === -1) throw new Error("Resource not found");

    resources[index] = { ...resources[index], ...updates };
    localStorage.setItem('codehtml_resources', JSON.stringify(resources));
    return resources[index];
  }

  async deleteResource(id) {
    if (this.isFirebase) {
      try {
        const { error } = await withTimeout(supabase.from('resources').delete().eq('id', id));
        if (error) throw error;
        return true;
      } catch (err) {
        console.error("Supabase deleteResource failed, falling back to LocalStorage", err);
      }
    }
    let resources = await this.getResources();
    resources = resources.filter(r => r.id !== id);
    localStorage.setItem('codehtml_resources', JSON.stringify(resources));
    return true;
  }

  async resetResources() {
    if (this.isFirebase) {
      try {
        await withTimeout(supabase.from('resources').delete().neq('id', ''));
        for (const res of DEFAULT_RESOURCES) {
          await withTimeout(supabase.from('resources').upsert(res));
        }
        return DEFAULT_RESOURCES;
      } catch (err) {
        console.error("Supabase resetResources failed, falling back to LocalStorage", err);
      }
    }
    localStorage.setItem('codehtml_resources', JSON.stringify(DEFAULT_RESOURCES));
    return DEFAULT_RESOURCES;
  }

  // ==========================================
  // PRICING OVERRIDES
  // ==========================================
  async getPricingOverrides() {
    if (this.isFirebase) {
      try {
        const { data, error } = await withTimeout(supabase.from('pricing_overrides').select('*').eq('id', 'overrides').maybeSingle());
        if (error) throw error;
        return data ? data.data : {};
      } catch (err) {
        console.error("Supabase getPricingOverrides failed, falling back to LocalStorage", err);
      }
    }
    return JSON.parse(localStorage.getItem('codehtml_pricing') || '{}');
  }

  async updatePricingOverride(category, tier, value) {
    if (this.isFirebase) {
      try {
        const overrides = await this.getPricingOverrides();
        if (!overrides[category]) overrides[category] = {};
        overrides[category][tier] = value;
        
        const { error } = await withTimeout(supabase.from('pricing_overrides').upsert({ id: 'overrides', data: overrides }));
        if (error) throw error;
        return overrides;
      } catch (err) {
        console.error("Supabase updatePricingOverride failed, falling back to LocalStorage", err);
      }
    }

    const overrides = await this.getPricingOverrides();
    if (!overrides[category]) overrides[category] = {};
    overrides[category][tier] = value;
    localStorage.setItem('codehtml_pricing', JSON.stringify(overrides));
    return overrides;
  }

  // ==========================================
  // PORTFOLIO / PROJECTS
  // ==========================================
  async getProjects() {
    if (this.isFirebase) {
      try {
        const { data, error } = await withTimeout(supabase.from('projects').select('*'));
        if (error) throw error;
        if (!data || data.length === 0) {
          // Auto seed Supabase if empty
          for (const proj of DEFAULT_PROJECTS) {
            await withTimeout(supabase.from('projects').upsert(proj));
          }
          return DEFAULT_PROJECTS;
        }
        return data.sort((a, b) => Number(a.id) - Number(b.id));
      } catch (err) {
        console.error("Supabase getProjects failed", err);
      }
    }
    return JSON.parse(localStorage.getItem('codehtml_portfolio') || '[]');
  }

  async addProject(projectData) {
    const id = Date.now().toString();
    const newProject = {
      name: projectData.name,
      category: projectData.category || 'SAAS PLATFORM',
      vertical: projectData.vertical || '',
      status: projectData.status || 'Live App',
      link: projectData.link || '',
      bgImage: projectData.bgImage || ''
    };

    if (this.isFirebase) {
      try {
        const { data, error } = await withTimeout(supabase.from('projects').upsert({ id, ...newProject }).select().single());
        if (error) throw error;
        return data;
      } catch (err) {
        console.error("Supabase addProject failed, falling back to LocalStorage", err);
      }
    }

    const projects = await this.getProjects();
    projects.push({ id, ...newProject });
    localStorage.setItem('codehtml_portfolio', JSON.stringify(projects));
    return { id, ...newProject };
  }

  async updateProject(id, updates) {
    if (this.isFirebase) {
      try {
        const { data: oldProj, error: fetchErr } = await withTimeout(supabase.from('projects').select('*').eq('id', id).single());
        if (fetchErr) throw fetchErr;

        const updated = { ...oldProj, ...updates };
        const { data, error } = await withTimeout(supabase.from('projects').upsert(updated).select().single());
        if (error) throw error;
        return data;
      } catch (err) {
        console.error("Supabase updateProject failed, falling back to LocalStorage", err);
      }
    }

    const projects = await this.getProjects();
    const index = projects.findIndex(p => p.id === id);
    if (index === -1) throw new Error("Project not found");

    projects[index] = { ...projects[index], ...updates };
    localStorage.setItem('codehtml_portfolio', JSON.stringify(projects));
    return projects[index];
  }

  async deleteProject(id) {
    if (this.isFirebase) {
      try {
        const { error } = await withTimeout(supabase.from('projects').delete().eq('id', id));
        if (error) throw error;
        return true;
      } catch (err) {
        console.error("Supabase deleteProject failed, falling back to LocalStorage", err);
      }
    }
    let projects = await this.getProjects();
    projects = projects.filter(p => p.id !== id);
    localStorage.setItem('codehtml_portfolio', JSON.stringify(projects));
    return true;
  }

  async resetProjects() {
    if (this.isFirebase) {
      try {
        await withTimeout(supabase.from('projects').delete().neq('id', ''));
        for (const proj of DEFAULT_PROJECTS) {
          await withTimeout(supabase.from('projects').upsert(proj));
        }
        return DEFAULT_PROJECTS;
      } catch (err) {
        console.error("Supabase resetProjects failed, falling back to LocalStorage", err);
      }
    }
    localStorage.setItem('codehtml_portfolio', JSON.stringify(DEFAULT_PROJECTS));
    return DEFAULT_PROJECTS;
  }
}

export const db = new DatabaseService();
export default db;
