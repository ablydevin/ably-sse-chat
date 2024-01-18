"use client";

import { useEffect, useState } from "react";
import { useEventSource } from "react-use-websocket";

let lastEventId;

export default function Messages() {
  const [eventSourceUrl, setEventSourceUrl] = useState(null);
  const [messageEnvelopes, setMessageEnvelopes] = useState([]);

  const getRealtimeData = (messageEnvelope) => {
    console.log(messageEnvelope);
    lastEventId = messageEnvelope.id
    setMessageEnvelopes([...messageEnvelopes, messageEnvelope]);
  }

  const lastEventParam = lastEventId ? (`&lastEvent=${lastEventId}`) : '';

  useEffect(() => {
    fetch("/api/ably/").then((response) => {
      response.json().then((accessToken) => {
        setEventSourceUrl(`https://realtime.ably.io/event-stream?channels=chat-publish&v=1.2&accessToken=${accessToken.token}`);
      });
    });
  }, []);

  useEffect(() => {
      let last = document.querySelector('#chatWindow > div:last-of-type')
      last.scrollIntoView({ behavior: 'auto' });
  },[]);

  useEffect(() => {
      let last = document.querySelector('#chatWindow > div:last-of-type')
      last.scrollIntoView({ behavior: 'auto' });
  }, [messageEnvelopes]);

  const { lastEvent, getEventSource, readyState } = useEventSource(
    eventSourceUrl, 
    {
      retryOnError: true,
      events: {
        message: (messageEvent) => {
          console.log('This has type "message": ', messageEvent);      
          getRealtimeData(JSON.parse(messageEvent.data));
        },
        update: (messageEvent) => {
          console.log('This has type "update": ', messageEvent);
        }
      }
    }
  );

  // const receiveMessages = () => {
  //   fetch("/api/ably/").then((response) => {
  //     response.json().then((accessToken) => {

  //       console.log(accessToken.token);
  //       const url = `https://realtime.ably.io/event-stream?channels=chat-publish${lastEventParam}&v=1.2&accessToken=${accessToken.token}`;

  //       const sse = new EventSource(url);
  //       sse.onmessage = (e) => getRealtimeData(JSON.parse(e.data));
  //       sse.onerror = (e) => {
  //         // error log here
  //         console.log(e);
  //         sse.close();
  //       };
  //       return () => {
  //         sse.close();
  //       };

  //     });
  //   });
  // };

  // useEffect(() => {
  //   receiveMessages();
  // }, []);

  return (
    <div className="message-display">          
    <div id="chatWindow">
      <div><p>msg</p></div>
      <div><p>long message</p></div>
      <div><p>ultra long message which can wrap at eighty percent</p></div>
      <div><p>lorem ipsum</p></div>
      <div><p>very long message</p></div>
      {messageEnvelopes.map((m) => (
          <div key={m.id}>{JSON.parse(m.data).clientId}: {JSON.parse(m.data).messageContent}</div>
        ))}
    </div>
  </div>
  );
}
