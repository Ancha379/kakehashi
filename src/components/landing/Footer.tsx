import { useTranslation } from 'react-i18next';
import Logo from './Logo';

const menuLinks = [
  { key: 'nav.services', href: '#services' },
  { key: 'nav.how', href: '#how' },
  { key: 'nav.features', href: '#features' },
  { key: 'nav.pricing', href: '#pricing' },
  { key: 'nav.faq', href: '#faq' }
];

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-primary-950 py-12 text-primary-200">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Logo tone="light" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed">{t('footer.tagline')}</p>
          </div>
          <nav aria-label="Footer menu">
            <h3 className="text-xs font-bold uppercase tracking-wider text-primary-400">
              {t('footer.menu')}
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {menuLinks.map((link) => (
                <li key={link.key}>
                  <a href={link.href} className="hover:text-white">
                    {t(link.key)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Legal">
            <h3 className="text-xs font-bold uppercase tracking-wider text-primary-400">
              {t('footer.legal')}
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white">
                  {t('footer.privacy')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  {t('footer.terms')}
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white">
                  {t('nav.contact')}
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-10 border-t border-primary-900 pt-6 text-xs text-primary-400">
          <p>{t('footer.operated')}</p>
          <p className="mt-1">
            © {new Date().getFullYear()} Kakehashi. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
}
