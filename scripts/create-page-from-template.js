#!/usr/bin/env node

/**
 * Script to create new pages using PHP-matched widget components
 * Usage: node scripts/create-page-from-template.js --template=post-single-1 --output=mortgage-brokers/gold-coast
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Template configurations
const templates = {
  'post-single-1': {
    name: 'Mortgage Broker Location Page',
    components: [
      'HeroWidget',
      'ReputationWidget', 
      'RiskWidget',
      'WhyChooseWidget',
      'WhyDoWidget',
      'HowMuchWidget',
      'DarkHolderWidget',
      'ReviewsWidget',
      'LendersWidget',
      'AccordionWidget'
    ],
    sections: [
      'hero',
      'reputation', 
      'risk',
      'why-choose',
      'comparison',
      'cost-info',
      'cta-sections',
      'reviews',
      'lenders',
      'faq',
      'compliance',
      'video'
    ]
  },
  'home-loan-landing': {
    name: 'Home Loan Landing Page',
    components: [
      'HeroWidget',
      'WhyChooseWidget',
      'ReviewsWidget',
      'LendersWidget',
      'HowMuchWidget',
      'DarkHolderWidget'
    ]
  }
};

// Default data sets
const defaultData = {
  whyChooseBenefits: [
    {
      icon: "/images/icons/why_choose_001.svg",
      title: "One of the lowest rejection rates",
      description: "across Mortgage Brokers in Australia"
    },
    {
      icon: "/images/icons/why_choose_002.svg", 
      title: "The highest rated and most reviewed",
      description: "Mortgage Broker in Brisbane on Google"
    },
    {
      icon: "/images/icons/why_choose_003.svg",
      title: "We have direct access to 30+ banks and lenders",
      description: "across Australia"
    }
  ],
  
  reviews: [
    {
      name: "Sarah M.",
      date: "2 weeks ago",
      rating: 5,
      text: "Exceptional service from start to finish. The team made the entire process stress-free.",
      expandedText: "They explained everything clearly and kept us updated throughout. Would definitely recommend to anyone looking for a mortgage broker.",
      avatar: "/images/testimonials/default-1.png"
    },
    {
      name: "David L.", 
      date: "1 month ago",
      rating: 5,
      text: "Professional, knowledgeable, and got us a great rate.",
      expandedText: "Hunter Galloway found us options we didn't even know existed. Their expertise saved us thousands on our home loan.",
      avatar: "/images/testimonials/default-2.png"
    }
  ],
  
  faqs: [
    {
      question: "What is a mortgage broker?",
      answer: "<p>A mortgage broker is a professional who acts as an intermediary between you and potential lenders. They help you find and secure the best home loan for your situation from their panel of lenders.</p>"
    },
    {
      question: "How much does it cost to use a mortgage broker?",
      answer: "<p>Our services are completely free for home and investment loans. We get paid by the lenders, so you get access to the same rates as going direct to the bank, plus our expert guidance.</p>"
    },
    {
      question: "How long does the loan application process take?",
      answer: "<p>The timeline varies depending on your situation and the lender, but typically takes 2-4 weeks from application to settlement. We'll keep you updated throughout the entire process.</p>"
    }
  ]
};

function generatePageContent(templateName, config) {
  const template = templates[templateName];
  if (!template) {
    throw new Error(`Template ${templateName} not found`);
  }

  const imports = [
    "import BaseLayout from '../../layouts/BaseLayout.astro';",
    "import SiteHeader from '../../components/SiteHeader.astro';",
    "import SiteFooter from '../../components/SiteFooter.astro';",
    "",
    "// PHP-matched widgets"
  ];

  // Add component imports
  template.components.forEach(component => {
    imports.push(`import ${component} from '../../components/widgets/${component}.astro';`);
  });

  const astroContent = `---
${imports.join('\n')}

// Page configuration
const pageConfig = ${JSON.stringify(config, null, 2)};

// Component data
const whyChooseBenefits = ${JSON.stringify(defaultData.whyChooseBenefits, null, 2)};
const reviews = ${JSON.stringify(defaultData.reviews, null, 2)};
const faqs = ${JSON.stringify(defaultData.faqs, null, 2)};
---

<BaseLayout 
  title={pageConfig.title}
  description={pageConfig.description}
>
  <Fragment slot="header"><SiteHeader /></Fragment>

  <!-- Hero Section -->
  <HeroWidget 
    title={pageConfig.heroTitle}
    subtitle={pageConfig.heroSubtitle}
    buttonText="Get a Free Assessment"
    promiseText="We promise to get back to you within 4 business hours"
  />

  <!-- Reputation Section -->
  <ReputationWidget />

  <!-- Risk Reduction Section -->
  <RiskWidget />

  <!-- Why Choose Section -->
  <WhyChooseWidget 
    title="Why Choose Hunter Galloway As<br>Your Mortgage Broker?"
    benefits={whyChooseBenefits}
    buttonText="Find out if you're eligible for a loan"
    buttonId="B-trigger"
  />

  <!-- Broker vs Bank Comparison -->
  <WhyDoWidget />

  <!-- Cost Information -->
  <HowMuchWidget />

  <!-- CTA Sections -->
  <DarkHolderWidget 
    title="Would you like to learn about your situation?"
    buttonText="Check if you qualify for a loan"
    buttonId="C-trigger"
    variant="default"
  />

  <DarkHolderWidget 
    title=""
    buttonText="Discover your individual borrowing capacity"
    buttonId="D-trigger"
    variant="primary"
    className="dark_btn_widget"
  />

  <!-- Reviews Section -->
  <ReviewsWidget 
    reviews={reviews}
  />

  <!-- Lenders Section -->
  <LendersWidget />

  <!-- Another CTA -->
  <DarkHolderWidget 
    title=""
    buttonText="Get your free credit rating assessment"
    buttonId="E-trigger"
    variant="accent"
    className="img_btn_widget"
  />

  <!-- FAQ Section -->
  <AccordionWidget 
    faqs={faqs}
  />

  <!-- Compliance Section -->
  <section class="text_widget widget bg-white py-16">
    <div class="container max-w-4xl mx-auto px-4">
      <div class="inner_widget prose prose-lg max-w-none">
        <h3 class="inner_title text-2xl font-bold text-primary mb-6">Professional Standards & Compliance</h3>
        <p>As members of the Financial Brokers Association of Australia (FBAA) and Credit and Investments Ombudsman (CIO), we maintain the highest standards of professionalism and integrity in all our mortgage broking services.</p>
      </div>
    </div>
  </section>

  <Fragment slot="footer"><SiteFooter /></Fragment>
</BaseLayout>`;

  return astroContent;
}

// CLI interface
const args = process.argv.slice(2);
const templateArg = args.find(arg => arg.startsWith('--template='));
const outputArg = args.find(arg => arg.startsWith('--output='));
const titleArg = args.find(arg => arg.startsWith('--title='));
const locationArg = args.find(arg => arg.startsWith('--location='));

if (!templateArg || !outputArg) {
  console.log('Usage: node scripts/create-page-from-template.js --template=post-single-1 --output=mortgage-brokers/gold-coast --title="Gold Coast" --location="Gold Coast"');
  process.exit(1);
}

const templateName = templateArg.split('=')[1];
const outputPath = outputArg.split('=')[1];
const title = titleArg ? titleArg.split('=')[1] : 'Mortgage Broker';
const location = locationArg ? locationArg.split('=')[1] : 'Australia';

const config = {
  title: `${title} Mortgage Broker | Expert Local Service | Hunter Galloway`,
  description: `Expert mortgage broker services in ${location}. Award-winning team with 97% approval rate and access to 30+ lenders. Get your free assessment today.`,
  heroTitle: `Mortgage Broker ${location}`,
  heroSubtitle: `Get expert mortgage broker services in ${location} with our award-winning team. We have one of the highest loan approval rates in the country.`,
  location: location
};

try {
  const content = generatePageContent(templateName, config);
  const fullOutputPath = path.join(__dirname, '..', 'src', 'pages', `${outputPath}.astro`);
  
  // Ensure directory exists
  const dir = path.dirname(fullOutputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  fs.writeFileSync(fullOutputPath, content);
  console.log(`✅ Created page: ${fullOutputPath}`);
  console.log(`📄 Template: ${templateName}`);
  console.log(`🏠 Location: ${location}`);
  console.log(`🔗 URL: /${outputPath}`);
  
} catch (error) {
  console.error('❌ Error creating page:', error.message);
  process.exit(1);
}