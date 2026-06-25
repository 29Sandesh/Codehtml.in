export const AI_SOLUTIONS_DATA = {
  'ai-voice-chatbots': {
    title: "AI Voice & Chatbots",
    tagline: "CONVERSATIONAL WHATSAPP & VOICE AGENTS.",
    description: "Deploy intelligent virtual assistants across WhatsApp, web chat, and voice lines. Our AI models read contextual knowledge bases, answer queries in real-time, and route qualified leads directly to your sales staff.",
    features: [
      "Official Meta WhatsApp Cloud API Setup",
      "Context-Aware LLM Response Generators",
      "Dynamic Voice Call Synthesis & Transcripts",
      "Lead Details Extraction & Database Sync",
      "Frictionless Human Agent Handover Triggers"
    ],
    techStack: ["React.js", "Node.js", "WhatsApp Cloud API", "Python", "OpenAI APIs"],
    faqs: [
      { q: "Do we need a verified Meta Business Account?", a: "Yes. We guide you through the official Meta verification pipeline to request API access." },
      { q: "Can the chatbot answer specific pricing questions?", a: "Yes. We feed your pricing rules and FAQs into the semantic database for accurate responses." }
    ],
    pricing: { name: "Chatbot Pack", price: "AED 5,500", focus: "WhatsApp and web AI chatbot agents", features: ["Meta API Setup", "Custom DB Context Embedding", "Human Takeover Panel", "28 Days Delivery"] }
  },
  'ai-consultancy': {
    title: "AI Consultancy",
    tagline: "AI STRATEGY & TECHNOLOGY ASSESSMENTS.",
    description: "Align your operations with cutting-edge AI. We audit your workflows, identify manual bottlenecks, evaluate suitable LLM models, and design an actionable AI integration blueprint.",
    features: [
      "Workflow Bottlenecks Auditing Sheets",
      "LLM Model Suitability & Cost Analytics",
      "System Architecture Integration Drafts",
      "Token Billing Estimation Spreadsheets",
      "AI Strategy Advisory Sessions"
    ],
    techStack: ["Technical Strategy", "OpenAI / Claude API", "AWS Architecture"],
    faqs: [
      { q: "What deliverables do we receive?", a: "You receive a complete Technical Architecture Blueprint detailing recommended models, API flowcharts, cost predictions, and safety protocols." },
      { q: "Do you help train our staff?", a: "Yes, we conduct hands-on training sessions for your technical team during handover." }
    ],
    pricing: { name: "AI Consultation", price: "AED 3,000", focus: "Architecture maps & AI roadmaps", features: ["Full Workflow Audit", "Model ROI Analysis", "System Design Docs", "14 Days Delivery"] }
  },
  'ai-search': {
    title: "Semantic AI Search",
    tagline: "INTELLIGENT KNOWLEDGE RETRIEVAL.",
    description: "Unlock company databases. Build semantic vector search engines that enable team members or clients to scan internal PDFs, policies, and contracts using natural query language.",
    features: [
      "Vector Database Embeddings Pipelines",
      "RAG (Retrieval-Augmented Generation) Sync",
      "Instant Fuzzy & Semantic Search Grids",
      "Granular File Access Level Filters",
      "PDF Source Citation & Highlighting"
    ],
    techStack: ["React.js", "Node.js", "Pinecone DB", "OpenAI Embeddings", "PostgreSQL"],
    faqs: [
      { q: "Can it scan scanned image PDFs?", a: "Yes. We incorporate OCR pipelines to extract and index text from scanned documents." },
      { q: "Does it keep files private?", a: "Absolutely. All vector indices are encrypted and run within your private VPC cloud infrastructure." }
    ],
    pricing: { name: "Semantic Search Engine", price: "AED 8,500", focus: "RAG vector search across internal vaults", features: ["Pinecone/PGVector Setup", "OCR Scan Processing", "Secure Document Access Key", "30 Days Delivery"] }
  },
  'ai-sales-agent': {
    title: "AI Sales Agent",
    tagline: "24/7 AUTONOMOUS SALES & CONVERSION BOT.",
    description: "Never miss a lead. Our autonomous AI sales agents follow up on inbound web inquiries, qualify prospects, explain product offerings, and book consultation calls directly on your calendar.",
    features: [
      "Instant Lead Form Webhook Ingestion",
      "Autonomous SMS/WhatsApp Conversation flow",
      "Dynamic Product Explanation Engine",
      "Calendly & Google Calendar Booking Sync",
      "CRM Lead Profiling & Qualifier Tags"
    ],
    techStack: ["React.js", "Node.js", "OpenAI API", "Twilio", "Make.com"],
    faqs: [
      { q: "How does the agent book meetings?", a: "It connects to your calendar API (Google/Outlook) and suggests open slots to the client directly in the chat." },
      { q: "Can we define what the agent says?", a: "Yes. We configure prompt boundaries and system guardrails to align with your brand voice." }
    ],
    pricing: { name: "Sales Agent Bot", price: "AED 7,500", focus: "Lead qualifiers, WhatsApp sales bot, CRM sync", features: ["24/7 Auto-responder", "Calendar API Sync", "CRM Qualifier Logic", "30 Days Delivery"] }
  },
  'agents-and-processes': {
    title: "AI Agents & Process Automation",
    tagline: "AUTONOMOUS DATABASE & API SYNC SCRIPTS.",
    description: "Eliminate repetitive manual admin tasks. We program AI workflow scripts that listen to web events, process files, scrape competitor inventories, and sync databases automatically.",
    features: [
      "Continuous Web Trigger Listeners",
      "Automated PDF Invoicing & Email Dispatch",
      "Frictionless Competitor Stock Scrapers",
      "Multi-system API Database Bridges",
      "Cron-based Daily Database Updates"
    ],
    techStack: ["Node.js", "Python Scripts", "n8n", "Make.com", "PostgreSQL"],
    faqs: [
      { q: "Do you use third-party tools like Zapier?", a: "While we can use Zapier or Make, we specialize in writing custom Node.js/Python cron scripts to save you recurring SaaS fees." },
      { q: "Can the system scrape JavaScript-heavy websites?", a: "Yes, we build headless browser pipelines (Playwright/Puppeteer) to scrape dynamic websites." }
    ],
    pricing: { name: "Process Automation", price: "AED 5,000", focus: "Database cron scripts, n8n sync, scrapers", features: ["Up to 3 API connections", "Headless Scraper script", "Automated Daily Crons", "25 Days Delivery"] }
  },
  'ai-customer-support-agent': {
    title: "AI Customer Support Agent",
    tagline: "RESOLVE 80% OF TICKETS INSTANTLY.",
    description: "Offload support queues. Build context-aware customer support agents trained on your technical documentations, return policies, and product guides to resolve client inquiries instantly.",
    features: [
      "Interactive Support Widget Overlays",
      "Auto-Learning Knowledge Base Sync",
      "Multi-Language Client Chat Engines",
      "Support Ticket Drafting & Auto-Assign",
      "Customer Satisfaction (CSAT) Metrics"
    ],
    techStack: ["React.js", "Node.js", "MongoDB", "Tailwind CSS", "LangChain"],
    faqs: [
      { q: "What happens if the AI cannot solve the issue?", a: "The agent automatically drafts a support ticket and notifies a human manager to take over the session." },
      { q: "Does it support multiple languages?", a: "Yes. The AI automatically detects the client's language (Arabic, English, French, etc.) and responds fluently." }
    ],
    pricing: { name: "Support Agent", price: "AED 6,500", focus: "Support widgets, multilinguality, and tickets", features: ["Dynamic Knowledge Sync", "Multi-Language Support", "Human Escalate System", "28 Days Delivery"] }
  },
  'revenue-automation': {
    title: "Revenue Automation",
    tagline: "AUTOMATED STRIPE CHECKOUTS & CONVERSION.",
    description: "Optimize cash flow. We build systems that automate subscription billings, trigger cart abandonment discount codes, and optimize customer renewal pipelines.",
    features: [
      "Stripe Billing Recurring Subscription checkout",
      "Cart Abandonment Email/SMS Triggers",
      "Dynamic Discount Code Allocation",
      "Failed Payment Autoretry Loops",
      "Billing PDF Invoices Autogen Dispatch"
    ],
    techStack: ["React.js", "Node.js", "Stripe API", "SendGrid", "MongoDB"],
    faqs: [
      { q: "How do we handle subscription upgrades or downgrades?", a: "We build a secure client billing portal where customers can manage their plans, update payment methods, and download invoices." },
      { q: "Does the system alert us on payment failures?", a: "Yes. Webhook listeners trigger automated recovery emails to clients and notify your billing team." }
    ],
    pricing: { name: "RevOps Engine", price: "AED 8,500", focus: "Billing engines, retries, and analytics", features: ["Stripe Subscription Portal", "Dunning SMS/Email flow", "Dynamic Coupon Logic", "30 Days Delivery"] }
  },
  'client-control': {
    title: "Client Control Portal",
    tagline: "MANAGE CLIENT QUOTES & DELIVERABLES.",
    description: "Keep client projects on track. A unified dashboard to present quotes, upload project iterations, track approvals, and log support tickets with clear audit trails.",
    features: [
      "Client Interactive Quote Estimators",
      "B2B File Version Approval Panels",
      "System Support Ticket Log Sheets",
      "Milestone Status Sign-Off Checks",
      "Company Activity Audit Streams"
    ],
    techStack: ["React.js", "Node.js", "PostgreSQL", "Tailwind CSS", "Framer Motion"],
    faqs: [
      { q: "Can we use this for design approvals?", a: "Yes, clients can comment directly on uploaded files and click to approve deliverables." },
      { q: "Can clients view historical invoices?", a: "Yes. A dedicated invoice center lists all past payments, outstanding fees, and receipts." }
    ],
    pricing: { name: "Client Control Pack", price: "AED 7,500", focus: "Quote estimators, task boards, and approvals", features: ["Quote Generator Module", "Approval Log Trails", "Support Ticket System", "28 Days Delivery"] }
  },
  'finance-and-structure': {
    title: "Finance & Structure Automation",
    tagline: "AUTOMATED CORPORATE REPORTS & PAYROLL.",
    description: "Simplify accounting. Connect business bank feeds, automate payroll deposits, compute tax estimations, and generate compliant financial reports automatically.",
    features: [
      "Corporate Expense Ingestion Pipelines",
      "Automated Payroll Calculations & Direct Transfers",
      "Tax Estimation Reports",
      "Bank Account Statement Sync APIs",
      "Profit & Loss Chart Dashboards"
    ],
    techStack: ["React.js", "Node.js", "PostgreSQL", "Plaid API", "Recharts"],
    faqs: [
      { q: "Can we sync with local UAE banks?", a: "Yes, we integrate with secure bank feed aggregators like Plaid or Tarabut to pull transaction ledgers." },
      { q: "Is the financial dashboard printable?", a: "Yes. All reports can be exported to CSV or compiled into premium PDF documents." }
    ],
    pricing: { name: "Finance Engine", price: "AED 12,000+", focus: "Accounting sync, PL dashboards, and payroll", features: ["Tarabut/Plaid Sync Setup", "Automatic Payroll Module", "PDF P&L Generator", "35 Days Delivery"] }
  }
};
