import { pool } from "../config/db.js";

export const ROLES = ["admin", "editor", "author", "subscriber"];

// Never select the password hash or token_version into normal responses
const PUBLIC_COLUMNS = `u.id, u.name, u.email, u.role, u.last_login_at, u.created_at,
  (SELECT COUNT(*) FROM posts p WHERE p.author_id = u.id AND p.status <> 'trash') AS post_count`;

export const User = {
  async list({ role = "", search = "" } = {}) {
    const where = [];
    const params = [];
    if (ROLES.includes(role)) {
      where.push("u.role = ?");
      params.push(role);
    }
    if (search) {
      const like = `%${search.replace(/[\\%_]/g, "\\$&")}%`;
      where.push("(u.name LIKE ? OR u.email LIKE ?)");
      params.push(like, like);
    }
    const [rows] = await pool.query(
      `SELECT ${PUBLIC_COLUMNS} FROM users u ${where.length ? `WHERE ${where.join(" AND ")}` : ""} ORDER BY u.name`,
      params
    );
    return rows;
  },

  async countsByRole() {
    const [rows] = await pool.query("SELECT role, COUNT(*) AS n FROM users GROUP BY role");
    const counts = { all: 0, admin: 0, editor: 0, author: 0, subscriber: 0 };
    for (const { role, n } of rows) {
      counts[role] = n;
      counts.all += n;
    }
    return counts;
  },

  async findById(id) {
    const [rows] = await pool.query(`SELECT ${PUBLIC_COLUMNS} FROM users u WHERE u.id = ?`, [id]);
    return rows[0];
  },

  // Used on every logged-in request to confirm the session is still valid
  async findAuthState(id) {
    const [rows] = await pool.query("SELECT id, name, email, role, token_version FROM users WHERE id = ?", [id]);
    return rows[0];
  },

  // Includes the password hash, only for login checks
  async findByEmailWithPassword(email) {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    return rows[0];
  },

  async findPasswordHash(id) {
    const [rows] = await pool.query("SELECT password FROM users WHERE id = ?", [id]);
    return rows[0]?.password;
  },

  async emailTaken(email, excludeId = 0) {
    const [rows] = await pool.query("SELECT id FROM users WHERE email = ? AND id <> ? LIMIT 1", [email, excludeId]);
    return rows.length > 0;
  },

  async countAdmins() {
    const [[{ n }]] = await pool.query("SELECT COUNT(*) AS n FROM users WHERE role = 'admin'");
    return n;
  },

  async create({ name, email, password, role = "subscriber" }) {
    const [result] = await pool.query(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
      [name, email, password, role]
    );
    return this.findById(result.insertId);
  },

  // fields: any of { name, email, role }
  async update(id, fields) {
    const allowed = Object.fromEntries(Object.entries(fields).filter(([k]) => ["name", "email", "role"].includes(k)));
    if (Object.keys(allowed).length) await pool.query("UPDATE users SET ? WHERE id = ?", [allowed, id]);
    return this.findById(id);
  },

  // New password hash + log the user out everywhere
  async setPassword(id, hash) {
    await pool.query("UPDATE users SET password = ?, token_version = token_version + 1 WHERE id = ?", [hash, id]);
  },

  async touchLogin(id) {
    await pool.query("UPDATE users SET last_login_at = NOW() WHERE id = ?", [id]);
  },

  // Deletes a user. Their posts go to `reassignTo`, or are kept without an author.
  async remove(id, reassignTo = null) {
    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();
      if (reassignTo) await conn.query("UPDATE posts SET author_id = ? WHERE author_id = ?", [reassignTo, id]);
      const [result] = await conn.query("DELETE FROM users WHERE id = ?", [id]);
      await conn.commit();
      return result.affectedRows > 0;
    } catch (err) {
      await conn.rollback();
      throw err;
    } finally {
      conn.release();
    }
  },
};
