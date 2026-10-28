# Pelicans website — multiqos-style design

An alternative design of the public website, laid out like multiqos.com, using the
same content as `../frontend` (`src/content/*` was copied from there). See `DESIGN.md`.

- Public pages only — the admin panel stays in `../frontend` (`/admin`).
- Same backend (`../backend`, port 5000) for the blog and the contact form.
  The backend allows this site through `EXTRA_FRONTEND_URLS=http://localhost:3001` in `backend/.env`.

```bash
npm install
npm run dev      # http://localhost:3001
```

Content is a copy: if you edit `../frontend/src/content`, copy the change here too.
