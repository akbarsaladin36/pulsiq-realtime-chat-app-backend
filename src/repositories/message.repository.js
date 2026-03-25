import db from "../config/database.js";

class MessageRepository {
  async GetAllById(userUuid) {
    const query =
      "SELECT u.id, u.uuid, u.username, u.first_name, u.last_name, msg.id, msg.message, msg.created_at AS last_message_time FROM (" +
      "SELECT CASE WHEN sender_uuid = ? THEN receiver_uuid ELSE sender_uuid END AS other_user_uuid," +
      "MAX(id) AS last_message_id FROM messages WHERE sender_uuid = ? OR receiver_uuid = ?" +
      " GROUP BY other_user_uuid) m JOIN messages msg ON msg.id = m.last_message_id" +
      " JOIN users u ON u.uuid = m.other_user_uuid ORDER BY msg.created_at DESC";
    const params = [userUuid, userUuid, userUuid];
    // console.log(db.format(query, params));
    const [rows] = await db.query(query, params);
    return rows;
  }

  async GetOne(userUuid, otherUserUuid, lastId = null, limit = 20) {
    let query =
      "SELECT id, sender_uuid, receiver_uuid, message, created_at," +
      " CASE WHEN sender_uuid = ? THEN 'me' ELSE 'other' END AS position FROM messages" +
      " WHERE ((sender_uuid = ? AND receiver_uuid = ?) OR (sender_uuid = ? AND receiver_uuid = ?))";
    const params = [userUuid, userUuid, otherUserUuid, otherUserUuid, userUuid];
    if (lastId) {
      query += ` AND id < ?`;
      params.push(lastId);
    }
    query += ` ORDER BY id ASC LIMIT ?`;
    params.push(limit);
    // console.log(db.format(query, params));
    const [rows] = await db.query(query, params);
    return rows;
  }

  async Create(data) {
    const query = "INSERT INTO messages SET ?";
    const params = [data];
    const result = await db.query(query, params);
    return { id: result[0].insertId, ...data };
  }
}

export default new MessageRepository();
