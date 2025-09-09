Proje Adı

Bu proje, React + TypeScript frontend ve Next.js / Nodejs backend ile geliştirilmiş basit bir kullanıcı ve gönderi yönetim uygulamasıdır. Kullanıcılar ve gönderiler üzerinde CRUD işlemleri yapılabilir, arama ve filtreleme özelliği mevcuttur.

Teknolojiler

Frontend: React, TypeScript, Tailwind CSS, React Icons, react-hot-toast

Backend: Next.js, Nodejs

Özellikler

Kullanıcı ve gönderi yönetimi (CRUD)

Arama ve filtreleme

Basit, hızlı ve kullanıcı dostu arayüz

Başarılı/hatalı işlemler için toast bildirimleri (react-hot-toast)

Not: Pagination veya büyük veri yönetimi yok, küçük veri setleri için tasarlandı.

API Endpointleri
Users

GET /users → Tüm kullanıcılar

GET /users/search?term=<term> → Kullanıcıları filtrele

GET /users/:id → Belirli kullanıcı

POST /users → Yeni kullanıcı oluştur

PUT /users/:id → Kullanıcıyı güncelle

DELETE /users/:id → Kullanıcıyı sil

Posts

GET /posts → Tüm gönderiler

GET /posts/search?term=<term>&userId=<id> → Gönderileri filtrele

GET /posts/user/:userId → Kullanıcıya ait gönderiler

GET /posts/:id → Belirli gönderi

POST /posts → Yeni gönderi oluştur

PUT /posts/:id → Gönderiyi güncelle

DELETE /posts/:id → Gönderiyi sil

Kurulum
# Backend
cd backend
npm install
npm run start:dev

# Frontend
cd frontend
npm install
npm run dev


Tarayıcıda http://localhost:3000
 üzerinden erişim sağlanabilir.Değişir ise APIURLS de değişiklik yapılmalı
