import { pool } from "../config/db.js";

// Which statuses each inbox folder shows
const FOLDERS = {
  inbox: ["new", "read"],
  unread: ["new"],
  archived: ["archived"],
};

const LIST_COLUMNS = "id, name, email, phone, service, LEFT(message, 200) AS snippet, status, created_at";

export const ContactMessage = {
  async create({ name, email, phone, service, message, ip_address }) {
    const [result] = await pool.query(
      "INSERT INTO contact_messages (name, email, phone, service, message, ip_address) VALUES (?, ?, ?, ?, ?, ?)",
      [name, email, phone, service, message, ip_address]
    );
    return result.insertId;
  },

  async list({ folder = "inbox", search = "", page = 1, limit = 20 } = {}) {
    const where = ["status IN (?)"];
    const params = [FOLDERS[folder] || FOLDERS.inbox];
    if (search) {
      const like = `%${search.replace(/[\\%_]/g, "\\$&")}%`;
      where.push("(name LIKE ? OR email LIKE ? OR message LIKE ? OR service LIKE ?)");
      params.push(like, like, like, like);
    }
    const whereSql = `WHERE ${where.join(" AND ")}`;

    const [rows] = await pool.query(
      `SELECT ${LIST_COLUMNS} FROM contact_messages ${whereSql} ORDER BY created_at DESC, id DESC LIMIT ? OFFSET ?`,
      [...params, limit, (page - 1) * limit]
    );
    const [[{ total }]] = await pool.query(`SELECT COUNT(*) AS total FROM contact_messages ${whereSql}`, params);
    return { messages: rows, total };
  },

  async counts() {
    const [rows] = await pool.query("SELECT status, COUNT(*) AS n FROM contact_messages GROUP BY status");
    const by = Object.fromEntries(rows.map((r) => [r.status, r.n]));
    return {
      inbox: (by.new || 0) + (by.read || 0),
      unread: by.new || 0,
      archived: by.archived || 0,
    };
  },

  async findById(id) {
    const [rows] = await pool.query("SELECT * FROM contact_messages WHERE id = ?", [id]);
    return rows[0];
  },

  async updateStatus(id, status) {
    const [result] = await pool.query("UPDATE contact_messages SET status = ? WHERE id = ?", [status, id]);
    return result.affectedRows > 0;
  },

  async remove(id) {
    const [result] = await pool.query("DELETE FROM contact_messages WHERE id = ?", [id]);
    return result.affectedRows > 0;
  },
};
