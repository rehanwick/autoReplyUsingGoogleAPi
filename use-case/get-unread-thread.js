async function getUnreadThreads() {
    const response = await gmail.users.threads.list({
      auth: auth,
      userId: 'me',
      q: 'is:unread'
    });
  
    const threads = response.data.threads || [];
  
    return threads;
  }
