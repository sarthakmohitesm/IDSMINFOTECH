/** Industries data: header mega menu shows manufacturing sublinks only (see INDUSTRIES_MANUFACTURING_SUBLINKS). */
export const INDUSTRIES_MEGA_CATEGORIES = [
  {
    id: 'manufacturing',
    label: 'Manufacturing',
    href: '/industries',
    subcategories: [
      { label: 'Printing & Packaging', href: '/industries#manufacturing-printing' },
      { label: 'Coating & Adhesives', href: '/industries#manufacturing-tape-coating' },
      { label: 'Helmet Manufacturing', href: '/industries#manufacturing-helmet' },
      { label: 'Electronic Manufacturing Services', href: '/industries#manufacturing-ems' },
      { label: 'Defence Equipment Manufacturing', href: '/industries#manufacturing-defence' },
      { label: 'Plastic Moulding', href: '/industries#manufacturing-plastic-moulding' },
      { label: 'Chemicals', href: '/industries#manufacturing-chemical' },
      { label: 'Electric Panel Manufacturing', href: '/industries#manufacturing-electric-panel' },
      { label: 'FRP Products Manufacturing', href: '/industries#manufacturing-frp' },
      { label: 'Machine Manufacturing', href: '/industries#manufacturing-machine' },
      { label: 'HR Services', href: '/industries#manufacturing-hr-services' }
    ]
  },
  {
    id: 'retail',
    label: 'Retail & Distribution',
    href: '/industries',
    subcategories: [
      { label: 'Fashion & Apparel', href: '/industries#retail-fashion' },
      { label: 'Supermarkets & Grocery', href: '/industries#retail-grocery' },
      { label: 'Wholesale Distribution', href: '/industries#retail-wholesale' },
      { label: 'E‑commerce & Omnichannel', href: '/industries#retail-ecommerce' },
      { label: 'FMCG', href: '/industries#retail-fmcg' },
      { label: 'Specialty & Franchise Retail', href: '/industries#retail-specialty' },
      { label: 'POS & Store Operations', href: '/industries#retail-pos' }
    ]
  },
  {
    id: 'healthcare',
    label: 'Healthcare',
    href: '/industries',
    subcategories: [
      { label: 'Hospitals & Multi‑specialty', href: '/industries#healthcare-hospitals' },
      { label: 'Clinics & Diagnostics', href: '/industries#healthcare-clinics' },
      { label: 'Pharmaceutical Distribution', href: '/industries#healthcare-pharma' },
      { label: 'Medical Devices', href: '/industries#healthcare-devices' },
      { label: 'Labs & Pathology', href: '/industries#healthcare-labs' },
      { label: 'Dental Practices', href: '/industries#healthcare-dental' },
      { label: 'Home Healthcare', href: '/industries#healthcare-home' }
    ]
  },
  {
    id: 'construction',
    label: 'Construction & Projects',
    href: '/industries',
    subcategories: [
      { label: 'EPC & Contracting', href: '/industries#construction-epc' },
      { label: 'Infrastructure & Civil', href: '/industries#construction-infrastructure' },
      { label: 'Real Estate Development', href: '/industries#construction-realestate' },
      { label: 'Project‑based Jobs', href: '/industries#construction-projects' },
      { label: 'Equipment & Plant Hire', href: '/industries#construction-equipment' },
      { label: 'MEP Contractors', href: '/industries#construction-mep' },
      { label: 'Interior & Fit‑out', href: '/industries#construction-interior' }
    ]
  }
];

/** Industries nav mega menu — manufacturing subcategories only (three columns in Navbar). */
export const INDUSTRIES_MANUFACTURING_SUBLINKS =
  INDUSTRIES_MEGA_CATEGORIES.find((c) => c.id === 'manufacturing')?.subcategories ?? [];

/** Services mega menu — same grid / typography as Industries in Navbar. */
export const SERVICES_MEGA_LINKS = [
  { label: 'ERP Implementation', href: '/services#erp' },
  { label: 'Custom Development', href: '/services#custom' },
  { label: 'Automation & AI/ML', href: '/services#ai' },
  { label: 'Process Consulting', href: '/services#consulting' },
  { label: 'Request a consultation', href: '/contact' },
  { label: 'Discuss your roadmap', href: '/contact' }
];

/** About nav mega menu */
export const ABOUT_SUBLINKS = [
  { label: 'Company Overview', href: '/about#company-overview' },
  { label: 'Why IDMS', href: '/about#why-idms' },
  { label: 'IDMS Journey', href: '/about#idms-journey' },
  { label: 'Leadership team', href: '/about#leadership-team' },
  { label: 'Corporate Values', href: '/about#corporate-values' },
  { label: 'Careers', href: '/about#careers' }
];

/** Primary header nav — single source of truth for Navbar + Footer. */
export const NAV_LINKS = [
  { label: 'About', href: '/about', hasDropdown: true },
  { label: 'Industries', href: '/industries', hasDropdown: true },
  { label: 'Technology', href: '/technology', hasDropdown: false },
  { label: 'Gallery', href: '/gallery', hasDropdown: false },
  { label: 'Blog', href: '/blog', hasDropdown: false }
];

/** Footer columns — routes aligned with header / site structure */
export const FOOTER_PLATFORM_LINKS = [
  { label: 'Smart ERP', href: '/platform', isSpecial: true },
  { label: 'Services', href: '/services' },
  { label: 'Industries', href: '/industries' },
  { label: 'Technology', href: '/technology' },
  { label: 'Solutions', href: '/solutions' }
];

export const FOOTER_COMPANY_LINKS = [
  { label: 'About Us', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
  { label: 'Privacy Policy', href: '#' }
];
