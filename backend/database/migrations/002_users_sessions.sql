-- Session control + last login for the Users screen
-- token_version: raising it logs the user out everywhere (password change, role change, delete)
-- Run: mysql -u root pelicans_db < database/migrations/002_users_sessions.sql
ALTER TABLE users
  ADD COLUMN IF NOT EXISTS token_version INT UNSIGNED NOT NULL DEFAULT 0 AFTER role,
  ADD COLUMN IF NOT EXISTS last_login_at DATETIME NULL AFTER token_version;
