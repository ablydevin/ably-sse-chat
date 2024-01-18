"use server";

import Ably from 'ably'

export async function processMessage(formData) {

  // Typically you would not receive the clientID as a form value.  Instead,
  // you would use an auth system to get the requesters user ID
  const clientId = formData.get("clientId");

  const messageContent = formData.get("messageContent");
  console.log(`Write ${messageContent} to Ably`);
  try {
    
    const messagePayload = Object.assign(
      {},
      clientId === null ? null : { clientId },
      messageContent === null ? null : { messageContent }
    );

    // I'm basically using Ably as a data store - not much more
    const key = process.env.NEXT_ABLY_API_KEY;
    const client = new Ably.Rest.Promise({ key: key, clientId: clientId });
    let channel = await client.channels.get('chat-publish');
    var result = await channel.publish(messageContent,messagePayload);
    
    return { success : true }
  } catch (e) {
    return { error : "The message did not send" }
  }
}
