const {replyToEmail} = require('./reply-to-email')
const { google } = require('googleapis');
const gmail = google.gmail('v1');


async function replyToThread(threadId, message) {
    const response = await gmail.users.threads.get({
      auth: auth,
      userId: 'me',
      id: threadId
    });
  
    const thread = response.data;
  
    // Get all messages in the thread
    const messages = thread.messages || [];
  
    for (const message of messages) {
      const headers = message.payload.headers || [];
  
      // Check if the message is a reply
      const isInReplyTo = headers.find(h => h.name === 'In-Reply-To');
  
      if (!isInReplyTo) {
        // If the message is not a reply, reply to it
        const emailId = message.id;
  
        await replyToEmail(emailId, message);
  
        console.log(`Replied to email ${emailId}`);
      }
    }
  }

  module.exports = {replyToThread}