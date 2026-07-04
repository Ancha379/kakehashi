# Kakehashi (架け橋) — Prototype Front-End

Platform business matching B2B **Indonesia ⇔ Jepang**, dioperasikan oleh **ANC Japan** (Nagoya).

> ⚠️ Ini **prototype front-end untuk review** — tidak ada backend, database, atau autentikasi.
> Semua data berasal dari file mock di `src/data/`. Tombol "Masuk" hanya navigasi ke area app.

## Cara menjalankan

```bash
npm install
npm run dev      # buka http://localhost:5173
npm run build    # type-check + build produksi
```

## Halaman

| Route | Isi |
|---|---|
| `/` | Landing page marketing (hero, pain points, statistik pasar, layanan, cara kerja, keunggulan, alasan dipilih, alur 4 STEP, biaya success-fee, FAQ, kontak, footer) |
| `/app/dashboard` | Dashboard perusahaan "login" (statistik, permintaan match, 商談 aktif, notifikasi) |
| `/app/companies` | Direktori perusahaan + search & filter (negara, industri, tujuan, skala) |
| `/app/companies/:id` | Profil perusahaan, toggle 原文⇄翻訳, yang ditawarkan/dicari, PIC, CTA meeting |
| `/app/matching` | Rekomendasi AI matching dengan skor % + alasan match |
| `/app/chat` | UI chat dwibahasa dengan terjemahan AI per bubble (badge AI翻訳) |
| `/app/register` | Registrasi multi-step (4 langkah + review), front-end only |

Toggle bahasa **JP|ID** ada di header setiap halaman.

## Struktur folder

```
src/
├── components/
│   ├── landing/       # Section-section landing page (Hero, Pricing, Faq, …)
│   ├── ui/            # Komponen dasar reusable (Button, Card, Badge, Toast, …)
│   ├── CompanyCard.tsx, CompanyLogo.tsx, LanguageToggle.tsx, ScrollToTop.tsx
├── data/              # ✏️ SEMUA konten mock — edit di sini tanpa sentuh JSX
│   ├── companies.ts   # 15 perusahaan (8 JP + 7 ID), field dwibahasa *_ja / *_id
│   ├── messages.ts    # 2 thread chat dummy JP⇔ID (asli + terjemahan)
│   ├── faq.ts, pricing.ts, steps.ts, features.ts, landing.ts, dashboard.ts
├── i18n/
│   ├── ja.json        # ✏️ Semua copywriting Jepang (UI chrome & heading)
│   ├── id.json        # ✏️ Semua copywriting Indonesia
├── layouts/           # AppLayout (sidebar + topbar area /app)
├── pages/
│   ├── LandingPage.tsx
│   └── app/           # Dashboard, Companies, CompanyDetail, Matching, Chat, Register
└── lib/               # Helper kecil (cn, useLang/useLocalized)
```

### Mengedit konten

- **Copywriting UI** (tombol, judul section, label): `src/i18n/id.json` & `src/i18n/ja.json`.
- **Konten data** (perusahaan, FAQ, tabel harga, langkah, fitur): file di `src/data/` — semua teks pakai objek `{ ja: '…', id: '…' }` atau field `*_ja` / `*_id`.
- **Warna brand**: token `primary` (biru korporat) & `accent` (amber) di `tailwind.config.js`.
- **Foto hero**: ganti `public/hero.jpg` (sekarang placeholder gradient).

## TODO fase berikutnya (belum diimplementasi)

- [ ] Autentikasi & manajemen akun (mis. Supabase Auth) + role perusahaan/koordinator/admin
- [ ] Database & API (Supabase/Postgres): companies, matches, threads, deals
- [ ] AI translation API sungguhan (chat & profil) + penyimpanan hasil terjemahan
- [ ] AI matching engine (embedding profil + skor kecocokan yang dihitung nyata)
- [ ] Chat real-time (Supabase Realtime / WebSocket) + notifikasi
- [ ] Alur verifikasi/screening internal untuk koordinator ANC Japan
- [ ] Form kontak & registrasi terhubung backend (email notification)
- [ ] Halaman legal (privacy policy, terms) + analytics
- [ ] i18n tambahan (EN) bila diperlukan

---
Operated by ANC Japan / 株式会社ANCジャパン
