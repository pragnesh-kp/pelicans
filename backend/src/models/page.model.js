import { pool } from "../config/db.js";

const TABLE = "pages";
// Only these columns can be written from the API
const FIELDS = ["title", "slug", "content", "template", "status", "author_id"];

const pick = (data) =>
  Object.fromEntries(Object.entries(data).filter(([key]) => FIELDS.includes(key)));

export const Page = {
  async findAll() {
    const [rows] = await pool.query(`SELECT * FROM ${TABLE} ORDER BY id DESC`);
    return rows;
  },
  async findById(id) {
    const [rows] = await pool.query(`SELECT * FROM ${TABLE} WHERE id = ?`, [id]);
    return rows[0];
  },
  async findBySlug(slug) {
    const [rows] = await pool.query(`SELECT * FROM ${TABLE} WHERE slug = ?`, [slug]);
    return rows[0];
  },
  async create(data) {
    const [result] = await pool.query(`INSERT INTO ${TABLE} SET ?`, [pick(data)]);
    return this.findById(result.insertId);
  },
  async update(id, data) {
    await pool.query(`UPDATE ${TABLE} SET ? WHERE id = ?`, [pick(data), id]);
    return this.findById(id);
  },
  async remove(id) {
    const [result] = await pool.query(`DELETE FROM ${TABLE} WHERE id = ?`, [id]);
    return result.affectedRows > 0;
  },
};
