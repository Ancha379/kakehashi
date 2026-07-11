import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ToastProvider } from './components/ui/Toast';
import { CompaniesProvider } from './lib/CompaniesProvider';
import { AuthProvider } from './lib/AuthProvider';
import { DemoModeProvider } from './lib/DemoModeProvider';
import { ViewerProvider } from './lib/ViewerProvider';
import ScrollToTop from './components/ScrollToTop';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import AppLayout from './layouts/AppLayout';
import DashboardPage from './pages/app/DashboardPage';
import CompaniesPage from './pages/app/CompaniesPage';
import CompanyDetailPage from './pages/app/CompanyDetailPage';
import MatchingPage from './pages/app/MatchingPage';
import ChatPage from './pages/app/ChatPage';
import RegisterPage from './pages/app/RegisterPage';
import CompanyProfilePage from './pages/app/CompanyProfilePage';
import CoordinatorScreeningPage from './pages/app/CoordinatorScreeningPage';

export default function App() {
  return (
    <BrowserRouter
      basename={import.meta.env.BASE_URL.replace(/\/$/, '')}
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <ToastProvider>
        <AuthProvider>
        <DemoModeProvider>
        <ViewerProvider>
        <CompaniesProvider>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/app" element={<AppLayout />}>
            <Route index element={<Navigate to="/app/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="companies" element={<CompaniesPage />} />
            <Route path="companies/:id" element={<CompanyDetailPage />} />
            <Route path="matching" element={<MatchingPage />} />
            <Route path="chat" element={<ChatPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="profile" element={<CompanyProfilePage />} />
            <Route path="screening" element={<CoordinatorScreeningPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        </CompaniesProvider>
        </ViewerProvider>
        </DemoModeProvider>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}
