import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Lock, Newspaper } from 'lucide-react';
import type { NewsItem } from '../../data/news';
import { fetchNews } from '../../data/newsApi';
import { useLang, useLocalized } from '../../lib/localized';
import SectionTag from './SectionTag';
import { cn } from '../../lib/cn';

export default function News() {
  const { t } = useTranslation();
  const lang = useLang();
  const l = useLocalized();
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);

  useEffect(() => {
    let active = true;
    fetchNews()
      .then((data) => {
        if (active) setNewsItems(data);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  const dateFmt = (iso: string) =>
    new Date(iso).toLocaleDateString(lang === 'ja' ? 'ja-JP' : 'id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });

  return (
    <section id="news" className="scroll-mt-20 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionTag tag={t('lp.news.tag')} title={t('lp.news.title')} subtitle={t('lp.news.subtitle')} />

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {newsItems.map((item) => (
            <article
              key={item.id}
              className="group flex flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-card transition hover:-translate-y-1 hover:shadow-lift"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-navy-950/5 px-2.5 py-1 font-display text-xs font-bold text-navy-800">
                  <Newspaper className="h-3 w-3" />
                  {l(item.category)}
                </span>
                <span
                  className={cn(
                    'inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-display text-xs font-bold',
                    item.premium
                      ? 'bg-coral-500/10 text-coral-600'
                      : 'bg-mint-400/15 text-mint-500'
                  )}
                >
                  {item.premium && <Lock className="h-3 w-3" />}
                  {item.premium ? t('lp.news.memberBadge') : t('lp.news.freeBadge')}
                </span>
              </div>

              <h3 className="mt-4 font-display text-lg font-bold leading-snug text-navy-950">
                {l(item.title)}
              </h3>
              <p
                className={cn(
                  'mt-2 flex-1 text-sm leading-relaxed text-slate-600',
                  item.premium && 'line-clamp-2 [mask-image:linear-gradient(to_bottom,black,transparent)]'
                )}
              >
                {l(item.summary)}
              </p>

              <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                <span className="text-xs text-slate-400">{dateFmt(item.date)}</span>
                <span
                  className={cn(
                    'inline-flex items-center gap-1 font-display text-sm font-bold',
                    item.premium ? 'text-coral-600' : 'text-royal-600'
                  )}
                >
                  {item.premium ? t('lp.news.unlock') : t('lp.news.readMore')}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
