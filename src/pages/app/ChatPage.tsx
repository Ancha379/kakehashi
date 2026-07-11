import { useCallback, useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Languages, Lock, Send } from 'lucide-react';
import {
  fetchMessages,
  fetchThreads,
  sendMessage,
  subscribeMessages
} from '../../data/chatApi';
import type { ChatMessage, ChatThreadSummary } from '../../data/chatApi';
import { useCompanies } from '../../lib/CompaniesProvider';
import { useAuth } from '../../lib/AuthProvider';
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
              {message.translated || t('chat.demoTranslation')}
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
  const { getCompany } = useCompanies();
  const { session } = useAuth();
  // Kirim pesan hanya untuk yang login (mode demo = baca saja, slice 3).
  const canSend = !!session;
  const [threads, setThreads] = useState<ChatThreadSummary[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [mobileListVisible, setMobileListVisible] = useState(true);
  const [showTranslation, setShowTranslation] = useState(true);
  const [draft, setDraft] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  // Muat daftar percakapan sekali.
  useEffect(() => {
    let active = true;
    fetchThreads()
      .then((data) => {
        if (!active) return;
        setThreads(data);
        setActiveId((cur) => cur ?? data[0]?.id ?? null);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  const appendMessage = useCallback((m: ChatMessage) => {
    setMessages((prev) => (prev.some((x) => x.id === m.id) ? prev : [...prev, m]));
  }, []);

  // Muat pesan thread aktif + langganan Realtime.
  useEffect(() => {
    if (!activeId) return;
    let active = true;
    fetchMessages(activeId)
      .then((msgs) => {
        if (active) setMessages(msgs);
      })
      .catch(() => {});
    const unsub = subscribeMessages(activeId, appendMessage);
    return () => {
      active = false;
      unsub();
    };
  }, [activeId, appendMessage]);

  // Auto-scroll ke pesan terbaru.
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: 'end' });
  }, [messages]);

  const handleSend = async (e: FormEvent) => {
    e.preventDefault();
    if (!canSend) return;
    const text = draft.trim();
    if (!activeId || !text) return;
    setDraft('');
    try {
      const m = await sendMessage(activeId, lang, text);
      appendMessage(m);
    } catch {
      setDraft(text);
    }
  };

  const activeThread = threads.find((th) => th.id === activeId);

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
          {threads.map((thread) => {
            const company = getCompany(thread.companyId);
            if (!company) return null;
            const name = lang === 'ja' ? company.name_ja : company.name_id;
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
                    <span className="block truncate text-xs text-slate-500">{thread.lastOriginal}</span>
                  </span>
                  <span className="text-[10px] text-slate-400">{thread.lastTime}</span>
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
              <div ref={bottomRef} />
            </div>

            {canSend ? (
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
            ) : (
              <div className="flex items-center justify-center gap-2 border-t border-slate-100 bg-slate-50 p-3 text-xs font-medium text-slate-500">
                <Lock className="h-3.5 w-3.5" />
                {t('chat.loginToSend')}
              </div>
            )}
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
