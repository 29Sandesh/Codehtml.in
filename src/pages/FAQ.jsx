import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { HelpCircle, ChevronDown, ChevronUp, Search, MessageSquare } from 'lucide-react';

const FAQ = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqs, setOpenFaqs] = useState({});



  const faqData = [
  {
    "category": "Tech Stack & Architecture",
    "faqs": [
      {
        "q": "what is the best tech stack for a web application in 2025",
        "a": "For 2025, the best tech stack balances speed, scaling, and developer efficiency. We recommend React.js or Next.js (App Router) on the frontend, TypeScript for type safety, Node.js/Express or Python/FastAPI for the backend, and PostgreSQL or MongoDB for data. Serverless hosting on Vercel, Netlify, or AWS ensures sub-second load times."
      },
      {
        "q": "next js vs wordpress pros and cons for business",
        "a": "WordPress is good for simple content sites but suffers from database bloating, security risks, and slow plugins. Next.js offers custom code, sub-second speeds, superior security, and better SEO capabilities for dynamic web applications, though it requires custom development."
      },
      {
        "q": "react vs vue vs angular which is best for my app",
        "a": "React is the market leader with a massive ecosystem and the best library support. Vue is lightweight and easy to learn. Angular is a rigid, enterprise-scale framework. We choose React (and React Native for mobile) because it delivers the most robust custom B2B interfaces."
      },
      {
        "q": "node js vs python for backend development",
        "a": "Node.js uses asynchronous I/O, making it extremely fast for real-time dashboards, APIs, and high-concurrency apps. Python excels in data processing, scripting, and machine learning. We use Node.js for high-performance enterprise dashboards."
      },
      {
        "q": "mongodb vs postgresql which database should I use",
        "a": "PostgreSQL is a relational database ideal for complex transactions, structured financial data, and rigid schemas. MongoDB is a NoSQL database built for high scalability, unstructured data, and rapid MVP iterations. We map the database choice to your business model."
      },
      {
        "q": "aws vs vercel for hosting a nextjs app",
        "a": "Vercel is optimized for Next.js, offering instant deployments, global Edge CDNs, and zero configuration. AWS offers complete infrastructure control, virtual servers, and cheaper raw compute for custom backend microservices. We deploy frontends to Vercel/Netlify and APIs to AWS/Railway."
      },
      {
        "q": "microservices vs monolith for small startup",
        "a": "Startups should begin with a modular monolith to speed up development and keep hosting costs minimal. Microservices introduce complex network communication, high server overhead, and debugging headaches that slow down early product launches."
      },
      {
        "q": "what is headless cms and should I use it",
        "a": "A headless CMS decouples content editing (via a dashboard like Strapi or Sanity) from the presentation layer (Next.js/React). You should use it if you require sub-second speeds, absolute security, and the ability to push content to multiple platforms (web, mobile, smart devices)."
      },
      {
        "q": "tailwind css vs bootstrap which is better",
        "a": "Tailwind CSS uses utility-first classes, allowing developers to build premium custom designs directly in the code without bloated pre-made themes. Bootstrap relies on generic, rigid components that make websites look identical. We build exclusively with Tailwind CSS."
      },
      {
        "q": "how to choose between saas and custom software",
        "a": "Choose standard SaaS if your workflow fits a pre-existing tool (e.g. standard email marketing). Build custom software if you need unique proprietary algorithms, zero recurring user fees, direct database control, or a unique competitive advantage."
      }
    ]
  },
  {
    "category": "Cost, Budgets & Rates",
    "faqs": [
      {
        "q": "how much does website development cost in dubai",
        "a": "Website development in Dubai ranges from $1,250 for simple landing pages to $8,000+ for custom B2B portals and e-commerce platforms. Offshore agencies like CodeHTML deliver premium custom-built software at 50-70% lower rates than local Dubai agencies."
      },
      {
        "q": "how much does website development cost in the uk",
        "a": "In the UK, custom website development costs between GBP 2,500 for startup sites and GBP 15,000+ for custom web applications. Outsourcing development to an offshore team in India reduces this cost significantly while maintaining high quality."
      },
      {
        "q": "how much does website development cost in the usa",
        "a": "A custom USA-built business website ranges from USD 5,000 to USD 40,000+. To save budget, startups hire remote Indian developers or offshore software studios to build their core MVPs and custom web portals."
      },
      {
        "q": "how much does website development cost in india",
        "a": "In India, custom website design costs from INR 50,000 for small businesses to INR 5,00,000+ for complex web portals and SaaS platforms, depending on the tech stack, complexity, and custom features."
      },
      {
        "q": "how much does website development cost in singapore",
        "a": "Singapore web development ranges from SGD 3,000 for startup sites to SGD 20,000+ for custom enterprise web apps. Companies leverage remote developers to scale their product teams cost-effectively."
      },
      {
        "q": "web development cost breakdown what am I paying for",
        "a": "You pay for three main elements: UX/UI design (wireframes, mockup iterations), frontend/backend coding (React, Node, databases), and project setup (CDNs, deployment, domain mapping). Ongoing costs include domain, server hosting, and security maintenance."
      },
      {
        "q": "why is web development so expensive",
        "a": "Quality custom web development requires skilled software engineers, database designers, and UI experts writing hand-crafted code. Ready-made builders are cheap but slow; custom development guarantees sub-second loading, security, scalability, and 100% intellectual property ownership."
      },
      {
        "q": "how to negotiate web development pricing",
        "a": "The best way to negotiate is by defining a fixed scope. Reduce cost by prioritizing a Minimum Viable Product (MVP) first, using serverless databases, or signing a multi-month support contract for phased features."
      },
      {
        "q": "is cheap web development worth it",
        "a": "No. Cheap web development uses ready-made templates, bloated WordPress setups, and unoptimized scripts. This leads to slow load times (losing clients), security breaches, broken forms, and projects that are eventually abandoned by low-cost freelancers."
      },
      {
        "q": "how much should a startup budget for technology",
        "a": "Startups should budget USD 5,000 to USD 15,000 for their initial custom MVP. This covers custom UI/UX design, database integration, payments, and 6 months of scaling support."
      },
      {
        "q": "web development hourly rate india vs uk vs usa",
        "a": "US developers rate averages USD 100-180/hr. UK developers charge GBP 60-120/hr. Indian developers average USD 25-50/hr. Offshore Indian agencies like CodeHTML provide the exact same modern tech stack (React, Next.js, Node) at a fraction of the cost."
      },
      {
        "q": "how much does a saas mvp cost to build",
        "a": "A custom SaaS MVP costs between USD 7,500 and USD 20,000. This includes multi-tenant databases, Stripe billing, user auth (Supabase/Firebase), dashboard dashboards, and custom integrations."
      },
      {
        "q": "app development cost breakdown 2025",
        "a": "App development costs depend on platforms. A cross-platform app (React Native) targeting iOS and Android costs USD 10,000 - USD 25,000. Developing native apps separately for iOS and Android doubles this cost."
      },
      {
        "q": "how much does ai chatbot development cost",
        "a": "Custom automation bots (using tools like Voiceflow, Make.com, or custom API scripts) range from USD 1,500 to USD 5,000. These bots integrate with CRM tools, databases, and WhatsApp Business API to qualify leads 24/7."
      }
    ]
  },
  {
    "category": "Timeline & Process",
    "faqs": [
      {
        "q": "how long does it take to build a website",
        "a": "A custom startup landing page takes 1-2 weeks. A complete multi-page business website with custom UI design takes 3-4 weeks. Complex custom portals, e-commerce stores, or custom SaaS platforms take 6-12 weeks."
      },
      {
        "q": "how long does saas development take",
        "a": "Developing a custom SaaS MVP takes 8 to 12 weeks. This includes user onboarding, dashboard layout, database migrations, subscription billing, and beta testing."
      },
      {
        "q": "what is the web development process step by step",
        "a": "Our process has 5 steps: 1. Discovery (scope, brief), 2. UI/UX Design (wireframes, Figma mockups), 3. Development (coding React, API setup), 4. Testing (bugs, performance checks), and 5. Launch & Handover (sitemap, CDN deployment, code files transfer)."
      },
      {
        "q": "how do I give feedback to a web developer",
        "a": "Use visual collaboration tools like Figma or Loom video walkthroughs. Group your feedback into functional bugs, design styling changes, and copy edits. Be specific about expected behaviors."
      },
      {
        "q": "what information does a web developer need from me",
        "a": "A web developer needs: your brand assets (logos, colors, typography), page copy, wireframe briefs, competitor examples, domain login credentials, and a list of required integrations (e.g. payment gateway, CRM, analytics)."
      },
      {
        "q": "how to write a web development brief",
        "a": "A good brief defines the target audience, list of pages, required tech features (e.g. booking forms, payments), competitor links, timeline, and design aesthetic preferences. Keep it clear and detailed."
      },
      {
        "q": "how to review and approve website designs",
        "a": "Review designs on both desktop and mobile viewports. Check if the typography is readable, navigation is intuitive, buttons have clear callouts, and pages represent your brand's premium identity."
      },
      {
        "q": "what happens after website launch support",
        "a": "Post-launch, we provide 30 days of free bug-fixing and performance monitoring. Following that, clients sign up for our maintenance plan covering server uptime checks, security backups, and monthly content updates."
      },
      {
        "q": "what is a website maintenance plan",
        "a": "A maintenance plan includes server checks, database optimization, updating packages/dependencies to prevent security loopholes, checking for broken URLs, and minor CSS/copy updates."
      },
      {
        "q": "how to migrate from wordpress to nextjs",
        "a": "Migration involves converting your WordPress theme into a clean React frontend, restructuring your database, and connecting your post contents to a headless CMS or JSON database, ensuring 301 redirects to protect your SEO rankings."
      }
    ]
  },
  {
    "category": "Hiring, Vetting & Management",
    "faqs": [
      {
        "q": "how to hire a web developer without being technical",
        "a": "Hire developers based on their live portfolio. Ask them to walk you through a live site they built, check if it loads instantly, verify that they grant 100% code ownership, and sign a clear scope document."
      },
      {
        "q": "questions to ask a web development agency before hiring",
        "a": "Ask: 1. Will the site be custom-coded or built on a template? 2. Who owns the source code? 3. Do you write dynamic SEO schema markup? 4. What is the sub-second performance plan? 5. What is the post-launch maintenance policy?"
      },
      {
        "q": "red flags when hiring a web development company",
        "a": "Red flags include: refusing to hand over source code ownership, quoting extremely low prices (which leads to copy-paste template delivery), lack of live case studies, slow communication, and using bloated templates that load slowly."
      },
      {
        "q": "freelance vs agency which should I choose",
        "a": "Freelancers are cheap but offer single-point-of-failure risk (they can ghost or get sick) and lack design+code multi-disciplinary skills. Agencies provide a full team (designer, developer, PM) and guarantee delivery under a legally binding contract."
      },
      {
        "q": "how to vet a web development company portfolio",
        "a": "Don't look at screenshots. Ask for live links, run them through Google PageSpeed Insights to test their mobile score, test form submissions, and check if the layout stays consistent on mobile screens."
      },
      {
        "q": "how to check if a web developer is good",
        "a": "A good developer writes clean, modular code, uses modern tools (GitHub, Vite, TypeScript), optimizes site performance, implements proper schema markup, and communicates project scope transparently."
      },
      {
        "q": "is it safe to hire developers from india",
        "a": "Yes, if you vet their work. India is the global hub for software engineering. Ensure they have a registered company, Clutch reviews, sign NDA agreements, use modern tech stacks, and speak fluent English."
      },
      {
        "q": "how to manage a remote web development team",
        "a": "Use project workspaces (Trello/Jira), share updates via Slack or WhatsApp, schedule weekly video calls, set clear milestone expectations, and review code on GitHub branches regularly."
      },
      {
        "q": "what is a technical specification document",
        "a": "A tech spec document describes the application architecture, database schema, user flows, API endpoints, payment webhooks, and third-party tools required to build the product."
      },
      {
        "q": "how to write requirements for a web developer",
        "a": "Write requirement checklists based on features: 'As a user, I want to book an appointment' or 'As an admin, I want to export transaction history.' Detail inputs, button clicks, and success messages."
      }
    ]
  },
  {
    "category": "SEO, Core Web Vitals & AI (AEO)",
    "faqs": [
      {
        "q": "how to rank website on first page of google in 2025",
        "a": "To rank on Google in 2025, you need: 1. Sub-second mobile loading speeds (Core Web Vitals), 2. Comprehensive, keyword-targeted pages, 3. In-depth JSON-LD LocalBusiness/Product schema, 4. Fresh, user-focused blog content, and 5. Trust signals like GMB reviews and quality local directory backlinks."
      },
      {
        "q": "does website speed affect google ranking",
        "a": "Yes. Google uses mobile page speed as a primary ranking signal. Slow-loading websites have higher bounce rates, which tells Google's algorithm that the site offers a poor user experience, resulting in lower rankings."
      },
      {
        "q": "what is core web vitals and why does it matter",
        "a": "Core Web Vitals are Google's speed metrics measuring loading performance (LCP), interactivity (FID/INP), and visual stability (CLS). Scoring 90+ on Lighthouse is critical for ranking above competitors."
      },
      {
        "q": "how to get featured in google ai overview",
        "a": "To appear in Google AI Overviews, format content as direct answers to common user questions, use structured H2 questions, implement JSON-LD FAQPage schemas, and write clear, logical paragraphs (AI Nuggets)."
      },
      {
        "q": "how does chatgpt decide what websites to recommend",
        "a": "ChatGPT and other AI answer engines recommend sites with high topical authority, clean semantic HTML structure, citations in directories (Clutch, Wikipedia), and clear entity relationships defined in schema markups."
      },
      {
        "q": "how to get my business cited in ai answers",
        "a": "AI search bots crawl authoritative review portals, directories, and blogs. Secure citations on platforms like Clutch, GoodFirms, and Google Business Profile, and publish schema-optimized Q&A pages on your own domain."
      },
      {
        "q": "what is e-e-a-t and how to improve it",
        "a": "EEAT stands for Experience, Expertise, Authoritativeness, and Trustworthiness. Improve it by displaying author bios, linking to verified profiles, posting client reviews, listing actual addresses, and providing clean, factual content."
      },
      {
        "q": "how to do keyword research for a new website",
        "a": "Find high-intent, low-competition keywords. Start with long-tail queries (e.g. 'web developer for logistics in Singapore') rather than broad terms. Analyze competitor keyword gaps using tools like Semrush or Ahrefs."
      },
      {
        "q": "how many blog posts do I need for seo",
        "a": "It's about depth and consistency, not just count. Starting with 10-15 deep, schema-optimized core pages targeting primary customer pain points will drive more conversions than 100 thin posts."
      },
      {
        "q": "how to build backlinks for a new website",
        "a": "Acquire high-quality local links by registering on Clutch, GoodFirms, and Yelp. Reach out to local business networks, write guest posts on tech blogs, and publish unique research reports or guides."
      }
    ]
  },
  {
    "category": "Regional & Local Compliance",
    "faqs": [
      {
        "q": "how to start a tech business in dubai",
        "a": "To start a tech business in Dubai, you choose between Free Zone licensing (100% foreign ownership, e.g. Meydan or DTEC) or Mainland licensing. Set up corporate bank accounts and ensure compliance with Dubai Digital Authority guidelines."
      },
      {
        "q": "best tech companies in dubai for outsourcing",
        "a": "While Dubai hosts major tech firms, premium custom software development is often outsourced to vetted offshore studios like CodeHTML, which offer direct communication, senior developers, and 60% lower costs."
      },
      {
        "q": "how to find a web developer in dubai",
        "a": "Find web developers in Dubai on LinkedIn, Clutch, or local business lists. If looking for premium quality without high agency markup, hire offshore teams that have proven track records with Dubai brands."
      },
      {
        "q": "web development regulations in uae",
        "a": "Websites in the UAE must comply with the UAE TDRA guidelines, UAE Data Protection Law (Federal Decree-Law No. 45 of 2021), and respect local cultural policies. E-commerce sites require specialized licenses."
      },
      {
        "q": "do I need arabic website for uae business",
        "a": "An Arabic version is not legally required for most businesses but is highly recommended for government portals, legal services, and consumer retail targeting local Emirati populations."
      },
      {
        "q": "how to find a reliable web development company in the uk",
        "a": "Search on Clutch.co UK section, ask for agency portfolios, check their UK client reviews, verify that they follow GDPR rules, and check their past project performance scores."
      },
      {
        "q": "uk gdpr compliance for websites 2025",
        "a": "UK GDPR compliance requires clear cookie consent bars, page-specific privacy policies, secure data encryption (HTTPS/SSL), user data delete forms, and storing user details in compliant cloud servers."
      },
      {
        "q": "best web development cities in the uk outside london",
        "a": "Manchester, Birmingham, Bristol, Leeds, and Edinburgh are thriving UK tech hubs. Vetted remote offshore agencies serve companies in these cities to cut down overhead costs."
      },
      {
        "q": "uk startup grant for tech products",
        "a": "UK startups apply for funding via Innovate UK grants, R&D tax credits, and local enterprise partnership funding. Custom MVPs built using modern JS stacks are ideal for securing these grants."
      },
      {
        "q": "how to find a web development agency in new york",
        "a": "NY agencies charge premium rates of $150-$250/hour. Startups look for offshore partners that offer transparent pricing models and hold Clutch verifications to build their digital apps."
      },
      {
        "q": "section 508 website accessibility compliance usa",
        "a": "Section 508 requires federal sites to be accessible. Private USA companies follow WCAG 2.1 AA standards to prevent legal liabilities. We write semantic HTML and ARIA labels to ensure compliance."
      },
      {
        "q": "how to compete with us web agencies as an india company",
        "a": "We compete by offering identical quality (Next.js, Tailwind, clean APIs), 100% IP ownership, rapid communication, and transparent milestone pricing that is 60% cheaper than USA quotes."
      },
      {
        "q": "ada compliance website development usa",
        "a": "ADA compliance ensures websites are readable by screen readers. This includes high text contrast, keyboard-navigable layouts, descriptive alt text on images, and zero broken visual transitions."
      },
      {
        "q": "how to register a tech company in singapore",
        "a": "Register your company with ACRA through a local filing agent. You need at least one resident director, a local registered office address, and a minimum paid-up capital of SGD 1."
      },
      {
        "q": "singapore psg grant for website development",
        "a": "The Productivity Solutions Grant (PSG) supports IT solution adoption. Eligible SME retail brands receive up to 50% funding. Custom software must be built to match ACRA registered activity specifications."
      },
      {
        "q": "mas fintech regulatory sandbox singapore",
        "a": "The Monetary Authority of Singapore (MAS) sandbox lets fintech startups test innovations in a live environment with relaxed regulatory requirements. Secure custom CRM systems are ideal for this sandbox."
      },
      {
        "q": "best tech hubs in singapore for startup",
        "a": "One-North, Jurong Innovation District, and LaunchPad @ One-North are top tech startup locations. Offshore teams build robust software pipelines to scale operations for Singapore startups."
      }
    ]
  }
];

  const toggleFaq = (groupIndex, faqIndex) => {
    const key = `${groupIndex}-${faqIndex}`;
    setOpenFaqs(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Filter FAQs based on search
  const filteredData = faqData.map((group, groupIdx) => {
    const filteredFaqs = group.faqs.filter(faq => 
      faq.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
      faq.a.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return {
      ...group,
      faqs: filteredFaqs
    };
  }).filter(group => group.faqs.length > 0);

  // Generate flat list of FAQs for SEO schema
  const getFlatFaqList = () => {
    const list = [];
    faqData.forEach(group => {
      group.faqs.forEach(faq => {
        list.push({
          question: faq.q,
          answer: faq.a
        });
      });
    });
    return list;
  };

  return (
    <main className="pt-24 md:pt-32 pb-16 bg-black min-h-screen text-white relative">
      <SEO 
        title="Dedicated B2B Web Development FAQ & AEO Center | CodeHTML" 
        description="Comprehensive answers to 70+ web development, tech stack, cost, timeline, and compliance questions for businesses in Dubai, India, UK, USA, and Singapore."
        keywords="web development cost, next js vs wordpress, custom software pricing, hire developers india, web design faq, tech stack 2025"
        faqList={getFlatFaqList()}
      />

      {/* Ambient background decoration */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-vintage-gold/5 blur-[100px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-vintage-gold/5 blur-[100px] rounded-full pointer-events-none z-0"></div>

      <div className="px-6 md:px-12 max-w-[1600px] mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-left mb-12">
          <h1 className="font-headline font-extrabold text-4xl sm:text-5xl md:text-7xl leading-[1.05] uppercase text-white tracking-tight">
            ANSWERS & <span className="font-elegant italic font-light text-vintage-gold">INTELLIGENCE</span>
          </h1>
        </div>

        {/* Search Bar */}
        <div className="mb-10 max-w-md">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-zinc-500" />
            <input 
              type="text" 
              placeholder="Search 71 B2B questions..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-zinc-950/60 border border-white/10 rounded-xl font-body text-sm text-white focus:outline-none focus:border-vintage-gold transition-all"
            />
          </div>
        </div>

        {searchQuery ? (
          /* Search Results View */
          <div className="space-y-12 text-left">
            <h3 className="font-headline font-bold text-lg text-zinc-400 uppercase tracking-wider">Search Results</h3>
            {filteredData.length === 0 ? (
              <p className="font-body text-zinc-500 text-sm">No answers found. Try general terms like "cost", "Next.js", or "Dubai".</p>
            ) : (
              filteredData.map((group, groupIdx) => (
                <div key={groupIdx} className="space-y-4">
                  <h4 className="font-headline font-bold text-sm text-vintage-gold uppercase tracking-wider">{group.category}</h4>
                  <div className="space-y-3">
                    {group.faqs.map((faq, faqIdx) => {
                      const isOpen = openFaqs[`${groupIdx}-${faqIdx}`] || false;
                      return (
                        <div 
                          key={faqIdx} 
                          className="bg-zinc-950/40 border border-white/5 rounded-2xl overflow-hidden transition-all hover:border-white/10"
                        >
                          <button
                            onClick={() => toggleFaq(groupIdx, faqIdx)}
                            className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none"
                          >
                            <h2 className="font-headline font-bold text-base md:text-lg text-white uppercase tracking-tight pr-4">
                              {faq.q}
                            </h2>
                            {isOpen ? <ChevronUp className="w-5 h-5 text-vintage-gold flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-zinc-500 flex-shrink-0" />}
                          </button>
                          {isOpen && (
                            <div className="px-6 pb-5 pt-1 border-t border-white/5">
                              <p className="font-body text-sm md:text-base text-zinc-400 leading-relaxed font-medium">
                                {faq.a}
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          /* Category Tabs View */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
            {/* Tabs List */}
            <div className="lg:col-span-4 flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible gap-2 pb-4 lg:pb-0 scrollbar-none border-b lg:border-b-0 lg:border-r border-white/5 pr-0 lg:pr-6 h-fit">
              {faqData.map((group, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`px-4 py-3 text-xs md:text-sm font-headline font-bold uppercase tracking-wider whitespace-nowrap rounded-xl text-left transition-all ${
                    activeTab === index 
                      ? 'bg-vintage-gold text-white font-black' 
                      : 'text-zinc-500 hover:text-zinc-300 bg-zinc-950/20 lg:bg-transparent'
                  }`}
                >
                  {group.category}
                </button>
              ))}
            </div>

            {/* FAQs List under Active Tab */}
            <div className="lg:col-span-8 space-y-4">
              <h3 className="font-headline font-bold text-xl text-white uppercase tracking-tight mb-6 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-vintage-gold" />
                {faqData[activeTab].category}
              </h3>
              <div className="space-y-3">
                {faqData[activeTab].faqs.map((faq, faqIdx) => {
                  const isOpen = openFaqs[`${activeTab}-${faqIdx}`] || false;
                  return (
                    <div 
                      key={faqIdx} 
                      className="bg-zinc-950/40 border border-white/5 rounded-2xl overflow-hidden transition-all hover:border-white/10"
                    >
                      <button
                        onClick={() => toggleFaq(activeTab, faqIdx)}
                        className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none"
                      >
                        <h2 className="font-headline font-bold text-base md:text-lg text-white uppercase tracking-tight pr-4">
                          {faq.q}
                        </h2>
                        {isOpen ? <ChevronUp className="w-5 h-5 text-vintage-gold flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-zinc-500 flex-shrink-0" />}
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-5 pt-1 border-t border-white/5">
                          <p className="font-body text-sm md:text-base text-zinc-400 leading-relaxed font-medium">
                            {faq.a}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Dynamic CTA */}
        <section className="mt-20 p-8 md:p-12 bg-zinc-950/60 border border-white/5 rounded-3xl text-center max-w-4xl mx-auto">
          <MessageSquare className="w-10 h-10 text-vintage-gold mx-auto mb-4" />
          <h2 className="font-headline font-extrabold text-2xl md:text-4xl text-white mb-4 uppercase">
            Have a Specific Question?
          </h2>
          <p className="font-body text-zinc-400 text-sm md:text-base max-w-lg mx-auto mb-8">
            Discuss your custom requirements directly with our developers. We sign NDAs and provide detailed software technical specification documents.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/919303228082?text=Hi%20CodeHTML,%20I%20am%20interested%20in%20your%20development%20services.%20I'd%20like%20to%20get%20started%20on%20discussing%20our%20custom%20project%20requirements."
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white text-black font-headline font-bold uppercase rounded-xl transition-all hover:bg-zinc-200"
            >
              Start Your Project ➲
            </a>
            <a
              href="https://wa.me/919303228082"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border border-white/10 font-headline font-bold uppercase rounded-xl transition-all hover:bg-zinc-900"
            >
              WhatsApp Developers
            </a>
          </div>
        </section>

      </div>
    </main>
  );
};

export default FAQ;
