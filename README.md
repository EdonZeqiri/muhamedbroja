# muhamedbroja.com

Official website of Dr. Muhamed Broja — Islamic writings, lectures, and teachings in Albanian.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Database:** PostgreSQL via Supabase
- **ORM:** Prisma 5
- **Auth:** NextAuth v5
- **Editor:** Tiptap (rich text)
- **Styling:** Tailwind CSS
- **Hosting:** Vercel

## Setup

1. Clone the repository
2. Copy `.env.example` to `.env` and fill in your Supabase credentials
3. Install dependencies: `npm install`
4. Push database schema: `npm run db:push`
5. Seed content from WordPress: `npm run db:seed`
6. Run dev server: `npm run dev`

## Scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run db:push` — Push Prisma schema to database
- `npm run db:seed` — Import WordPress content
- `npm run db:studio` — Open Prisma Studio

## Admin Dashboard

Access at `/admin/login` with your configured admin credentials.

Features:
- Article management with rich text editor
- Category management
- YouTube lecture management
- Q&A section management
- Draft/Publish system
