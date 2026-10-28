const bool = (value, fallback) => (value === undefined || value === "" ? fallback : ["true", "1", "yes"].includes(value.toLowerCase()));

const smtpPort = Number(process.env.SMTP_PORT) || 587;

export const config = {
  port: Number(process.env.PORT) || 5000,
  env: process.env.NODE_ENV || "development",
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:3000",
  // More website addresses allowed to call the API (comma-separated), e.g. the alternative design on :3001
  extraOrigins: (process.env.EXTRA_FRONTEND_URLS || "").split(",").map((s) => s.trim()).filter(Boolean),
  db: {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "pelicans_db",
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  },
  // Outgoing email (contact form alerts). Leave SMTP_HOST empty to turn email off.
  mail: {
    host: process.env.SMTP_HOST || "",
    port: smtpPort,
    // true = SSL from the start (usually port 465); false = STARTTLS (usually port 587)
    secure: bool(process.env.SMTP_SECURE, smtpPort === 465),
    user: process.env.SMTP_USER || "",
    pass: process.env.SMTP_PASS || "",
    from: process.env.MAIL_FROM || process.env.SMTP_USER || "",
    contactNotifyTo: process.env.CONTACT_NOTIFY_TO || "info@pelicanstechnologies.com",
  },
};
