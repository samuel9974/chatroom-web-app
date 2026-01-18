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
    const sql = "INSERT INTO messages (content, user_id, created_at) VALUES (?, ?, NOW())";
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
