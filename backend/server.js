import app from "./src/app.js";
import { config } from "./src/config/env.js";
import { testConnection } from "./src/config/db.js";
import { isMailConfigured } from "./src/services/mail.service.js";

await testConnection();

app.listen(config.port, () => {
  console.log(`API running on http://localhost:${config.port}`);
  console.log(
    isMailConfigured()
      ? `Contact form email alerts: ON → ${config.mail.contactNotifyTo} (via ${config.mail.host})`
      : "Contact form email alerts: OFF — add SMTP settings to backend/.env to turn them on"
  );
});
