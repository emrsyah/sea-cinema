
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


## Try Now

Link: 


## Future Improvements

- Penggunaan ORM seperti drizzle untuk akses database
- Menambahkan e2e testing
- Improve SEO dan aksesibilitas
- Penambahan fitur lainnya seperti Wishlist
