import { pool } from "../config/db.js";

// post_count = published posts in the category (what visitors can see)
const SELECT_WITH_COUNT = `
  SELECT c.id, c.name, c.slug, c.description, c.parent_id, c.created_at,
         COUNT(p.id) AS post_count
    FROM categories c
    LEFT JOIN post_categories pc ON pc.category_id = c.id
    LEFT JOIN posts p ON p.id = pc.post_id AND p.status = 'published'`;

export const Category = {
  async findAll() {
    const [rows] = await pool.query(`${SELECT_WITH_COUNT} GROUP BY c.id ORDER BY c.name`);
    return rows;
  },

  async findById(id) {
    const [rows] = await pool.query(`${SELECT_WITH_COUNT} WHERE c.id = ? GROUP BY c.id`, [id]);
    return rows[0];
  },

  async findBySlug(slug) {
    const [rows] = await pool.query(`${SELECT_WITH_COUNT} WHERE c.slug = ? GROUP BY c.id`, [slug]);
    return rows[0];
  },

  async slugTaken(slug, excludeId = 0) {
    const [rows] = await pool.query("SELECT id FROM categories WHERE slug = ? AND id <> ? LIMIT 1", [slug, excludeId]);
    return rows.length > 0;
  },

  // Same name under the same parent (case-insensitive)
  async nameTaken(name, parentId, excludeId = 0) {
    const [rows] = await pool.query(
      "SELECT id FROM categories WHERE LOWER(name) = LOWER(?) AND parent_id <=> ? AND id <> ? LIMIT 1",
      [name, parentId, excludeId]
    );
    return rows.length > 0;
  },

  async parentOf(id) {
    const [rows] = await pool.query("SELECT parent_id FROM categories WHERE id = ?", [id]);
    return rows[0] ? rows[0].parent_id : undefined; // undefined = category doesn't exist
  },

  async create(data) {
    const [result] = await pool.query("INSERT INTO categories SET ?", [data]);
    return this.findById(result.insertId);
  },

  async update(id, data) {
    await pool.query("UPDATE categories SET ? WHERE id = ?", [data, id]);
    return this.findById(id);
  },

  // Posts lose this category (database rule). Sub-categories move up one level
  // into the deleted category's parent, like WordPress.
  async remove(id) {
    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();
      const [rows] = await conn.query("SELECT parent_id FROM categories WHERE id = ? FOR UPDATE", [id]);
      if (!rows.length) {
        await conn.rollback();
        return false;
      }
      await conn.query("UPDATE categories SET parent_id = ? WHERE parent_id = ?", [rows[0].parent_id, id]);
      await conn.query("DELETE FROM categories WHERE id = ?", [id]);
      await conn.commit();
      return true;
    } catch (err) {
      await conn.rollback();
      throw err;
    } finally {
      conn.release();
    }
  },
};
