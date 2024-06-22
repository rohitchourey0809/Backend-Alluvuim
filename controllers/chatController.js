const asyncHandler = require("express-async-handler");
const Message = require("../models/Message");
const User = require("../models/User");

// @desc    Send a message
// @route   POST /api/chat/message
// @access  Private
const sendMessage = asyncHandler(async (req, res) => {
  const { text, room } = req.body;

  const message = await Message.create({
    user: req.user._id,
    text,
    room,
  });

  res.status(201).json(message);
});

// @desc    Get messages for a room
// @route   GET /api/chat/messages/:room
// @access  Private
const getMessages = asyncHandler(async (req, res) => {
  const messages = await Message.find({ room: req.params.room }).populate(
    "user",
    "username"
  );
console.log("get message", messages);
  res.json(messages);
});

module.exports = { sendMessage, getMessages };
