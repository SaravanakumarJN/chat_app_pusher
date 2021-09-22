const Pusher = require("pusher");
const dotenv = require("dotenv");
dotenv.config();

const { APP_ID, KEY, SECRET, CLUSTER } = process.env;
const pusherConfig = () => {
  return new Pusher({
    appId: APP_ID,
    key: KEY,
    secret: SECRET,
    cluster: CLUSTER,
    useTLS: true,
  });
};

module.exports = { pusherConfig };
