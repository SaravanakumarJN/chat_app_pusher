import React from "react";
import axios from "axios";
import Pusher from "pusher-js";
import { useParams } from "react-router";
import styles from "./ChatChannel.module.css";

const ChatChannel = () => {
  const [text, setText] = React.useState("");
  const [messages, setMessages] = React.useState([]);
  // getting channel name and username from the url params
  const { username, channelName } = useParams();
  const {
    REACT_APP_PUSHER_APP_KEY,
    REACT_APP_PUSHER_APP_CLUSTER,
    REACT_APP_API_BASE_URL,
  } = process.env;

  // On mount
  React.useEffect(() => {
    // initialising pusher config
    const pusher = new Pusher(REACT_APP_PUSHER_APP_KEY, {
      cluster: REACT_APP_PUSHER_APP_CLUSTER,
      encrypted: true,
    });

    // subscribing to respective channel
    const channel = pusher.subscribe(channelName);

    // listening to event "message"
    channel.bind("message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    // for sending notification to other members of the channel about joining this channel
    axios.post(`${REACT_APP_API_BASE_URL}/join`, {
      channel_name: channelName,
      username,
    });

    // after sending join notification listening to event "join" if done before the person joining might also get the notifcation
    channel.bind("join", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    // welcome message for the user
    const welcome_message = {
      username: "ChatHouse",
      message: `Hi ${username} Welcome to ${channelName}`,
    };
    setMessages((prev) => [...prev, welcome_message]);
  }, []);

  // handler for sending messages
  const handleSend = () => {
    if (text !== "") {
      const payload = {
        username,
        channel_name: channelName,
        message: text,
      };
      axios.post(`${REACT_APP_API_BASE_URL}/message`, payload);
      setText("");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.username}>
        <h2>
          <span>{channelName} Channel</span>
        </h2>
      </div>
      <div className={styles.chat_message}>
        {messages.map((i, index) => {
          if (i.username !== username) {
            return (
              <div className={styles.message} key={index}>
                <span>{i.username}</span>
                <p>{i.message}</p>
              </div>
            );
          } else {
            return (
              <div className={styles.message_right} key={index}>
                <span>You</span>
                <p>{i.message} </p>
              </div>
            );
          }
        })}
      </div>
      <div className={styles.send}>
        <input
          placeholder='Type your message'
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></input>
        <button disabled={!text} onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
};

export { ChatChannel };
