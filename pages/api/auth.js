import PrivyNode from "@privy-io/node";

/* 
  The frontend client will hit this endpoint to request a Privy access token. Here, you can use 
  your own authentication and authorization logic to determine whether access should be granted and 
  with what roles/scopes.
*/
const handler = async (req, res) => {
  // TODO: Is this request to your backend legit? BYO authentication logic/middleware. We've omitted it in the sample. 

  // Initialize the PrivyNode client with your API key and secret
  const privyNode = new PrivyNode(process.env.PRIVY_API_KEY, process.env.PRIVY_API_SECRET);

  // TODO: What are the requester's identity and roles? BYO authorization logic. We've hardcorded it in the sample. 
  const requesterId = req.headers.userid;
  const requesterRoles = ['admin'];

  // Generate a Privy access token!
  try {
    const token = await privyNode.createAccessToken(requesterId, requesterRoles);
    res.status(200).send({ token });
  } catch (error) {
    res.status(500).send({ error });
  }
}

export default handler;