import db from "../config/database.js";

class ContactRepository {
  async GetAllByUuid(userUuid, search, limit, offset) {
    let query = "SELECT * FROM contacts WHERE user_uuid = ?";
    const params = [userUuid];
    // 🔍 Search (optional)
    if (search) {
      query += ` AND full_name LIKE ?`;
      params.push(`%${search}%`);
    }
    // 📄 Pagination
    query += ` ORDER BY created_at DESC LIMIT ? OFFSET ?`;
    params.push(parseInt(limit), parseInt(offset));
    const [rows] = await db.query(query, params);
    // 🔢 Total count (untuk pagination info)
    let countQuery = `
        SELECT COUNT(*) as total
        FROM contacts
        WHERE user_uuid = ?
      `;
    const countParams = [userUuid];
    if (search) {
      countQuery += ` AND full_name LIKE ?`;
      countParams.push(`%${search}%`);
    }
    const [[countResult]] = await db.query(countQuery, countParams);
    return {
      data: rows,
      total: countResult.total,
    };
  }

  async GetOne(userUuid, contactUuid) {
    const query = "SELECT * FROM contacts WHERE user_uuid = ? AND contact_uuid = ?";
    const params = [userUuid, contactUuid];
    const [rows] = await db.query(query, params);
    return rows[0];
  }

  async Create(data) {
    const query = "INSERT INTO contacts SET ?";
    const params = [data];
    const result = await db.query(query, params);
    return { id: result[0].insertId, ...data };
  }

  async Delete(userUuid, contactUuid) {
    const query = "DELETE FROM contacts WHERE user_uuid = ? AND contact_uuid = ?";
    const params = [userUuid, contactUuid];
    const result = await db.query(query, params);
    return result[0].affectedRows > 0;
  }
}

export default new ContactRepository();
