export interface PersonalInfo {
  name: string
  role: string
  location: string
  quote: string
  avatarUrl: string
  whatsapp: string
  email: string
  birthDate: string
  bioSummary: string
  statusText?: string
}

export interface MetricHighlights {
  totalCertificates: number
  birthDateForAge: string
  totalSkillsCount: number
  instagramFollowers?: string
}

export interface GalleryItem {
  id: string
  title: string
  imageUrl: string
  category?: string
  description?: string
  order?: number
}

export interface EducationItem {
  id: string
  period: string
  institution: string
  major?: string
  degree?: string
  order?: number
}

export interface ExperienceItem {
  id: string
  period: string
  role: string
  company: string
  description: string
  achievements?: string[]
  order?: number
}

export interface SkillGroup {
  id: string
  category: string
  tools: string[]
  description?: string
  order?: number
}

export interface LanguageItem {
  id: string
  language: string
  proficiency: string
  order?: number
}

export interface AwardItem {
  id: string
  year: string
  title: string
  institution: string
  description?: string
  order?: number
}

export interface CertificateItem {
  id: string
  title: string
  issuer: string
  year: string
  imageUrl: string
  credentialUrl?: string
  order?: number
}

export interface SocialLink {
  platform: 'linkedin' | 'instagram' | 'tiktok' | 'facebook' | 'github' | 'twitter' | 'other'
  url: string
  label: string
  handle?: string
}

export interface ContactInfo {
  whatsapp: string
  email: string
  location: string
  socials: SocialLink[]
  note?: string
}

export interface PortfolioContent {
  personal: PersonalInfo
  metrics: MetricHighlights
  gallery: GalleryItem[]
  galleryDescription?: string
  education: EducationItem[]
  experience: ExperienceItem[]
  skills: SkillGroup[]
  languages: LanguageItem[]
  awards: AwardItem[]
  certificates: CertificateItem[]
  contact: ContactInfo
  footerCopyright?: string
  footerSummary?: string
  navbarStatus?: string
  navbarCtaText?: string
  heroPrimaryCtaText?: string
  heroSecondaryCtaText?: string
}

export interface TemplateConfig {
  theme: 'light' | 'dark'
  accentColor: string
  accentColorGlow: string
  showNavbarPhoto?: boolean
  showGalleryDescription?: boolean
}
