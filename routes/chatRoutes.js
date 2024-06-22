const express = require("express");
const { sendMessage, getMessages } = require("../controllers/chatController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/message", protect, async (req, res) => {
  try {
    const { text, room } = req.body;
    const username = req.user.username; // Assuming you have the user's username in the request

    // Save message to database
    // Example: Saving message to DB using sendMessage controller function
    const message = await sendMessage({ text, room, username });

    // Emit message to WebSocket clients
    const messageData = {
      user: { username },
      text,
      room,
    };
    req.app.io.to(room).emit("message", messageData);

    res.status(201).json(message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/messages/:room", protect, getMessages);

module.exports = router;
