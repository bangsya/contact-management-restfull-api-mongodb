# RESTful API Contact Management

RESTful API sederhana untuk manajemen kontak, dibangun menggunakan **Node.js**, **Express.js**, dan **MongoDB**.

## 🚀 Fitur

- Membuat user
- CRUD (Create, Read, Update, Delete) untuk entitas kontak
- Validasi input
- Error handling
- Struktur modular (routes, controllers, services, models)
- Mudah dikembangkan dan diintegrasikan dengan frontend

---

## 🧰 Teknologi yang Digunakan

| Teknologi          | Keterangan                                      |
| ------------------ | ----------------------------------------------- |
| Node.js            | Runtime JavaScript di sisi server               |
| Express.js         | Framework web minimalis untuk Node.js           |
| MongoDB / Mongoose | Database NoSQL dan ODM                          |
| dotenv             | Untuk menyimpan konfigurasi environment         |
| nodemon            | Untuk menjalankan server dalam mode development |

---

## 📁 Struktur Folder

```
.
├── docs               # Dokumentasi API
├── src
│   ├── application     # Aplikasi utama
│   ├── controllers     # Logika bisnis (handler request)
│   ├── error           # Error handler
│   ├── middlewares     # Middleware custom
│   ├── models          # Skema Mongoose database
│   ├── route           # Endpoint API
│   ├── services        # Logika bisnis (service layer)
│   ├── validation      # Validasi input
│   └── main.js
├── test                # (opsional) pengujian
├── .env                # Konfigurasi environment
├── .gitignore
├── babel.config.json
├── package.json
└── README.md
```

---

## ⚙️ Instalasi

1. **Clone repository**

   ```bash
   git clone https://github.com/bangsya/contact-management-restfull-api-mongodb.git
   cd contact-management-restfull-api-mongodb
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Buat file `.env`** di root project

   ```env
   DATABASE_URL=your_mongodb_connection_string
   ```

4. **Jalankan server**

   ```bash
   npm start
   ```

   atau untuk mode development:

   ```bash
   npm run dev
   ```

5. **(Opsional) Jalankan testing**
   ```bash
   npm test
   ```

---

## 🤝 Kontribusi

1. Fork repositori ini
2. Buat branch fitur baru
   ```bash
   git checkout -b fitur-xyz
   ```
3. Commit perubahanmu
   ```bash
   git commit -m "Menambahkan fitur xyz"
   ```
4. Push ke branch
   ```bash
   git push origin fitur-xyz
   ```
5. Buat Pull Request

---

💡 _Dikembangkan oleh [Bang Sya](https://github.com/bangsya) untuk pembelajaran dan pengembangan backend API._
