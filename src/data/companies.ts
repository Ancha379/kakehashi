import type { Company } from './types';

/**
 * Mock data direktori perusahaan (8 Jepang + 7 Indonesia).
 * Skor match dihitung dari sudut pandang perusahaan demo yang "login":
 * PT Nusantara Coffee Sejahtera (id-01).
 */
export const companies: Company[] = [
  // ── Perusahaan Jepang ─────────────────────────────────────────
  {
    id: 'jp-01',
    name_ja: '名工精機株式会社',
    name_id: 'Meiko Seiki Co., Ltd.',
    country: 'JP',
    industry: 'manufacturing',
    size: 'medium',
    founded: 1972,
    location_ja: '愛知県名古屋市',
    location_id: 'Nagoya, Aichi',
    summary_ja: '自動車・産業機械向け精密加工部品メーカー。海外調達網を強化中。',
    summary_id: 'Produsen komponen presisi untuk otomotif & mesin industri. Sedang memperkuat jaringan pengadaan luar negeri.',
    description_ja:
      '創業50年の精密加工メーカーです。自動車部品・産業機械部品の切削加工を得意とし、トヨタ系サプライヤーとの取引実績が豊富です。コスト競争力と品質を両立できるインドネシアの加工パートナーを探しています。技術指導も含めた長期的な関係を希望します。',
    description_id:
      'Produsen permesinan presisi dengan sejarah 50 tahun. Kami unggul dalam pemesinan komponen otomotif dan mesin industri, dengan rekam jejak panjang sebagai pemasok grup Toyota. Kami mencari mitra manufaktur di Indonesia yang mampu memadukan daya saing biaya dan kualitas, dengan hubungan jangka panjang termasuk transfer teknologi.',
    offering: [
      { ja: '精密加工の技術指導・品質管理ノウハウ', id: 'Transfer teknologi pemesinan presisi & QC' },
      { ja: '日本市場への継続的な発注', id: 'Order berkelanjutan untuk pasar Jepang' },
      { ja: '設備投資の共同検討', id: 'Kajian investasi mesin bersama' }
    ],
    seeking: [
      { ja: '金属加工の生産パートナー（ジャワ島）', id: 'Mitra produksi pengerjaan logam (Pulau Jawa)' },
      { ja: 'ISO9001取得済みの工場', id: 'Pabrik bersertifikat ISO 9001' }
    ],
    purpose: ['sourcing', 'partnership'],
    matchScore: 72,
    matchReason_ja: '製造委託先を探しており、貴社ネットワーク経由の紹介依頼が多い企業です。',
    matchReason_id: 'Aktif mencari mitra produksi di Jawa dan terbuka untuk kolaborasi jangka panjang.',
    logoColor: '#1e4e8c',
    pic: { name: 'Tanaka Hiroshi', title_ja: '海外調達部長', title_id: 'GM Pengadaan Internasional', email: 'tanaka@meiko-seiki.example.jp' },
    website: 'https://meiko-seiki.example.jp'
  },
  {
    id: 'jp-02',
    name_ja: 'さくら食品株式会社',
    name_id: 'Sakura Foods Co., Ltd.',
    country: 'JP',
    industry: 'fnb',
    size: 'medium',
    founded: 1988,
    location_ja: '静岡県静岡市',
    location_id: 'Shizuoka',
    summary_ja: 'コーヒー・スパイスの焙煎加工と卸売。インドネシア産原料の直接調達を拡大したい。',
    summary_id: 'Pengolahan & grosir kopi dan rempah. Ingin memperluas pengadaan langsung bahan baku asal Indonesia.',
    description_ja:
      'カフェチェーンや食品メーカー向けに、コーヒー豆とスパイスの焙煎・加工・卸売を行っています。現在は商社経由での調達が中心ですが、品質の見える直接取引に切り替えたいと考えています。特にスマトラ・ジャワ産のスペシャルティコーヒーに関心があります。',
    description_id:
      'Kami mengolah dan mendistribusikan biji kopi serta rempah untuk jaringan kafe dan produsen makanan di Jepang. Saat ini pengadaan masih lewat trading company, namun kami ingin beralih ke perdagangan langsung yang kualitasnya lebih transparan. Kami sangat tertarik pada kopi specialty asal Sumatera dan Jawa.',
    offering: [
      { ja: '日本国内の販売網（カフェ・食品メーカー）', id: 'Jaringan distribusi di Jepang (kafe & produsen)' },
      { ja: '長期購買契約', id: 'Kontrak pembelian jangka panjang' },
      { ja: '品質向上のフィードバック', id: 'Umpan balik peningkatan kualitas' }
    ],
    seeking: [
      { ja: 'スペシャルティコーヒーの生産者・輸出業者', id: 'Produsen/eksportir kopi specialty' },
      { ja: 'スパイス（ナツメグ・シナモン等）のサプライヤー', id: 'Supplier rempah (pala, kayu manis, dll.)' }
    ],
    purpose: ['sourcing'],
    matchScore: 94,
    matchReason_ja: '貴社のスペシャルティコーヒーと輸出能力が、同社の直接調達ニーズと合致します。',
    matchReason_id: 'Mencari pemasok kopi specialty langsung dari Indonesia — persis dengan yang Anda tawarkan.',
    logoColor: '#b74206',
    pic: { name: 'Sato Yumi', title_ja: '調達マネージャー', title_id: 'Manajer Pengadaan', email: 'sato@sakura-foods.example.jp' },
    website: 'https://sakura-foods.example.jp'
  },
  {
    id: 'jp-03',
    name_ja: 'テックブリッジ株式会社',
    name_id: 'TechBridge Inc.',
    country: 'JP',
    industry: 'it',
    size: 'small',
    founded: 2015,
    location_ja: '東京都渋谷区',
    location_id: 'Shibuya, Tokyo',
    summary_ja: '業務システム開発のITベンチャー。オフショア開発とIT人材の獲得が急務。',
    summary_id: 'Startup IT pengembang sistem bisnis. Butuh mitra offshore development dan talenta IT.',
    description_ja:
      '中堅企業向けの業務システム・モバイルアプリ開発を手がけています。国内のエンジニア不足を受け、インドネシアでのオフショア開発拠点づくりと、日本で働く意欲のあるITエンジニアの採用を検討しています。まずは小規模な共同プロジェクトから始めたいです。',
    description_id:
      'Kami mengembangkan sistem bisnis dan aplikasi mobile untuk perusahaan menengah Jepang. Karena kekurangan engineer di dalam negeri, kami menjajaki pembangunan tim offshore di Indonesia serta perekrutan engineer IT yang berminat bekerja di Jepang. Kami ingin memulai dari proyek kolaborasi skala kecil.',
    offering: [
      { ja: '日本品質の開発プロセス研修', id: 'Pelatihan proses pengembangan standar Jepang' },
      { ja: '継続的な開発案件', id: 'Proyek pengembangan berkelanjutan' },
      { ja: '日本就労のキャリアパス', id: 'Jalur karier bekerja di Jepang' }
    ],
    seeking: [
      { ja: 'オフショア開発パートナー（ジャカルタ・バンドン）', id: 'Mitra offshore development (Jakarta/Bandung)' },
      { ja: '日本語学習意欲のあるITエンジニア', id: 'Engineer IT yang mau belajar bahasa Jepang' }
    ],
    purpose: ['partnership', 'talent'],
    matchScore: 58,
    matchReason_ja: '業種は異なりますが、輸出管理システムのデジタル化ニーズがあれば相性が良い企業です。',
    matchReason_id: 'Berbeda industri, namun cocok jika Anda butuh digitalisasi sistem ekspor.',
    logoColor: '#0f766e',
    pic: { name: 'Kobayashi Ken', title_ja: '代表取締役', title_id: 'CEO', email: 'kobayashi@techbridge.example.jp' },
    website: 'https://techbridge.example.jp'
  },
  {
    id: 'jp-04',
    name_ja: '愛知繊維工業株式会社',
    name_id: 'Aichi Textile Industry Co., Ltd.',
    country: 'JP',
    industry: 'textile',
    size: 'medium',
    founded: 1965,
    location_ja: '愛知県一宮市',
    location_id: 'Ichinomiya, Aichi',
    summary_ja: 'アパレル向け生地・縫製の老舗。西ジャワの縫製パートナーを開拓中。',
    summary_id: 'Perusahaan kain & garmen ternama. Sedang membuka kemitraan konveksi di Jawa Barat.',
    description_ja:
      'アパレルブランド向けに生地の企画・製造と縫製を行ってきました。国内工場の高齢化に伴い、品質基準を共有できる海外縫製パートナーを探しています。西ジャワ地域の縫製工場と、まずはサンプル生産からの協業を希望します。',
    description_id:
      'Kami merancang dan memproduksi kain serta garmen untuk merek apparel Jepang. Seiring menuanya tenaga kerja pabrik domestik, kami mencari mitra konveksi luar negeri yang dapat berbagi standar kualitas kami. Kami berharap memulai kerja sama produksi sampel dengan pabrik garmen di Jawa Barat.',
    offering: [
      { ja: '日本ブランドの縫製受注', id: 'Order jahit dari merek Jepang' },
      { ja: '品質管理者の定期派遣', id: 'Penempatan berkala staf QC' },
      { ja: '生地・パターンの提供', id: 'Penyediaan kain & pola' }
    ],
    seeking: [
      { ja: '西ジャワの縫製工場（月産1万着〜）', id: 'Pabrik garmen Jawa Barat (10.000 pcs+/bulan)' },
      { ja: '検品体制の整った物流パートナー', id: 'Mitra logistik dengan sistem inspeksi' }
    ],
    purpose: ['sourcing', 'partnership'],
    matchScore: 66,
    matchReason_ja: '繊維分野の調達に積極的で、インドネシア側パートナーの紹介を求めています。',
    matchReason_id: 'Sangat aktif membangun rantai pasok di Jawa Barat dan terbuka pada perkenalan baru.',
    logoColor: '#7c3aed',
    pic: { name: 'Yamada Akiko', title_ja: '生産管理部長', title_id: 'Kepala Produksi', email: 'yamada@aichi-tex.example.jp' },
    website: 'https://aichi-tex.example.jp'
  },
  {
    id: 'jp-05',
    name_ja: '日本ロジスティクスパートナーズ株式会社',
    name_id: 'Nihon Logistics Partners Co., Ltd.',
    country: 'JP',
    industry: 'logistics',
    size: 'large',
    founded: 1979,
    location_ja: '大阪府大阪市',
    location_id: 'Osaka',
    summary_ja: '国際物流・通関のプロフェッショナル。ASEAN網拡大のため現地提携先を募集。',
    summary_id: 'Spesialis logistik internasional & kepabeanan. Mencari mitra lokal untuk memperluas jaringan ASEAN.',
    description_ja:
      '海上・航空輸送、通関、倉庫までワンストップの国際物流企業です。ASEAN域内ネットワーク強化のため、インドネシアの物流会社との業務提携を進めています。特に食品・冷蔵輸送のノウハウを持つパートナーを歓迎します。',
    description_id:
      'Perusahaan logistik internasional one-stop: pengiriman laut/udara, kepabeanan, hingga pergudangan. Untuk memperkuat jaringan ASEAN, kami menjalin aliansi dengan perusahaan logistik Indonesia. Mitra dengan keahlian pengiriman makanan dan cold chain sangat kami sambut.',
    offering: [
      { ja: '日本側の通関・配送網', id: 'Jaringan kepabeanan & distribusi di Jepang' },
      { ja: '共同輸送スキームの構築', id: 'Skema pengiriman gabungan' },
      { ja: '物流品質研修', id: 'Pelatihan mutu logistik' }
    ],
    seeking: [
      { ja: 'インドネシアの物流・倉庫会社', id: 'Perusahaan logistik/pergudangan Indonesia' },
      { ja: 'コールドチェーンの実績', id: 'Pengalaman cold chain' }
    ],
    purpose: ['partnership', 'sales'],
    matchScore: 81,
    matchReason_ja: '貴社の輸出貨物（コーヒー）の日本側物流を任せられる有力候補です。',
    matchReason_id: 'Kandidat kuat untuk menangani logistik ekspor kopi Anda di sisi Jepang.',
    logoColor: '#0369a1',
    pic: { name: 'Nakamura Jiro', title_ja: '国際事業部 部長', title_id: 'Direktur Divisi Internasional', email: 'nakamura@nlp.example.jp' },
    website: 'https://nlp.example.jp'
  },
  {
    id: 'jp-06',
    name_ja: '鈴鹿オートパーツ株式会社',
    name_id: 'Suzuka Auto Parts Co., Ltd.',
    country: 'JP',
    industry: 'automotive',
    size: 'medium',
    founded: 1983,
    location_ja: '三重県鈴鹿市',
    location_id: 'Suzuka, Mie',
    summary_ja: '二輪・四輪部品のTier2サプライヤー。インドネシアでの現地生産・合弁を検討。',
    summary_id: 'Pemasok Tier-2 komponen motor & mobil. Menjajaki produksi lokal / joint venture di Indonesia.',
    description_ja:
      '二輪・四輪向けの樹脂・プレス部品を製造するTier2サプライヤーです。主要顧客のインドネシア生産拡大に伴い、現地生産体制の構築を検討しています。合弁または技術提携が可能な現地部品メーカーとの出会いを求めています。',
    description_id:
      'Kami pemasok Tier-2 yang memproduksi komponen plastik dan stamping untuk sepeda motor dan mobil. Seiring ekspansi produksi pelanggan utama kami di Indonesia, kami mengkaji pembangunan basis produksi lokal. Kami ingin bertemu produsen komponen lokal yang terbuka untuk joint venture atau aliansi teknologi.',
    offering: [
      { ja: '金型・生産技術の移転', id: 'Transfer teknologi cetakan & produksi' },
      { ja: '合弁への出資', id: 'Investasi joint venture' },
      { ja: '日系OEMへのアクセス', id: 'Akses ke OEM Jepang' }
    ],
    seeking: [
      { ja: '現地部品メーカー（カラワン周辺）', id: 'Produsen komponen lokal (sekitar Karawang)' },
      { ja: 'IATF16949への理解', id: 'Pemahaman IATF 16949' }
    ],
    purpose: ['investment', 'partnership'],
    matchScore: 54,
    matchReason_ja: '業種は異なりますが、投資意欲の高い日本企業として注目度の高い1社です。',
    matchReason_id: 'Industri berbeda, tetapi termasuk perusahaan Jepang paling aktif berinvestasi di Indonesia.',
    logoColor: '#b91c1c',
    pic: { name: 'Watanabe Shun', title_ja: '経営企画室長', title_id: 'Kepala Perencanaan Korporat', email: 'watanabe@suzuka-ap.example.jp' },
    website: 'https://suzuka-ap.example.jp'
  },
  {
    id: 'jp-07',
    name_ja: 'みどりアグリテック株式会社',
    name_id: 'Midori AgriTech Inc.',
    country: 'JP',
    industry: 'fnb',
    size: 'small',
    founded: 2018,
    location_ja: '北海道札幌市',
    location_id: 'Sapporo, Hokkaido',
    summary_ja: 'スマート農業システムのスタートアップ。インドネシアの販売代理店を探しています。',
    summary_id: 'Startup sistem pertanian pintar. Mencari distributor di Indonesia.',
    description_ja:
      'センサーとAIで農作物の生育を最適化するスマート農業システムを開発しています。東南アジア展開の第一歩として、インドネシアの農業法人・農機ディーラーとの代理店契約を希望しています。現地実証実験（PoC)のパートナーも歓迎です。',
    description_id:
      'Kami mengembangkan sistem pertanian pintar yang mengoptimalkan pertumbuhan tanaman dengan sensor dan AI. Sebagai langkah awal ekspansi Asia Tenggara, kami mencari distributor di Indonesia — perusahaan agribisnis atau dealer alat pertanian. Mitra uji coba lapangan (PoC) juga kami sambut.',
    offering: [
      { ja: 'スマート農業システムの独占販売権', id: 'Hak distribusi eksklusif sistem smart farming' },
      { ja: '技術トレーニング', id: 'Pelatihan teknis' },
      { ja: 'PoC費用の一部負担', id: 'Subsidi sebagian biaya PoC' }
    ],
    seeking: [
      { ja: '農業法人・農機ディーラー', id: 'Perusahaan agribisnis / dealer alat tani' },
      { ja: 'コーヒー・カカオ農園との実証実験', id: 'Uji coba di kebun kopi/kakao' }
    ],
    purpose: ['sales', 'partnership'],
    matchScore: 88,
    matchReason_ja: '貴社のコーヒー農園ネットワークが、同社の実証実験ニーズと直接つながります。',
    matchReason_id: 'Jaringan kebun kopi Anda cocok untuk kebutuhan uji coba smart farming mereka.',
    logoColor: '#15803d',
    pic: { name: 'Ito Mana', title_ja: '海外事業担当', title_id: 'Penanggung Jawab Bisnis Internasional', email: 'ito@midori-agri.example.jp' },
    website: 'https://midori-agri.example.jp'
  },
  {
    id: 'jp-08',
    name_ja: '星野機械商事株式会社',
    name_id: 'Hoshino Machinery Trading Co., Ltd.',
    country: 'JP',
    industry: 'manufacturing',
    size: 'small',
    founded: 1995,
    location_ja: '愛知県名古屋市',
    location_id: 'Nagoya, Aichi',
    summary_ja: '中古産業機械の輸出商社。インドネシアのバイヤー・代理店を開拓したい。',
    summary_id: 'Trader ekspor mesin industri bekas. Ingin menjangkau buyer & agen di Indonesia.',
    description_ja:
      '日本国内の工場から出る高品質な中古工作機械・食品加工機械を整備し、海外へ輸出しています。成長するインドネシア市場での販売網構築のため、現地の機械商社・代理店との取引を希望しています。',
    description_id:
      'Kami merekondisi mesin perkakas dan mesin pengolah makanan bekas berkualitas tinggi dari pabrik-pabrik Jepang untuk diekspor. Guna membangun jaringan penjualan di pasar Indonesia yang terus tumbuh, kami mencari trader mesin dan agen lokal.',
    offering: [
      { ja: '整備済み中古機械の安定供給', id: 'Pasokan stabil mesin bekas terekondisi' },
      { ja: '据付・アフターサービス研修', id: 'Pelatihan instalasi & after-sales' }
    ],
    seeking: [
      { ja: '機械商社・代理店', id: 'Trader / agen mesin' },
      { ja: '食品加工業のエンドユーザー', id: 'End user industri pengolahan makanan' }
    ],
    purpose: ['sales'],
    matchScore: 76,
    matchReason_ja: '貴社の焙煎設備更新ニーズに、整備済み食品機械の提案が可能です。',
    matchReason_id: 'Dapat menawarkan mesin pengolahan terekondisi untuk kebutuhan upgrade roastery Anda.',
    logoColor: '#475569',
    pic: { name: 'Hoshino Daichi', title_ja: '代表取締役', title_id: 'Presiden Direktur', email: 'hoshino@hoshino-mt.example.jp' },
    website: 'https://hoshino-mt.example.jp'
  },

  // ── Perusahaan Indonesia ──────────────────────────────────────
  {
    id: 'id-01',
    name_ja: 'PTヌサンタラ・コーヒー・スジャートラ',
    name_id: 'PT Nusantara Coffee Sejahtera',
    country: 'ID',
    industry: 'fnb',
    size: 'medium',
    founded: 2008,
    location_ja: '西ジャワ州バンドン',
    location_id: 'Bandung, Jawa Barat',
    summary_ja: 'スペシャルティコーヒーの生産・輸出。日本のロースター・商社との直接取引を希望。',
    summary_id: 'Produsen & eksportir kopi specialty. Ingin perdagangan langsung dengan roaster & trader Jepang.',
    description_ja:
      '西ジャワとスマトラの提携農園から、グレード1のスペシャルティコーヒーを生産・輸出しています。年間輸出能力は200トン。品質の安定性とトレーサビリティが強みです。日本のロースター・食品商社との長期直接取引を求めています。',
    description_id:
      'Kami memproduksi dan mengekspor kopi specialty grade 1 dari kebun mitra di Jawa Barat dan Sumatera, dengan kapasitas ekspor 200 ton per tahun. Keunggulan kami adalah konsistensi kualitas dan traceability. Kami mencari hubungan dagang langsung jangka panjang dengan roaster dan trading company Jepang.',
    offering: [
      { ja: 'グレード1スペシャルティコーヒー（年200トン）', id: 'Kopi specialty grade 1 (200 ton/tahun)' },
      { ja: '農園までのトレーサビリティ', id: 'Traceability sampai kebun' },
      { ja: 'OEM焙煎・小口対応', id: 'OEM roasting & pesanan kecil' }
    ],
    seeking: [
      { ja: '日本のロースター・食品商社', id: 'Roaster & trading company Jepang' },
      { ja: '冷蔵コンテナ輸送のパートナー', id: 'Mitra pengiriman kontainer berpendingin' }
    ],
    purpose: ['sales', 'partnership'],
    matchScore: 100,
    matchReason_ja: 'デモ用の自社アカウントです。',
    matchReason_id: 'Ini akun perusahaan demo Anda.',
    logoColor: '#92400e',
    pic: { name: 'Rina Kartika', title_ja: '輸出部長', title_id: 'Manajer Ekspor', email: 'rina@nusantaracoffee.example.id' },
    website: 'https://nusantaracoffee.example.id'
  },
  {
    id: 'id-02',
    name_ja: 'PTガーメン・ジャヤ・アバディ',
    name_id: 'PT Garmen Jaya Abadi',
    country: 'ID',
    industry: 'textile',
    size: 'large',
    founded: 1998,
    location_ja: '西ジャワ州チマヒ',
    location_id: 'Cimahi, Jawa Barat',
    summary_ja: '月産50万着のOEM縫製工場。日本アパレルブランドからの受注拡大を目指す。',
    summary_id: 'Pabrik garmen OEM kapasitas 500 ribu pcs/bulan. Menargetkan order merek apparel Jepang.',
    description_ja:
      '欧米ブランド向けOEM縫製で20年以上の実績を持つ縫製工場です。月産能力50万着、社内に検品・検針体制を完備。品質要求の高い日本アパレル市場への本格参入を目指し、日本ブランド・商社との取引を希望しています。',
    description_id:
      'Pabrik garmen dengan pengalaman OEM lebih dari 20 tahun untuk merek Eropa dan Amerika. Kapasitas produksi 500 ribu pcs per bulan dengan sistem inspeksi dan needle detector internal. Kami ingin masuk serius ke pasar apparel Jepang yang menuntut kualitas tinggi, melalui kerja sama dengan merek dan trading company Jepang.',
    offering: [
      { ja: '月産50万着のOEM生産能力', id: 'Kapasitas OEM 500 ribu pcs/bulan' },
      { ja: '欧米ブランドの品質実績', id: 'Rekam jejak kualitas merek Barat' },
      { ja: '小ロット・多品種対応', id: 'Produksi lot kecil multi-model' }
    ],
    seeking: [
      { ja: '日本のアパレルブランド・商社', id: 'Merek apparel & trading company Jepang' },
      { ja: '日本品質基準の技術指導', id: 'Bimbingan standar kualitas Jepang' }
    ],
    purpose: ['sales', 'partnership'],
    matchScore: 63,
    matchReason_ja: '業種は異なりますが、同じ西ジャワの輸出企業として物流の共同化余地があります。',
    matchReason_id: 'Sesama eksportir Jawa Barat — ada peluang konsolidasi logistik ekspor.',
    logoColor: '#6d28d9',
    pic: { name: 'Budi Santoso', title_ja: '営業部長', title_id: 'Manajer Pemasaran', email: 'budi@garmenjaya.example.id' },
    website: 'https://garmenjaya.example.id'
  },
  {
    id: 'id-03',
    name_ja: 'PTシナル・テクノロジ・デジタル',
    name_id: 'PT Sinar Teknologi Digital',
    country: 'ID',
    industry: 'it',
    size: 'medium',
    founded: 2013,
    location_ja: 'ジャカルタ',
    location_id: 'Jakarta',
    summary_ja: '120名のエンジニアを擁するソフトウェア開発会社。日本企業のオフショア案件を求む。',
    summary_id: 'Software house dengan 120 engineer. Mencari proyek offshore dari perusahaan Jepang.',
    description_ja:
      'Web・モバイル・クラウドの受託開発を行うソフトウェア企業です。英語対応可能なエンジニア120名が在籍し、シンガポール・豪州企業との実績があります。日本市場向けの開発チーム立ち上げと、日本語ブリッジ人材の育成に投資する準備があります。',
    description_id:
      'Perusahaan pengembangan software untuk web, mobile, dan cloud dengan 120 engineer yang fasih berbahasa Inggris, berpengalaman dengan klien Singapura dan Australia. Kami siap berinvestasi membangun tim khusus pasar Jepang dan mengembangkan talenta bridge engineer berbahasa Jepang.',
    offering: [
      { ja: '月120人月の開発キャパシティ', id: 'Kapasitas 120 man-month pengembangan' },
      { ja: '競争力のある開発単価', id: 'Tarif pengembangan kompetitif' },
      { ja: '英語・日本語ブリッジ体制（構築中）', id: 'Tim bridge Inggris/Jepang (dalam pengembangan)' }
    ],
    seeking: [
      { ja: '日本のSIer・ITベンチャーの案件', id: 'Proyek dari SI & startup Jepang' },
      { ja: '日本式開発プロセスの研修パートナー', id: 'Mitra pelatihan proses pengembangan Jepang' }
    ],
    purpose: ['sales', 'talent'],
    matchScore: 51,
    matchReason_ja: '直接の取引接点は少ないものの、輸出業務のDX支援先として有望です。',
    matchReason_id: 'Titik temu langsung kecil, tetapi potensial untuk digitalisasi proses ekspor Anda.',
    logoColor: '#0e7490',
    pic: { name: 'Andi Wijaya', title_ja: '事業開発責任者', title_id: 'Head of Business Development', email: 'andi@sinartech.example.id' },
    website: 'https://sinartech.example.id'
  },
  {
    id: 'id-04',
    name_ja: 'PTロガム・プレシシ・ヌサンタラ',
    name_id: 'PT Logam Presisi Nusantara',
    country: 'ID',
    industry: 'manufacturing',
    size: 'medium',
    founded: 2005,
    location_ja: '東ジャワ州スラバヤ',
    location_id: 'Surabaya, Jawa Timur',
    summary_ja: '金属プレス・鋳造の部品メーカー。日本企業からの技術移転と受注を希望。',
    summary_id: 'Produsen stamping & casting logam. Mengharapkan transfer teknologi dan order dari Jepang.',
    description_ja:
      'スラバヤを拠点に金属プレス・鋳造部品を製造しています。ISO9001取得済み、従業員250名。国内二輪市場向けの実績が中心ですが、日本の品質基準を学び、日系サプライチェーンへの参入を目指しています。技術移転を伴う長期パートナーシップを希望します。',
    description_id:
      'Berbasis di Surabaya, kami memproduksi komponen stamping dan casting logam. Bersertifikat ISO 9001 dengan 250 karyawan. Pengalaman utama kami di pasar roda dua domestik, dan kini kami ingin mempelajari standar kualitas Jepang untuk masuk ke rantai pasok perusahaan Jepang, melalui kemitraan jangka panjang dengan transfer teknologi.',
    offering: [
      { ja: 'プレス・鋳造の生産能力', id: 'Kapasitas produksi stamping & casting' },
      { ja: '競争力あるコスト構造', id: 'Struktur biaya kompetitif' },
      { ja: 'ISO9001認証工場', id: 'Pabrik bersertifikat ISO 9001' }
    ],
    seeking: [
      { ja: '日本の製造業からの受注', id: 'Order dari manufaktur Jepang' },
      { ja: '金型・品質管理の技術移転', id: 'Transfer teknologi cetakan & QC' },
      { ja: '設備投資パートナー', id: 'Mitra investasi mesin' }
    ],
    purpose: ['sales', 'investment', 'partnership'],
    matchScore: 47,
    matchReason_ja: '業種接点は薄いですが、名工精機など日本の製造業と高い親和性があります。',
    matchReason_id: 'Kurang relevan untuk Anda, tetapi sangat cocok dengan manufaktur Jepang seperti Meiko Seiki.',
    logoColor: '#334155',
    pic: { name: 'Hendra Gunawan', title_ja: '取締役', title_id: 'Direktur', email: 'hendra@logampresisi.example.id' },
    website: 'https://logampresisi.example.id'
  },
  {
    id: 'id-05',
    name_ja: 'PTトランス・ヌサ・ロジスティック',
    name_id: 'PT Trans Nusa Logistik',
    country: 'ID',
    industry: 'logistics',
    size: 'medium',
    founded: 2010,
    location_ja: 'ジャカルタ',
    location_id: 'Jakarta',
    summary_ja: '通関・倉庫・国内配送のワンストップ物流。日系物流会社との提携を希望。',
    summary_id: 'Logistik one-stop: kepabeanan, gudang, distribusi domestik. Ingin beraliansi dengan logistik Jepang.',
    description_ja:
      'ジャカルタ港を中心に、通関・保税倉庫・国内配送を一貫提供しています。冷蔵倉庫も保有し、食品輸出入の実績が豊富です。日本の物流会社との業務提携により、日尼間のドアツードア輸送サービスを共同構築したいと考えています。',
    description_id:
      'Berpusat di Pelabuhan Tanjung Priok, kami menyediakan layanan kepabeanan, gudang berikat, dan distribusi domestik secara terpadu. Kami juga memiliki cold storage dengan pengalaman ekspor-impor makanan. Kami ingin membangun layanan door-to-door Indonesia–Jepang bersama mitra logistik Jepang.',
    offering: [
      { ja: '通関・保税倉庫・国内配送網', id: 'Kepabeanan, gudang berikat, distribusi domestik' },
      { ja: '冷蔵倉庫・コールドチェーン', id: 'Cold storage & cold chain' }
    ],
    seeking: [
      { ja: '日本の物流会社との業務提携', id: 'Aliansi dengan perusahaan logistik Jepang' },
      { ja: '日系荷主の紹介', id: 'Referensi shipper Jepang' }
    ],
    purpose: ['partnership'],
    matchScore: 84,
    matchReason_ja: '貴社のコーヒー輸出のインドネシア側物流（冷蔵）を強化できるパートナーです。',
    matchReason_id: 'Bisa memperkuat logistik cold chain ekspor kopi Anda di sisi Indonesia.',
    logoColor: '#065f46',
    pic: { name: 'Siti Rahma', title_ja: '事業開発マネージャー', title_id: 'Manajer Pengembangan Bisnis', email: 'siti@transnusa.example.id' },
    website: 'https://transnusa.example.id'
  },
  {
    id: 'id-06',
    name_ja: 'PTコンポーネン・オトモティフ・マンディリ',
    name_id: 'PT Komponen Otomotif Mandiri',
    country: 'ID',
    industry: 'automotive',
    size: 'large',
    founded: 2001,
    location_ja: '西ジャワ州カラワン',
    location_id: 'Karawang, Jawa Barat',
    summary_ja: 'カラワンのTier2自動車部品メーカー。日系との合弁・認証取得支援を求める。',
    summary_id: 'Produsen komponen otomotif Tier-2 di Karawang. Mencari JV Jepang & pendampingan sertifikasi.',
    description_ja:
      'カラワン工業団地で樹脂成形・プレス部品を製造するTier2サプライヤーです。従業員450名、国内OEM向け納入実績があります。日系サプライヤーとの合弁により、IATF16949認証取得と日系OEMサプライチェーンへの参入を目指しています。',
    description_id:
      'Kami pemasok Tier-2 yang memproduksi komponen injection molding dan stamping di kawasan industri Karawang, dengan 450 karyawan dan rekam jejak pasokan ke OEM domestik. Melalui joint venture dengan pemasok Jepang, kami menargetkan sertifikasi IATF 16949 dan masuk ke rantai pasok OEM Jepang.',
    offering: [
      { ja: '成形・プレスの量産能力', id: 'Kapasitas massal molding & stamping' },
      { ja: 'カラワンの戦略的立地', id: 'Lokasi strategis di Karawang' },
      { ja: '合弁への土地・人員提供', id: 'Lahan & SDM untuk joint venture' }
    ],
    seeking: [
      { ja: '日系Tier1/Tier2との合弁', id: 'Joint venture dengan Tier-1/2 Jepang' },
      { ja: 'IATF16949取得支援', id: 'Pendampingan sertifikasi IATF 16949' }
    ],
    purpose: ['partnership', 'investment'],
    matchScore: 43,
    matchReason_ja: '直接の接点は少ないものの、鈴鹿オートパーツとの相互マッチ度が非常に高い企業です。',
    matchReason_id: 'Relevansi langsung rendah untuk Anda, namun sangat cocok dengan Suzuka Auto Parts.',
    logoColor: '#9f1239',
    pic: { name: 'Agus Prasetyo', title_ja: '社長', title_id: 'Presiden Direktur', email: 'agus@komandiri.example.id' },
    website: 'https://komandiri.example.id'
  },
  {
    id: 'id-07',
    name_ja: 'PTアグロ・レンパ・インドネシア',
    name_id: 'PT Agro Rempah Indonesia',
    country: 'ID',
    industry: 'fnb',
    size: 'small',
    founded: 2016,
    location_ja: '南スラウェシ州マカッサル',
    location_id: 'Makassar, Sulawesi Selatan',
    summary_ja: 'スパイス・海藻の輸出企業。日本の食品輸入業者との取引を希望。',
    summary_id: 'Eksportir rempah & rumput laut. Mencari importir makanan Jepang.',
    description_ja:
      '東インドネシアの農家・漁業者ネットワークから、ナツメグ・クローブ・シナモン・海藻を集荷し輸出しています。HACCP対応の加工場を保有。日本の食品輸入業者・調味料メーカーとの直接取引を通じ、産地に還元できるフェアな取引を目指しています。',
    description_id:
      'Kami menghimpun dan mengekspor pala, cengkeh, kayu manis, dan rumput laut dari jaringan petani dan nelayan Indonesia Timur, dengan fasilitas pengolahan berstandar HACCP. Melalui perdagangan langsung dengan importir makanan dan produsen bumbu Jepang, kami ingin membangun perdagangan yang adil dan memberi nilai balik ke daerah asal.',
    offering: [
      { ja: 'ナツメグ・クローブ・海藻の安定供給', id: 'Pasokan stabil pala, cengkeh, rumput laut' },
      { ja: 'HACCP対応加工場', id: 'Fasilitas pengolahan HACCP' },
      { ja: '産地直送のストーリー性', id: 'Narasi produk langsung dari petani' }
    ],
    seeking: [
      { ja: '日本の食品輸入業者・調味料メーカー', id: 'Importir makanan & produsen bumbu Jepang' },
      { ja: '品質規格へのアドバイス', id: 'Masukan standar mutu Jepang' }
    ],
    purpose: ['sales'],
    matchScore: 69,
    matchReason_ja: '同じ食品輸出業として、さくら食品への共同提案・混載輸送の可能性があります。',
    matchReason_id: 'Sesama eksportir pangan — berpeluang penawaran bersama & konsolidasi kargo ke Sakura Foods.',
    logoColor: '#a16207',
    pic: { name: 'Dewi Lestari', title_ja: '共同創業者', title_id: 'Co-founder', email: 'dewi@agrorempah.example.id' },
    website: 'https://agrorempah.example.id'
  }
];

/** Perusahaan demo yang dianggap sedang login. */
export const currentCompanyId = 'id-01';

export function getCompany(id: string): Company | undefined {
  return companies.find((c) => c.id === id);
}
