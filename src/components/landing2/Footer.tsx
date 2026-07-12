import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Logo from '../landing/Logo';

export default function Footer() {
  const { t } = useTranslation();

  const platformLinks = [
    { label: t('lp.nav.features'), href: '#keunggulan' },
    { label: t('lp.nav.process'), href: '#proses' },
    { label: t('lp.nav.companies'), href: '#perusahaan' },
    { label: t('lp.nav.pricing'), href: '#harga' }
  ];
  const companyLinks = [
    { label: t('lp.footer.linkAbout'), href: '/about' },
    { label: t('lp.nav.faq'), href: '#faq' },
    { label: t('lp.footer.linkContact'), href: '#' }
  ];
  const legalLinks = [
    { label: t('lp.footer.linkPrivacy'), href: '/privacy' },
    { label: t('lp.footer.linkTerms'), href: '/terms' }
  ];

  return (
    <footer className="bg-[#080D24] py-14 text-[#aab3d6]">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <Logo tone="light" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed">{t('lp.footer.tagline')}</p>
            <p className="mt-4 text-xs text-[#6b7391]">{t('lp.footer.operated')}</p>
          </div>

          <FooterCol title={t('lp.footer.colPlatform')} links={platformLinks} />
          <FooterCol title={t('lp.footer.colCompany')} links={companyLinks} />
          <FooterCol title={t('lp.footer.colLegal')} links={legalLinks} />
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-xs text-[#6b7391]">
          <p>{t('lp.footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <nav aria-label={title}>
      <h3 className="font-display text-xs font-bold uppercase tracking-wider text-[#8890ad]">{title}</h3>
      <ul className="mt-4 space-y-2.5 text-sm">
        {links.map((link) => (
          <li key={link.label}>
            {link.href.startsWith('/') ? (
              <Link to={link.href} className="transition-colors hover:text-white">
                {link.label}
              </Link>
            ) : (
              <a href={link.href} className="transition-colors hover:text-white">
                {link.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
