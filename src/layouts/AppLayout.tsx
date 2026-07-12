import { useState } from 'react';
import { NavLink, Link, Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  LayoutDashboard,
  Building2,
  Sparkles,
  MessageSquare,
  UserPlus,
  ShieldCheck,
  ArrowLeft,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import Logo from '../components/landing/Logo';
import LanguageToggle from '../components/LanguageToggle';
import Badge from '../components/ui/Badge';
import { useAuth } from '../lib/AuthProvider';
import { useDemoMode } from '../lib/DemoModeProvider';
import { useViewer } from '../lib/ViewerProvider';
import { useCompanies } from '../lib/CompaniesProvider';
import { useLocalized } from '../lib/localized';
import AppGate from '../pages/app/AppGate';
import { cn } from '../lib/cn';

const baseNavItems = [
  { to: '/app/dashboard', key: 'app.dashboard', icon: LayoutDashboard },
  { to: '/app/companies', key: 'app.companies', icon: Building2 },
  { to: '/app/matching', key: 'app.matching', icon: Sparkles },
  { to: '/app/chat', key: 'app.chat', icon: MessageSquare }
];
// Onboarding — hanya relevan bagi yang belum punya perusahaan.
const registerNavItem = { to: '/app/register', key: 'app.register', icon: UserPlus };
// Item khusus staf ANC (coordinator/admin).
const staffNavItem = { to: '/app/screening', key: 'app.screening', icon: ShieldCheck };
// Untuk deteksi judul topbar (semua kemungkinan rute).
const allNavItems = [...baseNavItems, registerNavItem, staffNavItem];

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { session, signOut } = useAuth();
  const { hasCompany, isStaff } = useViewer();
  // "Registrasi" hanya untuk yang perlu onboarding (belum punya perusahaan &
  // bukan staf). Demo (tanpa sesi) tetap melihatnya sebagai showcase alur.
  const showRegister = !session || (!hasCompany && !isStaff);
  // Staf ANC tak punya perusahaan → hanya menu yang relevan: 審査 + direktori
  // (untuk melihat & mengontak perusahaan). Dashboard/AIマッチング/チャット
  // adalah sudut pandang perusahaan, tak berlaku bagi staf.
  const companiesNavItem = baseNavItems.find((i) => i.to === '/app/companies')!;
  const items = isStaff
    ? [staffNavItem, companiesNavItem]
    : [...baseNavItems, ...(showRegister ? [registerNavItem] : [])];

  const handleSignOut = async () => {
    await signOut();
    onNavigate?.();
    navigate('/');
  };

  return (
    <div className="flex h-full flex-col">
      <div className="px-5 py-5">
        <Link to="/" onClick={onNavigate}>
          <Logo />
        </Link>
      </div>

      <nav className="flex-1 space-y-1 px-3" aria-label={t('common.appNav')}>
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors',
                isActive
                  ? 'bg-primary-700 text-white'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              )
            }
          >
            <item.icon className="h-4 w-4 shrink-0" />
            {t(item.key)}
          </NavLink>
        ))}
      </nav>

      <div className="space-y-3 px-5 py-5">
        {session ? (
          <div className="rounded-xl bg-slate-50 px-3 py-2">
            <p className="truncate text-xs font-semibold text-slate-700" title={session.user.email}>
              {session.user.email}
            </p>
            <button
              type="button"
              onClick={handleSignOut}
              className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-red-600 hover:text-red-700"
            >
              <LogOut className="h-3.5 w-3.5" />
              {t('auth.signout')}
            </button>
          </div>
        ) : (
          <Badge tone="accent">{t('app.demoBadge')}</Badge>
        )}
        <Link
          to="/"
          onClick={onNavigate}
          className="flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-primary-700"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          {t('app.backToSite')}
        </Link>
      </div>
    </div>
  );
}

export default function AppLayout() {
  const { t } = useTranslation();
  const { session, loading } = useAuth();
  const { demo } = useDemoMode();
  const viewer = useViewer();
  const { getCompany } = useCompanies();
  const l = useLocalized();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const active = allNavItems.find((item) => location.pathname.startsWith(item.to));

  // Tunggu status sesi & resolusi perusahaan viewer agar tidak "berkedip".
  if (loading || viewer.loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div
          className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-primary-700"
          role="status"
          aria-label={t('common.appName')}
        />
      </div>
    );
  }

  // Gate: belum login DAN belum masuk mode demo → tawarkan masuk / demo.
  if (!session && !demo) {
    return <AppGate />;
  }

  // Login tapi belum punya perusahaan → arahkan ke onboarding (Registrasi).
  // Staf ANC (coordinator/admin) tak punya perusahaan → dikecualikan.
  if (session && !viewer.hasCompany && !viewer.isStaff && location.pathname !== '/app/register') {
    return <Navigate to="/app/register" replace />;
  }

  // Staf ANC tak punya sudut pandang perusahaan → halaman dashboard/matching/
  // chat tak berlaku. Beranda mereka adalah 審査 (Screening). Tanpa ini mereka
  // jatuh ke data perusahaan demo & aksinya gagal.
  const staffBlockedPaths = ['/app/dashboard', '/app/matching', '/app/chat'];
  if (session && viewer.isStaff && staffBlockedPaths.includes(location.pathname)) {
    return <Navigate to="/app/screening" replace />;
  }

  const viewerCompany = viewer.slug ? getCompany(viewer.slug) : undefined;
  const companyName = viewerCompany
    ? l({ ja: viewerCompany.name_ja, id: viewerCompany.name_id })
    : session
      ? session.user.email ?? t('app.demoCompany')
      : t('app.demoCompany');
  const avatarLetter = companyName.replace(/^PT\s+/i, '').charAt(0).toUpperCase() || 'K';

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar desktop */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-slate-100 bg-white lg:block">
        <SidebarContent />
      </aside>

      {/* Sidebar mobile (overlay) */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-slate-900/40"
            aria-hidden
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 w-72 bg-white shadow-xl">
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              aria-label={t('common.closeMenu')}
              className="absolute right-3 top-4 rounded-lg p-2 text-slate-500 hover:bg-slate-100"
            >
              <X className="h-5 w-5" />
            </button>
            <SidebarContent onNavigate={() => setSidebarOpen(false)} />
          </aside>
        </div>
      )}

      {/* Topbar */}
      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-3 border-b border-slate-100 bg-white/90 px-4 backdrop-blur md:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              aria-label={t('common.menu')}
              className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
            <h1 className="text-sm font-bold text-slate-900 md:text-base">
              {active ? t(active.key) : t('common.appName')}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <LanguageToggle />
            <div className="hidden items-center gap-2 md:flex">
              <span
                aria-hidden
                className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-500 text-xs font-bold text-white"
              >
                {avatarLetter}
              </span>
              <span className="max-w-[180px] truncate text-xs font-semibold text-slate-600">
                {companyName}
              </span>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-4 py-6 md:px-6 md:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
