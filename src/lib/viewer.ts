// Slug perusahaan "viewer" — perspektif yang sedang dilihat di /app.
// - Mode demo: perusahaan contoh id-01.
// - Login: perusahaan milik user (profiles.company_id -> companies.slug).
// Disimpan sebagai state modul supaya lapisan data (companiesApi/chatApi/
// dashboardApi) bisa membacanya tanpa prop-drilling. ViewerProvider yang
// menetapkannya berdasarkan sesi/mode demo.

export const DEMO_VIEWER_SLUG = 'id-01';

let currentSlug: string = DEMO_VIEWER_SLUG;

export function getViewerSlug(): string {
  return currentSlug;
}

export function setViewerSlug(slug: string): void {
  currentSlug = slug || DEMO_VIEWER_SLUG;
}
