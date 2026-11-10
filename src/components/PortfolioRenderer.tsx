import React from 'react'
import { Navbar } from './layout/Navbar'
import { Footer } from './layout/Footer'
import { Hero } from './sections/Hero'
import { About } from './sections/About'
import { Gallery } from './sections/Gallery'
import { Education } from './sections/Education'
import { Experience } from './sections/Experience'
import { Skills } from './sections/Skills'
import { Languages } from './sections/Languages'
import { AwardsCertificates } from './sections/AwardsCertificates'
import { QuickContact } from './sections/QuickContact'
import { Collaboration } from './sections/Collaboration'
import type { PortfolioContent, TemplateConfig } from '../types/content'

interface PortfolioRendererProps {
  content: PortfolioContent
  config: TemplateConfig
  theme: 'light' | 'dark'
  onToggleTheme: () => void
  disableNavbar?: boolean
}

export const PortfolioRenderer: React.FC<PortfolioRendererProps> = ({
  content,
  config,
  theme,
  onToggleTheme,
  disableNavbar = false,
}) => {
  return (
    <div className="portfolio-app-root">
      {/* SECTION 0: NAVBAR & HEADER (Dapat dinonaktifkan di Studio Preview) */}
      {!disableNavbar && (
        <Navbar
          personal={content.personal}
          theme={theme}
          onToggleTheme={onToggleTheme}
          showPhoto={config.showNavbarPhoto}
          navbarStatus={content.navbarStatus}
          navbarCtaText={content.navbarCtaText}
        />
      )}

      {/* MAIN CONTENT AREA */}
      <main style={{ paddingTop: disableNavbar ? '24px' : '72px' }}>
        {/* SECTION 1: HERO */}
        <Hero
          personal={content.personal}
          metrics={content.metrics}
          certificatesCount={content.certificates.length}
          skillsCount={content.skills.reduce((acc, g) => acc + g.tools.length, 0)}
          primaryCtaText={content.heroPrimaryCtaText}
          secondaryCtaText={content.heroSecondaryCtaText}
          instagramUrl={content.contact.socials.find((s) => s.platform === 'instagram')?.url}
          instagramHandle={content.contact.socials.find((s) => s.platform === 'instagram')?.handle}
        />

        {/* SECTION 2: TENTANG SAYA */}
        <About
          personal={content.personal}
          education={content.education}
          showPhoto={config.showNavbarPhoto}
        />

        {/* SECTION 3: GALERI SAYA */}
        <Gallery
          items={content.gallery}
          description={content.galleryDescription}
        />

        {/* SECTION 4: PENDIDIKAN */}
        <Education items={content.education} />

        {/* SECTION 5: PENGALAMAN PROFESIONAL */}
        <Experience items={content.experience} />

        {/* SECTION 6: KEAHLIAN DIKUASAI */}
        <Skills skills={content.skills} />

        {/* SECTION 7: KEMAMPUAN BAHASA */}
        <Languages languages={content.languages} />

        {/* SECTION 8: PENGHARGAAN & SERTIFIKAT */}
        <AwardsCertificates
          awards={content.awards}
          certificates={content.certificates}
        />

        {/* SECTION 9: QUICK CONTACT BAR */}
        <QuickContact
          contact={content.contact}
          personal={content.personal}
        />

        {/* SECTION 10: KOLABORASI (CTA) */}
        <Collaboration
          personal={content.personal}
          contact={content.contact}
        />
      </main>

      {/* SECTION 11: FOOTER */}
      <Footer
        personal={content.personal}
        contact={content.contact}
        copyright={content.footerCopyright}
        summary={content.footerSummary}
      />
    </div>
  )
}
