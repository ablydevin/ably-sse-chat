"use client";

import { useCallback, useEffect, useState } from "react";
import { ReadyState, useEventSource } from "react-use-websocket";

export default function Messages() {

  const [eventSourceUrl, setEventSourceUrl] = useState(null);
  const [messages, setMessages] = useState([]);

  const createEventSourceUrl = async () => {
    try {
      const response = await fetch("/api/ably", { cache: 'no-store' });
      const accessToken = await response.json();
      const lastEventParam = lastEvent ? `&lastEvent=${lastEvent.lastEventId}` : "";
      return `https://realtime.ably.io/event-stream?channels=chat-publish${lastEventParam}&v=1.2&accessToken=${accessToken.token}`;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    let last = document.querySelector("#chatWindow > div:last-of-type");
    last.scrollIntoView({ behavior: "auto" });
  }, [messages]);

  const { lastEvent, getEventSource, readyState } = useEventSource(
    eventSourceUrl,
    {
      retryOnError: true,
    }
  );

  useEffect(() => {
    if (lastEvent) {
      setMessages([...messages, JSON.parse(lastEvent.data)]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastEvent]);

  useEffect(() => {
    const fetchUrl = async () => {
      if (readyState === ReadyState.UNINSTANTIATED || readyState === ReadyState.CLOSED) {
        setEventSourceUrl(await createEventSourceUrl());
      }
    };
    fetchUrl();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [readyState]);

  return (
    <div className="message-display">
      <div id="chatWindow">
        <div>
          <p>msg</p>
        </div>
        <div>
          <p>long message</p>
        </div>
        <div>
          <p>ultra long message which can wrap at eighty percent</p>
        </div>
        <div>
          <p>lorem ipsum</p>
        </div>
        <div>
          <p>very long message</p>
        </div>
        <div>
          <p>msg</p>
        </div>
        <div>
          <p>long message</p>
        </div>
        <div>
          <p>ultra long message which can wrap at eighty percent</p>
        </div>
        <div>
          <p>lorem ipsum</p>
        </div>
        <div>
          <p>very long message</p>
        </div>
        <div>
          <p>msg</p>
        </div>
        <div>
          <p>long message</p>
        </div>
        <div>
          <p>ultra long message which can wrap at eighty percent</p>
        </div>
        <div>
          <p>lorem ipsum</p>
        </div>
        <div>
          <p>very long message</p>
        </div>
        <div>
          <p>msg</p>
        </div>
        <div>
          <p>long message</p>
        </div>
        <div>
          <p>ultra long message which can wrap at eighty percent</p>
        </div>
        <div>
          <p>lorem ipsum</p>
        </div>
        <div>
          <p>very long message</p>
        </div>
        {messages.map((m) => (
          <div key={m.id}>
            {JSON.parse(m.data).clientId}: {JSON.parse(m.data).messageContent}
          </div>
        ))}
      </div>
    </div>
  );
}
