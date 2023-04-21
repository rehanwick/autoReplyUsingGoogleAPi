const cron = require('node-cron');
const { google } = require('googleapis');
const gmail = google.gmail('v1');


async function replyToEmail(emailId, message) {
    await gmail.users.messages.modify({
      auth: auth,
      userId: 'me',
      id: emailId,
      resource: {
        'addLabelIds': ['SENT'],
        'removeLabelIds': ['UNREAD'],
        'message': {
          'raw': message
        }
      }
    });
  }


async function getUnreadThreads() {
    const response = await gmail.users.threads.list({
      auth: auth,
      userId: 'me',
      q: 'is:unread'
    });
  
    const threads = response.data.threads || [];
  
    return threads;
  }

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

cron.schedule('*/30 * * * *', async () => {
    console.log('Running cron job...');
  
    const threads = await getUnreadThreads();
  
    for (const thread of threads) {
      const threadId = thread.id;
  
      await replyToThread(threadId, 'Thank you for your email. We will get back to you as soon as possible.');
  
      console.log(`Replied to thread ${threadId}`);
    }
  
    console.log('Cron job complete.');
  });
  