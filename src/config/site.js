// Central place for contact details, verification flags and image slots.
export const site = {
  name: 'FPC Bazaar Federation',
  cin: 'U01100RJ2022NPL078043',
  phones: [
    { display: '8890656575', tel: '+918890656575' },
    // The client's documents show the second number differing by one digit. Confirm before launch.
    { display: '8990656575', tel: '+918990656575', verify: 'secondPhone' },
  ],
  whatsapp: '918890656575',
  email: 'info@fpcbazarfederation.org',
  website: 'www.fpcbazarfederation.org',
  mapQuery: 'Jaipur, Rajasthan',
};

// Draft mode shows unverified content with a yellow outline. Set VITE_DRAFT_MODE=false at launch.
export const draftMode = import.meta.env.VITE_DRAFT_MODE !== 'false';

// Flip a flag to true only after the client gives written proof / permission.
export const flags = {
  govSupport: false,      // "Government Supported Initiative": which scheme or letter?
  fpoNetwork: false,      // "FPO Network Partner" badge
  verifiedDoc: false,     // "Verified Document" badge
  amulPermission: false,  // Amul Parlour (10 lakh outlets, 90% loan) and Amul Organic tie-up
  enzyClaims: false,      // Super Maps Biotech partnership and product claims
  noInvestBuyback: false, // "No investment needed" and "buyback assured": who funds, who buys
  secondPhone: false,     // second phone number
  chairpersonPhoto: false, // photo consent
  networkStats: false, // 17 states / 6,000 FPOs figures given by the client; confirm before launch
  gaushalaJobs: false, // employment estimates from the Gaushala tourism presentation
  contactDetails: false // phone, email and public contact channels need final confirmation
};

// Approved photographs: add files in /public/images and set their public paths below.
// Empty slots intentionally show a neutral placeholder, never a synthetic project image.
export const images = {
  // Hero Section
  gaushalaHero: '/images/gaushala-hero.jpg',

  // Gaushala Featured Section
  gaushalaFeature: '/images/gaushala-tourism.jpg',
  gaushalaTourism: '/images/gaushala-hero.jpg', // real photo (herd at a Gaushala); the old AI concept image is gaushala-tourism-concept.jpg
  gaushalaTourismReal: '/images/gaushala-tourism-real.jpg', // real photo: cattle shed at a Gaushala (used on the Gaushala Tourism page)

  // Six Project Cards
  gaushala: '/images/1.jpeg',
  cluster: '/images/2.jpeg',
  abcd: '/images/abcd/cover.jpg',
  abcdHero: '/images/abcd/hero.jpg',
  biogas: '/images/3.jpeg',
  eauto: '/images/4.jpeg',
  amul: '/images/5.jpeg',
  enzy: '/images/6.jpeg',

  // Other Sections
  ppp: '',
  logo: '/images/fpc-logo.png',
  chairperson: '/images/team/chairperson.jpg',
  naveen: '/images/team/naveen.jpg',
  sourabh: '/images/team/sourabh.jpg',
  ashok: '/images/team/ashok.jpg',
  narendra: '/images/team/narendra.jpg',
  shyam: '/images/team/shyam.jpg',
  mittal: '/images/team/mittal.jpg',
  nilesh: '/images/team/nilesh.jpg',
  rajendra: '/images/team/rajendra.jpg',
  shreevats: '/images/team/shreevats.jpg',
  bharat: '/images/team/bharat.jpeg',
  girish: '/images/team/girish.jpeg',
  manish: '/images/team/manish.jpeg',
};

export const initiativeList = [
  // Primary focus area first; remaining initiatives follow as supporting programmes.
  { key: 'gaushala', path: '/gaushala-fertilizer', kind: 'fert' },
  { key: 'gaushalaTourism', path: '/gaushala-tourism', kind: 'fert' },
  { key: 'cluster', path: '/cluster-centre', kind: 'centre' },
  { key: 'biogas', path: '/biogas-cbg', kind: 'biogas' },
  { key: 'eauto', path: '/e-auto-delivery', kind: 'eauto' },
  { key: 'amul', path: '/amul-parlour-cafe', kind: 'parlour' },
  { key: 'enzy', path: '/enzybiotic-power-pro', kind: 'product' },
  { key: 'ppp', path: '/ppp-model', kind: 'polyhouse' },
];

// Marketplace section of the main navigation (Product Marketplace, Supplier Directory, Sourcing, Business Connect).
export const marketNav = [
  { key: 'marketplace', path: '/marketplace', icon: 'grains' },
  { key: 'suppliers', path: '/suppliers', icon: 'fpo' },
  { key: 'sourcing', path: '/sourcing', icon: 'scale' },
  { key: 'connect', path: '/business-connect', icon: 'connect' },
];

// Real event photographs (order matches `home.events` in the i18n files).
export const eventImages = [
  '/images/events/nandurbar-felicitation.jpg',
  '/images/events/abcd-mou-gujarat.jpg',
  '/images/events/vellore-gaushala-programme.jpg',
  '/images/events/gauchar-land-initiative.jpg',
];

// Ids of states in the Federation network, used on the 17 States Map page (ids: see src/data/states.js).
// List received from the client (18 names, although the headline figure says 17: confirm which is right).
export const networkStates = ['mp', 'rajasthan', 'gujarat', 'maharashtra', 'chhattisgarh', 'jharkhand', 'odisha', 'haryana', 'punjab', 'up', 'uttarakhand', 'goa', 'andhra', 'telangana', 'tn', 'karnataka', 'puducherry', 'jk'];