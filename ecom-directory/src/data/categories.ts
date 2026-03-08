export interface Listing {
  name: string
  description: string
  url: string
  category: string
  subcategory: string
  pricing: string
  tags: string[]
  featured?: boolean
}

export interface Category {
  id: string
  name: string
  icon: string
  description: string
  subcategories: string[]
}

export const categories: Category[] = [
  {
    id: 'platforms',
    name: 'Ecommerce Platforms',
    icon: '🏪',
    description: 'Build and host your online store',
    subcategories: ['All-in-One', 'Headless Commerce', 'Open Source', 'Marketplace Builders'],
  },
  {
    id: 'payments',
    name: 'Payments & Checkout',
    icon: '💳',
    description: 'Accept payments and manage transactions',
    subcategories: ['Payment Processors', 'Buy Now Pay Later', 'Invoicing', 'Fraud Prevention'],
  },
  {
    id: 'shipping',
    name: 'Shipping & Fulfillment',
    icon: '📦',
    description: 'Get products to your customers',
    subcategories: ['Shipping Software', '3PL Providers', 'Dropshipping', 'Returns Management'],
  },
  {
    id: 'marketing',
    name: 'Marketing & Growth',
    icon: '📈',
    description: 'Drive traffic and convert visitors',
    subcategories: ['Email Marketing', 'SMS Marketing', 'SEO Tools', 'Ads & Retargeting', 'Affiliate & Referral', 'Social Commerce'],
  },
  {
    id: 'analytics',
    name: 'Analytics & Data',
    icon: '📊',
    description: 'Understand your business performance',
    subcategories: ['Web Analytics', 'Product Analytics', 'Attribution', 'Business Intelligence'],
  },
  {
    id: 'creative',
    name: 'Creative & Content',
    icon: '🎨',
    description: 'Design, photography, and content creation',
    subcategories: ['Design Tools', 'Product Photography', 'Video Production', 'Copywriting & AI', 'UGC Platforms'],
  },
  {
    id: 'crm',
    name: 'CRM & Customer Support',
    icon: '🤝',
    description: 'Manage relationships and support customers',
    subcategories: ['CRM Software', 'Help Desk', 'Live Chat', 'Reviews & Loyalty'],
  },
  {
    id: 'inventory',
    name: 'Inventory & Operations',
    icon: '📋',
    description: 'Manage stock, orders, and operations',
    subcategories: ['Inventory Management', 'Order Management', 'POS Systems', 'ERP'],
  },
  {
    id: 'sourcing',
    name: 'Sourcing & Manufacturing',
    icon: '🏭',
    description: 'Find suppliers and manufacture products',
    subcategories: ['Sourcing Platforms', 'Private Label', 'Print on Demand', 'Custom Manufacturing'],
  },
  {
    id: 'legal',
    name: 'Legal & Compliance',
    icon: '⚖️',
    description: 'Stay compliant and protect your business',
    subcategories: ['Business Formation', 'Tax & Accounting', 'Privacy & Compliance', 'Trademark & IP'],
  },
  {
    id: 'services',
    name: 'Agencies & Services',
    icon: '🛠️',
    description: 'Hire experts to grow your store',
    subcategories: ['Development Agencies', 'Marketing Agencies', 'Design Studios', 'Consultants'],
  },
  {
    id: 'tools',
    name: 'Productivity & Tools',
    icon: '⚙️',
    description: 'Run your business more efficiently',
    subcategories: ['Project Management', 'Automation', 'Communication', 'Finance & Bookkeeping'],
  },
]

// Sample listings - in production these come from Google Sheets
export const sampleListings: Listing[] = [
  // Ecommerce Platforms
  { name: 'Shopify', description: 'The leading all-in-one ecommerce platform for businesses of all sizes. Powers over 4 million stores worldwide.', url: 'https://shopify.com', category: 'platforms', subcategory: 'All-in-One', pricing: 'From $39/mo', tags: ['popular', 'beginner-friendly'], featured: true },
  { name: 'WooCommerce', description: 'Open-source ecommerce plugin for WordPress. Highly customizable with thousands of extensions.', url: 'https://woocommerce.com', category: 'platforms', subcategory: 'Open Source', pricing: 'Free (hosting extra)', tags: ['wordpress', 'open-source'], featured: true },
  { name: 'BigCommerce', description: 'Enterprise-grade ecommerce platform with built-in features and headless capabilities.', url: 'https://bigcommerce.com', category: 'platforms', subcategory: 'All-in-One', pricing: 'From $39/mo', tags: ['enterprise', 'scalable'] },
  { name: 'Medusa', description: 'Open-source headless commerce engine built with Node.js. Full flexibility for custom storefronts.', url: 'https://medusajs.com', category: 'platforms', subcategory: 'Headless Commerce', pricing: 'Free / Cloud plans', tags: ['headless', 'open-source', 'developer'] },
  { name: 'Saleor', description: 'GraphQL-first headless ecommerce platform. Built for developers who want full control.', url: 'https://saleor.io', category: 'platforms', subcategory: 'Headless Commerce', pricing: 'Free / Cloud plans', tags: ['headless', 'graphql'] },
  { name: 'Squarespace', description: 'Beautiful website builder with integrated ecommerce. Best for design-forward brands.', url: 'https://squarespace.com', category: 'platforms', subcategory: 'All-in-One', pricing: 'From $33/mo', tags: ['design', 'beginner-friendly'] },
  { name: 'Wix eCommerce', description: 'Drag-and-drop website builder with ecommerce capabilities. Easy to start selling fast.', url: 'https://wix.com/ecommerce', category: 'platforms', subcategory: 'All-in-One', pricing: 'From $27/mo', tags: ['beginner-friendly', 'drag-drop'] },
  { name: 'Sharetribe', description: 'Build and launch your own marketplace. Ideal for two-sided platforms and rental businesses.', url: 'https://sharetribe.com', category: 'platforms', subcategory: 'Marketplace Builders', pricing: 'From $99/mo', tags: ['marketplace', 'two-sided'] },

  // Payments & Checkout
  { name: 'Stripe', description: 'The developer-friendly payment infrastructure. Handles everything from checkout to subscriptions.', url: 'https://stripe.com', category: 'payments', subcategory: 'Payment Processors', pricing: '2.9% + 30¢ per txn', tags: ['popular', 'developer', 'api'], featured: true },
  { name: 'PayPal', description: 'Globally recognized payment platform. Trusted by millions of buyers and sellers worldwide.', url: 'https://paypal.com', category: 'payments', subcategory: 'Payment Processors', pricing: '2.99% + 49¢ per txn', tags: ['global', 'popular'] },
  { name: 'Klarna', description: 'Buy now, pay later solution that boosts conversion. Let customers pay in installments.', url: 'https://klarna.com', category: 'payments', subcategory: 'Buy Now Pay Later', pricing: 'Merchant fees vary', tags: ['bnpl', 'conversion'] },
  { name: 'Afterpay', description: 'Pay-in-four installment payment solution. Popular with younger demographics.', url: 'https://afterpay.com', category: 'payments', subcategory: 'Buy Now Pay Later', pricing: 'Merchant fees vary', tags: ['bnpl', 'gen-z'] },
  { name: 'Signifyd', description: 'AI-powered fraud protection and chargeback guarantee for ecommerce businesses.', url: 'https://signifyd.com', category: 'payments', subcategory: 'Fraud Prevention', pricing: 'Custom pricing', tags: ['fraud', 'ai', 'enterprise'] },

  // Shipping & Fulfillment
  { name: 'ShipStation', description: 'Multi-carrier shipping software. Import orders, compare rates, print labels, and track everything.', url: 'https://shipstation.com', category: 'shipping', subcategory: 'Shipping Software', pricing: 'From $9.99/mo', tags: ['popular', 'multi-carrier'], featured: true },
  { name: 'ShipBob', description: 'Tech-enabled 3PL with fulfillment centers across the US. 2-day shipping for DTC brands.', url: 'https://shipbob.com', category: 'shipping', subcategory: '3PL Providers', pricing: 'Custom pricing', tags: ['3pl', 'fast-shipping'] },
  { name: 'DSers', description: 'AliExpress dropshipping tool. Place hundreds of orders in seconds with bulk ordering.', url: 'https://dsers.com', category: 'shipping', subcategory: 'Dropshipping', pricing: 'Free / From $19.9/mo', tags: ['dropshipping', 'aliexpress'] },
  { name: 'Returnly', description: 'Automated returns and exchanges platform. Turn returns into exchanges to retain revenue.', url: 'https://returnly.com', category: 'shipping', subcategory: 'Returns Management', pricing: 'Custom pricing', tags: ['returns', 'retention'] },
  { name: 'Pirate Ship', description: 'Free shipping software with deeply discounted USPS and UPS rates. No monthly fees.', url: 'https://pirateship.com', category: 'shipping', subcategory: 'Shipping Software', pricing: 'Free (pay per label)', tags: ['free', 'usps', 'ups'] },

  // Marketing & Growth
  { name: 'Klaviyo', description: 'The email and SMS marketing platform built for ecommerce. Deep Shopify integration.', url: 'https://klaviyo.com', category: 'marketing', subcategory: 'Email Marketing', pricing: 'Free up to 250 contacts', tags: ['email', 'shopify', 'popular'], featured: true },
  { name: 'Postscript', description: 'SMS marketing platform purpose-built for Shopify stores. Drive revenue through text.', url: 'https://postscript.io', category: 'marketing', subcategory: 'SMS Marketing', pricing: 'From $25/mo', tags: ['sms', 'shopify'] },
  { name: 'Ahrefs', description: 'All-in-one SEO toolkit. Track rankings, research keywords, audit your site, and spy on competitors.', url: 'https://ahrefs.com', category: 'marketing', subcategory: 'SEO Tools', pricing: 'From $99/mo', tags: ['seo', 'research'] },
  { name: 'Semrush', description: 'Comprehensive SEO and digital marketing suite. Keyword research, content marketing, competitive analysis.', url: 'https://semrush.com', category: 'marketing', subcategory: 'SEO Tools', pricing: 'From $139.95/mo', tags: ['seo', 'content', 'competitor'] },
  { name: 'Meta Ads', description: 'Run ads across Facebook, Instagram, and Messenger. The largest social advertising platform.', url: 'https://business.facebook.com', category: 'marketing', subcategory: 'Ads & Retargeting', pricing: 'Pay per result', tags: ['ads', 'social', 'facebook'] },
  { name: 'Google Ads', description: 'Search, Shopping, and Display advertising. Reach customers when they\'re searching for what you sell.', url: 'https://ads.google.com', category: 'marketing', subcategory: 'Ads & Retargeting', pricing: 'Pay per click', tags: ['ads', 'search', 'shopping'] },
  { name: 'Refersion', description: 'Affiliate and influencer marketing platform. Track, manage, and pay your partners.', url: 'https://refersion.com', category: 'marketing', subcategory: 'Affiliate & Referral', pricing: 'From $99/mo', tags: ['affiliate', 'influencer'] },
  { name: 'ReferralCandy', description: 'Referral program software for ecommerce. Turn your customers into brand advocates.', url: 'https://referralcandy.com', category: 'marketing', subcategory: 'Affiliate & Referral', pricing: 'From $59/mo', tags: ['referral', 'word-of-mouth'] },
  { name: 'Omnisend', description: 'Ecommerce-focused email and SMS marketing with pre-built automation workflows.', url: 'https://omnisend.com', category: 'marketing', subcategory: 'Email Marketing', pricing: 'Free up to 250 contacts', tags: ['email', 'sms', 'automation'] },
  { name: 'TikTok Shop', description: 'Sell directly on TikTok. Combine content, community, and commerce in one platform.', url: 'https://shop.tiktok.com', category: 'marketing', subcategory: 'Social Commerce', pricing: 'Commission per sale', tags: ['social', 'tiktok', 'video'] },

  // Analytics & Data
  { name: 'Google Analytics', description: 'Free web analytics from Google. Understand your traffic, conversions, and customer behavior.', url: 'https://analytics.google.com', category: 'analytics', subcategory: 'Web Analytics', pricing: 'Free / GA360 enterprise', tags: ['free', 'popular', 'google'] },
  { name: 'Triple Whale', description: 'Ecommerce analytics dashboard. Attribution, creative analytics, and financial reporting in one place.', url: 'https://triplewhale.com', category: 'analytics', subcategory: 'Attribution', pricing: 'From $129/mo', tags: ['attribution', 'shopify', 'dtc'] },
  { name: 'Hotjar', description: 'Understand what users do on your site with heatmaps, session recordings, and surveys.', url: 'https://hotjar.com', category: 'analytics', subcategory: 'Product Analytics', pricing: 'Free / From $39/mo', tags: ['heatmaps', 'recordings', 'ux'] },
  { name: 'Mixpanel', description: 'Product analytics that helps you understand user behavior and drive conversions.', url: 'https://mixpanel.com', category: 'analytics', subcategory: 'Product Analytics', pricing: 'Free / From $28/mo', tags: ['product', 'events', 'funnels'] },
  { name: 'Looker Studio', description: 'Free data visualization and reporting tool from Google. Connect to multiple data sources.', url: 'https://lookerstudio.google.com', category: 'analytics', subcategory: 'Business Intelligence', pricing: 'Free', tags: ['free', 'google', 'dashboards'] },

  // Creative & Content
  { name: 'Canva', description: 'Design platform for creating marketing materials, social posts, and product images without design skills.', url: 'https://canva.com', category: 'creative', subcategory: 'Design Tools', pricing: 'Free / Pro $15/mo', tags: ['design', 'beginner-friendly', 'popular'], featured: true },
  { name: 'Figma', description: 'Collaborative design tool for teams. Build and prototype websites, apps, and marketing assets.', url: 'https://figma.com', category: 'creative', subcategory: 'Design Tools', pricing: 'Free / From $15/mo', tags: ['design', 'collaboration', 'professional'] },
  { name: 'Soona', description: 'Virtual photoshoot studio for ecommerce. Professional product photos and videos delivered fast.', url: 'https://soona.co', category: 'creative', subcategory: 'Product Photography', pricing: 'From $39/photo', tags: ['photography', 'product'] },
  { name: 'Jasper', description: 'AI copywriting tool for marketing. Generate product descriptions, ads, emails, and blog posts.', url: 'https://jasper.ai', category: 'creative', subcategory: 'Copywriting & AI', pricing: 'From $49/mo', tags: ['ai', 'copywriting', 'content'] },
  { name: 'Billo', description: 'Connect with creators to get authentic UGC video ads for your products. Built for ecommerce.', url: 'https://billo.app', category: 'creative', subcategory: 'UGC Platforms', pricing: 'From $59/video', tags: ['ugc', 'video', 'ads'] },

  // CRM & Customer Support
  { name: 'Gorgias', description: 'Ecommerce help desk. Manage customer support across email, chat, social, and phone in one place.', url: 'https://gorgias.com', category: 'crm', subcategory: 'Help Desk', pricing: 'From $10/mo', tags: ['support', 'shopify', 'ecommerce'], featured: true },
  { name: 'Zendesk', description: 'Customer service platform with ticketing, live chat, and knowledge base for any size business.', url: 'https://zendesk.com', category: 'crm', subcategory: 'Help Desk', pricing: 'From $55/agent/mo', tags: ['support', 'enterprise', 'omnichannel'] },
  { name: 'Tidio', description: 'Live chat and chatbot platform for ecommerce. Automate responses and convert visitors.', url: 'https://tidio.com', category: 'crm', subcategory: 'Live Chat', pricing: 'Free / From $29/mo', tags: ['chat', 'chatbot', 'automation'] },
  { name: 'Yotpo', description: 'Ecommerce marketing platform for reviews, loyalty, referrals, and SMS. Build social proof.', url: 'https://yotpo.com', category: 'crm', subcategory: 'Reviews & Loyalty', pricing: 'Free / Custom pricing', tags: ['reviews', 'loyalty', 'ugc'] },
  { name: 'HubSpot CRM', description: 'Free CRM with marketing, sales, and service hubs. Track customer relationships at scale.', url: 'https://hubspot.com', category: 'crm', subcategory: 'CRM Software', pricing: 'Free / From $20/mo', tags: ['crm', 'free', 'marketing'] },

  // Inventory & Operations
  { name: 'Cin7', description: 'Connected inventory management across all channels. Stock control, ordering, and warehouse ops.', url: 'https://cin7.com', category: 'inventory', subcategory: 'Inventory Management', pricing: 'From $349/mo', tags: ['inventory', 'multichannel', 'warehouse'] },
  { name: 'Ordoro', description: 'All-in-one inventory, shipping, and dropshipping management for multichannel sellers.', url: 'https://ordoro.com', category: 'inventory', subcategory: 'Order Management', pricing: 'From $59/mo', tags: ['orders', 'multichannel', 'shipping'] },
  { name: 'Square POS', description: 'Point of sale system that syncs online and in-store. Hardware + software for retail.', url: 'https://squareup.com', category: 'inventory', subcategory: 'POS Systems', pricing: 'Free / 2.6% + 10¢ per txn', tags: ['pos', 'retail', 'in-store'] },
  { name: 'Brightpearl', description: 'Retail operating system. Automate orders, inventory, fulfillment, and financial reporting.', url: 'https://brightpearl.com', category: 'inventory', subcategory: 'ERP', pricing: 'Custom pricing', tags: ['erp', 'automation', 'enterprise'] },

  // Sourcing & Manufacturing
  { name: 'Alibaba', description: 'The world\'s largest B2B marketplace. Source products and manufacturers from around the globe.', url: 'https://alibaba.com', category: 'sourcing', subcategory: 'Sourcing Platforms', pricing: 'Free to browse', tags: ['sourcing', 'global', 'manufacturing'] },
  { name: 'Printful', description: 'Print-on-demand and dropshipping. Custom t-shirts, mugs, posters, and more with no upfront cost.', url: 'https://printful.com', category: 'sourcing', subcategory: 'Print on Demand', pricing: 'Free / pay per order', tags: ['pod', 'custom', 'no-inventory'], featured: true },
  { name: 'Printify', description: 'Print-on-demand platform with a global network of print providers. Compare prices and quality.', url: 'https://printify.com', category: 'sourcing', subcategory: 'Print on Demand', pricing: 'Free / From $29/mo', tags: ['pod', 'multi-provider'] },
  { name: 'Sourcify', description: 'Manufacturing platform that connects brands with vetted factories. From prototyping to mass production.', url: 'https://sourcify.com', category: 'sourcing', subcategory: 'Custom Manufacturing', pricing: 'Custom pricing', tags: ['manufacturing', 'factories', 'custom'] },

  // Legal & Compliance
  { name: 'Stripe Atlas', description: 'Incorporate your business in Delaware, get a bank account, and start selling—all in one place.', url: 'https://stripe.com/atlas', category: 'legal', subcategory: 'Business Formation', pricing: '$500 one-time', tags: ['incorporation', 'banking', 'startup'] },
  { name: 'Avalara', description: 'Automated tax compliance for ecommerce. Sales tax calculation, reporting, and filing.', url: 'https://avalara.com', category: 'legal', subcategory: 'Tax & Accounting', pricing: 'Custom pricing', tags: ['tax', 'compliance', 'automation'] },
  { name: 'TaxJar', description: 'Sales tax automation for online sellers. Automatic calculations, reporting, and filing across states.', url: 'https://taxjar.com', category: 'legal', subcategory: 'Tax & Accounting', pricing: 'From $19/mo', tags: ['tax', 'sales-tax', 'filing'] },
  { name: 'Termly', description: 'Generate privacy policies, terms of service, and cookie consent banners. Stay GDPR and CCPA compliant.', url: 'https://termly.io', category: 'legal', subcategory: 'Privacy & Compliance', pricing: 'Free / From $15/mo', tags: ['privacy', 'gdpr', 'legal-docs'] },

  // Services & Agencies
  { name: 'Storetasker', description: 'Vetted Shopify experts on demand. Find developers, designers, and marketers for your store.', url: 'https://storetasker.com', category: 'services', subcategory: 'Development Agencies', pricing: 'Varies by project', tags: ['shopify', 'freelance', 'vetted'] },
  { name: 'Fiverr', description: 'Global freelance marketplace. Find designers, developers, writers, and marketers at any budget.', url: 'https://fiverr.com', category: 'services', subcategory: 'Design Studios', pricing: 'From $5/project', tags: ['freelance', 'affordable', 'global'] },
  { name: 'Upwork', description: 'Professional freelance marketplace. Post jobs and hire ecommerce specialists and agencies.', url: 'https://upwork.com', category: 'services', subcategory: 'Consultants', pricing: 'Varies by project', tags: ['freelance', 'professional', 'enterprise'] },

  // Productivity & Tools
  { name: 'Notion', description: 'All-in-one workspace for notes, docs, project management, and databases. Perfect for small teams.', url: 'https://notion.so', category: 'tools', subcategory: 'Project Management', pricing: 'Free / From $10/mo', tags: ['productivity', 'docs', 'project-mgmt'] },
  { name: 'Zapier', description: 'Connect your apps and automate workflows. 5000+ integrations with no code required.', url: 'https://zapier.com', category: 'tools', subcategory: 'Automation', pricing: 'Free / From $19.99/mo', tags: ['automation', 'no-code', 'integrations'] },
  { name: 'Slack', description: 'Business messaging platform. Communicate with your team and integrate with your ecommerce stack.', url: 'https://slack.com', category: 'tools', subcategory: 'Communication', pricing: 'Free / From $8.75/mo', tags: ['communication', 'team', 'popular'] },
  { name: 'QuickBooks', description: 'Accounting software for small businesses. Track expenses, send invoices, and manage finances.', url: 'https://quickbooks.com', category: 'tools', subcategory: 'Finance & Bookkeeping', pricing: 'From $30/mo', tags: ['accounting', 'invoicing', 'finance'] },
]
