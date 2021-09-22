import React from "react";
import { Switch, Route } from "react-router-dom";
import { ChatChannel } from "../components/chat_channel/ChatChannel";
import { Home } from "../components/home/Home";

const Routes = () => {
  return (
    <Switch>
      <Route exact path='/'>
        <Home />
      </Route>
      <Route exact path='/chat_channel/:username/:channelName'>
        <ChatChannel />
      </Route>
    </Switch>
  );
};

export { Routes };
