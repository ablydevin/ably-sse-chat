
import React, { Suspense } from "react";
import Ably from 'ably'
import { AblyProvider } from 'ably/react'

import Messages from "./Messages";
import MessageBox from "./MessageBox";

export default async function Chat() {

  return (
    <div>
        <p>Chat</p>
        <Messages />
        {/* <TypingIndicator /> */}
        <MessageBox />
    </div>
  );
}
