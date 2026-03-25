import db from "../config/database.js";

class UserRepository {
  async GetAll() {
    const query = "SELECT * FROM users";
    const [rows] = await db.query(query);
    return rows;
  }

  async GetAllPaginate(search, limit, offset, currentUserUuid) {
    let query = `
      SELECT uuid, username, first_name, last_name
      FROM users
      WHERE uuid != ?
    `;
    const params = [currentUserUuid];
    if (search) {
      query += ` AND (username LIKE ? OR first_name LIKE ? OR last_name LIKE ?)`;
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    query += ` ORDER BY created_at DESC LIMIT ? OFFSET ?`;
    params.push(parseInt(limit), parseInt(offset));
    const [rows] = await db.query(query, params);
    let countQuery = `
      SELECT COUNT(*) as total
      FROM users
      WHERE uuid != ?
    `;
    const countParams = [currentUserUuid];
    if (search) {
      countQuery += ` AND (username LIKE ? OR first_name LIKE ? OR last_name LIKE ?)`;
      countParams.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }
    const [[countResult]] = await db.query(countQuery, countParams);
    return {
      data: rows,
      total: countResult.total,
    };
  }

  async GetOne(username) {
    const query = "SELECT * FROM users WHERE username = ?";
    const params = [username];
    const [rows] = await db.query(query, params);
    return rows[0];
  }

  async Create(data) {
    const query = "INSERT INTO users SET ?";
    const params = [data];
    const result = await db.query(query, params);
    return { id: result[0].insertId, ...data };
  }

  async Update(username, data) {
    const query = "UPDATE users SET ? WHERE username = ?";
    const params = [data, username];
    await db.query(query, params);
    return this.GetOne(username);
  }

  async Delete(username) {
    const query = "DELETE FROM users WHERE username = ?";
    const params = [username];
    const result = await db.query(query, params);
    return result[0].affectedRows > 0;
  }
}

export default new UserRepository();
