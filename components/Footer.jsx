import Link from "next/link";

const DOCTOLIB_URL = "https://www.doctolib.fr/orthodontiste/paris/joseph-dardas";

const Footer = () => {
  return (
    <footer className="relative pt-24 md:pt-32 pb-12 border-t border-[rgba(250,250,250,0.06)] bg-[#0B0B0C]" data-testid="footer">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 md:gap-8 pb-16">
          <div className="md:col-span-2 lg:col-span-4">
            <div className="font-serif-display text-3xl md:text-4xl text-white leading-tight mb-4">
              Dr Joseph Dardas
            </div>
            <p className="text-white/50 font-light max-w-md text-sm leading-relaxed mb-8">
              Orthodontie d'exception · L'architecture d'un sourire. Deux cabinets privés à Paris,
              à la Madeleine et à Reuilly. Sur rendez-vous uniquement.
            </p>
            <a
              href={DOCTOLIB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold text-[0.7rem]"
              data-testid="footer-doctolib"
            >
              Prendre rendez-vous →
            </a>
          </div>
          <div className="lg:col-span-2">
            <div className="overline mb-5">Cabinets</div>
            <ul className="space-y-3 text-sm text-white/65 font-light">
              <li>8 Bd de la Madeleine, 75009 Paris</li>
              <li>44 Bd de Reuilly, 75012 Paris</li>
            </ul>
          </div>
          <div className="lg:col-span-2">
            <div className="overline mb-5">Horaires</div>
            <ul className="space-y-3 text-sm text-white/65 font-light">
              <li>Lun – Ven · 9h – 19h</li>
              <li>Sam · 11h – 17h</li>
              <li className="text-white/35 text-xs pt-1">Sur rendez-vous uniquement</li>
            </ul>
          </div>
          <div className="lg:col-span-2">
            <div className="overline mb-5">Pratique</div>
            <ul className="space-y-3 text-sm text-white/65">
              <li><a href="#philosophie" className="link-underline">Philosophie</a></li>
              <li><a href="#traitements" className="link-underline">Traitements</a></li>
              <li><a href="#resultats" className="link-underline">Résultats</a></li>
              <li><a href="#temoignages" className="link-underline">Témoignages</a></li>
            </ul>
          </div>
          <div className="lg:col-span-1">
            <div className="overline mb-5">Informations pratiques</div>
            <ul className="space-y-3 text-sm text-white/65 font-light">
              <li>Carte Vitale acceptée</li>
              <li>Chèques · Espèces · Carte bancaire</li>
            </ul>
          </div>
          <div className="lg:col-span-1">
            <div className="overline mb-5">Plus</div>
            <ul className="space-y-3 text-sm text-white/65">
              <li><Link href="/admin/login" className="link-underline" data-testid="footer-admin-link">Admin</Link></li>
              <li>
                <a href="https://www.instagram.com/drjosephdardas/" target="_blank" rel="noopener noreferrer" className="link-underline">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-white/40">
          <div>© {new Date().getFullYear()} Cabinet Dardas. Tous droits réservés.</div>
          <div className="font-serif-display italic text-white/30">L'architecture d'un sourire.</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
