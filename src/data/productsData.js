export const PRODUCTS_DATA = {
  'customer-portal': {
    title: "Customer Portal (Extranet)",
    tagline: "SECURE CLIENT WORKSPACES & EXTRANET SYSTEMS.",
    description: "Provide your clients with a secure, custom-branded login workspace to access documents, track project milestones, sign off on deliverables, and handle invoice payments. Replace messy email chains with a unified business gateway.",
    features: [
      "Secure Client Login & Auth",
      "File Upload/Download & File Managers",
      "Project Status Timeline Boards",
      "Secure Stripe Invoice & Payment Integration",
      "Live Chat & Messaging Boards"
    ],
    techStack: ["React.js", "Vite", "Node.js", "PostgreSQL", "Tailwind CSS"],
    faqs: [
      { q: "Is the portal customizable with our company colors?", a: "Yes, the portal is fully white-labeled on your own domain (e.g. portal.yourdomain.com) and custom-themed to match your brand style guide." },
      { q: "How is client data kept secure?", a: "We enforce strict row-level security policies in PostgreSQL, secure JWT session management, and encrypted S3 buckets so no user can access another company's assets." }
    ],
    pricing: { name: "Client Gateway", price: "600", focus: "Secure client dashboards & extranets", features: ["100% Code Ownership", "Subdomain Configuration", "Up to 5 custom roles", "28 Days Delivery"] }
  },
  'supplier-portal': {
    title: "Supplier Portal",
    tagline: "INTEGRATED LOGISTICS & PROCUREMENT PLATFORMS.",
    description: "Streamline communication with manufacturers, vendors, and suppliers. Automate bidding, coordinate inventory intake, track supply chains, and verify compliance documentation in a unified portal.",
    features: [
      "Supplier Onboarding & Verified Profiles",
      "RFQ & Automated Bid Submission Pipelines",
      "Inventory Delivery Scheduling & Dispatching",
      "Purchase Order (PO) Management Sheets",
      "DLD/Customs Compliance Document Vault"
    ],
    techStack: ["React.js", "Express.js", "MongoDB", "Tailwind CSS", "AWS S3"],
    faqs: [
      { q: "Can this portal sync with our ERP inventory system?", a: "Yes. We code custom middleware bridges to sync supplier bid inventories directly with SAP, Oracle, or legacy relational databases." },
      { q: "Does the system support digital compliance signing?", a: "Yes, we integrate secure digital document signing interfaces for procurement contracts and customs forms." }
    ],
    pricing: { name: "Procurement Hub", price: "1200", focus: "Logistics and supplier coordination databases", features: ["Vendor Bid Manager", "PO Automations", "Secure Compliance Vault", "40 Days Delivery"] }
  },
  'employee-portal': {
    title: "Employee Portal (Intranet)",
    tagline: "INTERNAL HUB FOR CORPORATE SYNC.",
    description: "Connect your team with a centralized intranet. Manage company policies, coordinate HR requests, check leave requests, review shift rosters, and centralize communication.",
    features: [
      "Custom Directory & Team Org Charts",
      "HR Document Center & Resource Directories",
      "Timekeeping & Leave Request Auditing",
      "Internal Newsfeed & Company Announcements",
      "Shift Rosters & Operational Calendars"
    ],
    techStack: ["React.js", "Vite", "Node.js", "PostgreSQL", "Framer Motion"],
    faqs: [
      { q: "Can we connect it to our active directory or GSuite?", a: "Yes, we implement secure Single Sign-On (SSO) using Google Workspace, Microsoft Azure AD, or custom SAML providers." },
      { q: "Can we set team-specific permission levels?", a: "Yes, permissions can be locked down dynamically per department, office branch, or seniority tier." }
    ],
    pricing: { name: "Corporate Intranet", price: "800", focus: "Company sync, rosters, and HR file vaults", features: ["SSO Integration", "Shift Planner Module", "Holiday & Leave Tracker", "30 Days Delivery"] }
  },
  'partner-portal': {
    title: "Partner Portal (Extranet)",
    tagline: "CHANNEL MANAGEMENT & B2B AFFILIATE PLATFORMS.",
    description: "Maximize channel sales. Provide distributors, affiliates, and brokers with sales materials, lead tracking dashboards, marketing assets, and commission payouts.",
    features: [
      "Broker & Affiliate Registration Flows",
      "Unique Tracking Link Generators",
      "Commission Payout & Revenue Analytics",
      "Sales Collaterals & PDF Deck Downloads",
      "Lead Referral Submissions System"
    ],
    techStack: ["React.js", "Vite", "Node.js", "MongoDB", "EmailJS"],
    faqs: [
      { q: "How are commissions tracked and paid out?", a: "The portal records referrals in real time. Payments can be authorized via integrated bank wire pipelines or Stripe Connect." },
      { q: "Can we restrict material access per partner tier?", a: "Yes, you can configure the catalog dynamically based on partner performance (e.g. Silver, Gold, Platinum tiers)." }
    ],
    pricing: { name: "Channel Suite", price: "1000", focus: "B2B referrals, partner catalogs, and metrics", features: ["Lead Routing Engine", "Revenue Tracking Dashboard", "Unlimited Partners", "35 Days Delivery"] }
  },
  'erp-system': {
    title: "Enterprise Resource Planning (ERP)",
    tagline: "CENTRAL OPERATIONS & DATABASE CONTROL.",
    description: "Unify every sector of your company. Integrate inventory databases, manufacturing lines, accounting systems, purchase logs, and customer invoicing into one high-performance dashboard.",
    features: [
      "Unified Operational Dashboards",
      "Real-time Inventory Tracking & Warnings",
      "Billing, General Ledger & Asset sheets",
      "Procurement and Invoice Automation",
      "Custom PDF Report Generators"
    ],
    techStack: ["React.js", "Node.js", "PostgreSQL", "Tailwind CSS", "PDFKit"],
    faqs: [
      { q: "Why choose a custom ERP over pre-made SaaS like SAP?", a: "Standard ERPs require expensive per-user monthly license locks and cost thousands to customize. Custom ERPs give you 100% ownership with zero monthly fees." },
      { q: "Is database backup automated?", a: "Yes. We set up automated cron processes that execute secure daily database snapshot backups to isolated cloud vaults." }
    ],
    pricing: { name: "Custom ERP Engine", price: "3000+", focus: "Complete tailored enterprise operation software", features: ["Zero User License Fees", "Custom Database Mapping", "Unlimited Scalability", "60 Days Delivery"] }
  },
  'crm-system': {
    title: "Customer Relationship Management (CRM)",
    tagline: "SALES FUNNEL MANAGEMENT & PIPELINE ANALYSIS.",
    description: "Empower your sales consultants. Track lead allocations, optimize conversation histories, manage email/WhatsApp reminders, and generate real-time performance analytics.",
    features: [
      "Visual Drag-and-Drop Pipeline Boards",
      "Consultant Lead Allocation Engines",
      "Integrated Email & WhatsApp History Logs",
      "Activity Notifications & Follow-Up Reminders",
      "Sales Analytics & Conversion Charts"
    ],
    techStack: ["React.js", "Node.js", "MongoDB", "Framer Motion", "Recharts"],
    faqs: [
      { q: "Can leads be imported from Facebook Ads or Webforms?", a: "Yes. We build webhook listeners that instantly ingest leads from Google, Meta Ads, and your company website forms." },
      { q: "Can we restrict client database visibility per sales representative?", a: "Absolutely. Sales representatives see only their allocated client profiles, while managers retain total pipeline insight." }
    ],
    pricing: { name: "Bespoke Sales CRM", price: "1200", focus: "Sales pipeline tracking & CRM databases", features: ["Lead Ingestion Webhooks", "Drag-and-Drop Pipelines", "Commission Calculators", "42 Days Delivery"] }
  },
  'hospital-system': {
    title: "Hospital & Clinic Management",
    tagline: "DHA-COMPLIANT MEDICAL CLINIC SYSTEMS.",
    description: "Streamline patient scheduling, clinical consultation records, aesthetic catalogs, and billing databases under strict DHA (Dubai Health Authority) guidelines.",
    features: [
      "DHA-Compliant Patient Record Vaults",
      "Interactive Doctor Calendars & Bookings",
      "Encrypted Patient Intake Consent Forms",
      "Treatment Catalogs & Medical Billing Sheets",
      "Automated SMS/Email Session Reminders"
    ],
    techStack: ["React.js", "Node.js", "PostgreSQL", "Encrypted DB Columns"],
    faqs: [
      { q: "Is patient data fully encrypted?", a: "Yes, we implement AES-256 field-level encryption for patient medical records and restrict access logs behind strict audit systems." },
      { q: "Can this system coordinate aesthetic medicine clinic treatments?", a: "Yes, it supports mapping patient progress photos, aesthetic dosage cards, and clinician logs." }
    ],
    pricing: { name: "Clinic Suite", price: "1500", focus: "DHA-compliant booking and patient database", features: ["Patient Consent Encrypted forms", "Appointment Syncing", "Billing & Invoices", "45 Days Delivery"] }
  },
  'school-system': {
    title: "School & Academy Management",
    tagline: "STUDENT PORTALS, FEES & ACADEMIC DATABASES.",
    description: "Unify academy operations. Manage student enrollments, school fee payments, dynamic class schedules, parent communication, and student report cards.",
    features: [
      "Student & Parent Portal Dashboards",
      "Online Fee Payment & Invoicing",
      "Interactive Class Timetables & Scheduling",
      "Grading Sheets & Report Card Builders",
      "Teacher Allocation & Rosters"
    ],
    techStack: ["React.js", "Node.js", "PostgreSQL", "Tailwind CSS", "Stripe"],
    faqs: [
      { q: "Can parents check exam grades online?", a: "Yes, parents log in to see grade reports, fee due notices, and message class teachers directly." },
      { q: "Does this system support recurring tuition payment schedules?", a: "Yes, we connect with payment gateways to automate term-based tuition drafts." }
    ],
    pricing: { name: "Academy System", price: "1200", focus: "Tuition checkouts, grade trackers, and portals", features: ["Grade Card Builder", "Stripe Tuition Checkout", "Class Schedule Manager", "35 Days Delivery"] }
  },
  'fleet-management': {
    title: "Fleet Management System",
    tagline: "YACHT & SUPERCAR INVENTORY OPERATIONS.",
    description: "Coordinate premium luxury supercar rentals or yacht charters. Keep track of GPS telemetry, maintenance schedules, booking logs, and driver history.",
    features: [
      "Supercar & Yacht Interactive Status Grids",
      "Fleet Maintenance & Oil Sync Notifications",
      "RTA/DTCM Document Compliance Alerts",
      "Integrated GPS Tracking Map Modules",
      "Fuel Consumption & Mileage Logs"
    ],
    techStack: ["React.js", "Vite", "Node.js", "PostgreSQL", "Google Maps API"],
    faqs: [
      { q: "Can we monitor live car locations in this ERP?", a: "Yes. We integrate live telemetry feeds from compatible GPS trackers to display vehicle markers on Google Maps." },
      { q: "How are maintenance schedules calculated?", a: "The system triggers warnings when mileage limits are met or certificate expiries approach." }
    ],
    pricing: { name: "Fleet Control Hub", price: "1500", focus: "Luxury fleet status grids, GPS sync, and scheduling", features: ["Google Maps Integration", "RTA Compliance Alerts", "Fleet Booking Calendar", "38 Days Delivery"] }
  },
  'document-management': {
    title: "Document Management System (DMS)",
    tagline: "COMPLIANT FILE STORAGE & ACCESS CONTROLS.",
    description: "Eliminate paper files. Securely index, store, search, and audit corporate documents with enterprise-grade permission mapping and revision histories.",
    features: [
      "Dynamic Folder Tree Directory Layouts",
      "Fuzzy Search and Metadata Tagging",
      "Document Revision & Versioning Audits",
      "File Approval Workflows & Alerts",
      "Granular User & Group Access Keys"
    ],
    techStack: ["React.js", "Vite", "Node.js", "PostgreSQL", "S3 Bucket Versioning"],
    faqs: [
      { q: "Can we recover previous file versions?", a: "Yes. S3 object versioning keeps old revisions, allowing you to compare or restore files instantly." },
      { q: "Can we share password-protected files outside our company?", a: "Yes, you can generate time-locked, encrypted links with restricted access permissions." }
    ],
    pricing: { name: "Enterprise DMS", price: "1000", focus: "Secure document search, approvals, and audits", features: ["Object Versioning Systems", "Group Level Access Keys", "Fuzzy Search Engine", "28 Days Delivery"] }
  },
  'online-store': {
    title: "Premium Online Store",
    tagline: "FAST, HEADLESS E-COMMERCE ENGINE.",
    description: "Sell physical goods with speed. Skip slow templates and load catalogs in milliseconds. Features secure checkout, inventory synchronization, and custom admin portals.",
    features: [
      "Sub-second React Product Directory Grids",
      "Custom Visual Shopping Cart Modules",
      "Multi-Currency Stripe & Apple Pay checkouts",
      "Dynamic Admin Stock Inventory Sync",
      "Automated PDF Invoice Generation"
    ],
    techStack: ["React.js", "Vite", "Node.js", "MongoDB", "Stripe Billing API"],
    faqs: [
      { q: "Is the checkout page faster than Shopify?", a: "Yes. Headless React stores compile to static assets served globally from edge nodes, ensuring sub-second checkout load times." },
      { q: "How do we update product details?", a: "We build a secure, user-friendly admin portal to easily add listings, modify pricing, and track orders." }
    ],
    pricing: { name: "Headless Store", price: "600", focus: "Premium custom checkout grids & inventories", features: ["Millisecond Load Catalog", "Apple Pay & Local checkout", "Admin Product Panel", "25 Days Delivery"] }
  },
  'multi-vendor-marketplace': {
    title: "Multi-Vendor Marketplace",
    tagline: "COMMERCIAL B2C MULTI-SELLER PLATFORMS.",
    description: "Build the next local marketplace platform. Enable third-party merchants to sign up, list products, process payments, and manage commission payouts from a central control board.",
    features: [
      "Vendor Registration & Storefront Dashboards",
      "Dynamic Platform Commission Split Engines",
      "Centralized Payment Escrow & Cart Systems",
      "Vendor Revenue Reports & Analytics",
      "Customer Review & Ratings Boards"
    ],
    techStack: ["React.js", "Node.js", "PostgreSQL", "Stripe Connect API"],
    faqs: [
      { q: "How are funds split between vendors?", a: "We integrate Stripe Connect, which automatically splits customer payments, routes commissions to you, and deposits the balance to the vendor." },
      { q: "Can we approve vendors before they list items?", a: "Yes, the admin panel features an onboarding queue where you can audit and approve sellers." }
    ],
    pricing: { name: "Marketplace Suite", price: "2500+", focus: "Multi-seller storefronts & payout splits", features: ["Stripe Connect Setup", "Seller Portal Dashboards", "Platform Commission Audits", "50 Days Delivery"] }
  },
  'b2b-store': {
    title: "B2B Store",
    tagline: "WHOLESALE BULK COMMERCE CHANNELS.",
    description: "Facilitate wholesale distribution. Set up tiered pricing models, bulk quantity checkout discounts, secure wire transfer verify pipelines, and corporate credit approvals.",
    features: [
      "Dynamic Tiered Wholesale Pricing Lists",
      "Bulk Quantity Discount Rules & Cart",
      "Corporate Credit Account Database Logs",
      "Offline Wire Transfer Verification Pipelines",
      "PDF Purchase Order Generator Sheets"
    ],
    techStack: ["React.js", "Vite", "Node.js", "MongoDB", "PDFKit"],
    faqs: [
      { q: "Can different distributors see custom prices?", a: "Yes, you can configure unique pricing tiers for different dealer levels (e.g. Distributor, Dealer, Retailer)." },
      { q: "Can B2B buyers pay on invoice?", a: "Yes, the system allows registered corporate buyers to check out with a Purchase Order (PO) and tracks credit balances." }
    ],
    pricing: { name: "Wholesale Hub", price: "1200", focus: "Bulk orders, credit systems, and dealer tiers", features: ["Dealer Pricing Tiers", "PO Checkout Engine", "Credit Limit Manager", "32 Days Delivery"] }
  },
  'booking-system': {
    title: "Bespoke Booking System",
    tagline: "REAL-TIME RESERVATION SYSTEMS.",
    description: "Eliminate double-bookings. Manage hotel rooms, safari excursions, restaurant tables, or doctor shifts with live availability calendars and payment gateways.",
    features: [
      "Millisecond Dynamic Availability Calendars",
      "Stripe & Local Card Deposit Holds",
      "Multi-Resource Booking Allocators",
      "SMS & Email Alert Confirmation Triggers",
      "Waitlist & Capacity Limit Managers"
    ],
    techStack: ["React.js", "Node.js", "PostgreSQL", "Tailwind CSS", "Twilio API"],
    faqs: [
      { q: "Can this prevent double bookings?", a: "Yes. Our database locks availability variables instantly on checkout start to eliminate scheduling overlaps." },
      { q: "Does the system support reservation deposits?", a: "Yes. You can require full prepayments, partial deposits, or simple card authorization holds." }
    ],
    pricing: { name: "Booking System", price: "600", focus: "Real-time reservation engines & scheduling", features: ["Conflict-Free Calendar", "Deposit Hold Integrations", "Client Reminders SMS/Mail", "21 Days Delivery"] }
  },
  'pos-system': {
    title: "POS System Integration",
    tagline: "RETAIL STORE POINT-OF-SALE INTEGRATIONS.",
    description: "Connect retail sales grids with online stock. Custom POS database overlays that synchronize storefront billing, barcode scanners, and inventory files in real-time.",
    features: [
      "High-Speed Retail Billing Grid Layout",
      "Barcode Scanner & USB Printer Sync",
      "Instant Stock Level Check & Alerts",
      "Multi-Register Daily Transaction Audits",
      "Offline Sync Database Cache Systems"
    ],
    techStack: ["React.js", "Electron.js", "SQLite Local DB", "Node.js", "PostgreSQL"],
    faqs: [
      { q: "Does it work if the internet drops?", a: "Yes, Electron-based desktop systems cache transactions locally in SQLite and sync to the cloud database when online." },
      { q: "Can we sync retail sales with our online store?", a: "Yes. Stock levels update instantly across physical registers and web checkouts." }
    ],
    pricing: { name: "Retail POS Sync", price: "1000", focus: "Point-of-Sale sync & retail inventory grids", features: ["Offline Cache Database", "Barcode Printer Sync", "Unified Inventory Control", "30 Days Delivery"] }
  }
};
