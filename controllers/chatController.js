const db = require("../db");

exports.showChatroom = async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.redirect("/login");
    }
    const [users] = await db.query("SELECT * FROM users WHERE id = ?", [
      req.session.userId,
    ]);
    const user = users[0];
    if (!user) {
      return res.redirect("/login");
    }
    res.render("chatroom", { user });
  } catch (error) {
    res.status(500).render("error", { error: error.message });
  }
};

exports.createMessage = async (req, res) => {
  try {
    const { content } = req.body;
    const sql =
      "INSERT INTO messages (content, user_id, created_at) VALUES (?, ?, NOW())";
    await db.query(sql, [content, req.session.userId]);
    res.status(201).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const sql = `	
	  SELECT m.id, m.content, m.created_at AS timestamp, u.firstName, u.id AS userId
	  FROM messages m
	  JOIN users u ON m.user_id = u.id		
	  ORDER BY m.created_at ASC
	`;
    const [messages] = await db.query(sql);
    const formattedMessages = messages.map((msg) => ({
      id: msg.id,
      content: msg.content,
      timestamp: msg.timestamp,
      User: {
        firstName: msg.firstName,
      },
      isOwner: msg.userId === req.session.userId,
    }));
    res.json(formattedMessages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteMessage = async (req, res) => {
  try {
    const messageId = req.params.id;
    const sql = "DELETE FROM messages WHERE id = ? AND user_id = ?";
    const [result] = await db.query(sql, [messageId, req.session.userId]);
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ error: "Message not found or unauthorized" });
    }
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.editMessage = async (req, res) => {
  try {
    const messageId = req.params.id;
    const { content } = req.body;
    const sql = "UPDATE messages SET content = ? WHERE id = ? AND user_id = ?";
    const [result] = await db.query(sql, [
      content,
      messageId,
      req.session.userId,
    ]);
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ error: "Message not found or unauthorized" });
    }
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.searchMessages = async (req, res) => {
  try {
    const query = req.query.query;
    if (!query) {
      return res.status(400).json({ error: "Search query is required" });
    }
    const sql = `
      SELECT m.id, m.content, m.created_at AS timestamp, u.firstName, u.id AS userId
      FROM messages m
      JOIN users u ON m.user_id = u.id
      WHERE m.content LIKE ?
      ORDER BY m.created_at ASC
    `;
    const [messages] = await db.query(sql, [`%${query}%`]);
    const formattedMessages = messages.map((msg) => ({
      id: msg.id,
      content: msg.content,
      timestamp: msg.timestamp,
      User: {
        firstName: msg.firstName,
      },
      isOwner: msg.userId === req.session.userId,
    }));
    res.json(formattedMessages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
