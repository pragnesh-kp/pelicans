import { pool } from "../config/db.js";

export const Media = {
  async findAll() {
    const [rows] = await pool.query("SELECT * FROM media ORDER BY id DESC");
    return rows;
  },
  async create({ filename, original_name, mime_type, size, url, uploaded_by }) {
    const [result] = await pool.query(
      "INSERT INTO media (filename, original_name, mime_type, size, url, uploaded_by) VALUES (?, ?, ?, ?, ?, ?)",
      [filename, original_name, mime_type, size, url, uploaded_by]
    );
    const [rows] = await pool.query("SELECT * FROM media WHERE id = ?", [result.insertId]);
    return rows[0];
  },
};
