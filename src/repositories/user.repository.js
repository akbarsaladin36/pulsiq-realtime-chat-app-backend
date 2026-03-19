import db from "../config/database.js";

class UserRepository {
  async GetAll() {
    const query = "SELECT * FROM users";
    const [rows] = await db.query(query);
    return rows;
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
