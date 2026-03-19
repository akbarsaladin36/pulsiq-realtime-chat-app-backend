import db from "../config/database.js";

class ProfileRepository {
  async GetOne(username) {
    const query =
      "SELECT first_name,last_name,address,phone_number FROM users WHERE username = ?";
    const params = [username];
    const [rows] = await db.query(query, params);
    return rows[0];
  }

  async Update(username, data) {
    const query = "UPDATE users SET ? WHERE username = ?";
    const params = [data, username];
    const result = await db.query(query, params);
    return result[0].affectedRows > 0;
  }
}

export default new ProfileRepository();
