# Pelicans Technologies Website

A website plus a WordPress-style admin panel, rebuilt with:

- **frontend/**: Next.js (App Router). Contains the public website and the admin panel at `/admin`.
- **backend/**: Node.js + Express REST API with a MySQL database.
- **frontend-multiqos/**: an alternative design of the public website (multiqos.com layout, same content, port 3001). See its README.

## Folder structure

```
pelicans-website/
├── frontend/                         # Next.js app (port 3000)
│   ├── public/                       # Static files: images, icons, fonts
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.js             # Root HTML layout
│   │   │   ├── globals.css
│   │   │   ├── not-found.js
│   │   │   ├── (site)/               # PUBLIC WEBSITE (shared Header/Footer)
│   │   │   │   ├── page.js           #   /            Home
│   │   │   │   ├── about/            #   /about
│   │   │   │   ├── services/         #   /services
│   │   │   │   ├── contact/          #   /contact
│   │   │   │   ├── blog/             #   /blog and /blog/[slug]
│   │   │   │   └── [slug]/           #   any page created in the admin panel
│   │   │   └── admin/                # ADMIN PANEL
│   │   │       ├── login/            #   /admin/login (no sidebar)
│   │   │       └── (dashboard)/      #   pages with sidebar + top bar
│   │   │           ├── page.js       #   /admin           Dashboard
│   │   │           ├── pages/        #   /admin/pages
│   │   │           ├── posts/        #   /admin/posts, /new, /[id]/edit
│   │   │           ├── categories/
│   │   │           ├── media/
│   │   │           ├── users/
│   │   │           └── settings/
│   │   ├── components/
│   │   │   ├── ui/                   # Buttons, inputs, modals (reusable)
│   │   │   ├── layout/               # Header, Footer
│   │   │   ├── site/                 # Website sections (hero, cards, ...)
│   │   │   └── admin/                # Sidebar, Topbar, tables, editors
│   │   ├── lib/api.js                # fetch wrapper for the backend
│   │   ├── services/                 # API calls per feature (posts, pages, auth)
│   │   ├── hooks/                    # Custom React hooks
│   │   ├── context/                  # React context (e.g. logged-in user)
│   │   ├── content/siteContent.js    # ALL website text (services, stats, offices...)
│   │   ├── constants/                # Admin menu, static config
│   │   ├── utils/                    # Small helpers
│   │   ├── styles/                   # Extra CSS / modules
│   │   └── proxy.js                  # Redirects /admin/* to login when not signed in
│   ├── next.config.mjs
│   ├── jsconfig.json                 # "@/..." import alias -> src/
│   └── .env.local.example
│
└── backend/                          # Express API (port 5000)
    ├── server.js                     # Starts the server
    ├── src/
    │   ├── app.js                    # Express setup (cors, helmet, routes)
    │   ├── config/                   # env.js, db.js (MySQL pool)
    │   ├── routes/                   # URL -> controller   (/api/posts, ...)
    │   ├── controllers/              # Read request, send response
    │   ├── services/                 # Business logic
    │   ├── models/                   # SQL queries per table
    │   ├── middlewares/              # auth (JWT), file upload, errors
    │   ├── validators/               # Request body validation
    │   └── utils/                    # ApiError, slugify
    ├── database/
    │   ├── schema.sql                # All tables
    │   ├── migrations/               # Schema changes for existing databases
    │   └── seeders/createAdmin.js    # Creates the first admin user
    ├── uploads/                      # Uploaded media (like wp-content/uploads)
    ├── logs/
    ├── tests/
    └── .env.example
```

Request flow in the backend: **route → middleware → controller → service → model → MySQL**.

## API endpoints

| Area       | Endpoint                                         | Access                    |
|------------|--------------------------------------------------|---------------------------|
| Auth       | `POST /api/auth/login`, `POST /api/auth/logout`, `GET /api/auth/me`, `PUT /api/auth/me` (own name/email), `PUT /api/auth/password` (own password, needs current) | public / signed in |
| Posts      | Public: `GET /api/posts` (published, `?page=&limit=`), `GET /api/posts/slug/:slug`. Admin: `GET /api/posts/admin` (`?status=&search=&page=`), `GET /api/posts/admin/:id`, `POST`, `PUT /:id`, `DELETE /:id` (only from Trash) | read public; write admin/editor, authors their own |
| Pages      | `GET /api/pages`, `/slug/:slug`, `/:id`, `POST`, `PUT /:id`, `DELETE /:id` (basic, not used by the site yet) | read public, write admin/editor |
| Categories | `GET /api/categories` (with published post counts), `GET /api/categories/slug/:slug`, `POST`, `PUT /:id`, `DELETE /:id` | read public, write admin/editor |
| Media      | `GET /api/media`, `POST /api/media` (form field `file`) | admin/editor        |
| Users      | `GET /api/users` (`?role=`, `?search=`), `GET /api/users/:id`, `POST`, `PUT /:id` (incl. optional new password), `DELETE /:id` (`?reassign=` gives their posts to another user) | admin |
| Settings   | `GET /api/settings`, `PUT /api/settings`         | read public, write admin  |
| Contact    | Public: `POST /api/contact` (website form, 5/hour). Admin: `GET /api/contact` (`?folder=` inbox / unread / archived, `&search=`, `&page=`), `GET /api/contact/counts`, `GET /api/contact/:id`, `PATCH /api/contact/:id` (status), `DELETE /api/contact/:id` | send public; read admin/editor |

## Getting started

**1. Database**

```bash
mysql -u root -p < backend/database/schema.sql
```

**2. Backend**

```bash
cd backend
cp .env.example .env        # then fill in DB password and JWT_SECRET
npm install
npm run seed:admin -- you@example.com "StrongPassword" "Your Name"
npm run dev                 # http://localhost:5000/api/health
```

**3. Frontend**

```bash
cd frontend
cp .env.local.example .env.local
npm install
npm run dev                 # http://localhost:3000  and  /admin
```

## Email alerts for the contact form

Every new contact form message is emailed to `CONTACT_NOTIFY_TO` (default **info@pelicanstechnologies.com**).
The email shows the visitor's details and message, has an **Open in admin panel** button, and pressing
**Reply** answers the visitor directly. Messages are always saved first, so a mail problem never loses an enquiry.

1. Get the SMTP details from your email provider (host, port, username, password).
   For Google Workspace or Microsoft 365, create an *app password* instead of using your normal password.
2. Fill in the `SMTP_*`, `MAIL_FROM` and `CONTACT_NOTIFY_TO` lines in `backend/.env` (see `.env.example`).
3. Test it:

   ```bash
   cd backend
   npm run test:email
   ```

4. Restart the backend. On start it prints `Contact form email alerts: ON`.

## Importing posts from WordPress

Copies published posts and categories from the live WordPress site (using its public REST API).
Posts keep their WordPress slug, and old links like `/my-post/` redirect to `/blog/my-post` automatically.

```bash
cd backend
npm run import:wordpress                                   # dry run: shows what would happen
npm run import:wordpress -- --apply --author=you@example.com
```

Options: `--update` re-imports posts that already exist, `--download-images` copies images to `backend/uploads`
(otherwise they keep loading from the WordPress site), `--include=blog-detail-template` imports the skipped placeholder post.
Running it twice never creates duplicates.
