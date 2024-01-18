"use client";

import { useEffect, useState } from "react";
import { processMessage } from "@/actions/processMessage";

export default function MessageBox() {
  const [messageContent, setMessageContent] = useState("");
  const [processResponse, setProcessResponse] = useState(null);

  const sendMessageWithResponse = async (formData) => {
    setProcessResponse(null);
    const response = await processMessage(formData);
    if (response.error) setProcessResponse(response.error);
  };

  return (
    <div className="message-input">
      <form action={sendMessageWithResponse}>

        <textarea
          className="text-black"
          name="messageContent"
          placeholder="Send a message"
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
        ></textarea>
        <button type="submit" className="button-blue">
          Send
        </button>

        {/* typically you wouldn't keep the clientID in a hidden input because it could be manipulated by
        a users.  Instead you'd use an auth system on the server to know who this is when they submit their message.  
        But for simplicity of this demo this is what we'll do for now */}
        <input type="hidden" id="clientId" name="clientId" value="devin" />

        {processResponse ? <p>{processResponse}</p> : null}
      </form>
    </div>
  );
}
