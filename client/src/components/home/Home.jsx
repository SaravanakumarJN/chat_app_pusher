import React from "react";
import { useHistory } from "react-router";
import styles from "./Home.module.css";

const Home = () => {
  const [username, setUsername] = React.useState("");
  const [channelName, setChannelName] = React.useState("");
  const history = useHistory();

  const handleJoin = () => {
    // on submit of form with both fields, navigating the user to respective channel route
    if (username !== "" && channelName !== "") {
      history.push(`/chat_channel/${username}/${channelName}`);
    }
  };

  return (
    <div className={styles.container}>
      <h1>ChatHouse</h1>
      <input
        placeholder='Enter your username'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        placeholder='Enter channel name'
        value={channelName}
        onChange={(e) => setChannelName(e.target.value)}
      />
      <button onClick={handleJoin}>Join</button>
    </div>
  );
};

export { Home };
