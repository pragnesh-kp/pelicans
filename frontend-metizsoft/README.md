# Pelicans website — metizsoft-style design

A third design of the public website, laid out like metizsoft.com, using the same
content as `../frontend` (`src/content/*` was copied from there). See `DESIGN.md`.

- Public pages only — the admin panel stays in `../frontend` (`/admin`).
- Same backend (`../backend`, port 5000) for the blog and the contact form.
  The backend allows this site through `EXTRA_FRONTEND_URLS=…,http://localhost:3002` in `backend/.env`.

```bash
npm install
npm run dev      # http://localhost:3002
```

Content is a copy: if you edit `../frontend/src/content`, copy the change here too.
(`src/content/menu.js` here has one extra menu item, "AI & Innovation".)
