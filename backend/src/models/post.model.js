import { pool } from "../config/db.js";

const LIST_COLUMNS = `
  p.id, p.title, p.slug, p.excerpt, p.featured_image, p.status, p.author_id,
  p.published_at, p.created_at, p.updated_at, u.name AS author_name`;

// Adds a `categories: [{ id, name, slug }]` list to each post
async function attachCategories(posts) {
  if (!posts.length) return posts;
  const [rows] = await pool.query(
    `SELECT pc.post_id, c.id, c.name, c.slug
       FROM post_categories pc JOIN categories c ON c.id = pc.category_id
      WHERE pc.post_id IN (?) ORDER BY c.name`,
    [posts.map((p) => p.id)]
  );
  for (const post of posts) {
    post.categories = rows.filter((r) => r.post_id === post.id).map(({ id, name, slug }) => ({ id, name, slug }));
  }
  return posts;
}

async function setCategories(conn, postId, categoryIds) {
  await conn.query("DELETE FROM post_categories WHERE post_id = ?", [postId]);
  if (categoryIds.length) {
    // Ignores ids that don't exist instead of failing the whole save
    await conn.query(
      `INSERT INTO post_categories (post_id, category_id)
       SELECT ?, id FROM categories WHERE id IN (?)`,
      [postId, categoryIds]
    );
  }
}

// Runs fn(conn) inside a transaction
async function withTransaction(fn) {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    const result = await fn(conn);
    await conn.commit();
    return result;
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
}

export const Post = {
  // ---------- Public website ----------
  async listPublished({ page = 1, limit = 10 } = {}) {
    const offset = (page - 1) * limit;
    const [rows] = await pool.query(
      `SELECT ${LIST_COLUMNS} FROM posts p LEFT JOIN users u ON u.id = p.author_id
        WHERE p.status = 'published'
        ORDER BY p.published_at DESC, p.id DESC LIMIT ? OFFSET ?`,
      [limit, offset]
    );
    const [[{ total }]] = await pool.query("SELECT COUNT(*) AS total FROM posts WHERE status = 'published'");
    return { posts: await attachCategories(rows), total };
  },

  async findPublishedBySlug(slug) {
    const [rows] = await pool.query(
      `SELECT ${LIST_COLUMNS}, p.content FROM posts p LEFT JOIN users u ON u.id = p.author_id
        WHERE p.slug = ? AND p.status = 'published'`,
      [slug]
    );
    return (await attachCategories(rows))[0];
  },

  // ---------- Admin ----------
  // status: "all" (everything except trash) | draft | published | trash
  async listAdmin({ status = "all", search = "", page = 1, limit = 20 } = {}) {
    const where = [];
    const params = [];
    if (status === "all") where.push("p.status <> 'trash'");
    else {
      where.push("p.status = ?");
      params.push(status);
    }
    if (search) {
      where.push("p.title LIKE ?");
      params.push(`%${search.replace(/[\\%_]/g, "\\$&")}%`);
    }
    const whereSql = `WHERE ${where.join(" AND ")}`;

    const [rows] = await pool.query(
      `SELECT ${LIST_COLUMNS} FROM posts p LEFT JOIN users u ON u.id = p.author_id
        ${whereSql} ORDER BY p.updated_at DESC, p.id DESC LIMIT ? OFFSET ?`,
      [...params, limit, (page - 1) * limit]
    );
    const [[{ total }]] = await pool.query(`SELECT COUNT(*) AS total FROM posts p ${whereSql}`, params);
    return { posts: await attachCategories(rows), total };
  },

  async countByStatus() {
    const [rows] = await pool.query("SELECT status, COUNT(*) AS n FROM posts GROUP BY status");
    const counts = { all: 0, published: 0, draft: 0, trash: 0 };
    for (const { status, n } of rows) {
      counts[status] = n;
      if (status !== "trash") counts.all += n;
    }
    return counts;
  },

  async findById(id) {
    const [rows] = await pool.query(
      `SELECT ${LIST_COLUMNS}, p.content FROM posts p LEFT JOIN users u ON u.id = p.author_id WHERE p.id = ?`,
      [id]
    );
    return (await attachCategories(rows))[0];
  },

  async slugTaken(slug, excludeId = 0) {
    const [rows] = await pool.query("SELECT id FROM posts WHERE slug = ? AND id <> ? LIMIT 1", [slug, excludeId]);
    return rows.length > 0;
  },

  async create(data, categoryIds = []) {
    const id = await withTransaction(async (conn) => {
      const [result] = await conn.query("INSERT INTO posts SET ?", [data]);
      await setCategories(conn, result.insertId, categoryIds);
      return result.insertId;
    });
    return this.findById(id);
  },

  async update(id, data, categoryIds) {
    await withTransaction(async (conn) => {
      if (Object.keys(data).length) await conn.query("UPDATE posts SET ? WHERE id = ?", [data, id]);
      if (categoryIds) await setCategories(conn, id, categoryIds);
    });
    return this.findById(id);
  },

  async remove(id) {
    const [result] = await pool.query("DELETE FROM posts WHERE id = ?", [id]);
    return result.affectedRows > 0;
  },
};
