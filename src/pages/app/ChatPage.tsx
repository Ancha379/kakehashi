import { useState } from 'react';
import type { FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Languages, Send } from 'lucide-react';
import { chatThreads } from '../../data/messages';
import type { ChatMessage } from '../../data/messages';
import { getCompany } from '../../data/companies';
import { useLang } from '../../lib/localized';
import CompanyLogo from '../../components/CompanyLogo';
import { cn } from '../../lib/cn';

function Bubble({ message, showTranslation }: { message: ChatMessage; showTranslation: boolean }) {
  const { t } = useTranslation();
  const mine = message.sender === 'me';
  return (
    <div className={cn('flex', mine ? 'justify-end' : 'justify-start')}>
      <div
        className={cn(
          'max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm md:max-w-[70%]',
          mine
            ? 'rounded-br-md bg-primary-700 text-white'
            : 'rounded-bl-md border border-slate-100 bg-white text-slate-800'
        )}
      >
        <p lang={message.lang} className="leading-relaxed">
          {message.original}
        </p>
        {showTranslation && (
          <div className={cn('mt-2 border-t pt-2', mine ? 'border-white/20' : 'border-slate-100')}>
            <span
              className={cn(
                'mb-1 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold',
                mine ? 'bg-white/15 text-primary-100' : 'bg-primary-50 text-primary-700'
              )}
            >
              <Languages className="h-3 w-3" />
              {t('chat.aiBadge')}
            </span>
            <p
              lang={message.lang === 'ja' ? 'id' : 'ja'}
              className={cn('text-xs leading-relaxed', mine ? 'text-primary-100' : 'text-slate-500')}
            >
              {message.translated}
            </p>
          </div>
        )}
        <p className={cn('mt-1.5 text-right text-[10px]', mine ? 'text-primary-200' : 'text-slate-400')}>
          {message.time}
        </p>
      </div>
    </div>
  );
}

export default function ChatPage() {
  const { t } = useTranslation();
  const lang = useLang();
  const [activeId, setActiveId] = useState<string | null>(chatThreads[0]?.id ?? null);
  const [mobileListVisible, setMobileListVisible] = useState(true);
  const [showTranslation, setShowTranslation] = useState(true);
  const [draft, setDraft] = useState('');
  // Pesan tambahan yang dikirim user selama sesi (per thread, hanya React state)
  const [sentMessages, setSentMessages] = useState<Record<string, ChatMessage[]>>({});

  const activeThread = chatThreads.find((th) => th.id === activeId);
  const messages = activeThread
    ? [...activeThread.messages, ...(sentMessages[activeThread.id] ?? [])]
    : [];

  const handleSend = (e: FormEvent) => {
    e.preventDefault();
    if (!activeThread || !draft.trim()) return;
    const msg: ChatMessage = {
      id: `sent-${Date.now()}`,
      sender: 'me',
      lang,
      original: draft.trim(),
      translated: t('chat.demoTranslation'),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setSentMessages((prev) => ({
      ...prev,
      [activeThread.id]: [...(prev[activeThread.id] ?? []), msg]
    }));
    setDraft('');
  };

  return (
    <div className="flex h-[calc(100vh-9rem)] min-h-[420px] overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-card">
      {/* Daftar percakapan */}
      <aside
        className={cn(
          'w-full shrink-0 border-r border-slate-100 md:block md:w-72',
          !mobileListVisible && 'hidden'
        )}
        aria-label={t('chat.title')}
      >
        <div className="border-b border-slate-100 px-4 py-3">
          <h2 className="font-bold text-slate-900">{t('chat.title')}</h2>
          <p className="mt-0.5 text-[11px] text-slate-400">{t('chat.translationNote')}</p>
        </div>
        <ul>
          {chatThreads.map((thread) => {
            const company = getCompany(thread.companyId);
            if (!company) return null;
            const name = lang === 'ja' ? company.name_ja : company.name_id;
            const last = thread.messages[thread.messages.length - 1];
            return (
              <li key={thread.id}>
                <button
                  type="button"
                  onClick={() => {
                    setActiveId(thread.id);
                    setMobileListVisible(false);
                  }}
                  className={cn(
                    'flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-slate-50',
                    activeId === thread.id && 'bg-primary-50/70'
                  )}
                >
                  <CompanyLogo company={company} size="sm" />
                  <span className="min-w-0 flex-1">
                    <span title={name} className="block truncate text-sm font-semibold text-slate-900">
                      {name}
                    </span>
                    <span className="block truncate text-xs text-slate-500">{last.original}</span>
                  </span>
                  <span className="text-[10px] text-slate-400">{last.time}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </aside>

      {/* Panel pesan */}
      <section
        className={cn('flex min-w-0 flex-1 flex-col md:flex', mobileListVisible && 'hidden md:flex')}
      >
        {activeThread ? (
          <>
            <header className="flex items-center gap-3 border-b border-slate-100 px-4 py-3">
              <button
                type="button"
                onClick={() => setMobileListVisible(true)}
                aria-label={t('common.back')}
                className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 md:hidden"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              {(() => {
                const company = getCompany(activeThread.companyId);
                if (!company) return null;
                const name = lang === 'ja' ? company.name_ja : company.name_id;
                return (
                  <>
                    <CompanyLogo company={company} size="sm" />
                    <span title={name} className="min-w-0 flex-1 truncate text-sm font-bold text-slate-900">
                      {name}
                    </span>
                  </>
                );
              })()}
              <label className="flex cursor-pointer items-center gap-2 text-xs font-semibold text-slate-600">
                <input
                  type="checkbox"
                  checked={showTranslation}
                  onChange={(e) => setShowTranslation(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-primary-700 focus:ring-primary-500"
                />
                <span className="hidden sm:inline">{t('chat.showTranslation')}</span>
                <Languages className="h-4 w-4 sm:hidden" aria-hidden />
              </label>
            </header>

            <div className="flex-1 space-y-4 overflow-y-auto bg-slate-50/70 p-4">
              {messages.map((message) => (
                <Bubble key={message.id} message={message} showTranslation={showTranslation} />
              ))}
            </div>

            <form onSubmit={handleSend} className="flex items-center gap-2 border-t border-slate-100 p-3">
              <input
                type="text"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder={t('chat.inputPlaceholder')}
                aria-label={t('chat.inputPlaceholder')}
                className="min-w-0 flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm placeholder:text-slate-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
              />
              <button
                type="submit"
                aria-label={t('chat.send')}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-700 text-white transition-colors hover:bg-primary-800"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center p-8 text-sm text-slate-400">
            {t('chat.selectThread')}
          </div>
        )}
      </section>
    </div>
  );
}
