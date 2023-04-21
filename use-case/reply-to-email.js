
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

  module.exports = {replyToEmail}