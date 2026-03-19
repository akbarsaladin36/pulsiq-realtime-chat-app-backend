import db from "../config/database.js";

class MessageRepository {
  async GetAllById(userUuid) {
    const query =
      "SELECT u.id, u.uuid, u.username, m.last_message_time, msg.message  FROM (" +
      "SELECT CASE WHEN sender_uuid = ? THEN receiver_uuid ELSE sender_uuid END AS other_user_uuid," +
      "MAX(created_at) AS last_message_time FROM messages WHERE sender_uuid = ? OR receiver_uuid = ?" +
      " GROUP BY other_user_uuid) m JOIN users u ON u.uuid = m.other_user_uuid" +
      " JOIN messages msg ON msg.created_at = m.last_message_time ORDER BY m.last_message_time DESC";
    const params = [userUuid, userUuid, userUuid];
    const [rows] = await db.query(query, params);
    return rows;
  }

  async GetOne(userUuid, otherUserUuid) {
    const query =
      "SELECT * FROM messages WHERE (sender_uuid = ? AND receiver_uuid = ?) OR (sender_uuid = ? AND receiver_uuid = ?)";
    const params = [userUuid, otherUserUuid, otherUserUuid, userUuid];
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
