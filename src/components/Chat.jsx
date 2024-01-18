import React, { Suspense } from "react";
import Ably from "ably";
import { AblyProvider } from "ably/react";

import Messages from "./Messages";
import MessageBox from "./MessageBox";

export default async function Chat() {
  return (
    <div className="container">
      <div className="content">
        <Messages />
        <MessageBox />
      </div>
    </div>
  );
}
