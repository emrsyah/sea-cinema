
# Sea Cinema

Sebuah aplikasi booking online tiket film dengan berbagai fitur seperti melakukan searching serta booking film, melakukan review, dan lainnya dalam satu tempat.

Aplikasi ini sendiri dibangun menggunakan teknologi Next 13 dan Typescript dengan bantuan Supabase sebagai database dan juga Clerk sebagai autentikasi. Ada juga library-library yang saya pakai pada projek ini seperti tailwind untuk styling, react query, react hook form, zustand, dll.

## Features

- Sistem searching dan booking film
- Cashless payment dengan Balance
- Review dan rating sistem
- Realtime seat update
- Autentikasi pengguna
- Cancel booking, dan lainnya



## Tech Stack

**Client:** Next Js, Typescript, React Query, Tailwind

**Server:** Supabase, Clerk Auth

**Another Library:** Headless Ui ,Zustand, React hook form


## Architecture

- Next Js Server dan Klien Komponen
- Struktur Komponen-based
- Custom hooks untuk data fetching & mutation
- Centralized state management

## Run Locally

Clone the project

```bash
  git clone https://github.com/emrsyah/sea-cinema my-project
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```


## Env Variables

- NEXT_PUBLIC_SUPABASE_URL="https://aycuclqapdegvrcbvyok.supabase.co"
- NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF5Y3VjbHFhcGRlZ3ZyY2J2eW9rIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc1Mjc5NzIsImV4cCI6MjAwMzEwMzk3Mn0.1rbHRmjtNWhOFp-pE_-NsMx3imUQq5sjd9MK_SvWYEQ"

- NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_c2ltcGxlLW9zdHJpY2gtMTMuY2xlcmsuYWNjb3VudHMuZGV2JA
- CLERK_SECRET_KEY=sk_test_cWXK2RsJaIjrQ27JDwA6yrG29N0Ybxa7kU9eCY4oXA

- NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
- NEXT_PUBLIC_CLERK_SIGN_UP_URL=/signup
- NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
- NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/


## Future Improvements

- Penggunaan ORM seperti drizzle untuk akses database
- Skema validation dengan Zod
- Menambahkan e2e testing
- Improve SEO dan aksesibilitas
- Penambahan fitur lainnya seperti Wishlist
