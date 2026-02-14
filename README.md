<p align="center">
  <img src="https://capsule-render.vercel.app/render?type=soft&color=3ECF8E&height=200&section=header&text=PILKETOS%202026&fontSize=80&animation=fadeIn" />
</p>

<p align="center">
  <img src="https://img.shields.io/github/last-commit/cexyzp/PILKETOS_2026?style=for-the-badge&color=3ECF8E" alt="last commit">
  <img src="https://img.shields.io/github/repo-size/cexyzp/PILKETOS_2026?style=for-the-badge&color=white" alt="repo size">
  <img src="https://img.shields.io/github/languages/top/cexyzp/PILKETOS_2026?style=for-the-badge&color=339933" alt="top language">
</p>

<p align="center">
  <a href="#-technology-stack"><strong>Explore the Docs »</strong></a>
  <br />
  <br />
  <a href="https://github.com/cexyzp/PILKETOS_2026/issues">Report Bug</a>
  ·
  <a href="https://github.com/cexyzp/PILKETOS_2026/issues">Request Feature</a>
</p>

---

# 🗳️ Pilketos 2026 - OSIS Election System

Repository ini berisi kode sumber untuk sistem pemilihan Ketua OSIS SMKN 2 Setu masa bakti 2026-2027. Aplikasi ini dirancang untuk menggantikan sistem konvensional menjadi digital yang lebih transparan dan efisien.

Dibuat menggunakan **Node.js**, **Express**, dan **EJS**, serta didukung oleh **Supabase** sebagai backend untuk penyimpanan data dan pembaruan secara real-time.

---

## ✨ Fitur Utama

* **🗳️ Interactive Voting Page**: Interface modern untuk melihat profil kandidat (foto, visi, & misi) sebelum memberikan suara.
* **📊 Real-time Results Dashboard**: Halaman statistik yang melakukan *auto-refresh* setiap 2 detik menggunakan bar chart untuk memantau perolehan suara secara langsung.
* **⚙️ Admin Content Management**: Panel admin khusus (`/?key=gocep`) untuk memperbarui data kandidat secara dinamis.
* **🔄 Vote Reset Functionality**: Fitur reset data suara (`/?key=aris`) untuk kebutuhan pengujian atau inisialisasi ulang periode pemilihan.
* **🚫 Election State Control**: Sistem dapat dialihkan ke mode "Closed" jika periode pemilihan telah berakhir.
* **📱 Responsive Design**: Tampilan yang dioptimalkan untuk akses melalui Desktop, Tablet, maupun Smartphone.

---

## 🛠️ Technology Stack

| Komponen | Teknologi |
| :--- | :--- |
| **Backend** | ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white) ![Express](https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white) |
| **Frontend** | ![EJS](https://img.shields.io/badge/EJS-B4CA65?style=flat-square&logo=ejs&logoColor=black) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white) |
| **Database** | ![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat-square&logo=supabase&logoColor=white) |
| **UI Tools** | ![SweetAlert2](https://img.shields.io/badge/SweetAlert2-F8BB86?style=flat-square&logo=sweetalert2&logoColor=white) |
| **Deployment** | ![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white) |

---

## 🔑 Accessing the Application

Akses halaman dikontrol melalui query parameter `key` pada URL:

| Halaman | Route / Parameter | Deskripsi |
| :--- | :--- | :--- |
| **Dashboard Hasil** | `/?key=aris` | Melihat hasil perolehan suara real-time. |
| **Panel Admin** | `/?key=gocep` | Mengelola data kandidat dan konten. |
| **Halaman Default** | Tanpa Key | Menampilkan halaman "Pemilihan Ditutup". |

---

## 🚀 Setup & Local Development

### Prerequisites
* Node.js & npm installed
* Akun [Supabase](https://supabase.com/)

### Installation
```bash
# 1. Clone repository
git clone [https://github.com/cexyzp/PILKETOS_2026.git](https://github.com/cexyzp/PILKETOS_2026.git)

# 2. Masuk ke folder
cd PILKETOS_2026

# 3. Install dependencies
npm install

Konfigurasi Environment
Buat file .env dan masukkan kredensial Anda:
API_KEY=your_supabase_anon_key
DB_URL=your_supabase_url

> Note: Pastikan Anda telah membuat tabel candidates dan votes di dashboard Supabase sesuai dengan skema SQL yang ada di dokumentasi teknis.
> 
👨‍💻 Developer
Dibuat oleh Aris Sryna
<a href="https://www.google.com/search?q=https://instagram.com/arissrynaa_" target="blank">
<img src="https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white" alt="arissrynaa_" />
</a>
🍰 Contributing
Jika ingin berkontribusi, silakan fork repository ini dan buat pull request. Segala bentuk masukan sangat dihargai!
 * Fork Proyek ini
 * Buat Feature Branch (git checkout -b feature/FiturKeren)
 * Commit perubahan (git commit -m 'Menambahkan fitur keren')
 * Push ke Branch (git push origin feature/FiturKeren)
 * Open Pull Request    <img src="https://img.shields.io/github/issues/cexyzp/PILKETOS_2026?style=for-the-badge&color=red" alt="issues">
  </a>
</p>

---

## 📝 Deskripsi
**PILKETOS 2026** adalah sistem informasi berbasis web yang dirancang untuk mengelola proses Pemilihan Ketua OSIS secara digital, transparan, dan efisien. Proyek ini bertujuan untuk memodernisasi pemungutan suara di lingkungan sekolah.

## ✨ Fitur Unggulan
- ✅ **Real-time Count**: Pantau hasil perolehan suara secara langsung.
- 📱 **Responsive Design**: Tampilan optimal di HP, Tablet, maupun Desktop.
- 🔐 **Secure Login**: Sistem autentikasi untuk pemilih dan administrator.
- 📊 **Manajemen Kandidat**: Kelola visi, misi, dan foto kandidat dengan mudah.

## 🛠️ Teknologi yang Digunakan
<p align="left">
  <img src="https://img.shields.io/badge/php-%23777BB4.svg?style=for-the-badge&logo=php&logoColor=white" />
  <img src="https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white" />
  <img src="https://img.shields.io/badge/bootstrap-%23563D7C.svg?style=for-the-badge&logo=bootstrap&logoColor=white" />
  <img src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=F7DF1E" />
</p>

## 🚀 Cara Instalasi

1. **Clone Repository**
   ```bash
   git clone [https://github.com/cexyzp/PILKETOS_2026.git](https://github.com/cexyzp/PILKETOS_2026.git)

 * Pindah ke Direktori
   cd PILKETOS_2026

 * Konfigurasi Database
   * Buat database baru di phpMyAdmin.
   * Import file .sql yang tersedia di folder database.
   * Sesuaikan konfigurasi koneksi pada file database (misal: config.php atau koneksi.php).
 * Jalankan
   * Pindahkan folder ke htdocs (XAMPP).
   * Buka browser dan akses localhost/PILKETOS_2026.
👨‍💻 Developer
Dibuat dengan ❤️ oleh Aris Sryna.
<a href="https://www.google.com/search?q=https://instagram.com/arissrynaa_" target="blank">
<img src="https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white" alt="arissrynaa_" />
</a>
🍰 Kontribusi
Ingin membantu mengembangkan proyek ini? Silakan lakukan Fork dan kirimkan Pull Request Anda!
 * Fork Repo ini
 * Buat Branch baru (git checkout -b feature/FiturKeren)
 * Commit perubahanmu (git commit -m 'Menambah fitur keren')
 * Push ke Branch (git push origin feature/FiturKeren)
 * Buat Pull Request baru.
Jangan lupa kasih Star ⭐ jika repository ini bermanfaat!

---
