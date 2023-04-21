const cron = require('node-cron');

const {getUnreadThreads} = require('../use-case/get-unread-thread') ; 
const {replyToThread} = require('../use-case/reply-to-thread')

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
  