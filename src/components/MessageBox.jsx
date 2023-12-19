"use client";

import { useState } from "react";
import { processMessage } from "@/actions/processMessage";

export default function MessageBox() {
  const [messageContent, setMessageContent] = useState('');
  const [processResponse, setProcessResponse] = useState(null);

  const sendMessageWithResponse = async (formData) => {
    setProcessResponse(null);
    const response = await processMessage(formData);
    if (response.error) setProcessResponse(response.error);
  };

  return (
    <div>
      <form action={sendMessageWithResponse}>
        <input type="hidden" id="clientId" value="devin" />
        <textarea className="text-black" name="messageContent" placeholder="Send a message" value={messageContent} onChange={e => setMessageContent(e.target.value)}></textarea>
        <button type="submit">Send</button>
        {processResponse ? <p>{processResponse}</p> : null}
      </form>
    </div>
  );
}
