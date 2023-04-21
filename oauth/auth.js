function makeAuthAction({client }) {
  return Object.freeze({
    googleAuthLogin,
    googleAuthCallback,
  });

  function googleAuthLogin(req, res) {
    try {
      const authUrl = client.generateAuthUrl({
        access_type: "offline",
        scope: [
          "email",
          "profile",
          "https://www.googleapis.com/auth/gmail.send",
          "https://www.googleapis.com/auth/gmail.readonly",
          "https://www.googleapis.com/auth/gmail.compose",
          'https://www.googleapis.com/auth/gmail.modify'
        ],
      });
      console.log("AUTH URL", authUrl);
      res.redirect(authUrl);
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  }

  async function googleAuthCallback(req, res) {
    const { code } = req.query;
    try {
      const { tokens } = await client.getToken(code);
      console.log("access_token", tokens);
      client.setCredentials(tokens);
      const { data } = await client.request({
        url: "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
        method: "GET",
      });
      if (tokens.refresh_token) {
        const userdata = {
          name: data.name,
          email: data.email,
          access_token: tokens.access_token,
          refresh_token: tokens.refresh_token,
          expiryDate: tokens.expiry_date,
        };
      }
      
      console.log("GOOGLE data : ", data);
      res.redirect("/");
    } catch (error) {
      console.error(error);
      res.status(500).send("Server error");
    }
  }
}

module.exports = makeAuthAction;
