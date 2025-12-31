## Augie Aristito Sudiarto - Portfolio

Portofolio dengan nuansa pastel-hacker untuk menampilkan keahlian jaringan, keamanan jaringan, dan blue team. Dibangun dengan Next.js (App Router), Tailwind CSS v4, komponen bergaya shadcn/ui, Framer Motion, dan ikon Lucide.

### Fitur
- Hero dengan CTA, stats, dan overlay grid/noise.
- Seksi keahlian, pengalaman/studi, proyek terpilih, serta form kontak statis.
- Animasi halus menggunakan Framer Motion.

### Jalankan secara lokal
```bash
npm install
npm run dev
# buka http://localhost:3000
```

### Perintah lain
- `npm run lint` - cek kualitas kode.
- `npm run build` - build produksi.

### Struktur utama
- `app/page.tsx` - konten halaman utama dan layout.
- `components/ui/*` - komponen bergaya shadcn (button, badge, card).
- `app/globals.css` - tema pastel-hacker, overlay grid/noise.

### Catatan kontak
Form pada bagian kontak belum terhubung backend; gunakan tombol email/LinkedIn untuk respon cepat.
