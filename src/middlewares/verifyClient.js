

const verifyClient = async (req, res, next) => {
  try {
      const clientSecret = req.header("x_client_token");
      if (clientSecret !== process.env.CLIENT_SECRET) {
          res.status(400).send();
      }
    next();
  } catch (e) {
    res.status(400).send(e);
  }
};

module.exports = verifyClient;
