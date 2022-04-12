require('dotenv').config()

/* 
  The frontend client will hit this endpoint and request a Privy access token. Here, you can use 
  your own authentication and authorization logic to determine whether access should be granted and 
  with what roles/scopes.
*/
export default async (req, res) => {

  // TODO: add your own authentication logic! We've ommitted it in the sample. 

  // In this sample, the data requester is the end user themselves (via the client).
  const requesterId = req.headers.userid; 

  // TODO: add your authorization logic to determine what roles this requestor should get! We've hardcoded it to "admin" in the sample. 
  const requesterRoles = ['admin'];
  
  const privyResponse = await fetch("https://api.privy.io/v0/auth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // /auth/token endpoint uses basic auth using the API key/secret which are stored in a .env file
      Authorization: `Basic ${Buffer.from(
        process.env.PRIVY_API_KEY + ":" + process.env.PRIVY_API_SECRET
      ).toString("base64")}`,
    },
    body: JSON.stringify({ requester_id: requesterId, roles: requesterRoles }),
  });

  const { error, token } = await privyResponse.json();

  if (error) {
    res.status(500).send({ error });
    return;
  }

  res.status(200).send({ token });
}
