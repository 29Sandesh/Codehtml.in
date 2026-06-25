const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

function generateCapabilitiesPDF(outputPath) {
  // Create a new PDF document (A4 size)
  const doc = new PDFDocument({
    size: 'A4',
    margins: { top: 30, bottom: 30, left: 40, right: 40 }
  });

  doc.pipe(fs.createWriteStream(outputPath));

  // Color Palette
  const colors = {
    black: '#000000',
    darkBg: '#050505',
    gold: '#c5a880',
    lightGold: '#a59070',
    white: '#ffffff',
    textDark: '#1e293b', // slate-800
    textMuted: '#475569', // slate-600
    borderLight: '#cbd5e1', // slate-300
    bgCard: '#f8fafc' // slate-50
  };

  // --- TOP BLACK BANNER ---
  doc.rect(0, 0, 595.28, 105)
     .fill(colors.darkBg);

  // Gold separator line below banner
  doc.rect(0, 105, 595.28, 2)
     .fill(colors.gold);

  // Header Title
  doc.fillColor(colors.gold)
     .font('Helvetica-Bold')
     .fontSize(20)
     .text('PARTNER WITH US', 40, 22);

  // Header Subtitle (General for both agency and solo partners)
  doc.fillColor(colors.white)
     .font('Helvetica-Bold')
     .fontSize(11.5)
     .text('White-Label Software & Development Partner for Agencies & Solo Partners', 40, 48);

  // Header Tagline
  doc.fillColor(colors.lightGold)
     .font('Helvetica-Oblique')
     .fontSize(9)
     .text('Rapid delivery. 100% custom-coded solutions. Zero developer overhead.', 40, 68);

  // --- INTRO PARAGRAPH ---
  const introY = 125;
  doc.fillColor(colors.textDark)
     .font('Helvetica')
     .fontSize(9)
     .text('We help digital agencies, marketing firms, consultants, and freelancers deliver high-quality software solutions under their own brand—without the hassle of hiring and managing developers.', 40, introY, {
       width: 515,
       align: 'left',
       lineGap: 3
     });

  // --- WHAT WE BUILD ---
  const buildY = 175;
  doc.fillColor(colors.black)
     .font('Helvetica-Bold')
     .fontSize(10.5)
     .text('WHAT WE BUILD', 40, buildY);

  // Separator line
  doc.moveTo(40, buildY + 14)
     .lineTo(555, buildY + 14)
     .strokeColor(colors.borderLight)
     .lineWidth(0.5)
     .stroke();

  // Columns for What We Build
  const col1X = 40;
  const col2X = 295;
  const itemsY = buildY + 22;

  // Row 1
  // Col 1: Custom Websites
  doc.circle(col1X + 4, itemsY + 4, 2).fill(colors.gold);
  doc.fillColor(colors.black).font('Helvetica-Bold').fontSize(8).text('Custom Websites:', col1X + 12, itemsY);
  doc.fillColor(colors.textMuted).font('Helvetica').fontSize(8).text('Hand-coded, responsive websites optimized for performance, search visibility, and conversions.', col1X + 12, itemsY + 10, { width: 230, lineGap: 1.5 });

  // Col 2: Web Applications
  doc.circle(col2X + 4, itemsY + 4, 2).fill(colors.gold);
  doc.fillColor(colors.black).font('Helvetica-Bold').fontSize(8).text('Web Applications:', col2X + 12, itemsY);
  doc.fillColor(colors.textMuted).font('Helvetica').fontSize(8).text('Secure dashboards, client portals, workflow systems, and database-driven business applications.', col2X + 12, itemsY + 10, { width: 230, lineGap: 1.5 });

  // Row 2
  const itemsY2 = itemsY + 38;
  // Col 1: SaaS Platforms
  doc.circle(col1X + 4, itemsY2 + 4, 2).fill(colors.gold);
  doc.fillColor(colors.black).font('Helvetica-Bold').fontSize(8).text('SaaS Platforms:', col1X + 12, itemsY2);
  doc.fillColor(colors.textMuted).font('Helvetica').fontSize(8).text('Multi-tenant SaaS products with subscription models and scalable cloud architectures.', col1X + 12, itemsY2 + 10, { width: 230, lineGap: 1.5 });

  // Col 2: Mobile Applications
  doc.circle(col2X + 4, itemsY2 + 4, 2).fill(colors.gold);
  doc.fillColor(colors.black).font('Helvetica-Bold').fontSize(8).text('Mobile Applications:', col2X + 12, itemsY2);
  doc.fillColor(colors.textMuted).font('Helvetica').fontSize(8).text('High-performance iOS and Android apps built to scale and deliver a native experience.', col2X + 12, itemsY2 + 10, { width: 230, lineGap: 1.5 });

  // --- SELECTED PROJECTS ---
  const projY = buildY + 98;
  doc.fillColor(colors.black)
     .font('Helvetica-Bold')
     .fontSize(10.5)
     .text('SELECTED PROJECTS', 40, projY);

  doc.moveTo(40, projY + 14)
     .lineTo(555, projY + 14)
     .strokeColor(colors.borderLight)
     .lineWidth(0.5)
     .stroke();

  // Project Cards (3 Columns)
  const cardWidth = 162;
  const cardHeight = 120;
  const cardGap = 14;
  const cardY = projY + 22;

  const projects = [
    {
      name: 'Swigato India',
      desc: 'Hyperlocal food ordering, listings, and restaurant onboarding platform built for enterprise scale.',
      url: 'https://swigatoindia.in',
      highlights: '150k+ Active Users • 0.2 Second Response Speed • Custom Geofencing'
    },
    {
      name: 'SLCC Construction',
      desc: 'Corporate website with digital blueprint visualization and automated client enquiry workflows.',
      url: 'https://slcc.in',
      highlights: '250ms Response Speed • Lead Qualification Automations • Interactive Blueprints'
    },
    {
      name: 'ElGamingo Store',
      desc: 'Modern e-commerce platform for gaming vouchers with automated digital delivery.',
      url: 'https://elgamingo.store',
      highlights: 'Instant Key Delivery API • Global Credit Card Processors • Dynamic Stock Systems'
    }
  ];

  projects.forEach((proj, idx) => {
    const cardX = 40 + idx * (cardWidth + cardGap);

    // Card background & borders
    doc.rect(cardX, cardY, cardWidth, cardHeight)
       .fillAndStroke(colors.bgCard, colors.borderLight);

    // Top gold line in card
    doc.rect(cardX, cardY, cardWidth, 2)
       .fill(colors.gold);

    // Project Name
    doc.fillColor(colors.black)
       .font('Helvetica-Bold')
       .fontSize(8.5)
       .text(proj.name, cardX + 8, cardY + 10);

    // Description
    doc.fillColor(colors.textDark)
       .font('Helvetica')
       .fontSize(7)
       .text(proj.desc, cardX + 8, cardY + 24, { width: cardWidth - 16, lineGap: 2 });

    // Website link
    doc.fillColor(colors.lightGold)
       .font('Helvetica-Oblique')
       .fontSize(7)
       .text(`Website: ${proj.url}`, cardX + 8, cardY + 68, { width: cardWidth - 16 });

    // Highlights header
    doc.fillColor(colors.black)
       .font('Helvetica-Bold')
       .fontSize(6.5)
       .text('HIGHLIGHTS:', cardX + 8, cardY + 84);

    // Highlights description
    doc.fillColor(colors.textMuted)
       .font('Helvetica')
       .fontSize(6.5)
       .text(proj.highlights, cardX + 8, cardY + 93, { width: cardWidth - 16, lineGap: 1 });
  });

  // --- HOW WE WORK ---
  const workY = cardY + cardHeight + 16;
  doc.fillColor(colors.black)
     .font('Helvetica-Bold')
     .fontSize(10.5)
     .text('HOW WE WORK', 40, workY);

  doc.moveTo(40, workY + 14)
     .lineTo(555, workY + 14)
     .strokeColor(colors.borderLight)
     .lineWidth(0.5)
     .stroke();

  // 3 Work Columns
  const workStepY = workY + 22;
  const steps = [
    { num: '1. Discovery & Planning', desc: 'Understanding requirements, defining user flows, and preparing the project structure.' },
    { num: '2. Development', desc: 'Building clean, scalable solutions with secure integrations and production-ready code.' },
    { num: '3. Testing & Launch', desc: 'Final testing, performance optimization, and deployment.' }
  ];

  steps.forEach((step, idx) => {
    const stepX = 40 + idx * (cardWidth + cardGap);
    
    // Background card box
    doc.rect(stepX, workStepY, cardWidth, 60)
       .fillAndStroke(colors.bgCard, colors.borderLight);

    // Top gold line in card
    doc.rect(stepX, workStepY, cardWidth, 2)
       .fill(colors.gold);

    doc.fillColor(colors.black)
       .font('Helvetica-Bold')
       .fontSize(8)
       .text(step.num, stepX + 8, workStepY + 8);

    doc.fillColor(colors.textMuted)
       .font('Helvetica')
       .fontSize(7)
       .text(step.desc, stepX + 8, workStepY + 20, { width: cardWidth - 16, lineGap: 2 });
  });

  // --- BOTTOM TWO COLUMNS (bullets on left, CTA box on right) ---
  const bottomY = workStepY + 76;

  // Left Column: Why Partner With Us
  const bulletsX = 40;
  const bulletsY = bottomY;

  doc.fillColor(colors.black)
     .font('Helvetica-Bold')
     .fontSize(10.5)
     .text('WHY PARTNER WITH US', bulletsX, bulletsY);

  const bulletPoints = [
    'White-label delivery under your own brand',
    'Fast turnaround (standard builds in 3-5 days)',
    'Fully custom-coded solutions (React / Next.js / Node)',
    'Complete IP and source code ownership',
    'SEO-friendly, high-performance practices (100/100 speeds)',
    'No in-house developer hiring or management overhead'
  ];

  bulletPoints.forEach((pt, idx) => {
    const ptY = bulletsY + 18 + idx * 12;
    doc.circle(bulletsX + 3, ptY + 3.5, 1.25).fill(colors.gold);
    doc.fillColor(colors.textDark)
       .font('Helvetica')
       .fontSize(7.5)
       .text(pt, bulletsX + 10, ptY);
  });

  // Right Column: Let's Build Together Box
  const ctaX = 310;
  const ctaWidth = 245;
  const ctaHeight = 88;
  const ctaY = bottomY;

  // CTA Card border
  doc.rect(ctaX, ctaY, ctaWidth, ctaHeight)
     .strokeColor(colors.gold)
     .lineWidth(0.75)
     .stroke();

  doc.fillColor(colors.gold)
     .font('Helvetica-Bold')
     .fontSize(9)
     .text("LET'S BUILD TOGETHER", ctaX + 12, ctaY + 10);

  doc.fillColor(colors.textDark)
     .font('Helvetica')
     .fontSize(8)
     .text("If your clients need websites, web applications, SaaS products, or mobile apps, we'd love to work as your technical partner and help you deliver exceptional results.", ctaX + 12, ctaY + 24, {
       width: ctaWidth - 24,
       lineGap: 3
     });

  // --- FOOTER ---
  const footerY = 745;
  doc.moveTo(40, footerY - 8)
     .lineTo(555, footerY - 8)
     .strokeColor(colors.borderLight)
     .lineWidth(0.5)
     .stroke();

  doc.fillColor(colors.textMuted)
     .font('Helvetica-Bold')
     .fontSize(7.5)
     .text('CodeHTML Tech Studio   •   Contact@Codehtml.in   •   +91 93032 28082', 40, footerY, {
       align: 'center',
       width: 515
     });

  doc.end();
}

const targetPath = path.resolve(__dirname, '../public/Premium-Digital-Solutions-Capabilities.pdf');
console.log('Writing PDF to:', targetPath);
generateCapabilitiesPDF(targetPath);

// Also copy it to dist/ just in case it is already built
const distPath = path.resolve(__dirname, '../dist/Premium-Digital-Solutions-Capabilities.pdf');
if (fs.existsSync(path.dirname(distPath))) {
  console.log('Writing PDF to dist:', distPath);
  generateCapabilitiesPDF(distPath);
}

console.log('PDF Generation Complete!');
