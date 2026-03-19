import db from "../config/database.js";

class AuthRepository {
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
}

export default new AuthRepository();
