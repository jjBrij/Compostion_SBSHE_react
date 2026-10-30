

export const siteConfig = {
  // Company basics
  companyName: 'SBSHE Sports',
  companyTagline: 'Where Champions Are Born',
  logo: '/images/logo.png',
  logoAlt: 'SBSHE Sports logo',

  // Short descriptions used in several places
  shortDescription:
    'A professional sports competition company organizing cricket tournaments, bodybuilding championships, football leagues, and athletic events that put athletes first.',

  // Primary navigation links
  navLinks: [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Competition', to: '/competition' },
    { label: 'Gallery', to: '/gallery' },
    { label: 'Championship', to: '/championship' },
    { label: 'Contact', to: '/contact' },
  ],

  // Contact information (replace with real details)
  contact: {
    email: 'hello@apexsports.example',
    phone: '+91 7082013211',
    address: 'Mayur Vihar-1 Delhi 110091',
  },

  // Social media links
  socials: [
    { label: 'Instagram', href: 'https://instagram.com/', icon: 'instagram' },
    { label: 'Facebook', href: 'https://facebook.com/', icon: 'facebook' },
    { label: 'Twitter', href: 'https://twitter.com/', icon: 'twitter' },
    { label: 'YouTube', href: 'https://youtube.com/', icon: 'youtube' },
  ],

  // Footer text
  footerNote:
    'Organizing world-class cricket, bodybuilding, football, and athletics competitions.',
  copyright: `© ${new Date().getFullYear()} SBSHE Sports. All rights reserved.`,
}