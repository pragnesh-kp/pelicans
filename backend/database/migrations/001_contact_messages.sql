-- Messages sent from the website contact form
-- Run: mysql -u root pelicans_db < database/migrations/001_contact_messages.sql
CREATE TABLE IF NOT EXISTS contact_messages (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL,
  phone VARCHAR(30),
  service VARCHAR(100),
  message TEXT,
  status ENUM('new', 'read', 'archived') NOT NULL DEFAULT 'new',
  ip_address VARCHAR(45),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_status_created (status, created_at)
);
