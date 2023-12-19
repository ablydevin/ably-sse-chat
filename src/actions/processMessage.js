"use server";

import Ably from 'ably'

export async function processMessage(formData) {

  //what data do we need to send a message?
  // who sent the message?
  // at what time did they send it?
  // what is the message content?
  // parent message id

  const messageContent = formData.get("messageContent");
  const clientId = formData.get("clientId");
  console.log(`Write ${messageContent} to Ably`);
  try {
    
    const messagePayload = Object.assign(
      {},
      clientId === null ? null : { clientId },
      messageContent === null ? null : { messageContent }
    );

    const key = process.env.NEXT_ABLY_API_KEY;
    console.log(key)
    const client = new Ably.Rest.Promise(key);
    let channel = await client.channels.get('chat-publish');
    var result = await channel.publish('asdasdasd',messagePayload);
    
    return { success : true }
  } catch (e) {
    return { error : "The message did not send" }
  }
}
