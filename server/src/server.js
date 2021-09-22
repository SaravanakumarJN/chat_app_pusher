const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const { pusherConfig } = require("./config/pusher.config");

const app = express();
app.use(express.json());
app.use(cors());

// initialise pusher
const pusher = pusherConfig();

// route for getting notification on new member joined to channel
app.post("/join", (req, res) => {
  const { channel_name, username } = req.body;
  try {
    const payload = {
      username: "ChatHouse",
      message: `${username} joined this channel`,
    };

    // pushing the message to members subscribed to event "join" in the respective channel
    pusher.trigger(channel_name, "join", payload);
    return res.send(payload);
  } catch (err) {
    console.log(err.message);
  }
});

// route for getting notification on new message in channel
app.post("/message", (req, res) => {
  const { channel_name, ...payload } = req.body;
  try {
    // pushing the message to members subscribed to event "message" in the respective channel
    pusher.trigger(channel_name, "message", payload);
    return res.send(payload);
  } catch (err) {
    console.log(err.message);
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
