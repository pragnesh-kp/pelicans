// Creates an administrator account.
// Usage: npm run seed:admin -- admin@example.com "StrongPassword" "Admin Name"
import { createUser } from "../../src/services/auth.service.js";
import { pool } from "../../src/config/db.js";

const [email, password, name = "Admin"] = process.argv.slice(2);
if (!email || !password) {
  console.error('Usage: npm run seed:admin -- <email> <password> ["Name"]');
  process.exit(1);
}

try {
  const user = await createUser({ name, email, password, role: "admin" });
  console.log("Admin created:", user.email);
} catch (err) {
  const details = err.errors ? Object.values(err.errors).join(" ") : err.message;
  console.error("Could not create the admin:", details);
  process.exitCode = 1;
} finally {
  await pool.end();
}
