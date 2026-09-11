import { useState, useCallback, useRef, useEffect } from 'react'
import ajficLogo from '@/imports/Fichier_6.png'

// Images de la galerie (uniquement les fichiers JPEG, excluant les vidéos et logos)
import img1 from '@/assets/images/WhatsApp Image 2026-09-10 at 21.45.00.jpeg'
import img2 from '@/assets/images/WhatsApp Image 2026-09-10 at 21.45.01.jpeg'
import img3 from '@/assets/images/WhatsApp Image 2026-09-10 at 21.45.02.jpeg'
import img4 from '@/assets/images/WhatsApp Image 2026-09-10 at 21.45.03.jpeg'
import img5 from '@/assets/images/WhatsApp Image 2026-09-10 at 21.45.04 (1).jpeg'
import img6 from '@/assets/images/WhatsApp Image 2026-09-10 at 21.45.04.jpeg'
import img7 from '@/assets/images/WhatsApp Image 2026-09-10 at 21.45.05 (1).jpeg'
import img8 from '@/assets/images/WhatsApp Image 2026-09-10 at 21.45.05 (2).jpeg'
import img9 from '@/assets/images/WhatsApp Image 2026-09-10 at 21.45.05.jpeg'
import img10 from '@/assets/images/WhatsApp Image 2026-09-10 at 21.45.07 (1).jpeg'
import img11 from '@/assets/images/WhatsApp Image 2026-09-10 at 21.45.07.jpeg'
import img12 from '@/assets/images/WhatsApp Image 2026-09-10 at 21.45.08 (1).jpeg'
import img13 from '@/assets/images/WhatsApp Image 2026-09-10 at 21.45.08 (2).jpeg'
import img14 from '@/assets/images/WhatsApp Image 2026-09-10 at 21.45.08.jpeg'
import img15 from '@/assets/images/WhatsApp Image 2026-09-10 at 21.45.09 (1).jpeg'
import img16 from '@/assets/images/WhatsApp Image 2026-09-10 at 21.45.09 (2).jpeg'
import img17 from '@/assets/images/WhatsApp Image 2026-09-10 at 21.45.09.jpeg'
import img18 from '@/assets/images/WhatsApp Image 2026-09-10 at 21.45.10.jpeg'
import img19 from '@/assets/images/WhatsApp Image 2026-09-10 at 21.45.14.jpeg'
import img20 from '@/assets/images/WhatsApp Image 2026-09-10 at 21.45.15.jpeg'
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

type Page = 'home' | 'about' | 'platform' | 'adhesion' | 'contact'

// ── Shared UI ─────────────────────────────────────────────────────────────

function NavBar({ page, setPage }: { page: Page; setPage: (p: Page) => void }) {
  const [open, setOpen] = useState(false)
  const links: { label: string; id: Page }[] = [
    { label: 'Accueil', id: 'home' },
    { label: 'À Propos', id: 'about' },
    { label: 'IUS PRIV', id: 'platform' },
    { label: 'Contact', id: 'contact' },
  ]
  const go = (p: Page) => { setPage(p); setOpen(false); window.scrollTo(0, 0) }

  return (
    <header className="sticky top-0 z-50 bg-[#0D3B5E] shadow-xl">
      <div className="max-w-7xl mx-auto px-6 h-[68px] flex items-center justify-between">
        <button onClick={() => go('home')} className="flex items-center gap-3 shrink-0">
          <img src={ajficLogo} alt="AJFIC" className="h-10 w-auto brightness-0 invert" />
          <span className="hidden sm:block text-[10px] font-semibold tracking-[0.2em] uppercase text-[#E8705A] border-l border-white/20 pl-3">
            × IUS PRIV
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-6">
          {links.map(l => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className={`text-sm font-medium tracking-wide transition-colors duration-150 ${
                page === l.id ? 'text-[#E8705A]' : 'text-white/75 hover:text-white'
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
        </nav>

        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <span className={`block h-0.5 w-6 bg-white transition-all duration-200 ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block h-0.5 w-6 bg-white transition-all duration-200 ${open ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-6 bg-white transition-all duration-200 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-[#082A45] px-6 pb-6 pt-2 flex flex-col gap-4 border-t border-white/10">
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

function Footer({ setPage }: { setPage: (p: Page) => void }) {
  const go = (p: Page) => { setPage(p); window.scrollTo(0, 0) }
  return (
    <footer className="bg-[#082A45] text-white/60">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div className="sm:col-span-2">
          <img src={ajficLogo} alt="AJFIC" className="h-14 w-auto mb-5 brightness-0 invert" />
          <p className="text-sm leading-relaxed max-w-sm text-white/50">
            L'Association des Jeunes Juristes et Fiscalistes du Cameroun — une communauté d'excellence au service du droit et de la fiscalité, en partenariat avec IUS PRIV.
          </p>
          <div className="flex gap-5 mt-6">
            {['LinkedIn', 'Facebook', 'WhatsApp'].map(s => (
              <a key={s} href="#" className="text-xs text-[#E8705A] hover:text-[#f08878] transition-colors font-semibold tracking-wide">
                {s}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-white text-xs font-semibold mb-5 tracking-[0.15em] uppercase">Navigation</h4>
          <ul className="space-y-3 text-sm">
            {(['Accueil', 'À Propos', 'IUS PRIV', 'Adhésion', 'Contact'] as const).map((label, i) => {
              const pages: Page[] = ['home', 'about', 'platform', 'adhesion', 'contact']
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
            <li>+237 699 000 000</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-white/30">
          <span>© 2025 AJFIC × IUS PRIV. Tous droits réservés.</span>
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
  { value: '450+', label: 'Membres actifs' },
  { value: '32', label: 'Événements organisés' },
  { value: '8', label: 'Partenaires stratégiques' },
  { value: '5 ans', label: "D'excellence" },
]

function HomePage({ setPage }: { setPage: (p: Page) => void }) {
  const go = (p: Page) => { setPage(p); window.scrollTo(0, 0) }
  const [shuffledImages, setShuffledImages] = useState(() => shuffleArray(GALLERY_IMAGES))

  return (
    <main>
      {/* Hero */}
      <section className="relative bg-[#0D3B5E] overflow-hidden min-h-[90vh] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: `url(${img1})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#082A45]/90 via-[#0D3B5E]/70 to-[#0D3B5E]/50" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-block text-[#E8705A] text-xs font-semibold tracking-[0.2em] uppercase mb-6 border border-[#E8705A]/40 px-3 py-1.5 rounded-full">
              AJFIC × IUS PRIV — Depuis 2020
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.12] mb-6">
              L'Union sacrée d'une{' '}
              <em className="text-[#E8705A] not-italic">jeunesse ambitieuse</em>{' '}
              en droit et fiscalité
            </h1>
            <p className="text-white/65 text-lg leading-relaxed mb-10 max-w-lg">
              L'AJFIC fédère les jeunes professionnels du droit et de la fiscalité au Cameroun, en partenariat avec IUS PRIV pour une communication juridique d'excellence.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => go('adhesion')}
                className="px-7 py-3.5 bg-[#E8705A] hover:bg-[#C85A45] text-white font-semibold rounded-full transition-colors duration-150 text-sm"
              >
                Rejoindre l'AJFIC
              </button>
              <button
                onClick={() => go('about')}
                className="px-7 py-3.5 border border-white/30 hover:border-white/60 text-white font-medium rounded-full transition-colors duration-150 text-sm"
              >
                Découvrir notre mission →
              </button>
            </div>
          </div>

          <div className="hidden lg:grid grid-cols-2 gap-4">
            {STATS.map(s => (
              <div key={s.label} className="bg-white/8 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <div className="font-display text-4xl font-bold text-[#E8705A] mb-1">{s.value}</div>
                <div className="text-white/60 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats mobile */}
      <section className="lg:hidden bg-[#0A2E4A] py-8 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4">
          {STATS.map(s => (
            <div key={s.label} className="text-center">
              <div className="font-display text-3xl font-bold text-[#E8705A]">{s.value}</div>
              <div className="text-white/50 text-xs mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Partnership IUS PRIV */}
      <section className="bg-[#F7F4EF] py-24 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-block text-[#E8705A] text-xs font-semibold tracking-[0.2em] uppercase mb-4">
              Partenariat Stratégique
            </span>
            <h2 className="font-display text-4xl font-bold text-[#0D3B5E] leading-tight mb-6">
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
              className="inline-flex items-center gap-2 text-[#0D3B5E] font-semibold text-sm border-b-2 border-[#E8705A] pb-0.5 hover:text-[#E8705A] transition-colors"
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
            <div className="absolute bottom-6 left-6 right-6 bg-[#0D3B5E]/90 backdrop-blur-sm rounded-xl p-4 text-white">
              <div className="text-xs text-[#E8705A] font-semibold tracking-wide uppercase mb-1">IUS PRIV</div>
              <div className="font-display text-sm font-semibold">Plateforme de communication juridique & fiscale</div>
            </div>
          </div>
        </div>
      </section>

      {/* News & Events */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-[#E8705A] text-xs font-semibold tracking-[0.2em] uppercase mb-3 block">Actualités</span>
              <h2 className="font-display text-4xl font-bold text-[#0D3B5E]">Dernières nouvelles</h2>
            </div>
            <button
              onClick={() => go('platform')}
              className="hidden sm:block text-sm text-[#0D3B5E] font-semibold border-b border-[#E8705A] pb-0.5 hover:text-[#E8705A] transition-colors"
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
                  <h3 className="font-display font-bold text-[#0D3B5E] text-lg leading-snug mb-3 group-hover:text-[#E8705A] transition-colors">
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
      <section className="bg-[#F7F4EF] py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[#E8705A] text-xs font-semibold tracking-[0.2em] uppercase mb-3 block">Galerie</span>
            <h2 className="font-display text-4xl font-bold text-[#0D3B5E]">Moments AJFIC</h2>
            <p className="text-[#6B7280] mt-4 max-w-2xl mx-auto">
              Découvrez nos événements, formations et moments forts à travers notre galerie photo.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {shuffledImages.slice(0, 8).map((img, index) => (
              <div
                key={index}
                className="relative aspect-square overflow-hidden rounded-xl cursor-pointer group bg-[#0D3B5E]/10"
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
              className="inline-flex items-center gap-2 text-[#0D3B5E] font-semibold text-sm border-b-2 border-[#E8705A] pb-0.5 hover:text-[#E8705A] transition-colors"
            >
              <span>🔄</span> Rafraîchir la galerie
            </button>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-[#E8705A] py-20 px-6">
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
  { name: 'Me. Njoya Arouna', role: 'Président', bio: 'Avocat au Barreau du Cameroun, spécialiste en droit des affaires OHADA.' },
  { name: 'Dr. Mbarga Sophie', role: 'Vice-Présidente Affaires Académiques', bio: 'Docteure en fiscalité internationale, enseignante à l\'Université de Yaoundé II. Responsable de la Commission Formation et Recherche.' },
  { name: 'M. Tchouaffe Brice', role: 'Secrétaire Général', bio: 'Juriste d\'entreprise, expert en droit fiscal et droit social camerounais. Assure le secrétariat des réunions et la gestion administrative.' },
  { name: 'Mme Essomba Laure', role: 'Responsable Communication', bio: 'Coordinatrice de la plateforme IUS PRIV et des relations médias. Responsable de la Commission Communication et Événements.' },
  { name: 'M. Nkeng Patrick', role: 'Trésorier', bio: 'Expert-comptable et fiscaliste, membre de l\'Ordre National des Experts-Comptables. Gestion des finances et budget prévisionnel.' },
  { name: 'Me. Awa Nadia', role: 'Vice-Présidente Partenariats', bio: 'Avocate stagiaire, coordinatrice des partenariats académiques régionaux. Responsable de la Commission Partenariats et Insertion.' },
]

function AboutPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative bg-[#0D3B5E] py-20 px-6 overflow-hidden">
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
            Fondée en 2020, l'Association des Jeunes Juristes et Fiscalistes du Cameroun est un creuset de compétence et d'engagement pour les jeunes professionnels du droit.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-[#F7F4EF] py-24 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="font-display text-4xl font-bold text-[#0D3B5E] mb-6">Notre Mission</h2>
            <p className="text-[#4B5563] leading-relaxed mb-5">
              L'AJFIC a pour vocation de regrouper et de valoriser les jeunes professionnels et étudiants en droit et en fiscalité au Cameroun. Nous œuvrons pour la formation continue, le partage de savoir-faire et l'insertion professionnelle.
            </p>
            <p className="text-[#4B5563] leading-relaxed mb-5">
              Nous organisons régulièrement des ateliers, conférences, et publications juridiques destinés à enrichir la pratique professionnelle de nos membres tout en contribuant au développement juridique du pays.
            </p>
            <p className="text-[#4B5563] leading-relaxed">
              En partenariat avec IUS PRIV, nous développons une plateforme de communication juridique qui démocratise l'accès à l'information juridique et fiscale de qualité.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: '⚖️', title: 'Excellence Juridique', desc: 'Formation de haut niveau et mise à jour des connaissances juridiques et fiscales.' },
              { icon: '🤝', title: 'Réseau Professionnel', desc: 'Un réseau solide de juristes, fiscalistes et avocats à travers tout le Cameroun.' },
              { icon: '📚', title: 'Partage du Savoir', desc: 'Publications, guides pratiques et analyses accessibles à tous les membres.' },
              { icon: '🌍', title: 'Rayonnement CEMAC', desc: 'Une présence active dans l\'espace juridique de l\'Afrique centrale.' },
            ].map(v => (
              <div key={v.title} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-2xl mb-3">{v.icon}</div>
                <h3 className="font-semibold text-[#0D3B5E] mb-2 text-sm">{v.title}</h3>
                <p className="text-xs text-[#6B7280] leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commissions & Organisation */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[#E8705A] text-xs font-semibold tracking-[0.2em] uppercase mb-3 block">Organisation</span>
            <h2 className="font-display text-4xl font-bold text-[#0D3B5E]">Nos Commissions Permanentes</h2>
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
              <div key={index} className="bg-[#F7F4EF] rounded-2xl p-8 hover:bg-[#0D3B5E] transition-colors duration-300 group">
                <div className="text-4xl mb-4">{commission.icon}</div>
                <h3 className="font-display font-bold text-[#0D3B5E] group-hover:text-white text-xl mb-3 transition-colors">
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
      <section className="bg-[#F7F4EF] py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[#E8705A] text-xs font-semibold tracking-[0.2em] uppercase mb-3 block">Valeurs</span>
            <h2 className="font-display text-4xl font-bold text-[#0D3B5E]">Notre Déontologie</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Intégrité', desc: 'Respect strict des principes éthiques dans toutes nos activités.' },
              { title: 'Impartialité', desc: 'Traitement équitable de tous les membres sans discrimination.' },
              { title: 'Professionnalisme', desc: 'Excellence dans l\'exercice de nos fonctions au sein de l\'association.' },
              { title: 'Confidentialité', desc: 'Protection des informations sensibles et données personnelles.' },
            ].map((valeur, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-semibold text-[#0D3B5E] mb-2">{valeur.title}</h3>
                <p className="text-xs text-[#6B7280] leading-relaxed">{valeur.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[#E8705A] text-xs font-semibold tracking-[0.2em] uppercase mb-3 block">Gouvernance</span>
            <h2 className="font-display text-4xl font-bold text-[#0D3B5E]">Bureau Exécutif</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {TEAM.map((m, i) => (
              <div key={m.name} className="group bg-[#F7F4EF] rounded-2xl p-8 hover:bg-[#0D3B5E] transition-colors duration-300">
                <div className="w-14 h-14 rounded-full bg-[#E8705A]/20 flex items-center justify-center mb-5 group-hover:bg-[#E8705A]/30">
                  <span className="font-display font-bold text-[#E8705A] text-xl">
                    {m.name.split(' ').pop()![0]}
                  </span>
                </div>
                <div className="text-[10px] font-semibold tracking-widest uppercase text-[#E8705A] mb-2">{m.role}</div>
                <h3 className="font-display font-bold text-[#0D3B5E] group-hover:text-white text-lg mb-3 transition-colors">{m.name}</h3>
                <p className="text-xs text-[#6B7280] group-hover:text-white/60 leading-relaxed transition-colors">{m.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="bg-[#0D3B5E] py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-[#E8705A] text-xs font-semibold tracking-[0.2em] uppercase mb-3 block">Partenaires</span>
          <h2 className="font-display text-3xl font-bold text-white mb-12">Nos partenaires stratégiques</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'IUS PRIV', desc: 'Communication juridique' },
              { name: 'Barreau du Cameroun', desc: 'Partenaire institutionnel' },
              { name: 'Université Yaoundé II', desc: 'Partenaire académique' },
              { name: 'CEMAC Business Law', desc: 'Partenaire régional' },
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

// ── Platform / IUS PRIV Page ──────────────────────────────────────────────

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

function PlatformPage() {
  const [activeTab, setActiveTab] = useState<'articles' | 'resources'>('articles')
  const featured = ARTICLES.find(a => a.featured)!
  const others = ARTICLES.filter(a => !a.featured)

  return (
    <main>
      <section className="bg-[#0D3B5E] py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-[#E8705A] text-xs font-semibold tracking-[0.2em] uppercase mb-4 block">Plateforme</span>
          <h1 className="font-display text-5xl font-bold text-white mb-4">IUS PRIV</h1>
          <p className="text-white/60 text-lg">
            Analyses juridiques et fiscales de référence pour les praticiens du Cameroun
          </p>
        </div>
      </section>

      <section className="bg-[#F7F4EF] py-6 px-6 border-b border-[#EDE9E2]">
        <div className="max-w-7xl mx-auto flex gap-6">
          {(['articles', 'resources'] as const).map(t => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`pb-4 text-sm font-semibold border-b-2 transition-colors ${
                activeTab === t ? 'border-[#E8705A] text-[#0D3B5E]' : 'border-transparent text-[#9CA3AF] hover:text-[#0D3B5E]'
              }`}
            >
              {t === 'articles' ? 'Analyses & Articles' : 'Ressources & Téléchargements'}
            </button>
          ))}
        </div>
      </section>

      {activeTab === 'articles' && (
        <section className="bg-[#F7F4EF] py-14 px-6">
          <div className="max-w-7xl mx-auto">
            {/* Featured article */}
            <div className="mb-12 bg-white rounded-3xl overflow-hidden shadow-sm grid lg:grid-cols-2">
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
                <h2 className="font-display text-3xl font-bold text-[#0D3B5E] leading-tight mb-4">
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
                <article key={a.title} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
                  <div className="overflow-hidden h-44">
                    <img src={a.img} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-[10px] font-bold tracking-wide uppercase text-[#E8705A]">{a.category}</span>
                      <span className="text-[10px] text-[#9CA3AF]">{a.readTime}</span>
                    </div>
                    <h3 className="font-display font-bold text-[#0D3B5E] text-base leading-snug mb-2 group-hover:text-[#E8705A] transition-colors">
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
        <section className="bg-[#F7F4EF] py-14 px-6">
          <div className="max-w-4xl mx-auto">
            <p className="text-[#6B7280] mb-8 text-sm">
              Ressources juridiques et fiscales compilées et annotées par les membres de l'AJFIC. Accès réservé aux membres à jour de cotisation.
            </p>
            <div className="space-y-4">
              {RESOURCES.map(r => (
                <div key={r.title} className="bg-white rounded-2xl p-6 flex items-center justify-between gap-4 shadow-sm hover:shadow-md transition-shadow group">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 bg-[#E8705A]/10 rounded-xl flex items-center justify-center shrink-0">
                      <span className="text-[#E8705A] font-bold text-xs">{r.type}</span>
                    </div>
                    <div>
                      <div className="font-semibold text-[#0D3B5E] mb-1 text-sm group-hover:text-[#E8705A] transition-colors">{r.title}</div>
                      <div className="flex items-center gap-3 text-xs text-[#9CA3AF]">
                        <span className="bg-[#EBF2F8] text-[#0D3B5E] px-2 py-0.5 rounded-full font-medium">{r.category}</span>
                        <span>{r.size}</span>
                      </div>
                    </div>
                  </div>
                  <button className="px-4 py-2 text-xs font-semibold text-[#0D3B5E] border border-[#0D3B5E]/20 rounded-full hover:bg-[#0D3B5E] hover:text-white hover:border-[#0D3B5E] transition-colors">
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

function AdhesionPage() {
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
      <main className="min-h-screen bg-[#F7F4EF] flex items-center justify-center px-6 py-24">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 bg-[#0D3B5E] rounded-full flex items-center justify-center mx-auto mb-8">
            <svg className="w-10 h-10 text-[#E8705A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="font-display text-4xl font-bold text-[#0D3B5E] mb-4">Demande reçue !</h2>
          <p className="text-[#6B7280] leading-relaxed mb-3">
            Votre dossier d'adhésion a été soumis avec succès. Un email de confirmation a été envoyé à <strong className="text-[#0D3B5E]">{form.email}</strong>.
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
    <main className="bg-[#F7F4EF] min-h-screen">
      {/* Hero */}
      <section className="bg-[#0D3B5E] py-16 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-[#E8705A] text-xs font-semibold tracking-[0.2em] uppercase mb-4 block">Inscription</span>
          <h1 className="font-display text-4xl font-bold text-white mb-3">Adhérer à l'AJFIC</h1>
          <p className="text-white/55 text-base">Rejoignez la communauté des jeunes juristes et fiscalistes du Cameroun</p>
        </div>
      </section>

      {/* Membership Types Info */}
      <section className="bg-[#F7F4EF] py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="font-display text-2xl font-bold text-[#0D3B5E] mb-2">Types d'adhésion</h2>
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
              <div key={index} className="bg-white rounded-xl p-5 shadow-sm">
                <h3 className="font-semibold text-[#0D3B5E] mb-2">{category.type}</h3>
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
      <div className="bg-white border-b border-[#EDE9E2] px-6 py-5">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          {STEPS.map((s, i) => {
            const n = i + 1
            const active = step === n
            const done = step > n
            return (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  done ? 'bg-[#E8705A] text-white' : active ? 'bg-[#0D3B5E] text-white' : 'bg-[#EDE9E2] text-[#9CA3AF]'
                }`}>
                  {done ? '✓' : n}
                </div>
                <span className={`hidden sm:block text-xs font-medium ${active ? 'text-[#0D3B5E]' : done ? 'text-[#E8705A]' : 'text-[#9CA3AF]'}`}>
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
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="font-display text-2xl font-bold text-[#0D3B5E] mb-6">Informations personnelles</h2>
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
              className="mt-8 w-full py-3.5 bg-[#0D3B5E] text-white font-semibold rounded-xl text-sm hover:bg-[#082A45] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Continuer →
            </button>
          </div>
        )}

        {/* Step 2: Professional Profile */}
        {step === 2 && (
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="font-display text-2xl font-bold text-[#0D3B5E] mb-2">Profil professionnel</h2>
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
                  <div className={`font-semibold text-sm mb-1 ${form.profil === p.id ? 'text-[#0D3B5E]' : 'text-[#111827]'}`}>{p.label}</div>
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
                className="flex-1 py-3.5 bg-[#0D3B5E] text-white font-semibold rounded-xl text-sm hover:bg-[#082A45] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Continuer →
              </button>
            </div>
          </div>
        )}

        {/* Step 3: File Upload */}
        {step === 3 && (
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="font-display text-2xl font-bold text-[#0D3B5E] mb-2">Pièces justificatives</h2>
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
                          <label className="cursor-pointer inline-block px-4 py-2 bg-[#0D3B5E] text-white text-xs font-semibold rounded-full hover:bg-[#082A45] transition-colors">
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
                              <div className="text-sm font-medium text-[#0D3B5E]">{f.name}</div>
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
                className="flex-1 py-3.5 bg-[#0D3B5E] text-white font-semibold rounded-xl text-sm hover:bg-[#082A45] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Continuer →
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Payment */}
        {step === 4 && (
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="font-display text-2xl font-bold text-[#0D3B5E] mb-2">Cotisation annuelle</h2>
            <p className="text-sm text-[#6B7280] mb-6">Selon votre profil, voici les montants applicables selon le règlement intérieur de l'AJFIC</p>

            <div className="bg-[#EBF2F8] rounded-xl p-5 mb-6">
              <div className="text-xs font-semibold text-[#0D3B5E] tracking-wide uppercase mb-3">Récapitulatif</div>
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
                <span className="text-[#0D3B5E]">Total à payer (1er trimestre)</span>
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

// ── Contact Page ──────────────────────────────────────────────────────────

function ContactPage() {
  const [sent, setSent] = useState(false)
  const [cform, setCform] = useState({ nom: '', email: '', sujet: '', message: '' })

  return (
    <main>
      <section className="relative bg-[#0D3B5E] py-20 px-6 overflow-hidden">
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

      <section className="bg-[#F7F4EF] py-20 px-6">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-5 gap-14">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h3 className="font-display text-xl font-bold text-[#0D3B5E] mb-5">Coordonnées</h3>
              <div className="space-y-5">
                {[
                  { icon: '📍', label: 'Siège social', value: 'Yaoundé, Cameroun' },
                  { icon: '✉️', label: 'Email général', value: 'contact@ajfic.cm' },
                  { icon: '🎓', label: 'Secrétariat Général', value: 'secretariat@ajfic.cm' },
                  { icon: '📞', label: 'Téléphone', value: '+237 699 000 000' },
                  { icon: '💬', label: 'WhatsApp officiel', value: '+237 677 000 000' },
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
              <h3 className="font-display text-xl font-bold text-[#0D3B5E] mb-4">Réseaux sociaux</h3>
              <div className="flex flex-wrap gap-3">
                {[
                  { name: 'LinkedIn', color: '#0A66C2' },
                  { name: 'Facebook', color: '#1877F2' },
                  { name: 'WhatsApp', color: '#25D366' },
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
            </div>

            <div>
              <h3 className="font-display text-xl font-bold text-[#0D3B5E] mb-4">Plateforme numérique</h3>
              <p className="text-sm text-[#6B7280] mb-3">
                Accédez à notre plateforme numérique pour les ressources, publications et actualités de l'AJFIC.
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-[#0D3B5E] font-semibold text-sm border-b-2 border-[#E8705A] pb-0.5 hover:text-[#E8705A] transition-colors"
              >
                Accéder à la plateforme →
              </a>
            </div>

            <div>
              <h3 className="font-display text-xl font-bold text-[#0D3B5E] mb-4">Antennes régionales</h3>
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
              <div className="bg-white rounded-2xl p-10 text-center shadow-sm">
                <div className="text-4xl mb-4">✉️</div>
                <h3 className="font-display text-2xl font-bold text-[#0D3B5E] mb-3">Message envoyé !</h3>
                <p className="text-[#6B7280] text-sm mb-6">Nous vous répondrons dans les plus brefs délais, conformément à nos procédures internes.</p>
                <button
                  onClick={() => { setSent(false); setCform({ nom: '', email: '', sujet: '', message: '' }) }}
                  className="px-6 py-2.5 bg-[#E8705A] text-white font-semibold rounded-full text-sm hover:bg-[#C85A45] transition-colors"
                >
                  Nouveau message
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-8 shadow-sm">
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

  return (
    <div className="min-h-full flex flex-col bg-[#F7F4EF]" style={{ fontFamily: "'Outfit', sans-serif" }}>
      <NavBar page={page} setPage={setPage} />
      <div className="flex-1">
        {page === 'home' && <HomePage setPage={setPage} />}
        {page === 'about' && <AboutPage />}
        {page === 'platform' && <PlatformPage />}
        {page === 'adhesion' && <AdhesionPage />}
        {page === 'contact' && <ContactPage />}
      </div>
      <Footer setPage={setPage} />
    </div>
  )
}
