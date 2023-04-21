const { google } = require('googleapis');
const gmail = google.gmail('v1');

async function getUnreadThreads() {
    const response = await gmail.users.threads.list({
      auth: auth,
      userId: 'me',
      q: 'is:unread'
    });
  
    const threads = response.data.threads || [];
  
    return threads;
  }


  module.exports = {getUnreadThreads} ; 