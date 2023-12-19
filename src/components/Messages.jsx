"use client";

import { useEffect, useState } from "react";
//import Message from "./Message";

export default function Messages() {
  const [messageEnvelopes, setMessageEnvelopes] = useState([]);

  function getRealtimeData(messageEnvelope) {
    console.log(messageEnvelope);
    setMessageEnvelopes([...messageEnvelopes, messageEnvelope]);
  }

  const receiveMessages = () => {
    fetch("/api/ably/").then((response) => {
      response.json().then((accessToken) => {

        console.log(accessToken.token);
        const url = `https://realtime.ably.io/event-stream?channels=chat-publish&v=1.2&accessToken=${accessToken.token}`;

        const sse = new EventSource(url);
        sse.onmessage = (e) => getRealtimeData(JSON.parse(e.data));
        sse.onerror = (e) => {
          // error log here
          console.log(e);
          sse.close();
        };
        return () => {
          sse.close();
        };

      });
    });
  };

  useEffect(() => {
    receiveMessages();
  }, []);

  return (
    <div>
      <p>Messages</p>
      <ul>
        {
        messageEnvelopes.map((m) => 
          <li key={m.id}>{JSON.parse(m.data).messageContent}</li>
        )}
      </ul>
    </div>
  );
}
