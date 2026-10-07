import { useState, useCallback, useRef, useEffect } from 'react'
import ajficLogo from '@/imports/ajfic-logo.png'

// Hook pour l'effet parallax et l'apparition des éléments
function useScrollAnimation() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  return [ref, isVisible] as const
}

// Images de la galerie (uniquement les fichiers JPEG, excluant les vidéos et logos)
import img1 from '@/assets/images/img_001.jpeg'
import img2 from '@/assets/images/img_002.jpeg'
import img3 from '@/assets/images/img_003.jpeg'
import img4 from '@/assets/images/img_004.jpeg'
import img5 from '@/assets/images/img_005.jpeg'
import img6 from '@/assets/images/img_006.jpeg'
import img7 from '@/assets/images/img_007.jpeg'
import img8 from '@/assets/images/img_008.jpeg'
import img9 from '@/assets/images/img_009.jpeg'
import img10 from '@/assets/images/img_010.jpeg'
import img11 from '@/assets/images/img_011.jpeg'
import img12 from '@/assets/images/img_012.jpeg'
import img13 from '@/assets/images/img_013.jpeg'
import img14 from '@/assets/images/img_014.jpeg'
import img15 from '@/assets/images/img_015.jpeg'
import img16 from '@/assets/images/img_016.jpeg'
import img17 from '@/assets/images/img_017.jpeg'
import img18 from '@/assets/images/img_018.jpeg'
import img19 from '@/assets/images/img_019.jpeg'
import img20 from '@/assets/images/img_020.jpeg'
import img21 from '@/assets/images/UIS.jpeg'

const GALLERY_IMAGES = [
  { src: img1, alt: 'Galerie AJFIC 1' },
  { src: img2, alt: 'Galerie AJFIC 2' },
  { src: img3, alt: 'Galerie AJFIC 3' },
  { src: img4, alt: 'Galerie AJFIC 4' },
  { src: img5, alt: 'Galerie AJFIC 5' },
  { src: img6, alt: 'Galerie AJFIC 6' },
  { src: img7, alt: 'Galerie AJFIC 7' },
  { src: img8, alt: 'Galerie AJFIC 8' },
  { src: img9, alt: 'Galerie AJFIC 9' },
  { src: img10, alt: 'Galerie AJFIC 10' },
  { src: img11, alt: 'Galerie AJFIC 11' },
  { src: img12, alt: 'Galerie AJFIC 12' },
  { src: img13, alt: 'Galerie AJFIC 13' },
  { src: img14, alt: 'Galerie AJFIC 14' },
  { src: img15, alt: 'Galerie AJFIC 15' },
  { src: img16, alt: 'Galerie AJFIC 16' },
  { src: img17, alt: 'Galerie AJFIC 17' },
  { src: img18, alt: 'Galerie AJFIC 18' },
  { src: img19, alt: 'Galerie AJFIC 19' },
  { src: img20, alt: 'Galerie AJFIC 20' },
  { src: img21, alt: 'Galerie AJFIC 21' },
]

// Fonction pour mélanger un tableau (algorithme Fisher-Yates)
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

type Page = 'home' | 'about' | 'platform' | 'adhesion' | 'contact' | 'sponsoring'

// ── Shared UI ─────────────────────────────────────────────────────────────

function NavBar({ page, setPage, darkMode, setDarkMode }: { page: Page; setPage: (p: Page) => void; darkMode: boolean; setDarkMode: (d: boolean) => void }) {
  const [open, setOpen] = useState(false)
  const links: { label: string; id: Page }[] = [
    { label: 'Accueil', id: 'home' },
    { label: 'À Propos', id: 'about' },
    { label: 'Publication scientifique', id: 'platform' },
    { label: 'Sponsoring', id: 'sponsoring' },
    { label: 'Contact', id: 'contact' },
  ]
  const go = (p: Page) => { setPage(p); setOpen(false); window.scrollTo(0, 0) }

  return (
    <header className={`sticky top-0 z-50 shadow-xl ${darkMode ? 'bg-[#1a1a2e]' : 'bg-[#0D3B5E]'}`}>
      <div className="max-w-7xl mx-auto px-6 h-[68px] flex items-center justify-between">
        <button onClick={() => go('home')} className="flex items-center gap-3 shrink-0">
          <img src={ajficLogo} alt="AJFIC" className="h-10 w-auto" />
        </button>

        <nav className="hidden md:flex items-center gap-6">
          {links.map(l => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className={`text-sm font-medium tracking-wide transition-colors duration-150 ${
                page === l.id ? 'text-[#E8705A]' : darkMode ? 'text-white/75 hover:text-white' : 'text-white/75 hover:text-white'
              }`}
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => go('adhesion')}
            className="ml-2 px-5 py-2 bg-[#E8705A] hover:bg-[#C85A45] text-white text-sm font-semibold rounded-full transition-colors duration-150"
          >
            Adhérer
          </button>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="ml-2 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
          <button
            className="flex flex-col gap-1.5 p-2"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            <span className={`block h-0.5 w-6 bg-white transition-all duration-200 ${open ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-0.5 w-6 bg-white transition-all duration-200 ${open ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 w-6 bg-white transition-all duration-200 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {open && (
        <div className={`md:hidden px-6 pb-6 pt-2 flex flex-col gap-4 border-t border-white/10 ${darkMode ? 'bg-[#16213e]' : 'bg-[#082A45]'}`}>
          {links.map(l => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className={`text-left text-sm font-medium py-1 ${page === l.id ? 'text-[#E8705A]' : 'text-white/75'}`}
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => go('adhesion')}
            className="mt-2 px-5 py-2.5 bg-[#E8705A] text-white text-sm font-semibold rounded-full w-fit"
          >
            Adhérer maintenant
          </button>
        </div>
      )}
    </header>
  )
}

function Footer({ setPage, darkMode }: { setPage: (p: Page) => void; darkMode: boolean }) {
  const go = (p: Page) => { setPage(p); window.scrollTo(0, 0) }
  return (
    <footer className={darkMode ? 'bg-[#1a1a2e] text-white/60' : 'bg-[#082A45] text-white/60'}>
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div className="sm:col-span-2">
          <img src={ajficLogo} alt="AJFIC" className="h-14 w-auto mb-5" />
          <p className="text-sm leading-relaxed max-w-sm text-white/50">
            L'Association des Jeunes Juristes et Fiscalistes du Cameroun — une communauté d'excellence au service du droit et de la fiscalité.
          </p>
          <div className="flex gap-5 mt-6">
            {['LinkedIn', 'Facebook', 'WhatsApp'].map(s => (
              <a key={s} href="#" className="text-xs text-[#E8705A] hover:text-[#f08878] transition-colors font-semibold tracking-wide">
                {s}
              </a>
            ))}
            <a href="#" className="text-xs text-[#E8705A] hover:text-[#f08878] transition-colors font-semibold tracking-wide">
              TikTok (@AJFIC)
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-white text-xs font-semibold mb-5 tracking-[0.15em] uppercase">Navigation</h4>
          <ul className="space-y-3 text-sm">
            {(['Accueil', 'À Propos', 'Publication scientifique', 'Sponsoring', 'Adhésion', 'Contact'] as const).map((label, i) => {
              const pages: Page[] = ['home', 'about', 'platform', 'sponsoring', 'adhesion', 'contact']
              return (
                <li key={label}>
                  <button onClick={() => go(pages[i])} className="hover:text-white transition-colors">
                    {label}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>

        <div>
          <h4 className="text-white text-xs font-semibold mb-5 tracking-[0.15em] uppercase">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li>Yaoundé, Cameroun</li>
            <li>
              <a href="mailto:contact@ajfic.cm" className="hover:text-white transition-colors">
                contact@ajfic.cm
              </a>
            </li>
            <li>+237 69750 3177/177/65009386</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-white/30">
          <span>© 2026 AJFIC. Tous droits réservés.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white/60">Mentions légales</a>
            <a href="#" className="hover:text-white/60">Confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ── Home Page ─────────────────────────────────────────────────────────────

const NEWS = [
  {
    date: '28 août 2025',
    category: 'Atelier',
    title: 'Atelier sur la réforme du Code Général des Impôts 2025',
    excerpt: "Une session de formation intensive sur les nouvelles dispositions fiscales du CGI révisé, animée par des experts en fiscalité d'entreprise.",
    img: 'https://images.unsplash.com/photo-1653566031535-bcf33e1c2893?w=600&h=400&fit=crop&auto=format',
  },
  {
    date: '15 août 2025',
    category: 'Conférence',
    title: 'Colloque international : Droit des affaires en Afrique centrale',
    excerpt: 'L\'AJFIC co-organise un colloque régional réunissant juristes et fiscalistes de la CEMAC autour des enjeux du droit des affaires contemporain.',
    img: 'https://images.unsplash.com/photo-1573164574511-73c773193279?w=600&h=400&fit=crop&auto=format',
  },
  {
    date: '3 août 2025',
    category: 'Publication',
    title: 'Guide pratique sur la TVA au Cameroun — Édition 2025',
    excerpt: 'Téléchargez notre nouveau guide annoté sur la Taxe sur la Valeur Ajoutée, rédigé par les membres de l\'AJFIC et validé par des praticiens.',
    img: 'https://images.unsplash.com/photo-1774898988393-5c752e4d55e9?w=600&h=400&fit=crop&auto=format',
  },
]

const STATS = [
  { value: '42', label: 'Membres actifs' },
  { value: '32', label: 'Événements organisés' },
  { value: '01', label: 'Partenaire stratégique (UCAC)' },
  { value: '2026', label: "Année de création" },
]

function HomePage({ setPage, darkMode }: { setPage: (p: Page) => void; darkMode: boolean }) {
  const go = (p: Page) => { setPage(p); window.scrollTo(0, 0) }
  const [shuffledImages, setShuffledImages] = useState(() => shuffleArray(GALLERY_IMAGES))
  const [section1Ref, section1Visible] = useScrollAnimation()
  const [section2Ref, section2Visible] = useScrollAnimation()
  const [section3Ref, section3Visible] = useScrollAnimation()
  const [section4Ref, section4Visible] = useScrollAnimation()
  const [section5Ref, section5Visible] = useScrollAnimation()
  const [section6Ref, section6Visible] = useScrollAnimation()
  const [section7Ref, section7Visible] = useScrollAnimation()
  const [section8Ref, section8Visible] = useScrollAnimation()
  const [section9Ref, section9Visible] = useScrollAnimation()
  const [section10Ref, section10Visible] = useScrollAnimation()
  const [section11Ref, section11Visible] = useScrollAnimation()
  const [section12Ref, section12Visible] = useScrollAnimation()
  const [section13Ref, section13Visible] = useScrollAnimation()

  return (
    <main>
      {/* Hero */}
      <section className={`relative overflow-hidden min-h-[80vh] flex items-center pb-32 lg:pb-24 ${darkMode ? 'bg-[#0f3460]' : 'bg-[#0D3B5E]'}`}>
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: `url(${img1})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#082A45]/90 via-[#0D3B5E]/70 to-[#0D3B5E]/50" />

        {/* Animated decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#E8705A]/20 rounded-full blur-3xl animate-float" />
        <div className="absolute top-40 right-20 w-48 h-48 bg-[#E8705A]/10 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute bottom-32 left-1/4 w-24 h-24 bg-[#E8705A]/15 rounded-full blur-2xl animate-pulse-glow" />
        <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-white/10 rounded-full blur-xl animate-float animation-delay-400" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-in-left max-w-3xl">
            <span className="inline-block text-[#E8705A] text-xs font-semibold tracking-[0.2em] uppercase mb-6 border border-[#E8705A]/40 px-3 py-1.5 rounded-full">
              AJFIC
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.12] mb-6">
              L'Union sacrée d'une{' '}
              <em className="text-[#E8705A] not-italic">jeunesse ambitieuse</em>{' '}
              en droit et fiscalité
            </h1>
            <p className="text-white/65 text-lg leading-relaxed mb-10 max-w-lg">
              L'AJFIC fédère les jeunes juristes et les jeunes professionnelles du droit des affaires et de la fiscalité autour des enjeux juridiques et fiscaux contemporains.
            </p>
            <div className="flex flex-wrap gap-4 mb-16 lg:mb-0">
              <button
                onClick={() => go('adhesion')}
                className="px-7 py-3.5 bg-[#E8705A] hover:bg-[#C85A45] text-white font-semibold rounded-full transition-colors duration-150 text-sm active:scale-95"
              >
                Rejoindre l'AJFIC
              </button>
              <button
                onClick={() => go('about')}
                className="px-7 py-3.5 border border-white/30 hover:border-white/60 text-white font-medium rounded-full transition-colors duration-150 text-sm active:scale-95"
              >
                Découvrir notre mission →
              </button>
            </div>
          </div>

          {/* Logo oscillant en avant plan */}
          <div className="hidden lg:flex justify-center items-center animate-slide-in-right animation-delay-400">
            <div className="relative" style={{ animation: 'float-vertical 4s ease-in-out infinite' }}>
              <div className="w-64 h-64 relative">
                {/* Cercle blanc flexible autour du logo */}
                <div className="absolute inset-0 bg-white rounded-full shadow-2xl flex items-center justify-center animate-pulse-glow">
                  <img src={ajficLogo} alt="AJFIC Logo" className="w-48 h-48 object-contain" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Logo mobile - affiché en bas sur mobile */}
        <div className="lg:hidden absolute bottom-8 left-1/2 -translate-x-1/2 z-20" style={{ animation: 'float-vertical 4s ease-in-out infinite' }}>
          <div className="w-32 h-32">
            {/* Cercle blanc flexible autour du logo mobile */}
            <div className="absolute inset-0 bg-white rounded-full shadow-xl flex items-center justify-center animate-pulse-glow">
              <img src={ajficLogo} alt="AJFIC Logo" className="w-24 h-24 object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section with Logo */}
      <section ref={section13Ref} className={`parallax-section bg-[#0A2E4A] py-16 px-6 relative overflow-hidden ${section13Visible ? 'visible' : ''}`}>
        <div className="max-w-7xl mx-auto relative">

          <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {STATS.map(s => (
              <div key={s.label} className="text-center backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="font-display text-3xl md:text-4xl font-bold text-[#E8705A] mb-2">{s.value}</div>
                <div className="text-white/70 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Join Section */}
      <section ref={section1Ref} className={`parallax-section ${darkMode ? 'bg-[#1a1a2e] py-20 px-6' : 'bg-white py-20 px-6'} ${section1Visible ? 'visible' : ''}`}>
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-[#E8705A] text-xs font-semibold tracking-[0.2em] uppercase mb-4 block">Pourquoi nous rejoindre ?</span>
          <h2 className={`font-display text-4xl md:text-5xl font-bold mb-6 ${darkMode ? 'text-[#5DADE2]' : 'text-[#0D3B5E]'}`}>
            Pourquoi adhérer à l'AJFIC ?
          </h2>
          <p className="text-[#6B7280] text-lg leading-relaxed mb-10">
            L'AJFIC offre un cadre unique pour développer vos compétences, élargir votre réseau professionnel et accéder à des opportunités de carrière dans le domaine du droit des affaires et de la fiscalité.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '🎓', title: 'Formation continue', desc: 'Ateliers, séminaires et conférences pour enrichir vos connaissances juridiques et fiscales.' },
              { icon: '🤝', title: 'Réseau professionnel', desc: 'Connectez-vous avec des juristes, fiscalistes et experts du Cameroun et de la CEMAC.' },
              { icon: '📈', title: 'Opportunités de carrière', desc: 'Accès privilégié aux offres d\'emploi, stages et partenariats avec des entreprises et cabinets.' },
            ].map((benefit, index) => (
              <div key={index} className={`rounded-2xl p-6 hover:shadow-lg transition-shadow ${darkMode ? 'bg-[#16213e]' : 'bg-[#F7F4EF]'}`}>
                <div className="text-3xl mb-4">{benefit.icon}</div>
                <h3 className={`font-semibold mb-2 ${darkMode ? 'text-[#5DADE2]' : 'text-[#0D3B5E]'}`}>{benefit.title}</h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section - 4 Pillars */}
      <section ref={section2Ref} className={`parallax-section ${darkMode ? 'bg-[#16213e] py-24 px-6' : 'bg-[#F7F4EF] py-24 px-6'} ${section2Visible ? 'visible' : ''}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#E8705A] text-xs font-semibold tracking-[0.2em] uppercase mb-4 block">Notre Mission</span>
            <h2 className={`font-display text-4xl md:text-5xl font-bold mb-6 ${darkMode ? 'text-[#5DADE2]' : 'text-[#0D3B5E]'}`}>
              Notre mission repose sur 4 piliers
            </h2>
            <p className="text-[#6B7280] text-lg max-w-3xl mx-auto">
              Une vision structurée pour former, accompagner et connecter les jeunes juristes et fiscalistes du Cameroun.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                number: '01',
                icon: '🔬',
                title: 'Recherche',
                description: 'Produire et diffuser des connaissances en droit des affaires et fiscalité pour contribuer à l\'excellence académique et professionnelle.',
                details: ['Publications scientifiques', 'Analyses juridiques', 'Études de cas']
              },
              {
                number: '02',
                icon: '📚',
                title: 'Formation',
                description: 'Promotion des jeunes juristes et jeunes fiscalistes à travers des programmes de formation adaptés aux réalités du marché.',
                details: ['Ateliers pratiques', 'Séminaires thématiques', 'Mentorat personnalisé']
              },
              {
                number: '03',
                icon: '💼',
                title: 'Préparation professionnelle',
                description: 'Préparer les jeunes étudiants au monde professionnel en intensifiant les aptitudes des jeunes professionnels.',
                details: ['Simulation d\'entretiens', 'Rédaction de CV', 'Techniques de présentation']
              },
              {
                number: '04',
                icon: '🌐',
                title: 'Réseau solide',
                description: 'Bâtir un lien durable entre les professionnels, les entreprises, les organisations internationales expérimentées et les jeunes juristes et fiscalistes.',
                details: ['Événements networking', 'Partenariats stratégiques', 'Plateforme digitale']
              },
            ].map((pillar, index) => (
              <div key={index} className={`rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow ${darkMode ? 'bg-[#1a1a2e]' : 'bg-white'}`}>
                <div className="flex items-start gap-6">
                  <div className="shrink-0">
                    <div className="text-4xl font-display font-bold text-[#E8705A]/30">{pillar.number}</div>
                    <div className="text-3xl mt-2">{pillar.icon}</div>
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-display text-2xl font-bold mb-3 ${darkMode ? 'text-[#5DADE2]' : 'text-[#0D3B5E]'}`}>{pillar.title}</h3>
                    <p className="text-[#6B7280] leading-relaxed mb-4">{pillar.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {pillar.details.map((detail, i) => (
                        <span key={i} className={`text-xs px-3 py-1 rounded-full font-medium ${darkMode ? 'bg-[#1a1a2e] text-[#5DADE2]' : 'bg-[#EBF2F8] text-[#0D3B5E]'}`}>
                          {detail}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Intervention Domains */}
      <section ref={section3Ref} className={`parallax-section ${darkMode ? 'bg-[#1a1a2e] py-24 px-6' : 'bg-white py-24 px-6'} ${section3Visible ? 'visible' : ''}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#E8705A] text-xs font-semibold tracking-[0.2em] uppercase mb-4 block">Domaines d'intervention</span>
            <h2 className={`font-display text-4xl md:text-5xl font-bold mb-6 ${darkMode ? 'text-[#5DADE2]' : 'text-[#0D3B5E]'}`}>
              Nos domaines d'intervention
            </h2>
            <p className="text-[#6B7280] text-lg max-w-3xl mx-auto">
              Une expertise couvrant les principaux domaines du droit des affaires et de la fiscalité au Cameroun.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className={`rounded-2xl p-8 ${darkMode ? 'bg-[#16213e]' : 'bg-[#F7F4EF]'}`}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-[#E8705A]/20 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">⚖️</span>
                </div>
                <h3 className={`font-display text-2xl font-bold ${darkMode ? 'text-[#5DADE2]' : 'text-[#0D3B5E]'}`}>Droit des affaires</h3>
              </div>
              <ul className="space-y-3">
                {[
                  'Arbitrage',
                  'Sociétés commerciales',
                  'Voie d\'exécution',
                  'Procédure de recouvrement',
                  'Droit commercial général'
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-[#4B5563]">
                    <span className="w-2 h-2 bg-[#E8705A] rounded-full shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className={`rounded-2xl p-8 ${darkMode ? 'bg-[#16213e]' : 'bg-[#F7F4EF]'}`}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-[#E8705A]/20 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">📊</span>
                </div>
                <h3 className={`font-display text-2xl font-bold ${darkMode ? 'text-[#5DADE2]' : 'text-[#0D3B5E]'}`}>Fiscalité</h3>
              </div>
              <ul className="space-y-3">
                {[
                  'Fiscalité locale',
                  'Fiscalité internationale',
                  'Fiscalité des particuliers',
                  'Douanes',
                  'Procédures fiscales'
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-[#4B5563]">
                    <span className="w-2 h-2 bg-[#E8705A] rounded-full shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section ref={section4Ref} className={`parallax-section py-24 px-6 ${section4Visible ? 'visible' : ''} ${darkMode ? 'bg-[#0f3460]' : 'bg-[#0D3B5E]'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#E8705A] text-xs font-semibold tracking-[0.2em] uppercase mb-4 block">Événements</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
              Prochains événements
            </h2>
            <p className="text-white/60 text-lg max-w-3xl mx-auto">
              Découvrez nos prochaines formations, conférences et ateliers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Séminaires sur la loi de finance',
                type: 'Formation',
                icon: '📜',
                description: 'Analyse approfondie des nouvelles dispositions de la loi de finance et leurs impacts.'
              },
              {
                title: 'Conférences droits des affaires/fiscalités',
                type: 'Conférence',
                icon: '🎤',
                description: 'Échanges avec des experts sur les enjeux contemporains du droit des affaires.'
              },
              {
                title: 'Ateliers de rédaction des actes juridiques et d\'articles scientifiques',
                type: 'Atelier',
                icon: '✍️',
                description: 'Formation pratique à la rédaction professionnelle et académique.'
              },
              {
                title: 'Séminaire de formation en prise de parole en public',
                type: 'Formation',
                icon: '🎯',
                description: 'Développez vos compétences en communication et présentation.'
              },
              {
                title: 'Les journées AJFIC',
                type: 'Événement',
                icon: '🎉',
                description: 'Nos journées portes ouvertes pour découvrir l\'association et ses activités.'
              },
            ].map((event, index) => (
              <div key={index} className={`backdrop-blur-sm border rounded-2xl p-6 hover:bg-white/15 transition-colors ${darkMode ? 'bg-white/10 border-white/20' : 'bg-white/10 border-white/20'}`}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{event.icon}</span>
                  <span className="text-xs font-semibold tracking-wide uppercase text-[#E8705A] bg-[#E8705A]/20 px-2 py-1 rounded-full">
                    {event.type}
                  </span>
                </div>
                <h3 className="font-display font-bold text-white text-lg mb-3">{event.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{event.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={section5Ref} className={`parallax-section ${darkMode ? 'bg-[#16213e] py-24 px-6' : 'bg-[#F7F4EF] py-24 px-6'} ${section5Visible ? 'visible' : ''}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#E8705A] text-xs font-semibold tracking-[0.2em] uppercase mb-4 block">Témoignages</span>
            <h2 className={`font-display text-4xl md:text-5xl font-bold mb-6 ${darkMode ? 'text-[#5DADE2]' : 'text-[#0D3B5E]'}`}>
              Ce que disent nos membres
            </h2>
            <p className="text-[#6B7280] text-lg max-w-3xl mx-auto">
              Découvrez les expériences de nos membres et partenaires.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Marie Claire N.',
                role: 'Étudiante en Master Droit des Affaires',
                text: 'L\'AJFIC m\'a permis de développer mes compétences en fiscalité et de rencontrer des professionnels du secteur. Les ateliers pratiques sont excellents.',
                avatar: 'MC'
              },
              {
                name: 'Jean-Paul M.',
                role: 'Juriste d\'entreprise',
                text: 'Grâce au réseau de l\'AJFIC, j\'ai pu accéder à des opportunités de carrière que je n\'aurais jamais eu autrement. Une communauté précieuse.',
                avatar: 'JP'
              },
              {
                name: 'Sophie E.',
                role: 'Fiscaliste stagiaire',
                text: 'Les formations de l\'AJFIC sont d\'une qualité exceptionnelle. J\'ai particulièrement apprécié le séminaire sur la loi de finance.',
                avatar: 'SE'
              },
            ].map((testimonial, index) => (
              <div key={index} className={`rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow ${darkMode ? 'bg-[#1a1a2e]' : 'bg-white'}`}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-[#E8705A]/20 rounded-full flex items-center justify-center">
                    <span className="font-display font-bold text-[#E8705A]">{testimonial.avatar}</span>
                  </div>
                  <div>
                    <div className={`font-semibold ${darkMode ? 'text-[#5DADE2]' : 'text-[#0D3B5E]'}`}>{testimonial.name}</div>
                    <div className="text-xs text-[#9CA3AF]">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-[#4B5563] leading-relaxed italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* History Section */}
      <section ref={section6Ref} className={`parallax-section ${darkMode ? 'bg-[#1a1a2e] py-24 px-6' : 'bg-white py-24 px-6'} ${section6Visible ? 'visible' : ''}`}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#E8705A] text-xs font-semibold tracking-[0.2em] uppercase mb-4 block">Histoire</span>
            <h2 className={`font-display text-4xl md:text-5xl font-bold mb-6 ${darkMode ? 'text-[#5DADE2]' : 'text-[#0D3B5E]'}`}>
              La flamme des Tax and Legal Days
            </h2>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-[#4B5563] leading-relaxed mb-6">
              Tout a commencé à l'Université Catholique d'Afrique Centrale, à l'occasion de la 4ᵉ édition des Tax and Legal Days, un événement organisé par des étudiants passionnés de droit des affaires et de fiscalité.
            </p>
            <p className="text-[#4B5563] leading-relaxed mb-6">
              Ce n'était censé être qu'un rendez-vous ponctuel des journées de formation, d'échanges et d'apprentissage autour de ces domaines. Mais ce qui devait rester un simple projet étudiant a fini par allumer quelque chose de plus grand. Les participants sont repartis enrichis, transformés par ce qu'ils avaient appris et partagé pendant ces journées.
            </p>
            <p className="text-[#4B5563] leading-relaxed mb-6">
              Et très vite, une question s'est imposée à eux : pourquoi laisser cette flamme s'éteindre ? Ils se sont dit qu'il fallait la maintenir non seulement pour les étudiants, mais aussi pour tous ceux qui, professionnels comme étudiants, aspirent à s'enrichir dans le domaine du droit des affaires et de la fiscalité.
            </p>
            <p className="text-[#4B5563] leading-relaxed mb-6">
              C'est de cette conviction qu'est née, en 2026, l'Association des Jeunes Juristes Fiscalistes du Cameroun (AJFIC), héritière directe de l'esprit de cette 4ᵉ édition des Tax and Legal Days, avec pour mission de perpétuer et d'amplifier cette dynamique de formation, de recherche et de transmission, au bénéfice de la jeunesse comme des professionnels.
            </p>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section ref={section7Ref} className={`parallax-section py-24 px-6 ${section7Visible ? 'visible' : ''} ${darkMode ? 'bg-[#0f3460]' : 'bg-[#0D3B5E]'}`}>
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-[#E8705A] text-xs font-semibold tracking-[0.2em] uppercase mb-4 block">Notre Vision</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
            "Une jeunesse consciente du rôle qu'elle a à jouer dans le développement des droits des affaires et de la fiscalité."
          </h2>
          <p className="text-white/60 text-lg leading-relaxed">
            Nous aspirons à former une génération de juristes et fiscalistes compétents, engagés et visionnaires, prêts à contribuer activement au développement économique et juridique du Cameroun et de l'Afrique centrale.
          </p>
        </div>
      </section>

      {/* Sponsor Packages Link */}
      <section className="bg-[#E8705A] py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-3xl font-bold text-white mb-4">
            Devenez partenaire de l'AJFIC
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Découvrez nos formules de partenariat : Silver, Gold et Diamond
          </p>
          <button
            onClick={() => go('sponsoring')}
            className="px-8 py-4 bg-white text-[#E8705A] font-bold rounded-full hover:bg-[#F7F4EF] transition-colors text-sm tracking-wide"
          >
            Découvrir les packages de sponsoring →
          </button>
        </div>
      </section>

      {/* FAQ Section */}
      <section ref={section8Ref} className={`parallax-section ${darkMode ? 'bg-[#1a1a2e] py-24 px-6' : 'bg-white py-24 px-6'} ${section8Visible ? 'visible' : ''}`}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#E8705A] text-xs font-semibold tracking-[0.2em] uppercase mb-4 block">FAQ</span>
            <h2 className={`font-display text-4xl md:text-5xl font-bold mb-6 ${darkMode ? 'text-[#5DADE2]' : 'text-[#0D3B5E]'}`}>
              Questions fréquentes
            </h2>
            <p className="text-[#6B7280] text-lg">
              Tout ce que vous devez savoir sur l'AJFIC
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                question: 'Qui peut adhérer ?',
                answer: 'L\'association est ouverte à tous les étudiants en droit, fiscalité et jeunes professionnels de moins de 35 ans.'
              },
              {
                question: 'L\'inscription est-elle obligatoire ?',
                answer: 'Oui. L\'inscription est obligatoire pour mieux organiser les activités de l\'association et vous garantir tous les avantages qu\'offre l\'association. Les modalités d\'adhésion sont détaillées sur le site.'
              },
              {
                question: 'Comment devenir sponsor ou partenaire ?',
                answer: "Nous proposons 03 formules : Silver, Gold et Diamond. Offrant différents niveaux de visibilité (Réseaux sociaux, supports imprimés, UCAC...). Contactez-nous ou consultez notre page sponsoring pour obtenir le dossier complet."
              },
              {
                question: 'Où se déroulent les activités de l\'association ?',
                answer: 'Le lieu est déterminé en fonction du type d\'activité organisée (Universités, entreprises, cabinets, descentes sur le terrain).'
              },
              {
                question: 'Puis-je obtenir un certificat de participation ?',
                answer: 'Oui ! L\'association offre le cadre de réseautage qui permet à ses membres d\'avoir un accès privilégié au marché de l\'emploi (Institutions, cabinets de conseils fiscaux, entreprises).'
              },
              {
                question: 'Comment rester informé des activités de l\'association ?',
                answer: 'Suivez-nous sur nos réseaux sociaux (LinkedIn, Facebook, TikTok...) et abonnez-vous à notre liste de diffusion en nous contactant par mail.'
              },
            ].map((faq, index) => (
              <div key={index} className={`rounded-2xl p-6 ${darkMode ? 'bg-[#16213e]' : 'bg-[#F7F4EF]'}`}>
                <h3 className={`font-semibold mb-3 ${darkMode ? 'text-[#5DADE2]' : 'text-[#0D3B5E]'}`}>{faq.question}</h3>
                <p className="text-[#4B5563] leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News & Events */}
      <section ref={section9Ref} className={`parallax-section ${darkMode ? 'bg-[#1a1a2e] py-24 px-6' : 'bg-white py-24 px-6'} ${section9Visible ? 'visible' : ''}`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-[#E8705A] text-xs font-semibold tracking-[0.2em] uppercase mb-3 block">Actualités</span>
              <h2 className={`font-display text-4xl font-bold ${darkMode ? 'text-[#5DADE2]' : 'text-[#0D3B5E]'}`}>Dernières nouvelles</h2>
            </div>
            <button
              onClick={() => go('platform')}
              className={`hidden sm:block text-sm font-semibold border-b border-[#E8705A] pb-0.5 hover:text-[#E8705A] transition-colors ${darkMode ? 'text-[#5DADE2]' : 'text-[#0D3B5E]'}`}
            >
              Voir tout →
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {NEWS.map(n => (
              <article
                key={n.title}
                className="group bg-[#F7F4EF] rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                onClick={() => go('platform')}
              >
                <div className="overflow-hidden h-48">
                  <img
                    src={n.img}
                    alt={n.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[10px] font-semibold tracking-wide uppercase text-[#E8705A] bg-[#E8705A]/10 px-2.5 py-1 rounded-full">
                      {n.category}
                    </span>
                    <span className="text-xs text-[#9CA3AF]">{n.date}</span>
                  </div>
                  <h3 className={`font-display font-bold text-lg leading-snug mb-3 group-hover:text-[#E8705A] transition-colors ${darkMode ? 'text-[#5DADE2]' : 'text-[#0D3B5E]'}`}>
                    {n.title}
                  </h3>
                  <p className="text-sm text-[#6B7280] leading-relaxed">{n.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section ref={section10Ref} className={`parallax-section ${darkMode ? 'bg-[#16213e] py-24 px-6' : 'bg-[#F7F4EF] py-24 px-6'} ${section10Visible ? 'visible' : ''}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[#E8705A] text-xs font-semibold tracking-[0.2em] uppercase mb-3 block">Galerie</span>
            <h2 className={`font-display text-4xl font-bold ${darkMode ? 'text-[#5DADE2]' : 'text-[#0D3B5E]'}`}>Moments AJFIC</h2>
            <p className="text-[#6B7280] mt-4 max-w-2xl mx-auto">
              Découvrez nos événements, formations et moments forts à travers notre galerie photo.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {shuffledImages.slice(0, 8).map((img, index) => (
              <div
                key={index}
                className={`relative aspect-square overflow-hidden rounded-xl cursor-pointer group ${darkMode ? 'bg-[#0f3460]/10' : 'bg-[#0D3B5E]/10'}`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D3B5E]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => setShuffledImages(shuffleArray(GALLERY_IMAGES))}
              className={`inline-flex items-center gap-2 font-semibold text-sm border-b-2 border-[#E8705A] pb-0.5 hover:text-[#E8705A] transition-colors ${darkMode ? 'text-[#5DADE2]' : 'text-[#0D3B5E]'}`}
            >
              <span>🔄</span> Rafraîchir la galerie
            </button>
          </div>
        </div>
      </section>

      {/* Partnership IUS PRIV - Moved to end */}
      <section ref={section11Ref} className={`parallax-section ${darkMode ? 'bg-[#16213e] py-24 px-6' : 'bg-[#F7F4EF] py-24 px-6'} ${section11Visible ? 'visible' : ''}`}>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-block text-[#E8705A] text-xs font-semibold tracking-[0.2em] uppercase mb-4">
              Partenariat Stratégique
            </span>
            <h2 className={`font-display text-4xl font-bold leading-tight mb-6 ${darkMode ? 'text-[#5DADE2]' : 'text-[#0D3B5E]'}`}>
              AJFIC × IUS PRIV :<br />
              <em className="text-[#E8705A]">La communication juridique</em> réinventée
            </h2>
            <p className="text-[#4B5563] leading-relaxed mb-5 text-[15px]">
              IUS PRIV est la plateforme de communication juridique spécialisée qui accompagne l'AJFIC dans la diffusion de contenus de haute valeur analytique. Ensemble, nous produisons analyses, guides pratiques et commentaires de textes de loi accessibles à tous les praticiens.
            </p>
            <p className="text-[#4B5563] leading-relaxed mb-8 text-[15px]">
              Cette alliance stratégique renforce la visibilité des jeunes juristes et fiscalistes camerounais sur la scène nationale et régionale de la CEMAC.
            </p>
            <button
              onClick={() => go('platform')}
              className={`inline-flex items-center gap-2 font-semibold text-sm border-b-2 border-[#E8705A] pb-0.5 hover:text-[#E8705A] transition-colors ${darkMode ? 'text-[#5DADE2]' : 'text-[#0D3B5E]'}`}
            >
              Accéder à la plateforme IUS PRIV →
            </button>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-[#E8705A]/10 rounded-3xl -rotate-2" />
            <img
              src={img21}
              alt="Équipe AJFIC en réunion"
              className="relative rounded-2xl w-full h-80 object-cover shadow-2xl"
            />
            <div className={`absolute bottom-6 left-6 right-6 backdrop-blur-sm rounded-xl p-4 text-white ${darkMode ? 'bg-[#0f3460]/90' : 'bg-[#0D3B5E]/90'}`}>
              <div className="text-xs text-[#E8705A] font-semibold tracking-wide uppercase mb-1">IUS PRIV</div>
              <div className="font-display text-sm font-semibold">Plateforme de communication juridique & fiscale</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section ref={section12Ref} className={`parallax-section bg-[#E8705A] py-20 px-6 ${section12Visible ? 'visible' : ''}`}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-5">
            Prêt à rejoindre le mouvement ?
          </h2>
          <p className="text-white/80 text-lg mb-10">
            Intégrez une communauté de juristes et fiscalistes engagés pour l'excellence professionnelle au Cameroun.
          </p>
          <button
            onClick={() => go('adhesion')}
            className="px-8 py-4 bg-white text-[#E8705A] font-bold rounded-full hover:bg-[#F7F4EF] transition-colors text-sm tracking-wide"
          >
            Adhérer à l'AJFIC
          </button>
        </div>
      </section>
    </main>
  )
}

// ── About Page ────────────────────────────────────────────────────────────

const TEAM = [
  { name: 'TCHOUANKA YOUMBI Emmanuel', role: 'Président Fondateur', bio: 'Président Fondateur de l\'AJFIC.' },
  { name: 'Me ONANA NGA Théo-Loïc', role: 'Vice-Président Affaires Académiques', bio: 'Vice-Président chargé des affaires académiques et de la recherche.' },
  { name: 'ESSENGUE NNENGUE RUPHINE', role: 'Vice-Présidente Partenariats', bio: 'Vice-Présidente chargée des partenariats et du réseau.' },
  { name: 'OBATE BAYIHA Hanniel', role: 'Secrétaire Général', bio: 'Secrétaire Général de l\'AJFIC.' },
  { name: 'NGUEUTCHOUA WENGUELALE Ivan Ralph', role: 'Secrétaire Adjoint', bio: 'Secrétaire adjoint de l\'AJFIC.' },
  { name: 'FOUDA MARIE ANGE', role: 'Trésorière Générale', bio: 'Trésorière Générale de l\'AJFIC.' },
  { name: 'SILLA CATHERINE La Grande', role: 'Trésorière Adjointe', bio: 'Trésorière Générale adjointe de l\'AJFIC.' },
  { name: 'LEKABOTH MONY FERDINAND', role: 'Conseiller Technique n°1', bio: 'Conseiller Technique n°1.' },
  { name: 'ESSONO NGA FREDERIC', role: 'Conseiller Technique n°2', bio: 'Conseiller Technique n°2.' },
]

function AboutPage({ darkMode }: { darkMode: boolean }) {
  const [section1Ref, section1Visible] = useScrollAnimation()
  const [section2Ref, section2Visible] = useScrollAnimation()
  const [section3Ref, section3Visible] = useScrollAnimation()
  const [section4Ref, section4Visible] = useScrollAnimation()
  const [section5Ref, section5Visible] = useScrollAnimation()
  const [section6Ref, section6Visible] = useScrollAnimation()
  const [section7Ref, section7Visible] = useScrollAnimation()
  const [section8Ref, section8Visible] = useScrollAnimation()

  return (
    <main>
      {/* Hero */}
      <section className={`relative py-20 px-6 overflow-hidden ${darkMode ? 'bg-[#0f3460]' : 'bg-[#0D3B5E]'}`}>
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: `url(${img2})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#082A45]/90 via-[#0D3B5E]/70 to-[#0D3B5E]/50" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <span className="text-[#E8705A] text-xs font-semibold tracking-[0.2em] uppercase mb-4 block">À Propos</span>
          <h1 className="font-display text-5xl font-bold text-white mb-6">
            L'AJFIC en quelques mots
          </h1>
          <p className="text-white/65 text-lg leading-relaxed max-w-2xl mx-auto">
            Fondée en 2026, l'Association des Jeunes Juristes et Fiscalistes du Cameroun est un creuset de compétence et d'engagement pour les jeunes professionnels du droit et de la fiscalité.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section ref={section1Ref} className={`parallax-section ${darkMode ? 'bg-[#16213e] py-24 px-6' : 'bg-[#F7F4EF] py-24 px-6'} ${section1Visible ? 'visible' : ''}`}>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className={`font-display text-4xl font-bold mb-6 ${darkMode ? 'text-[#5DADE2]' : 'text-[#0D3B5E]'}`}>Notre Mission</h2>
            <p className="text-[#4B5563] leading-relaxed mb-5">
              L'AJFIC fédère les jeunes juristes et les jeunes professionnelles du droit des affaires et de la fiscalité autour des enjeux juridiques et fiscaux contemporains.
            </p>
            <p className="text-[#4B5563] leading-relaxed mb-5">
              Notre mission repose sur 4 piliers : la recherche, la formation, la préparation au monde professionnel, et la construction d'un réseau solide entre professionnels, entreprises et organisations internationales.
            </p>
            <p className="text-[#4B5563] leading-relaxed">
              Nous aspirons à former une jeunesse consciente du rôle qu'elle a à jouer dans le développement des droits des affaires et de la fiscalité.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: '⚖️', title: 'Excellence Juridique', desc: 'Formation de haut niveau et mise à jour des connaissances juridiques et fiscales.' },
              { icon: '🤝', title: 'Réseau Professionnel', desc: 'Un réseau solide de juristes, fiscalistes et avocats à travers tout le Cameroun.' },
              { icon: '📚', title: 'Partage du Savoir', desc: 'Publications, guides pratiques et analyses accessibles à tous les membres.' },
              { icon: '🌍', title: 'Rayonnement CEMAC', desc: 'Une présence active dans l\'espace juridique de l\'Afrique centrale.' },
            ].map(v => (
              <div key={v.title} className={`rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow ${darkMode ? 'bg-[#1a1a2e]' : 'bg-white'}`}>
                <div className="text-2xl mb-3">{v.icon}</div>
                <h3 className={`font-semibold mb-2 text-sm ${darkMode ? 'text-[#5DADE2]' : 'text-[#0D3B5E]'}`}>{v.title}</h3>
                <p className="text-xs text-[#6B7280] leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commissions & Organisation */}
      <section ref={section2Ref} className={`parallax-section ${darkMode ? 'bg-[#1a1a2e] py-24 px-6' : 'bg-white py-24 px-6'} ${section2Visible ? 'visible' : ''}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[#E8705A] text-xs font-semibold tracking-[0.2em] uppercase mb-3 block">Organisation</span>
            <h2 className={`font-display text-4xl font-bold ${darkMode ? 'text-[#5DADE2]' : 'text-[#0D3B5E]'}`}>Nos Commissions Permanentes</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Commission Formation et Recherche',
                desc: 'Placée sous la responsabilité du Vice-Président chargé des affaires académiques. Elle gère les formations, ateliers et activités de recherche.',
                icon: '🎓'
              },
              {
                title: 'Commission Partenariats et Insertion',
                desc: 'Sous la responsabilité du Vice-Président chargé des partenariats. Elle développe les relations avec les institutions et favorise l\'insertion professionnelle.',
                icon: '🤝'
              },
              {
                title: 'Commission Communication et Événements',
                desc: 'Dirigée par le Responsable de la communication. Elle gère la communication numérique et l\'organisation des événements.',
                icon: '📢'
              }
            ].map((commission, index) => (
              <div key={index} className={`rounded-2xl p-8 transition-colors duration-300 group ${darkMode ? 'bg-[#16213e] hover:bg-[#0f3460]' : 'bg-[#F7F4EF] hover:bg-[#0D3B5E]'}`}>
                <div className="text-4xl mb-4">{commission.icon}</div>
                <h3 className={`font-display font-bold text-xl mb-3 transition-colors ${darkMode ? 'text-[#5DADE2] group-hover:text-white' : 'text-[#0D3B5E] group-hover:text-white'}`}>
                  {commission.title}
                </h3>
                <p className="text-sm text-[#6B7280] group-hover:text-white/70 leading-relaxed transition-colors">
                  {commission.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Valeurs & Déontologie */}
      <section ref={section3Ref} className={`parallax-section ${darkMode ? 'bg-[#16213e] py-24 px-6' : 'bg-[#F7F4EF] py-24 px-6'} ${section3Visible ? 'visible' : ''}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[#E8705A] text-xs font-semibold tracking-[0.2em] uppercase mb-3 block">Valeurs</span>
            <h2 className={`font-display text-4xl font-bold ${darkMode ? 'text-[#5DADE2]' : 'text-[#0D3B5E]'}`}>Notre Déontologie</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Intégrité', desc: 'Respect strict des principes éthiques dans toutes nos activités.' },
              { title: 'Impartialité', desc: 'Traitement équitable de tous les membres sans discrimination.' },
              { title: 'Professionnalisme', desc: 'Excellence dans l\'exercice de nos fonctions au sein de l\'association.' },
              { title: 'Confidentialité', desc: 'Protection des informations sensibles et données personnelles.' },
            ].map((valeur, index) => (
              <div key={index} className={`rounded-xl p-6 shadow-sm ${darkMode ? 'bg-[#1a1a2e]' : 'bg-white'}`}>
                <h3 className={`font-semibold mb-2 ${darkMode ? 'text-[#5DADE2]' : 'text-[#0D3B5E]'}`}>{valeur.title}</h3>
                <p className="text-xs text-[#6B7280] leading-relaxed">{valeur.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section ref={section4Ref} className={`parallax-section ${darkMode ? 'bg-[#1a1a2e] py-24 px-6' : 'bg-white py-24 px-6'} ${section4Visible ? 'visible' : ''}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[#E8705A] text-xs font-semibold tracking-[0.2em] uppercase mb-3 block">Gouvernance</span>
            <h2 className={`font-display text-4xl font-bold ${darkMode ? 'text-[#5DADE2]' : 'text-[#0D3B5E]'}`}>Bureau Exécutif</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {TEAM.map((m, i) => (
              <div key={m.name} className={`group rounded-2xl p-8 transition-colors duration-300 ${darkMode ? 'bg-[#16213e] hover:bg-[#0f3460]' : 'bg-[#F7F4EF] hover:bg-[#0D3B5E]'}`}>
                <div className="w-14 h-14 rounded-full bg-[#E8705A]/20 flex items-center justify-center mb-5 group-hover:bg-[#E8705A]/30">
                  <span className="font-display font-bold text-[#E8705A] text-xl">
                    {m.name.split(' ').pop()![0]}
                  </span>
                </div>
                <div className="text-[10px] font-semibold tracking-widest uppercase text-[#E8705A] mb-2">{m.role}</div>
                <h3 className={`font-display font-bold text-lg mb-3 transition-colors ${darkMode ? 'text-[#5DADE2] group-hover:text-white' : 'text-[#0D3B5E] group-hover:text-white'}`}>{m.name}</h3>
                <p className="text-xs text-[#6B7280] group-hover:text-white/60 leading-relaxed transition-colors">{m.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commission Académique */}
      <section ref={section5Ref} className={`parallax-section ${darkMode ? 'bg-[#16213e] py-24 px-6' : 'bg-[#F7F4EF] py-24 px-6'} ${section5Visible ? 'visible' : ''}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[#E8705A] text-xs font-semibold tracking-[0.2em] uppercase mb-3 block">Commissions</span>
            <h2 className={`font-display text-4xl font-bold ${darkMode ? 'text-[#5DADE2]' : 'text-[#0D3B5E]'}`}>Commission Affaires Académiques et Recherche</h2>
          </div>

          <div className={`rounded-2xl p-8 mb-8 ${darkMode ? 'bg-[#1a1a2e]' : 'bg-white'}`}>
            <h3 className={`font-display text-2xl font-bold mb-6 ${darkMode ? 'text-[#5DADE2]' : 'text-[#0D3B5E]'}`}>Chef de la Commission</h3>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-[#E8705A]/20 rounded-full flex items-center justify-center">
                <span className="font-display font-bold text-[#E8705A]">TL</span>
              </div>
              <div>
                <div className={`font-semibold ${darkMode ? 'text-[#5DADE2]' : 'text-[#0D3B5E]'}`}>Me ONANA NGA Théo-Loïc</div>
                <div className="text-xs text-[#9CA3AF]">Vice-Président chargé des affaires académiques et de la recherche</div>
              </div>
            </div>

            <div className="border-t border-[#EDE9E2] pt-6">
              <h4 className={`font-semibold mb-4 ${darkMode ? 'text-[#5DADE2]' : 'text-[#0D3B5E]'}`}>Direction chargée de la formation et des ateliers</h4>
              <ul className="space-y-2 text-sm text-[#4B5563]">
                <li>• NOUIND Manuella Sariette</li>
                <li>• ELIANE Olivier Francheska</li>
              </ul>
            </div>

            <div className="border-t border-[#EDE9E2] pt-6 mt-6">
              <h4 className={`font-semibold mb-4 ${darkMode ? 'text-[#5DADE2]' : 'text-[#0D3B5E]'}`}>Direction chargée des études et publications</h4>
              <ul className="space-y-2 text-sm text-[#4B5563]">
                <li>• BINAM Rosiane Serena</li>
                <li>• OLAMA MINDJIMBA Audrey</li>
              </ul>
            </div>

            <div className="border-t border-[#EDE9E2] pt-6 mt-6">
              <h4 className={`font-semibold mb-4 ${darkMode ? 'text-[#5DADE2]' : 'text-[#0D3B5E]'}`}>Chargés d'études assistant</h4>
              <ul className="space-y-2 text-sm text-[#4B5563]">
                <li>• N°1 : MEKA FOTIÉ Davina</li>
                <li>• N°2 : KAMGNE WAFO Ivana</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Commission Partenariats */}
      <section ref={section6Ref} className={`parallax-section ${darkMode ? 'bg-[#1a1a2e] py-24 px-6' : 'bg-white py-24 px-6'} ${section6Visible ? 'visible' : ''}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className={`font-display text-4xl font-bold ${darkMode ? 'text-[#5DADE2]' : 'text-[#0D3B5E]'}`}>Commission Partenariats et Réseau</h2>
          </div>

          <div className={`rounded-2xl p-8 ${darkMode ? 'bg-[#16213e]' : 'bg-[#F7F4EF]'}`}>
            <h3 className={`font-display text-2xl font-bold mb-6 ${darkMode ? 'text-[#5DADE2]' : 'text-[#0D3B5E]'}`}>Chef de la Commission</h3>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-[#E8705A]/20 rounded-full flex items-center justify-center">
                <span className="font-display font-bold text-[#E8705A]">ER</span>
              </div>
              <div>
                <div className={`font-semibold ${darkMode ? 'text-[#5DADE2]' : 'text-[#0D3B5E]'}`}>ESSENGUE NNENGUE Ruphine Hervé</div>
                <div className="text-xs text-[#9CA3AF]">Vice-Présidente chargée des partenariats et du réseau</div>
              </div>
            </div>

            <div className="border-t border-[#EDE9E2] pt-6">
              <h4 className={`font-semibold mb-4 ${darkMode ? 'text-[#5DADE2]' : 'text-[#0D3B5E]'}`}>Directeur chargé des partenariats et de la coopération</h4>
              <ul className="space-y-2 text-sm text-[#4B5563]">
                <li>• Me METANG DUENANG Josemaria</li>
              </ul>
            </div>

            <div className="border-t border-[#EDE9E2] pt-6 mt-6">
              <h4 className={`font-semibold mb-4 ${darkMode ? 'text-[#5DADE2]' : 'text-[#0D3B5E]'}`}>Directeur chargé de l'insertion professionnelle et du Mentorat</h4>
              <ul className="space-y-2 text-sm text-[#4B5563]">
                <li>• ANDOMO ANDOMO Dominique Michèle-elie</li>
              </ul>
            </div>

            <div className="border-t border-[#EDE9E2] pt-6 mt-6">
              <h4 className={`font-semibold mb-4 ${darkMode ? 'text-[#5DADE2]' : 'text-[#0D3B5E]'}`}>Directeur chargé du réseau des membres anciens membres et membres d'honneur</h4>
              <ul className="space-y-2 text-sm text-[#4B5563]">
                <li>• Me Larissa JOGO</li>
              </ul>
            </div>

            <div className="border-t border-[#EDE9E2] pt-6 mt-6">
              <h4 className={`font-semibold mb-4 ${darkMode ? 'text-[#5DADE2]' : 'text-[#0D3B5E]'}`}>Assistant à la prospection et au suivi administratif</h4>
              <ul className="space-y-2 text-sm text-[#4B5563]">
                <li>• Brenda FONDJO</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section ref={section7Ref} className={`parallax-section ${darkMode ? 'bg-[#0f3460] py-20 px-6' : 'bg-[#0D3B5E] py-20 px-6'} ${section7Visible ? 'visible' : ''}`}>
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-[#E8705A] text-xs font-semibold tracking-[0.2em] uppercase mb-3 block">Partenaires</span>
          <h2 className="font-display text-3xl font-bold text-white mb-12">Nos partenaires stratégiques</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Université Catholique d\'Afrique Centrale', desc: 'Partenaire stratégique' },
            ].map(p => (
              <div key={p.name} className="bg-white/8 border border-white/15 rounded-2xl p-6">
                <div className="font-display font-bold text-white mb-1">{p.name}</div>
                <div className="text-xs text-white/40">{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

// ── Platform / Publication scientifique Page ─────────────────────────────────

const ARTICLES = [
  {
    date: '5 sept. 2025',
    category: 'Fiscalité',
    title: 'La retenue à la source sur les revenus des prestataires étrangers au Cameroun',
    excerpt: 'Analyse approfondie des obligations fiscales applicables aux entreprises étrangères intervenant sans établissement stable au Cameroun.',
    author: 'Dr. Mbarga Sophie',
    readTime: '8 min',
    img: 'https://images.unsplash.com/photo-1774898988393-5c752e4d55e9?w=800&h=500&fit=crop&auto=format',
    featured: true,
  },
  {
    date: '28 août 2025',
    category: 'Droit OHADA',
    title: "Réforme de l'Acte Uniforme OHADA sur les sociétés commerciales",
    excerpt: 'Les principales innovations introduites par la révision de l\'AUDSCG et leurs impacts pratiques pour les entreprises camerounaises.',
    author: 'Me. Njoya Arouna',
    readTime: '6 min',
    img: 'https://images.unsplash.com/photo-1653566031535-bcf33e1c2893?w=600&h=400&fit=crop&auto=format',
    featured: false,
  },
  {
    date: '20 août 2025',
    category: 'Droit Social',
    title: 'Le contentieux du travail au Cameroun : procédures et délais',
    excerpt: 'Guide pratique sur les voies de recours disponibles devant les juridictions sociales camerounaises.',
    author: 'M. Tchouaffe Brice',
    readTime: '5 min',
    img: 'https://images.unsplash.com/photo-1573167101669-476636b96cea?w=600&h=400&fit=crop&auto=format',
    featured: false,
  },
  {
    date: '12 août 2025',
    category: 'TVA',
    title: 'Régime TVA des opérations immobilières au Cameroun en 2025',
    excerpt: 'Revue des règles d\'assujettissement à la TVA pour les opérations de promotion, de vente et de location immobilière.',
    author: 'M. Nkeng Patrick',
    readTime: '7 min',
    img: 'https://images.unsplash.com/photo-1573164574511-73c773193279?w=600&h=400&fit=crop&auto=format',
    featured: false,
  },
]

const RESOURCES = [
  { title: 'Guide TVA Cameroun 2025', type: 'PDF', size: '2.4 Mo', category: 'Fiscalité' },
  { title: 'Code Général des Impôts annoté', type: 'PDF', size: '5.1 Mo', category: 'Législation' },
  { title: 'Modèles de contrats OHADA', type: 'ZIP', size: '1.8 Mo', category: 'Droit des Affaires' },
  { title: 'Jurisprudence fiscale 2020–2025', type: 'PDF', size: '3.2 Mo', category: 'Jurisprudence' },
]

function PublicationPage({ darkMode }: { darkMode: boolean }) {
  const [activeTab, setActiveTab] = useState<'articles' | 'resources'>('articles')
  const featured = ARTICLES.find(a => a.featured)!
  const others = ARTICLES.filter(a => !a.featured)
  const [section1Ref, section1Visible] = useScrollAnimation()
  const [section2Ref, section2Visible] = useScrollAnimation()

  return (
    <main>
      <section className={`py-20 px-6 ${darkMode ? 'bg-[#0f3460]' : 'bg-[#0D3B5E]'}`}>
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-[#E8705A] text-xs font-semibold tracking-[0.2em] uppercase mb-4 block">Publication</span>
          <h1 className="font-display text-5xl font-bold text-white mb-4">Publication scientifique</h1>
          <p className="text-white/60 text-lg">
            Analyses juridiques et fiscales de référence pour les praticiens du Cameroun
          </p>
        </div>
      </section>

      <section className={darkMode ? 'bg-[#16213e] py-6 px-6 border-b border-white/10' : 'bg-[#F7F4EF] py-6 px-6 border-b border-[#EDE9E2]'}>
        <div className="max-w-7xl mx-auto flex gap-6">
          {(['articles', 'resources'] as const).map(t => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`pb-4 text-sm font-semibold border-b-2 transition-colors ${
                activeTab === t ? 'border-[#E8705A] text-[#0D3B5E]' : `border-transparent text-[#9CA3AF] hover:${darkMode ? 'text-[#5DADE2]' : 'text-[#0D3B5E]'}`
              }`}
            >
              {t === 'articles' ? 'Analyses & Articles' : 'Ressources & Téléchargements'}
            </button>
          ))}
        </div>
      </section>

      {activeTab === 'articles' && (
        <section ref={section1Ref} className={`parallax-section ${darkMode ? 'bg-[#16213e] py-14 px-6' : 'bg-[#F7F4EF] py-14 px-6'} ${section1Visible ? 'visible' : ''}`}>
          <div className="max-w-7xl mx-auto">
            {/* Featured article */}
            <div className={`mb-12 rounded-3xl overflow-hidden shadow-sm grid lg:grid-cols-2 ${darkMode ? 'bg-[#1a1a2e]' : 'bg-white'}`}>
              <div className="overflow-hidden h-64 lg:h-auto">
                <img src={featured.img} alt={featured.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-10 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-[#E8705A] bg-[#E8705A]/10 px-2.5 py-1 rounded-full">
                    {featured.category}
                  </span>
                  <span className="text-xs text-[#9CA3AF]">Article à la une</span>
                </div>
                <h2 className={`font-display text-3xl font-bold leading-tight mb-4 ${darkMode ? 'text-[#5DADE2]' : 'text-[#0D3B5E]'}`}>
                  {featured.title}
                </h2>
                <p className="text-[#6B7280] text-sm leading-relaxed mb-6">{featured.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-[#9CA3AF]">
                  <span>Par {featured.author}</span>
                  <span>{featured.readTime} de lecture · {featured.date}</span>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {others.map(a => (
                <article key={a.title} className={`rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group cursor-pointer ${darkMode ? 'bg-[#1a1a2e]' : 'bg-white'}`}>
                  <div className="overflow-hidden h-44">
                    <img src={a.img} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-[10px] font-bold tracking-wide uppercase text-[#E8705A]">{a.category}</span>
                      <span className="text-[10px] text-[#9CA3AF]">{a.readTime}</span>
                    </div>
                    <h3 className={`font-display font-bold text-base leading-snug mb-2 group-hover:text-[#E8705A] transition-colors ${darkMode ? 'text-[#5DADE2]' : 'text-[#0D3B5E]'}`}>
                      {a.title}
                    </h3>
                    <p className="text-xs text-[#6B7280] leading-relaxed mb-4">{a.excerpt}</p>
                    <div className="text-xs text-[#9CA3AF]">Par {a.author} · {a.date}</div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {activeTab === 'resources' && (
        <section ref={section2Ref} className={`parallax-section ${darkMode ? 'bg-[#16213e] py-14 px-6' : 'bg-[#F7F4EF] py-14 px-6'} ${section2Visible ? 'visible' : ''}`}>
          <div className="max-w-4xl mx-auto">
            <p className="text-[#6B7280] mb-8 text-sm">
              Ressources juridiques et fiscales compilées et annotées par les membres de l'AJFIC. Accès réservé aux membres à jour de cotisation.
            </p>
            <div className="space-y-4">
              {RESOURCES.map(r => (
                <div key={r.title} className={`rounded-2xl p-6 flex items-center justify-between gap-4 shadow-sm hover:shadow-md transition-shadow group ${darkMode ? 'bg-[#1a1a2e]' : 'bg-white'}`}>
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 bg-[#E8705A]/10 rounded-xl flex items-center justify-center shrink-0">
                      <span className="text-[#E8705A] font-bold text-xs">{r.type}</span>
                    </div>
                    <div>
                      <div className={`font-semibold mb-1 text-sm group-hover:text-[#E8705A] transition-colors ${darkMode ? 'text-[#5DADE2]' : 'text-[#0D3B5E]'}`}>{r.title}</div>
                      <div className="flex items-center gap-3 text-xs text-[#9CA3AF]">
                        <span className={`px-2 py-0.5 rounded-full font-medium ${darkMode ? 'bg-[#1a1a2e] text-[#5DADE2]' : 'bg-[#EBF2F8] text-[#0D3B5E]'}`}>{r.category}</span>
                        <span>{r.size}</span>
                      </div>
                    </div>
                  </div>
                  <button className={`px-4 py-2 text-xs font-semibold border rounded-full transition-colors ${darkMode ? 'text-[#5DADE2] border-[#5DADE2]/20 hover:bg-[#5DADE2] hover:text-white hover:border-[#5DADE2]' : 'text-[#0D3B5E] border-[#0D3B5E]/20 hover:bg-[#0D3B5E] hover:text-white hover:border-[#0D3B5E]'}`}>
                    Télécharger
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}

// ── Adhesion Page ─────────────────────────────────────────────────────────

type UploadedFile = { name: string; size: number; progress: number }

function AdhesionPage({ darkMode }: { darkMode: boolean }) {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    nom: '', prenom: '', dob: '', ville: '',
    profil: '', email: '', phone: '',
  })
  const [files, setFiles] = useState<Record<string, UploadedFile | null>>({
    identity: null, cv: null, proof: null,
  })
  const [dragOver, setDragOver] = useState<string | null>(null)
  const [paymentMethod, setPaymentMethod] = useState<'mtn' | 'orange' | ''>('')
  const [phonePayment, setPhonePayment] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const uploadFile = useCallback((key: string, file: File) => {
    if (file.size > 5 * 1024 * 1024) return
    setFiles(f => ({ ...f, [key]: { name: file.name, size: file.size, progress: 0 } }))
    let p = 0
    const iv = setInterval(() => {
      p += Math.random() * 25 + 5
      if (p >= 100) { p = 100; clearInterval(iv) }
      setFiles(f => ({ ...f, [key]: f[key] ? { ...f[key]!, progress: Math.round(p) } : null }))
    }, 180)
  }, [])

  const handleDrop = useCallback((key: string, e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(null)
    const file = e.dataTransfer.files[0]
    if (file) uploadFile(key, file)
  }, [uploadFile])

  const STEPS = ['Informations', 'Profil', 'Documents', 'Paiement']

  if (submitted) {
    return (
      <main className={`min-h-screen flex items-center justify-center px-6 py-24 ${darkMode ? 'bg-[#1a1a2e]' : 'bg-[#F7F4EF]'}`}>
        <div className="max-w-md w-full text-center">
          <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8 ${darkMode ? 'bg-[#0f3460]' : 'bg-[#0D3B5E]'}`}>
            <svg className="w-10 h-10 text-[#E8705A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className={`font-display text-4xl font-bold mb-4 ${darkMode ? 'text-[#5DADE2]' : 'text-[#0D3B5E]'}`}>Demande reçue !</h2>
          <p className="text-[#6B7280] leading-relaxed mb-3">
            Votre dossier d'adhésion a été soumis avec succès. Un email de confirmation a été envoyé à <strong className={darkMode ? 'text-[#5DADE2]' : 'text-[#0D3B5E]'}>{form.email}</strong>.
          </p>
          <p className="text-sm text-[#9CA3AF] mb-8">
            L'équipe administrative de l'AJFIC examinera votre dossier sous quinze (15) jours ouvrables conformément au règlement intérieur.
          </p>
          <button
            onClick={() => { setSubmitted(false); setStep(1) }}
            className="px-7 py-3 bg-[#E8705A] text-white font-semibold rounded-full text-sm hover:bg-[#C85A45] transition-colors"
          >
            Nouvelle demande
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className={`min-h-screen ${darkMode ? 'bg-[#1a1a2e]' : 'bg-[#F7F4EF]'}`}>
      {/* Hero */}
      <section className={`py-16 px-6 ${darkMode ? 'bg-[#0f3460]' : 'bg-[#0D3B5E]'}`}>
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-[#E8705A] text-xs font-semibold tracking-[0.2em] uppercase mb-4 block">Inscription</span>
          <h1 className="font-display text-4xl font-bold text-white mb-3">Adhérer à l'AJFIC</h1>
          <p className="text-white/55 text-base">Rejoignez la communauté des jeunes juristes et fiscalistes du Cameroun</p>
        </div>
      </section>

      {/* Membership Types Info */}
      <section className={darkMode ? 'bg-[#16213e] py-12 px-6' : 'bg-[#F7F4EF] py-12 px-6'}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className={`font-display text-2xl font-bold mb-2 ${darkMode ? 'text-[#5DADE2]' : 'text-[#0D3B5E]'}`}>Types d'adhésion</h2>
            <p className="text-sm text-[#6B7280]">Choisissez la catégorie qui correspond à votre situation</p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                type: 'Membre Fondateur',
                admission: 'Exempté',
                cotisation: '50 000 FCFA/an',
                desc: 'Membres fondateurs de l\'association'
              },
              {
                type: 'Membre Actif Étudiant',
                admission: '2 000 FCFA',
                cotisation: '5 000 FCFA/trimestre',
                desc: 'Étudiants en droit et fiscalité'
              },
              {
                type: 'Membre Actif Jeune Professionnel',
                admission: '5 000 FCFA',
                cotisation: '10 000 FCFA/trimestre',
                desc: 'Juristes et fiscalistes en activité'
              },
              {
                type: 'Membre Associé',
                admission: 'Contribution libre',
                cotisation: 'Min. 100 000 FCFA',
                desc: 'Partenaires et bienfaiteurs'
              }
            ].map((category, index) => (
              <div key={index} className={`rounded-xl p-5 shadow-sm ${darkMode ? 'bg-[#1a1a2e]' : 'bg-white'}`}>
                <h3 className={`font-semibold mb-2 ${darkMode ? 'text-[#5DADE2]' : 'text-[#0D3B5E]'}`}>{category.type}</h3>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#6B7280]">Droits d'adhésion:</span>
                    <span className="font-medium text-[#111827]">{category.admission}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B7280]">Cotisation:</span>
                    <span className="font-medium text-[#E8705A]">{category.cotisation}</span>
                  </div>
                </div>
                <p className="text-xs text-[#9CA3AF] mt-2">{category.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stepper */}
      <div className={`border-b px-6 py-5 ${darkMode ? 'bg-[#1a1a2e] border-white/10' : 'bg-white border-[#EDE9E2]'}`}>
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          {STEPS.map((s, i) => {
            const n = i + 1
            const active = step === n
            const done = step > n
            return (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  done ? 'bg-[#E8705A] text-white' : active ? (darkMode ? 'bg-[#0f3460] text-white' : 'bg-[#0D3B5E] text-white') : 'bg-[#EDE9E2] text-[#9CA3AF]'
                }`}>
                  {done ? '✓' : n}
                </div>
                <span className={`hidden sm:block text-xs font-medium ${active ? (darkMode ? 'text-[#5DADE2]' : 'text-[#0D3B5E]') : done ? 'text-[#E8705A]' : 'text-[#9CA3AF]'}`}>
                  {s}
                </span>
                {i < STEPS.length - 1 && (
                  <div className={`hidden sm:block w-10 h-0.5 ml-2 ${step > n ? 'bg-[#E8705A]' : 'bg-[#EDE9E2]'}`} />
                )}
              </div>
            )
          })}
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* Step 1: Personal Info */}
        {step === 1 && (
          <div className={`rounded-2xl p-8 shadow-sm ${darkMode ? 'bg-[#1a1a2e]' : 'bg-white'}`}>
            <h2 className={`font-display text-2xl font-bold mb-6 ${darkMode ? 'text-[#5DADE2]' : 'text-[#0D3B5E]'}`}>Informations personnelles</h2>
            <div className="grid sm:grid-cols-2 gap-5">
              {[
                { key: 'nom', label: 'Nom *', type: 'text', placeholder: 'Votre nom de famille' },
                { key: 'prenom', label: 'Prénom *', type: 'text', placeholder: 'Votre prénom' },
                { key: 'dob', label: 'Date de naissance *', type: 'date', placeholder: '' },
                { key: 'ville', label: 'Ville de résidence *', type: 'text', placeholder: 'Yaoundé, Douala...' },
              ].map(f => (
                <div key={f.key}>
                  <label className="block text-xs font-semibold text-[#374151] mb-2 tracking-wide">{f.label}</label>
                  <input
                    type={f.type}
                    placeholder={f.placeholder}
                    value={form[f.key as keyof typeof form]}
                    onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                    className="w-full px-4 py-3 border border-[#E5E7EB] rounded-xl text-sm text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#0D3B5E]/30 focus:border-[#0D3B5E] transition"
                  />
                </div>
              ))}
            </div>
            <div className="mt-5 grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-[#374151] mb-2 tracking-wide">Email *</label>
                <input
                  type="email"
                  placeholder="vous@exemple.com"
                  value={form.email}
                  onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 border border-[#E5E7EB] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0D3B5E]/30 focus:border-[#0D3B5E] transition"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#374151] mb-2 tracking-wide">Téléphone / WhatsApp *</label>
                <input
                  type="tel"
                  placeholder="+237 6XX XXX XXX"
                  value={form.phone}
                  onChange={e => setForm(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-4 py-3 border border-[#E5E7EB] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0D3B5E]/30 focus:border-[#0D3B5E] transition"
                />
              </div>
            </div>
            <button
              onClick={() => setStep(2)}
              disabled={!form.nom || !form.prenom || !form.email}
              className={`mt-8 w-full py-3.5 text-white font-semibold rounded-xl text-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${darkMode ? 'bg-[#0f3460] hover:bg-[#1a4a6e]' : 'bg-[#0D3B5E] hover:bg-[#082A45]'}`}
            >
              Continuer →
            </button>
          </div>
        )}

        {/* Step 2: Professional Profile */}
        {step === 2 && (
          <div className={`rounded-2xl p-8 shadow-sm ${darkMode ? 'bg-[#1a1a2e]' : 'bg-white'}`}>
            <h2 className={`font-display text-2xl font-bold mb-2 ${darkMode ? 'text-[#5DADE2]' : 'text-[#0D3B5E]'}`}>Profil professionnel</h2>
            <p className="text-sm text-[#6B7280] mb-8">Sélectionnez le profil qui correspond à votre situation actuelle.</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { id: 'etudiant', label: 'Étudiant(e) en Droit', icon: '🎓', desc: 'Licence, Master, Doctorat en cours' },
                { id: 'juriste', label: 'Juriste', icon: '⚖️', desc: 'Juriste d\'entreprise ou en cabinet' },
                { id: 'fiscaliste', label: 'Fiscaliste', icon: '📊', desc: 'Expert fiscal, conseiller fiscal' },
                { id: 'avocat', label: 'Avocat stagiaire', icon: '🏛️', desc: 'Inscrit au stage du Barreau' },
                { id: 'expert', label: 'Expert-Comptable', icon: '🧮', desc: 'Membre de l\'ONECCA ou en formation' },
                { id: 'autre', label: 'Autre profil', icon: '💼', desc: 'Notaire, magistrat, fonctionnaire...' },
              ].map(p => (
                <button
                  key={p.id}
                  onClick={() => setForm(prev => ({ ...prev, profil: p.id }))}
                  className={`p-5 rounded-xl border-2 text-left transition-all ${
                    form.profil === p.id
                      ? 'border-[#0D3B5E] bg-[#EBF2F8]'
                      : 'border-[#E5E7EB] hover:border-[#0D3B5E]/40'
                  }`}
                >
                  <div className="text-2xl mb-2">{p.icon}</div>
                  <div className={`font-semibold text-sm mb-1 ${form.profil === p.id ? (darkMode ? 'text-[#5DADE2]' : 'text-[#0D3B5E]') : 'text-[#111827]'}`}>{p.label}</div>
                  <div className="text-xs text-[#9CA3AF]">{p.desc}</div>
                </button>
              ))}
            </div>
            <div className="flex gap-4 mt-8">
              <button onClick={() => setStep(1)} className="flex-1 py-3.5 border border-[#E5E7EB] text-[#6B7280] font-medium rounded-xl text-sm hover:bg-[#F7F4EF] transition-colors">
                ← Retour
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!form.profil}
                className={`flex-1 py-3.5 text-white font-semibold rounded-xl text-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${darkMode ? 'bg-[#0f3460] hover:bg-[#1a4a6e]' : 'bg-[#0D3B5E] hover:bg-[#082A45]'}`}
              >
                Continuer →
              </button>
            </div>
          </div>
        )}

        {/* Step 3: File Upload */}
        {step === 3 && (
          <div className={`rounded-2xl p-8 shadow-sm ${darkMode ? 'bg-[#1a1a2e]' : 'bg-white'}`}>
            <h2 className={`font-display text-2xl font-bold mb-2 ${darkMode ? 'text-[#5DADE2]' : 'text-[#0D3B5E]'}`}>Pièces justificatives</h2>
            <p className="text-sm text-[#6B7280] mb-8">Formats acceptés : PDF, JPG, PNG — Taille max : 5 Mo par fichier.</p>

            <div className="space-y-5">
              {[
                { key: 'identity', label: "Carte d'identité / Passeport *", hint: 'Pièce d\'identité nationale en cours de validité' },
                { key: 'cv', label: 'CV à jour *', hint: 'Curriculum vitae détaillant votre parcours' },
                { key: 'proof', label: 'Preuve de statut *', hint: 'Carte étudiante, diplôme ou attestation d\'employeur' },
              ].map(field => {
                const f = files[field.key]
                return (
                  <div key={field.key}>
                    <label className="block text-xs font-semibold text-[#374151] mb-2 tracking-wide">{field.label}</label>
                    <div
                      onDragOver={e => { e.preventDefault(); setDragOver(field.key) }}
                      onDragLeave={() => setDragOver(null)}
                      onDrop={e => handleDrop(field.key, e)}
                      className={`relative border-2 border-dashed rounded-xl p-5 text-center transition-colors ${
                        dragOver === field.key
                          ? 'border-[#E8705A] bg-[#E8705A]/5'
                          : f
                          ? 'border-[#0D3B5E]/40 bg-[#EBF2F8]'
                          : 'border-[#E5E7EB] hover:border-[#0D3B5E]/40'
                      }`}
                    >
                      {!f ? (
                        <>
                          <div className="text-2xl mb-2">📎</div>
                          <p className="text-sm text-[#6B7280] mb-1">Glissez-déposez votre fichier ici</p>
                          <p className="text-xs text-[#9CA3AF] mb-3">{field.hint}</p>
                          <label className={`cursor-pointer inline-block px-4 py-2 text-white text-xs font-semibold rounded-full transition-colors ${darkMode ? 'bg-[#0f3460] hover:bg-[#1a4a6e]' : 'bg-[#0D3B5E] hover:bg-[#082A45]'}`}>
                            Parcourir
                            <input
                              type="file"
                              accept=".pdf,.jpg,.jpeg,.png"
                              className="hidden"
                              onChange={e => { if (e.target.files?.[0]) uploadFile(field.key, e.target.files[0]) }}
                            />
                          </label>
                        </>
                      ) : (
                        <div className="text-left">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <div className={`text-sm font-medium ${darkMode ? 'text-[#5DADE2]' : 'text-[#0D3B5E]'}`}>{f.name}</div>
                              <div className="text-xs text-[#9CA3AF]">{(f.size / 1024).toFixed(0)} Ko</div>
                            </div>
                            <button
                              onClick={() => setFiles(fls => ({ ...fls, [field.key]: null }))}
                              className="text-[#9CA3AF] hover:text-[#E8705A] transition-colors text-lg leading-none"
                            >
                              ×
                            </button>
                          </div>
                          <div className="w-full bg-[#EDE9E2] rounded-full h-1.5">
                            <div
                              className="h-1.5 bg-[#E8705A] rounded-full transition-all duration-300"
                              style={{ width: `${f.progress}%` }}
                            />
                          </div>
                          {f.progress === 100 && (
                            <div className="mt-2 text-xs text-[#059669] font-medium">✓ Téléversement réussi</div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="flex gap-4 mt-8">
              <button onClick={() => setStep(2)} className="flex-1 py-3.5 border border-[#E5E7EB] text-[#6B7280] font-medium rounded-xl text-sm hover:bg-[#F7F4EF] transition-colors">
                ← Retour
              </button>
              <button
                onClick={() => setStep(4)}
                disabled={!files.identity || !files.cv || !files.proof}
                className={`flex-1 py-3.5 text-white font-semibold rounded-xl text-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${darkMode ? 'bg-[#0f3460] hover:bg-[#1a4a6e]' : 'bg-[#0D3B5E] hover:bg-[#082A45]'}`}
              >
                Continuer →
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Payment */}
        {step === 4 && (
          <div className={`rounded-2xl p-8 shadow-sm ${darkMode ? 'bg-[#1a1a2e]' : 'bg-white'}`}>
            <h2 className={`font-display text-2xl font-bold mb-2 ${darkMode ? 'text-[#5DADE2]' : 'text-[#0D3B5E]'}`}>Cotisation annuelle</h2>
            <p className="text-sm text-[#6B7280] mb-6">Selon votre profil, voici les montants applicables selon le règlement intérieur de l'AJFIC</p>

            <div className="bg-[#EBF2F8] rounded-xl p-5 mb-6">
              <div className={`text-xs font-semibold tracking-wide uppercase mb-3 ${darkMode ? 'text-[#5DADE2]' : 'text-[#0D3B5E]'}`}>Récapitulatif</div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[#6B7280]">Membre</span>
                <span className="font-medium text-[#111827]">{form.prenom} {form.nom}</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[#6B7280]">Profil</span>
                <span className="font-medium text-[#111827] capitalize">{form.profil}</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[#6B7280]">Droits d'adhésion</span>
                <span className="font-medium text-[#111827]">
                  {form.profil === 'etudiant' ? '2 000 FCFA' : '5 000 FCFA'}
                </span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[#6B7280]">Cotisation trimestrielle</span>
                <span className="font-medium text-[#111827]">
                  {form.profil === 'etudiant' ? '5 000 FCFA/trimestre' : '10 000 FCFA/trimestre'}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold border-t border-[#0D3B5E]/10 pt-2 mt-2">
                <span className={darkMode ? 'text-[#5DADE2]' : 'text-[#0D3B5E]'}>Total à payer (1er trimestre)</span>
                <span className="text-[#E8705A]">
                  {form.profil === 'etudiant' ? '7 000 FCFA' : '15 000 FCFA'}
                </span>
              </div>
            </div>

            <div className="mb-5">
              <label className="block text-xs font-semibold text-[#374151] mb-3 tracking-wide">Mode de paiement *</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'mtn', label: 'MTN Mobile Money', color: '#FFC107' },
                  { id: 'orange', label: 'Orange Money', color: '#FF6600' },
                ].map(m => (
                  <button
                    key={m.id}
                    onClick={() => setPaymentMethod(m.id as 'mtn' | 'orange')}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      paymentMethod === m.id ? 'border-[#0D3B5E] bg-[#EBF2F8]' : 'border-[#E5E7EB] hover:border-[#0D3B5E]/30'
                    }`}
                  >
                    <div className="w-5 h-5 rounded-full mb-2" style={{ backgroundColor: m.color }} />
                    <div className="font-semibold text-sm text-[#111827]">{m.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {paymentMethod && (
              <div>
                <label className="block text-xs font-semibold text-[#374151] mb-2 tracking-wide">
                  Numéro {paymentMethod === 'mtn' ? 'MTN' : 'Orange'} Money *
                </label>
                <input
                  type="tel"
                  placeholder="+237 6XX XXX XXX"
                  value={phonePayment}
                  onChange={e => setPhonePayment(e.target.value)}
                  className="w-full px-4 py-3 border border-[#E5E7EB] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0D3B5E]/30 focus:border-[#0D3B5E] transition"
                />
              </div>
            )}

            <div className="flex gap-4 mt-8">
              <button onClick={() => setStep(3)} className="flex-1 py-3.5 border border-[#E5E7EB] text-[#6B7280] font-medium rounded-xl text-sm hover:bg-[#F7F4EF] transition-colors">
                ← Retour
              </button>
              <button
                onClick={() => setSubmitted(true)}
                disabled={!paymentMethod || !phonePayment}
                className="flex-1 py-3.5 bg-[#E8705A] text-white font-semibold rounded-xl text-sm hover:bg-[#C85A45] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Valider l'adhésion ✓
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

// ── Sponsoring Page ─────────────────────────────────────────────────────────

interface Pack {
  name: string
  price: string
  tagline: string
  highlight?: boolean
  perks: { label: string; ok: boolean }[]
}

const PACKS: Pack[] = [
  {
    name: 'Silver',
    price: '100.000 – 350.000 FCFA',
    tagline: 'Visibilité essentielle + présence sur supports clés.',
    perks: [
      { label: 'Logo sur affiches (campus & au-delà)', ok: true },
      { label: 'Logo sur flyers', ok: true },
      { label: 'Logo sur réseaux sociaux', ok: true },
      { label: "Logo sur programme remis à l'auditoire", ok: true },
      { label: 'Spot vidéo', ok: false },
      { label: "Billets d'invitation", ok: false },
      { label: 'Espace tente (foire des métiers)', ok: false },
      { label: 'Texte de présentation sur réseaux', ok: false },
    ],
  },
  {
    name: 'Gold',
    price: '400.000 – 750.000 FCFA',
    tagline: 'Visibilité renforcée + activation plus premium.',
    highlight: true,
    perks: [
      { label: 'Logo sur affiches (campus & au-delà)', ok: true },
      { label: 'Logo sur flyers', ok: true },
      { label: 'Logo sur réseaux sociaux', ok: true },
      { label: "Logo sur programme remis à l'auditoire", ok: true },
      { label: "Billets d'invitation", ok: true },
      { label: 'Spot vidéo', ok: true },
      { label: 'Texte de présentation (80 mots)', ok: true },
      { label: 'Espace tente (foire des métiers)', ok: true },
    ],
  },
  {
    name: 'Diamond',
    price: 'À partir de 800.000 FCFA',
    tagline: 'Package prestige + maximum de visibilité & avantages.',
    perks: [
      { label: 'Logo sur affiches (campus & au-delà)', ok: true },
      { label: 'Logo sur flyers', ok: true },
      { label: 'Logo sur réseaux sociaux', ok: true },
      { label: "Logo sur programme remis à l'auditoire", ok: true },
      { label: 'Spot vidéo', ok: true },
      { label: 'Attestations (participants olympiades)', ok: true },
      { label: 'Texte de présentation (150 mots)', ok: true },
      { label: "Invitations brunch de clôture (x4)", ok: true },
    ],
  },
]

const ADVANTAGES = [
  {
    icon: 'campaign',
    title: 'Couverture publicitaire',
    desc: 'Affiches, flyers, roll-up, réseaux sociaux et supports officiels.',
  },
  {
    icon: 'verified',
    title: 'Image valorisante',
    desc: "Soutien à la jeunesse et aux activités scientifiques & éducatives de l'UCAC.",
  },
  {
    icon: 'handshake',
    title: 'Réseau & notoriété',
    desc: "Visibilité auprès d'un public juridique, fiscal et institutionnel.",
  },
]

function SponsoringPage({ darkMode }: { darkMode: boolean }) {
  const [section1Ref, section1Visible] = useScrollAnimation()
  const [section2Ref, section2Visible] = useScrollAnimation()
  const [section3Ref, section3Visible] = useScrollAnimation()

  return (
    <main>
      <section className={`relative py-20 px-6 overflow-hidden ${darkMode ? 'bg-[#0f3460]' : 'bg-[#0D3B5E]'}`}>
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: `url(${img1})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#082A45]/90 via-[#0D3B5E]/70 to-[#0D3B5E]/50" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <span className="text-[#E8705A] text-xs font-semibold tracking-[0.2em] uppercase mb-4 block">Partenariat</span>
          <h1 className="font-display text-5xl font-bold text-white mb-4">Devenez partenaire de l'AJFIC</h1>
          <p className="text-white/65 text-lg leading-relaxed max-w-2xl mx-auto">
            Soutenez la jeunesse juridique et fiscale du Cameroun tout en bénéficiant d'une visibilité exceptionnelle auprès d'un public qualifié.
          </p>
        </div>
      </section>

      <section ref={section1Ref} className={`parallax-section ${darkMode ? 'bg-[#16213e] py-20 px-6' : 'bg-[#F7F4EF] py-20 px-6'} ${section1Visible ? 'visible' : ''}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#E8705A] text-xs font-semibold tracking-[0.2em] uppercase mb-4 block">Avantages</span>
            <h2 className={`font-display text-4xl md:text-5xl font-bold mb-6 ${darkMode ? 'text-[#5DADE2]' : 'text-[#0D3B5E]'}`}>
              Pourquoi sponsoriser l'AJFIC ?
            </h2>
            <p className="text-[#6B7280] text-lg max-w-3xl mx-auto">
              Un partenariat stratégique qui valorise votre image et vous connecte aux futurs leaders du droit et de la fiscalité.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {ADVANTAGES.map((advantage, index) => (
              <div key={index} className={`rounded-2xl p-8 hover:shadow-lg transition-shadow ${darkMode ? 'bg-[#1a1a2e]' : 'bg-white'}`}>
                <div className="w-14 h-14 bg-[#E8705A]/20 rounded-xl flex items-center justify-center mb-5">
                  <span className="text-2xl">
                    {advantage.icon === 'campaign' ? '📢' : advantage.icon === 'verified' ? '✅' : '🤝'}
                  </span>
                </div>
                <h3 className={`font-display text-xl font-bold mb-3 ${darkMode ? 'text-[#5DADE2]' : 'text-[#0D3B5E]'}`}>{advantage.title}</h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">{advantage.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={section2Ref} className={`parallax-section ${darkMode ? 'bg-[#1a1a2e] py-24 px-6' : 'bg-white py-24 px-6'} ${section2Visible ? 'visible' : ''}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#E8705A] text-xs font-semibold tracking-[0.2em] uppercase mb-4 block">Packages</span>
            <h2 className={`font-display text-4xl md:text-5xl font-bold mb-6 ${darkMode ? 'text-[#5DADE2]' : 'text-[#0D3B5E]'}`}>
              Nos formules de sponsoring
            </h2>
            <p className="text-[#6B7280] text-lg max-w-3xl mx-auto">
              Choisissez le niveau de partenariat adapté à vos objectifs et à votre budget.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {PACKS.map((pack, index) => (
              <div
                key={pack.name}
                className={`relative rounded-3xl p-8 transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95 ${
                  pack.highlight
                    ? (darkMode ? 'bg-[#0f3460] text-white shadow-2xl border-2 border-[#E8705A] scale-105' : 'bg-[#0D3B5E] text-white shadow-2xl border-2 border-[#E8705A] scale-105')
                    : darkMode
                    ? 'bg-[#16213e] border border-white/10'
                    : 'bg-[#F7F4EF] border border-[#EDE9E2]'
                }`}
              >
                {pack.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-[#E8705A] text-white text-xs font-bold px-4 py-1.5 rounded-full tracking-wide uppercase">
                      Recommandé
                    </span>
                  </div>
                )}
                <div className="text-center mb-8">
                  <h3 className={`font-display text-3xl font-bold mb-2 ${pack.highlight ? 'text-white' : (darkMode ? 'text-[#5DADE2]' : 'text-[#0D3B5E]')}`}>
                    {pack.name}
                  </h3>
                  <div className={`text-2xl font-bold mb-3 ${pack.highlight ? 'text-[#E8705A]' : 'text-[#E8705A]'}`}>
                    {pack.price}
                  </div>
                  <p className={`text-sm leading-relaxed ${pack.highlight ? 'text-white/70' : 'text-[#6B7280]'}`}>
                    {pack.tagline}
                  </p>
                </div>

                <div className="space-y-4 mb-8">
                  {pack.perks.map((perk, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                        perk.ok ? 'bg-[#E8705A]' : 'bg-gray-300'
                      }`}>
                        {perk.ok ? (
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        )}
                      </div>
                      <span className={`text-sm ${pack.highlight ? 'text-white/80' : perk.ok ? 'text-[#374151]' : 'text-[#9CA3AF]'}`}>
                        {perk.label}
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all active:scale-95 ${
                    pack.highlight
                      ? 'bg-[#E8705A] hover:bg-[#C85A45] text-white'
                      : (darkMode ? 'bg-[#0f3460] hover:bg-[#1a4a6e] text-white' : 'bg-[#0D3B5E] hover:bg-[#082A45] text-white')
                  }`}
                >
                  Demander un devis
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={section3Ref} className={`parallax-section relative py-20 px-6 ${darkMode ? 'bg-[#16213e]' : 'bg-[#F7F4EF]'} ${section3Visible ? 'visible' : ''}`}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`font-display text-3xl font-bold mb-4 ${darkMode ? 'text-[#5DADE2]' : 'text-[#0D3B5E]'}`}>
            Besoin d'une formule personnalisée ?
          </h2>
          <p className="text-[#6B7280] text-lg mb-8">
            Discutons de vos besoins spécifiques pour créer un partenariat sur mesure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/237697503177"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#25D366] text-white font-bold rounded-full hover:bg-[#128C7E] transition-colors text-sm tracking-wide active:scale-95"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Contacter via WhatsApp
            </a>
            <a
              href="mailto:contact@ajfic.cm?subject=Demande de partenariat personnalisé"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#E8705A] text-white font-bold rounded-full hover:bg-[#C85A45] transition-colors text-sm tracking-wide active:scale-95"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contacter par Email
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}

// ── Contact Page ──────────────────────────────────────────────────────────

function ContactPage({ darkMode }: { darkMode: boolean }) {
  const [sent, setSent] = useState(false)
  const [cform, setCform] = useState({ nom: '', email: '', sujet: '', message: '' })
  const [section1Ref, section1Visible] = useScrollAnimation()

  return (
    <main>
      <section className={`relative py-20 px-6 overflow-hidden ${darkMode ? 'bg-[#0f3460]' : 'bg-[#0D3B5E]'}`}>
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: `url(${img3})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#082A45]/90 via-[#0D3B5E]/70 to-[#0D3B5E]/50" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <span className="text-[#E8705A] text-xs font-semibold tracking-[0.2em] uppercase mb-4 block">Contact</span>
          <h1 className="font-display text-5xl font-bold text-white mb-4">Nous contacter</h1>
          <p className="text-white/55 text-lg">Une question, un partenariat, ou simplement dire bonjour</p>
        </div>
      </section>

      <section ref={section1Ref} className={`parallax-section ${darkMode ? 'bg-[#16213e] py-20 px-6' : 'bg-[#F7F4EF] py-20 px-6'} ${section1Visible ? 'visible' : ''}`}>
        <div className="max-w-5xl mx-auto grid lg:grid-cols-5 gap-14">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h3 className={`font-display text-xl font-bold mb-5 ${darkMode ? 'text-[#5DADE2]' : 'text-[#0D3B5E]'}`}>Coordonnées</h3>
              <div className="space-y-5">
                {[
                  { icon: '📍', label: 'Siège social', value: 'Yaoundé, Cameroun' },
                  { icon: '✉️', label: 'Email général', value: 'contact@ajfic.cm' },
                  { icon: '🎓', label: 'Secrétariat Général', value: 'secretariat@ajfic.cm' },
                  { icon: '📞', label: 'Téléphone', value: '+237 69750 3177/177/65009386' },
                  { icon: '💬', label: 'WhatsApp officiel', value: '+237 69750 3177' },
                  { icon: '🎵', label: 'TikTok', value: 'Ajowe Eiktok' },
                ].map(c => (
                  <div key={c.label} className="flex gap-4">
                    <span className="text-xl shrink-0 mt-0.5">{c.icon}</span>
                    <div>
                      <div className="text-xs font-semibold text-[#9CA3AF] tracking-wide uppercase mb-1">{c.label}</div>
                      <div className="text-sm text-[#374151] whitespace-pre-line">{c.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className={`font-display text-xl font-bold mb-4 ${darkMode ? 'text-[#5DADE2]' : 'text-[#0D3B5E]'}`}>Réseaux sociaux</h3>
              <div className="flex flex-wrap gap-3">
                {[
                  { name: 'LinkedIn', color: '#0A66C2' },
                  { name: 'Facebook', color: '#1877F2' },
                  { name: 'WhatsApp', color: '#25D366' },
                  { name: 'TikTok', color: '#000000' },
                ].map(s => (
                  <a
                    key={s.name}
                    href="#"
                    className="px-4 py-2 rounded-full text-white text-xs font-semibold hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: s.color }}
                  >
                    {s.name}
                  </a>
                ))}
              </div>
              <p className="text-xs text-[#9CA3AF] mt-2">TikTok : @Ajowe Eiktok</p>
            </div>

            <div>
              <h3 className={`font-display text-xl font-bold mb-4 ${darkMode ? 'text-[#5DADE2]' : 'text-[#0D3B5E]'}`}>Plateforme numérique</h3>
              <p className="text-sm text-[#6B7280] mb-3">
                Accédez à notre plateforme numérique pour les ressources, publications et actualités de l'AJFIC.
              </p>
              <a
                href="#"
                className={`inline-flex items-center gap-2 font-semibold text-sm border-b-2 border-[#E8705A] pb-0.5 hover:text-[#E8705A] transition-colors ${darkMode ? 'text-[#5DADE2]' : 'text-[#0D3B5E]'}`}
              >
                Accéder à la plateforme →
              </a>
            </div>

            <div>
              <h3 className={`font-display text-xl font-bold mb-4 ${darkMode ? 'text-[#5DADE2]' : 'text-[#0D3B5E]'}`}>Antennes régionales</h3>
              <p className="text-sm text-[#6B7280] mb-3">
                L'AJFIC développe des antennes régionales dans les principales villes du Cameroun. Contactez-nous pour créer une antenne dans votre région.
              </p>
              <div className="text-xs text-[#9CA3AF]">
                <div className="mb-1">• Minimum 10 membres actifs requis</div>
                <div>• Programme d'activités sur 6 mois</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            {sent ? (
              <div className={`rounded-2xl p-10 text-center shadow-sm ${darkMode ? 'bg-[#1a1a2e]' : 'bg-white'}`}>
                <div className="text-4xl mb-4">✉️</div>
                <h3 className={`font-display text-2xl font-bold mb-3 ${darkMode ? 'text-[#5DADE2]' : 'text-[#0D3B5E]'}`}>Message envoyé !</h3>
                <p className="text-[#6B7280] text-sm mb-6">Nous vous répondrons dans les plus brefs délais, conformément à nos procédures internes.</p>
                <button
                  onClick={() => { setSent(false); setCform({ nom: '', email: '', sujet: '', message: '' }) }}
                  className="px-6 py-2.5 bg-[#E8705A] text-white font-semibold rounded-full text-sm hover:bg-[#C85A45] transition-colors"
                >
                  Nouveau message
                </button>
              </div>
            ) : (
              <div className={`rounded-2xl p-8 shadow-sm ${darkMode ? 'bg-[#1a1a2e]' : 'bg-white'}`}>
                <h3 className="font-display text-2xl font-bold text-[#0D3B5E] mb-6">Envoyer un message</h3>
                <div className="grid sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label className="block text-xs font-semibold text-[#374151] mb-2 tracking-wide">Nom complet *</label>
                    <input
                      type="text"
                      placeholder="Jean Dupont"
                      value={cform.nom}
                      onChange={e => setCform(p => ({ ...p, nom: e.target.value }))}
                      className="w-full px-4 py-3 border border-[#E5E7EB] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0D3B5E]/30 focus:border-[#0D3B5E] transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#374151] mb-2 tracking-wide">Email *</label>
                    <input
                      type="email"
                      placeholder="vous@exemple.com"
                      value={cform.email}
                      onChange={e => setCform(p => ({ ...p, email: e.target.value }))}
                      className="w-full px-4 py-3 border border-[#E5E7EB] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0D3B5E]/30 focus:border-[#0D3B5E] transition"
                    />
                  </div>
                </div>
                <div className="mb-5">
                  <label className="block text-xs font-semibold text-[#374151] mb-2 tracking-wide">Sujet *</label>
                  <select
                    value={cform.sujet}
                    onChange={e => setCform(p => ({ ...p, sujet: e.target.value }))}
                    className="w-full px-4 py-3 border border-[#E5E7EB] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0D3B5E]/30 focus:border-[#0D3B5E] transition bg-white text-[#374151]"
                  >
                    <option value="">Sélectionner un sujet...</option>
                    <option>Adhésion</option>
                    <option>Partenariat</option>
                    <option>Formation / Atelier</option>
                    <option>Presse & Communication</option>
                    <option>Autre</option>
                  </select>
                </div>
                <div className="mb-6">
                  <label className="block text-xs font-semibold text-[#374151] mb-2 tracking-wide">Message *</label>
                  <textarea
                    rows={5}
                    placeholder="Votre message..."
                    value={cform.message}
                    onChange={e => setCform(p => ({ ...p, message: e.target.value }))}
                    className="w-full px-4 py-3 border border-[#E5E7EB] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0D3B5E]/30 focus:border-[#0D3B5E] transition resize-none"
                  />
                </div>
                <button
                  onClick={() => setSent(true)}
                  disabled={!cform.nom || !cform.email || !cform.message}
                  className="w-full py-3.5 bg-[#E8705A] text-white font-semibold rounded-xl text-sm hover:bg-[#C85A45] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Envoyer le message →
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}

// ── Root ──────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState<Page>('home')
  const [darkMode, setDarkMode] = useState(false)

  return (
    <div className={`min-h-full flex flex-col ${darkMode ? 'bg-[#1a1a2e]' : 'bg-[#F7F4EF]'}`} style={{ fontFamily: "'Outfit', sans-serif" }}>
      <NavBar page={page} setPage={setPage} darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="flex-1">
        {page === 'home' && <HomePage setPage={setPage} darkMode={darkMode} />}
        {page === 'about' && <AboutPage darkMode={darkMode} />}
        {page === 'platform' && <PublicationPage darkMode={darkMode} />}
        {page === 'sponsoring' && <SponsoringPage darkMode={darkMode} />}
        {page === 'adhesion' && <AdhesionPage darkMode={darkMode} />}
        {page === 'contact' && <ContactPage darkMode={darkMode} />}
      </div>
      <Footer setPage={setPage} darkMode={darkMode} />
    </div>
  )
}
